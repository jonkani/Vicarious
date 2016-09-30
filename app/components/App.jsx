import { browserHistory, withRouter } from 'react-router';
import { Notification } from 'react-notification';
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
      displayFavorites: false,
      loaded: false,
      toast: { message: '', display: false }
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
        if (!res.data[0]) {
          return this.openToast('No results found!');
        }

        let photos = [];

        if (res.data[0][0]) {
          photos = res.data.reduce((total, cur) => total.concat(cur), []);
        }
        else {
          photos = res.data;
        }

        this.setState({ imageList: photos, displayFavorites: false });
      })
      .catch((err) => {
        this.openToast(`Whoops! ${err}`);
      });
  },

  getFavorites() {
    axios.get('/api/users/favorites')
      .then((response) => {
        const newFavorites = response.data;

        this.setState({ favorites: newFavorites });
      })
      .catch((err) => {
        this.openToast(`Whoops! ${err}`);
      });
  },

  addFavorite() {
    if (this.state.imageView) {
      axios.post('/api/users/favorites', this.state.imageView)
        .then(() => {
          this.getFavorites();
        })
        .catch((err) => {
          this.openToast(`Whoops! ${err}`);
        });
    }
  },

  openToast(message) {
    if (this.state.toast.display === true) {
      const closeToast = Object.assign(
        {},
        this.state.toast,
        { display: false }
      );

      return this.setState(
        { toast: closeToast },
        () => (this.openToast(message))
      );
    }
    const newToast = Object.assign(
      {},
      this.state.toast,
      { message, display: true }
    );

    return this.setState({ toast: newToast });
  },

  handleCloseToast() {
    const newToast = Object.assign({}, this.state.toast, { display: false });

    this.setState({ toast: newToast });
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

  loadDisplay(bool) {
    this.setState({ loaded: bool });
  },

  render() {
    return <div className="mastercontainer">
      <div className="monitorborderborder">
        <div className="monitorborder">
          <div className="midmonitor">
            <div className="monitor">
              <Notification
                barStyle={{
                  position: 'absolute',
                  zIndex: 10,
                  border: '2px solid #ff00ff',
                  borderRadius: '4px'
                }}
                className="toast"
                dismissAfter={4000}
                isActive={this.state.toast.display}
                message={this.state.toast.message}
                onDismiss={this.handleCloseToast}
              />
              <div
                className={this.state.loaded ? 'gradientoff' : 'gradient'}
              >
                {React.cloneElement(this.props.children, {
                  imageSearch: this.imageSearch,
                  searchLocation: this.state.searchLocation,
                  imageList: this.state.imageList,
                  setCenter: this.setCenter,
                  setDisplay: this.setDisplay,
                  setLocation: this.setLocation,
                  imageView: this.state.imageView,
                  getFavorites: this.getFavorites,
                  displayFavorites: this.state.displayFavorites,
                  toggleFavorites: this.toggleFavorites,
                  addFavorite: this.addFavorite,
                  favorites: this.state.favorites,
                  loadDisplay: this.loadDisplay,
                  openToast: this.openToast
                })}
              </div>
            </div>
          </div>
          <Sidebar
            location={this.props.location.pathname}
            searchSize={this.state.searchSize}
            setSize={this.setSize}
          />
        </div>
      </div>
    </div>;
  }
});

export default withRouter(App);
