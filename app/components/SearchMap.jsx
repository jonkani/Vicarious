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
  handleDisplay() {
    const image = Object.assign({}, this.state.windowPhoto);

    this.handleInfoClick();
    this.props.setDisplay(image);
  },
  handleClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    this.props.imageSearch({ lat, lng });
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
        <div>
          <h3>{this.state.windowPhoto.title}</h3>
          <button
            onClick={this.handleDisplay}
          >
            Go!
          </button>
        </div>

      </InfoWindow>
      : null;
    const center = this.props.searchLocation.lat
    ? this.props.searchLocation
    : { lat: 40.797245, lng: -99.336877 };

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
            defaultCenter={center}
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
