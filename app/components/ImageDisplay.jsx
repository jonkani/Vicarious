import 'aframe';
import { Entity, Scene } from 'aframe-react';
import BackIcon from './BackIcon';
import FavoriteIcon from './FavoriteIcon';
import React from 'react';
import { browserHistory } from 'react-router';
const ImageDisplay = React.createClass({
  componentWillMount() {
    if (!this.props.imageView.id) {
      browserHistory.push('/');
    }
  },

  componentWillUnmount() {
    this.props.loadDisplay(false);
  },

  handleLoad() {
    const buttons = document.querySelectorAll('.displaybutton');

    buttons.forEach((button) => { button.setAttribute('style', ''); });
    this.props.loadDisplay(true);
  },

  handleBack() {
    browserHistory.push('/');
  },

  handleFavorite() {
    this.props.addFavorite();
    this.props.openToast('Favorite added!');
  },

  render() {
    const buttonDisplay = { display: 'none', zIndex: 0 };
    const photo = this.props.imageView;
    let url = '';
    let favoriteButton = null;

    if (photo) {
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalSecret}_o.${photo.originalFormat}`;
    }
    if (document.cookie) {
      favoriteButton = <div
        className="displayfav displaybutton"
        onTouchTap={this.handleFavorite}
        style={buttonDisplay}
      >
        <FavoriteIcon />
      </div>;
    }

    return <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 900
      }}
    >
      <Scene
        onLoaded={this.handleLoad}
        vr-mode-ui={{ enabled: 'false' }}
      >
        <a-assets>
          <img crossOrigin="anonymous" id="displayimg" src={url} />
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
      </Scene>
      <div
        className="displayback displaybutton"
        onTouchTap={this.handleBack}
        style={buttonDisplay}
      >
        <BackIcon />
      </div>
      {favoriteButton}
    </div>;
  }
});

export default ImageDisplay;
