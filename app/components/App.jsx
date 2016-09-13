import { browserHistory, withRouter } from 'react-router';
import React from 'react';
import axios from 'axios';

const App = React.createClass({
  getInitialState() {
    return {
      searchLocation: {},
      imageList: [],
      imageView: {}
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

  setDisplay(photo) {
    this.setState({ imageView: photo });
    browserHistory.push('/display');
  },

  render() {
    return <div>
    {React.cloneElement(this.props.children, {
      imageSearch: this.imageSearch,
      searchLocation: this.state.searchLocation,
      imageList: this.state.imageList,
      setDisplay: this.setDisplay,
      imageView: this.state.imageView
    })}
    </div>;
  }
});

export default withRouter(App);
