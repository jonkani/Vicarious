import 'aframe';
import React from 'react';
import { Scene } from 'aframe-react';

const ImageDisplay = React.createClass({
  render() {
    const photo = this.props.imageView;
    let url = '';

    if (photo) {
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_o.${photo.originalformat}`;
    }

    return <Scene>
      <a-sky
        rotation="0 -130 0"
        src={url}
      />
    </Scene>;
  }
});

export default ImageDisplay;
