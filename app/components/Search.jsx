import React from 'react';
import SearchMap from './SearchMap';

const Search = React.createClass({
  render() {
    return <div className="searchscreen">
      <div className="logo"><span>V</span>ica<span>R</span>ious</div>
      <SearchMap
        displayFavorites={this.props.displayFavorites}
        favorites={this.props.favorites}
        getFavorites={this.props.getFavorites}
        imageList={this.props.imageList}
        imageSearch={this.props.imageSearch}
        searchLocation={this.props.searchLocation}
        setCenter={this.props.setCenter}
        setDisplay={this.props.setDisplay}
        toggleFavorites={this.props.toggleFavorites}
      />
    </div>;
  }
});

export default Search;
