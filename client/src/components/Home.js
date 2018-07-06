import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { PageHeader } from 'react-bootstrap';
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
