import ArrowIcon from './ArrowIcon';
import React from 'react';
import SearchIcon from './SearchIcon';
import StarIcon from './StarIcon';

const ListDisplay = React.createClass({
  getInitialState() {
    return {
      buttonHover: 0,
      hover: false
    };
  },

  handleToggle() {
    if (!document.cookie) {
      return this.props.openToast('Log in to use favorites!');
    }

    if (this.props.favorites.length === 0) {
      this.props.getFavorites();
    }
    this.props.toggleFavorites();
  },

  handleEnter() {
    this.setState({ hover: true });
  },

  handleLeave() {
    this.setState({ hover: false });
  },

  handleButtonEnter(event) {
    this.setState({ buttonHover: event.currentTarget.getAttribute('value') });
  },

  handleButtonLeave() {
    this.setState({ buttonHover: 0 });
  },

  handleArrowClick(image) {
    this.props.onInfoClick(image);
  },

  render() {
    const listDisplay = this.props.displayFavorites && document.cookie
    ? <div className="headcontainer">
      <span className="headlabel">Favorites</span>
      <span
        className="headbutton"
        onClick={this.handleToggle}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <SearchIcon
          fill={this.state.hover ? '#fd00ff' : '#3acaec'}
          stroke={this.state.hover ? '#fd00ff' : '#3acaec'}
        />
      </span>
    </div>
    : <div className="headcontainer">
      <span className="headlabel">Results</span>
      <span
        className="headbutton"
        onClick={this.handleToggle}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <StarIcon
          fill={this.state.hover ? '#fd00ff' : '#3acaec'}
          stroke={this.state.hover ? '#fd00ff' : '#3acaec'}
        />
      </span>
    </div>;

    return <div className="listparent">
      {listDisplay}
      <div className="listcontainer">
        {this.props.resultsList.map((image, index) => {
          return <div className="headcard" key={index}>
            <span className="headcardtitle">{image.title}</span>
            <div
              className="headcardbutton"
              onClick={() => (this.handleArrowClick(image))}
              onMouseEnter={this.handleButtonEnter}
              onMouseLeave={this.handleButtonLeave}
              value={image.id}
            >
              <ArrowIcon
                stroke={
                  this.state.buttonHover === image.id
                  ? '#fd00ff'
                  : 'none'}
              />
            </div>
          </div>;
        })}
      </div>
    </div>;
  }
});

export default ListDisplay;
