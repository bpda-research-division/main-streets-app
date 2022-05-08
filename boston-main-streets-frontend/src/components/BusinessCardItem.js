import React from "react";
import { Card, Button } from "react-bootstrap";

const BusinessCardItem = (props) => {
    return (
        <Card style={{minHeight: '80px', height: '100%'}}>
            <Card.Body>
                <Card.Title style={{display: 'flex', justifyContent: 'center', }}>{props.title}</Card.Title>
                <Card.Text className="text-muted">{props.text}</Card.Text>
                <Card.Text>
                    Some example text description about the business
                </Card.Text>
            </Card.Body>
            {props.children}
        </Card>
    )
}

export default BusinessCardItem;