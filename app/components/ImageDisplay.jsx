import 'aframe';
import React from 'react';
import { browserHistory } from 'react-router';
import { Entity, Scene } from 'aframe-react';

const ImageDisplay = React.createClass({
  componentWillMount() {
    if (!this.props.imageView.id) {
      browserHistory.push('/');
    }
  },

  render() {
    const photo = this.props.imageView;
    let url = '';

    if (photo) {
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
    }

    return <Scene onLoaded={(event) => (console.log(event))}>
      <a-assets>
        <img id="displayimg" src={url} crossOrigin="anonymous" />
      </a-assets>
      <Entity
        geometry={{
          primitive: 'sphere',
          radius: 5000,
          segmentsWidth: 64,
          segmentsHeight: 20
        }}
        material={{ src: '#displayimg' }}
        scale={"1 1 -1"}
      />
    </Scene>;
  }
});

export default ImageDisplay;
