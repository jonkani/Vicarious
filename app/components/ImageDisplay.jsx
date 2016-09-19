import 'aframe';
import { Entity, Scene } from 'aframe-react';
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

  handleButton() {
    browserHistory.push('/');
  },

  handleFavorite() {
    console.log('yes');
    this.props.addFavorite();
  },

  render() {
    const photo = this.props.imageView;
    let url = '';
    let favoriteButton = null;

    if (photo) {
      url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.originalSecret}_o.${photo.originalFormat}`;
    }
    if (document.cookie) {
      favoriteButton = <FloatingActionButton
        onTouchTap={this.handleFavorite}
        style={{
          color: 'red',
          zIndex: 999,
          position: 'fixed',
          bottom: '2%',
          left: '8%'
        }}
        zDepth={0}
      >
      </FloatingActionButton>;
    }

    return <div
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0
      }}
    >
      <Scene
        onLoaded={(event) => (console.log(event))}
        vr-mode-ui={{ enabled: 'true' }}
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
      <FloatingActionButton
        onTouchTap={this.handleButton}
        style={{
          zIndex: 999,
          position: 'fixed',
          bottom: '2%',
          left: '2%'
        }}
        zDepth={0}
      >
        <NavBack />
      </FloatingActionButton>
      {favoriteButton}
    </div>;
  }
});

export default ImageDisplay;
