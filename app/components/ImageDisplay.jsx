import 'aframe';
import { Entity, Scene } from 'aframe-react';
import BackIcon from './BackIcon';
import FavoriteIcon from './FavoriteIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavBack from 'material-ui/svg-icons/navigation/arrow-back';
import React from 'react';
import { browserHistory } from 'react-router';
const ImageDisplay = React.createClass({
  componentWillMount() {
    if (!this.props.imageView.id) {
      browserHistory.push('/');
    }
  },

  handleBack() {
    browserHistory.push('/');
  },

  handleFavorite() {
    this.props.addFavorite();
  },

  render() {
    const photo = this.props.imageView;
    const loaded = ''
    let url = '';
    let favoriteButton = null;

    if (photo) {
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalSecret}_o.${photo.originalFormat}`;
    }
    if (document.cookie) {
      favoriteButton = <div
        className="displayfavbutton"
        onTouchTap={this.handleFavorite}
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
        onLoaded={(event) => (console.log(event))}
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
        className="displaybackbutton"
        onTouchTap={this.handleBack}
      >
        <BackIcon />
      </div>
      {favoriteButton}
    </div>;
  }
});

export default ImageDisplay;
