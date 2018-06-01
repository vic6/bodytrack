import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { Carousel } from 'react-responsive-carousel';
import { PageHeader } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddPictureForm from './AddPictureForm';

export default class Home extends Component {
  state = { secondSnapStats: null };

  getImage = event => {
    console.log(event.target);
    console.log('DATA', event.target.dataset);
    // const el = document.getElementById('icecream')
    // console.log(el.dataset.name);
  };

  render() {
    const { loaded } = this.props;

    return (
      <div className="container">
        <PageHeader>Snapshots</PageHeader>
        {loaded ? (
          <div>
            {this.props.renderImages()}
            <p>{this.props.slide1}</p>
            <p>{this.props.slide2}</p>
            
            <AddPictureForm readFile={this.props.readFile} />
          </div>
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
