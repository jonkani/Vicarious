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

    return <Scene>

      <Entity
        geometry={{
          primitive: 'sphere',
          radius: 5000,
          segmentsWidth: 64,
          segmentsHeight: 20
        }}
        material={{ src: `url(${url})` }}
        scale={"1 1 -1"}
        onLoaded={(event) => (console.log(event))}
      />
    </Scene>;
  }
});

export default ImageDisplay;
