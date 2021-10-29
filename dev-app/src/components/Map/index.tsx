import React, {FC} from 'react';
import {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import './index.tsx.css';
import {LocationPin} from '../LocationPin';

interface Props {
  location: any;
  zoomLevel: number;
}

const Map: FC<Props> = ({location, zoomLevel}) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAuhj4909Mdb7Whn8cEm4m2eHDQTgIZtwk&callback=initMap';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{key: ''}}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export {Map};
