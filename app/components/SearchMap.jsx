import { Card, CardActions, CardHeader } from 'material-ui/Card';
import {
  GoogleMap,
  GoogleMapLoader,
  InfoWindow,
  Marker
} from 'react-google-maps';
import ArrowIcon from './ArrowIcon';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import SearchIcon from './SearchIcon';
import StarIcon from './StarIcon';
import mapStyle from './mapStyle.js';

const SearchMap = React.createClass({
  getInitialState() {
    return {
      hover: false,
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

  handleEnter() {
    this.setState({ hover: true });
  },

  handleLeave() {
    this.setState({ hover: false });
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
    ? <div className="headcontainer">
      <span className="headlabel">Favorites</span>
      <span
        className="headbutton"
        onClick={this.handleToggle}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <SearchIcon
          fill={this.state.hover ? '#fd00ff' : '#3acaec'}
          stroke={this.state.hover ? '#fd00ff' : '#3acaec'}
        />
      </span>
    </div>
    : <div className="headcontainer">
      <span className="headlabel">Results</span>
      <span
        className="headbutton"
        onClick={this.handleToggle}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <StarIcon
          fill={this.state.hover ? '#fd00ff' : '#3acaec'}
          stroke={this.state.hover ? '#fd00ff' : '#3acaec'}
        />
      </span>
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
                defaultOptions={{
                  styles: mapStyle,
                  streetViewControl: false,
                  mapTypeControl: false
                }}
                defaultZoom={3}
                onClick={this.handleClick}
              >
                {resultsList.map((image, index) => {
                  return <Marker
                    key={index}
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
          {resultsList.map((image, index) => {
            return <div className="headcard" key={index}>
              <span className="headcardtitle">{image.title}</span>
              <div
                className="headcardbutton"
                onClick={() => (this.handleInfoClick(image))}>
                <ArrowIcon />
              </div>
            </div>;
          })}
        </div>
      </div>
    </div>;
  }
});

export default SearchMap;
