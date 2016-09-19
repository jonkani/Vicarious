import { browserHistory, withRouter } from 'react-router';
import React from 'react';
import axios from 'axios';

const App = React.createClass({
  getInitialState() {
    return {
      searchLocation: {},
      imageList: [],
      imageView: {},
      favorites: [],
      displayFavorites: false
    };
  },

  imageSearch(loc) {
    this.setState({ searchLocation: loc });

    const plusWrap = function(coord, max) {
      if (coord + 10 > max) {
        return max;
      }

      return coord + 10;
    };
    const minusWrap = function(coord, min) {
      if (coord - 10 < min) {
        return min;
      }

      return coord - 10;
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
          <div className="buttoncontainer">
            <div className="logodiv"><img src="http://cdn.techgyd.com/eye-bee-m.jpg" style={{ width: '50%', marginTop: '10%' }} /></div>
            <div className="buttondiv"><button onTouchTap={() => (browserHistory.push('/user'))}>login</button></div>
          </div>
        </div>
      </div>
    </div>;
  }
});

export default withRouter(App);
