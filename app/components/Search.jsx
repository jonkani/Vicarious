import React from 'react';
import SearchMap from './SearchMap';

const Search = React.createClass({
  render() {
    return <div>
      <SearchMap
        imageSearch={this.props.imageSearch}
        searchLocation={this.props.searchLocation}
      />
    </div>;
  }
});

export default Search;
