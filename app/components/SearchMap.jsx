import { GoogleMap, GoogleMapLoader, Marker } from 'react-google-maps';
import React from 'react';

const SearchMap = React.createClass({
  handleTouchTap(event) {
    console.log(event.latLng.lat(), event.latLng.lng());
  },

  render() {
    return <section style={{ height: '500px' }}>
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: '100%'
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            defaultZoom={3}
            onClick={this.handleTouchTap}
          >
            <Marker
              position={{ lat: -25.363882, lng: 131.044922 }}
            />
          </GoogleMap>
      }
      />
    </section>;
  }
});

export default SearchMap;
