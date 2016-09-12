import {
  GoogleMap,
  GoogleMapLoader,
  InfoWindow,
  Marker
} from 'react-google-maps';
import React from 'react';

const SearchMap = React.createClass({
  getInitialState() {
    return {
      windowPosition: null,
      windowPhoto: {}
    };
  },

  handleClick(event) {
    const lat = event.latLng.lat();
    const lon = event.latLng.lng();

    this.props.imageSearch({ lat, lon });
  },

  handleInfoClick(photo) {
    if (!photo) {
      this.setState({ windowPosition: null, windowPhoto: {}});

      return;
    }
    const markerLoc = {
      lat: Number.parseFloat(photo.latitude),
      lng: Number.parseFloat(photo.longitude)
    };

    this.setState({ windowPosition: markerLoc, windowPhoto: photo });
  },

  render() {
    const infoWindow = this.state.windowPosition
      ? <InfoWindow
        onCloseclick={this.handleInfoClick}
        options={{ pixelOffset: new google.maps.Size(0, -30) }}
        position={this.state.windowPosition}
      >
        {this.state.windowPhoto.title}
      </InfoWindow>
      : null;

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
              onClick={() => (this.handleInfoClick(image))}
              position={{
                lat: Number.parseFloat(image.latitude),
                lng: Number.parseFloat(image.longitude)
              }}
            />;
          })}
          {infoWindow}
          </GoogleMap>
      }
      />
    </section>;
  }
});

export default SearchMap;
