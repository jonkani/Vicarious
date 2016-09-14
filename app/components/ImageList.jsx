import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

const ImageList = React.createClass({
  render() {
    return <div className="listcontainer">
      {this.props.imageList.map((image) => {
        return <Card key={image.id}>
          <CardHeader title={image.title} />
          <CardActions>
            <RaisedButton label="Go!" />
          </CardActions>
        </Card>;
      })}
    </div>;
  }
});

export default ImageList;
