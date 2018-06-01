import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { PageHeader } from 'react-bootstrap';
// import { Carousel } from 'react-responsive-carousel';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import AddPictureForm from './AddPictureForm';

export default class Home extends Component {

  render() {
    const { loaded, renderImages, readFile } = this.props;

    return (
      <div className="container">
        <PageHeader>Snapshots</PageHeader>
        {loaded ? (
          <div>
            {renderImages()}
            <AddPictureForm readFile={readFile} />
          </div>
        ) : (
          <p>...Loading</p>
        )}
      </div>
    );
  }
}
