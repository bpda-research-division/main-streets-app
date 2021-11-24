import React from 'react';
import MainstreetMap from '../MainstreetMap';

function Map() { 
    const [brighton_data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch('http://35.168.164.33:5000/brighton')
        .then(response => response.json())
        .then(data => {
            setData(data.geo.features)
        })
        .catch(error => console.log(error));
    }, {});

    return (MainstreetMap(brighton_data, [42.35, -71.16], 15));
}

function Brighton() {

    return (
        <div>
            <span className="span">Brighton Homepage</span>
            <div className="block1">
                <div className="map-component"><Map /></div>
            </div>
        </div>
    );
}

export default Brighton;