import { browserHistory, withRouter } from 'react-router';
import React from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const App = React.createClass({
  getInitialState() {
    return {
      searchLocation: {},
      searchSize: 2,
      imageList: [],
      imageView: {},
      favorites: [],
      displayFavorites: false
    };
  },

  setSize(size) {
    this.setState({ searchSize: size });
  },

  imageSearch(loc) {
    const size = this.state.searchSize;

    this.setState({ searchLocation: loc });

    const plusWrap = function(coord, max) {
      if (coord + size > max) {
        return max;
      }

      return coord + size;
    };
    const minusWrap = function(coord, min) {
      if (coord - size < min) {
        return min;
      }

      return coord - size;
    };
    const maxLat = plusWrap(loc.lat, 90);
    const maxLon = plusWrap(loc.lng, 180);
    const minLat = minusWrap(loc.lat, -90);
    const minLon = minusWrap(loc.lng, -180);

    const search = { maxLat, maxLon, minLat, minLon };

    axios.get('/api/search', { params: search })
      .then((res) => {
        let photos = [];

        if (res.data[0][0]) {
          photos = res.data.reduce((total, cur) => total.concat(cur), []);
        }
        else {
          photos = res.data;
        }

        this.setState({ imageList: photos });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getFavorites() {
    axios.get('/api/users/favorites')
      .then((response) => {
        const newFavorites = response.data;

        this.setState({ favorites: newFavorites });
      })
      .catch((err) => {
        console.error(err);
      });
  },

  addFavorite() {
    if (this.state.imageView) {
      axios.post('/api/users/favorites', this.state.imageView)
        .then(() => {
          this.getFavorites();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },

  toggleFavorites() {
    const flip = !this.state.displayFavorites;

    this.setState({ displayFavorites: flip });
  },

  setCenter(loc) {
    this.setState({ searchLocation: loc });
  },

  setDisplay(photo) {
    this.setState({ imageView: photo });
    browserHistory.push('/display');
  },

  render() {
    return <div className="mastercontainer">
      <div className="monitorborderborder">
        <div className="monitorborder">
          <div className="midmonitor">
            <div className="monitor">
              <div className="gradient">
                {React.cloneElement(this.props.children, {
                  imageSearch: this.imageSearch,
                  searchLocation: this.state.searchLocation,
                  imageList: this.state.imageList,
                  setCenter: this.setCenter,
                  setDisplay: this.setDisplay,
                  imageView: this.state.imageView,
                  getFavorites: this.getFavorites,
                  displayFavorites: this.state.displayFavorites,
                  toggleFavorites: this.toggleFavorites,
                  addFavorite: this.addFavorite,
                  favorites: this.state.favorites
                })}
              </div>
            </div>
          </div>
          <Sidebar
            location={this.props.location.pathname}
            setSize={this.setSize}
          />
        </div>
      </div>
    </div>;
  }
});

export default withRouter(App);
