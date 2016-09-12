import { GoogleMap, GoogleMapLoader, Marker } from 'react-google-maps';
import React from 'react';

const SearchMap = React.createClass({
  handleClick(event) {
    const lat = event.latLng.lat();
    const lon = event.latLng.lng();

    console.log(lat, lon);
    this.props.imageSearch({ lat, lon });
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
            onClick={this.handleClick}
          >
            <Marker
              position={{
                lat: this.props.searchLocation.lat,
                lng: this.props.searchLocation.lon
              }}
            />
          </GoogleMap>
      }
      />
    </section>;
  }
});

export default SearchMap;
