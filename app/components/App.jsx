import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

const App = React.createClass({
  getInitialState() {
    return {
      searchLocation: {},
      imageList: {}
    };
  },

  imageSearch(loc) {
    this.setState({ searchLocation: loc });

    const plusWrap = function(coord, max) {
      if (coord + 20 > max) {
        return max;
      }

      return coord + 20;
    };
    const minusWrap = function(coord, min) {
      if (coord - 20 < min) {
        return min;
      }

      return coord - 20;
    };
    const maxLat = plusWrap(loc.lat, 90);
    const maxLon = plusWrap(loc.lon, 180);
    const minLat = minusWrap(loc.lat, -90);
    const minLon = minusWrap(loc.lon, -180);

    const search = { maxLat, maxLon, minLat, minLon };

    console.log(search);
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

  render() {
    return <div>
    {React.cloneElement(this.props.children, {
      imageSearch: this.imageSearch,
      searchLocation: this.state.searchLocation
    })}
    </div>;
  }
});

export default withRouter(App);
