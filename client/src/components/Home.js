import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddPictureForm from './AddPictureForm';
import Auth from '../modules/Auth';

export default class Home extends Component {
  render() {
    const { loaded } = this.props;
    console.log(loaded)
    console.log(this.props.renderImages)
    // console.log(this.props.renderImageData());

    return (
      <div>
        <AddPictureForm readFile={this.props.readFile} />
        {loaded ? (
          <Grid container spacing={8}>
            <Grid item sm={6} xs={12}>
              <Paper sm={6} xs={12}>
                <Carousel dynamicHeight showThumbs={false}>
                  {this.props.renderImages()}
                </Carousel>
                {/* <div>{this.renderImageData()}</div> */}
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Carousel dynamicHeight showThumbs={false} selectedItem={1}>
                {this.props.renderImages()}
              </Carousel>
            </Grid>
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
