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
    return <section style={{ height: '100%', width: '100%' }}>
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
          {this.props.imageList.map((image) => {
            return <Marker
              key={image.id}
              position={{
                lat: Number.parseFloat(image.latitude),
                lng: Number.parseFloat(image.longitude)
              }}
            />;
          })}
          </GoogleMap>
      }
      />
    </section>;
  }
});

export default SearchMap;
