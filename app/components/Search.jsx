import React from 'react';
import SearchMap from './SearchMap';

const Search = React.createClass({
  render() {
    return <div>
      <div className="mapcontainer">
        <SearchMap
          imageList={this.props.imageList}
          imageSearch={this.props.imageSearch}
          searchLocation={this.props.searchLocation}
        />
      </div>
    </div>;
  }
});

export default Search;
