import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';
import { PageHeader } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddPictureForm from './AddPictureForm';

export default class Home extends Component {
  render() {
    const { loaded } = this.props;
    console.log(loaded);
    console.log(this.props.renderImages);
    // console.log(this.props.renderImageData());

    return (
      <div className="container" style={{ padding: '20px' }}>
        <PageHeader>Snapshots</PageHeader>
        {loaded ? (
          <Grid container spacing={8}>
            <Grid item sm={6} xs={12}>
              <Paper sm={6} xs={12}>
                <Carousel dynamicHeight showThumbs={false} infiniteLoop>
                  {this.props.renderImages()}
                </Carousel>
                {/* <div>{this.renderImageData()}</div> */}
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Carousel dynamicHeight showThumbs={false} selectedItem={1} infiniteLoop>
                {this.props.renderImages()}
              </Carousel>
            </Grid>
            <AddPictureForm readFile={this.props.readFile} />
          </Grid>
        ) : (
          <p>...Loading</p>
        )}
      </div>
    );
  }
}

/* <div>
  <AddPictureForm readFile={this.readFile} />
  {loaded ? this.renderImages() : <p>...Loading</p>}
</div> */

// <div style={{padding: '50px'}}>
//   <AddPictureForm readFile={this.readFile} />
//   <Grid container spacing={8}>
//     <Grid item sm={6} xs={12}>
//       <Paper sm={6} xs={12}>
//       <Carousel dynamicHeight showThumbs={false}>
//         {snapshots}
//       </Carousel>
//     </Paper>
//     </Grid>
//     <Grid item sm={6} xs={12}>
//       <Carousel dynamicHeight showThumbs={false} selectedItem={1} >
//         {snapshots}
//       </Carousel>
//     </Grid>
//   </Grid>
// </div>
