import { Card, CardActions, CardHeader } from 'material-ui/Card';
import {
  GoogleMap,
  GoogleMapLoader,
  InfoWindow,
  Marker
} from 'react-google-maps';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

const SearchMap = React.createClass({
  getInitialState() {
    return {
      windowPosition: null,
      windowPhoto: {},
      zoom: 0
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

    this.props.setCenter(markerLoc);
    this.setState({ windowPosition: markerLoc, windowPhoto: photo });
  },

  handleToggle() {
    if (this.props.favorites.length === 0) {
      this.props.getFavorites();
    }
    this.props.toggleFavorites();
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
    const listDisplay = this.props.displayFavorites && document.cookie
    ? <div>
      <h3>Favorites</h3>
      <RaisedButton label="Search" onClick={this.handleToggle} />
    </div>
    : <div>
      <h3>Search Results</h3>
      <RaisedButton label="Favorites" onClick={this.handleToggle} />
    </div>;
    const resultsList = this.props.displayFavorites && document.cookie
    ? this.props.favorites
    : this.props.imageList;

    return <div className="searchcontainer">
      <div className="mapcontainer">
        <section style={{ height: '100%', width: '100%' }}>
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
                center={center}
                defaultZoom={3}
                onClick={this.handleClick}
                options={{ streetViewControl: false, mapTypeControl: false }}
              >
              {resultsList.map((image) => {
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
        </section>
      </div>
      <div className="listparent">
        {listDisplay}
        <div className="listcontainer">
          {resultsList.map((image) => {
            return <Card key={image.id}>
              <CardHeader title={image.title} />
              <CardActions>
                <RaisedButton
                  label="Go!"
                  onClick={() => (this.handleInfoClick(image))}
                />
              </CardActions>
            </Card>;
          })}
        </div>
      </div>
    </div>;
  }
});

export default SearchMap;
