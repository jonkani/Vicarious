import React from 'react';
import SearchMap from './SearchMap';

const Search = React.createClass({
  render() {
    return <div>
      <SearchMap
        imageList={this.props.imageList}
        imageSearch={this.props.imageSearch}
        searchLocation={this.props.searchLocation}
        setCenter={this.props.setCenter}
        setDisplay={this.props.setDisplay}
      />
    </div>;
  }
});

export default Search;
