import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import EditSnapshotForm from './EditSnapshotForm';
import SnapshotTable from './SnapshotTable';

export default class CarouselTable extends Component {
  render() {
    const { index, editSnapshot, snapshots, id } = this.props;
    return (
      <Grid item lg={4} sm={5} xs={8} style={{ minWidth: '400px' }}>
        <Carousel
          selectedItem={index}
          showThumbs={false}
          // onChange takes index and element
          onChange={cIdx => this.props.handleCarousel(cIdx, id)}
          infiniteLoop
        >
          {snapshots.map(snap => (
            <div key={snap.id} id={snap.id}>
              <img alt="snapshot" src={snap.picture.url} height="500px" />
            </div>
          ))}
        </Carousel>
        {editSnapshot ? (
          <EditSnapshotForm
            snapshots={snapshots}
            index={index}
            toggleEditSnapshot={this.props.toggleEditSnapshot}
            sendUpdatedSnapshotData={this.props.sendUpdatedSnapshotData}
            deleteImage={this.props.deleteImage}
          />
        ) : (
          <SnapshotTable
            snapshots={snapshots}
            index={index}
            toggleEditSnapshot={this.props.toggleEditSnapshot}
            deleteImage={this.props.deleteImage}
          />
        )}
      </Grid>
    );
  }
}
