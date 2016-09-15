import React from 'react';
import SearchMap from './SearchMap';

const Search = React.createClass({
  render() {
    return <div className="midmonitor">
      <div className="monitor">
        <div className="gradient">
          <div className="logo"><span>V</span>ica<span>R</span>ious</div>
          <SearchMap
            imageList={this.props.imageList}
            imageSearch={this.props.imageSearch}
            searchLocation={this.props.searchLocation}
            setCenter={this.props.setCenter}
            setDisplay={this.props.setDisplay}
          />
        </div>
      </div>
    </div>;
  }
});

export default Search;
