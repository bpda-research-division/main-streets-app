import React, { useState } from "react";
import { Row, Col, CardGroup, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardItem from "../components/CardItem";
import Grid from '@mui/material/Grid'
import LineGraph from "../components/LineGraph";
import { Bar, Radar } from 'react-chartjs-2';

const EmploymentBoard = () => {

    // calcuate summary
    const districtName = useSelector(({ district }) => district)
    const businesses = useSelector(({ business }) => business)
    let industryData = {};
    //const totalEmp = businesses.map((business) => business.estimated_employment).reduce((a, b) => a + b, 0)  
    // aggregate businesses.estimated_employment and save into totalEmp
    let totalEmp=0;
    
    businesses.forEach(element => {
        if((typeof element.estimated_employment) === "number"){
            totalEmp += element.estimated_employment
        }
        if (element.NAICS_2017_2digit_desc in industryData) {
            industryData[element.NAICS_2017_2digit_desc] += 1; 
        } else {
            industryData[element.NAICS_2017_2digit_desc] = 1
        }
    });
    
    
    const totalBusiness = businesses.length
    const averageEmp = Math.floor(totalEmp / totalBusiness).toLocaleString('en-US')
    console.log(industryData);
    console.log(Object.keys(industryData).sort((a, b) => industryData[b] - industryData[a]).slice(0, 3));
    // get values of above keys
    const industryDataValues = Object.keys(industryData).sort((a, b) => industryData[b] - industryData[a]).slice(0, 3).map((key) => industryData[key])
    const industryDataLabels = Object.keys(industryData).sort((a, b) => industryData[b] - industryData[a]).slice(0, 3).map((key) => key)
    console.log(industryDataValues);
    // chart data
    const boardData = useSelector(({ boardData }) => boardData)

    // other indicators
    const isExpanded = useSelector(state => state.windowSize)
    const topSmallSize = 6;
    const butSmallSize = 12;
    const largeSize = 4;

    const cardTitles = [
        { title: "Estimated Number of Employees:", text: totalEmp.toLocaleString('en-US') },
        { title: "Total Number of Businesses:", text: totalBusiness.toLocaleString('en-US') },
    ]
    const cardTitleEm = [
        { title: "Average Employment Size:", text: averageEmp + " Per Business" }
    ]

    if (businesses.length === 0) {
        return (
            <div>Loading...</div>
        )
    }



    const localStyle = {
        marginTop: '10px',
    };
    return (
        <Grid container spacing={1} style={{ flexGrow: '1', overflowY: 'scroll', overflowX: 'hidden', maxHeight: '80vh'}} sx={{mt: 0.5}}>
            {cardTitles.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={isExpanded == true ? topSmallSize : largeSize}>
                    <CardItem title={card.title} text={card.text} />
                </Grid>
            ))}
            {cardTitleEm.map((card, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={isExpanded == true ? butSmallSize : largeSize}>
                    <CardItem title={card.title} text={card.text} />
                </Grid>
            ))}
            {(districtName !== "Boston2") ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Accordion>
                        <Accordion.Item eventKey="1"  style={{ marginBottom: '8px' }}>
                            <Accordion.Header>Mobility</Accordion.Header>
                            <Accordion.Body>
                                {boardData.mobility ? (
                                    <LineGraph data={boardData.mobility} labelName="date" dataName="data" />
                                ) : (
                                        <div>Mobility data not available for neighborhood</div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Spending</Accordion.Header>
                            <Accordion.Body>
                                {boardData.spending ? (
                                    <LineGraph data={boardData.spending} labelName="date" dataName="data" />
                                ) : (
                                        <div>Spending data not available for neighborhood</div>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Industries</Accordion.Header>
                            <Accordion.Body>
                                <Bar data={{
                                    // get top 5 industries
                                    
                                    labels: Object.keys(industryData).sort((a, b) => industryData[b] - industryData[a]).slice(0, 3),
                                    datasets: [{
                                        data: Object.keys(industryData).sort((a, b) => industryData[b] - industryData[a]).slice(0, 3).map((key) => industryData[key]),
                                        backgroundColor: [
                                            '#FF6384',
                                            '#36A2EB',
                                            '#FFCE56',
                                         
                                        ]
                                    }],
                                }} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Grid>
            ) : <></>}
        </Grid>
    )
}

export default EmploymentBoard