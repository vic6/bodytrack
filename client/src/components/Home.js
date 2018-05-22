import React, {Component} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Navbar} from './Navbar';

import AddPictureForm from './AddPictureForm';
import Auth from '../modules/Auth';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {snapshots: [], loaded: false};

        this.getUserSnapshots = this.getUserSnapshots.bind(this);
        this.renderImages = this.renderImages.bind(this);
        this.readFile = this.readFile.bind(this);
        this.sendImageToController = this.sendImageToController.bind(this);
    }

    componentDidMount() {
        this.getUserSnapshots();
    }

    getUserSnapshots() {
        fetch('/home', {
            method: 'GET',
            headers: {
                token: Auth.getToken(),
                Authorization: `Token ${Auth.getToken()}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({snapshots: res.snapshots, loaded: true});
            })
            .catch((errors) => console.log(errors));
    }

    sendImageToController(formPayLoad) {
        fetch('/snapshots', {
            method: 'POST',
            body: formPayLoad,
            headers: {
                token: Auth.getToken(),
                Authorization: `Token ${Auth.getToken()}`,
            },
        })
            .then(() => this.getUserSnapshots())
            .catch((err) => console.log(err));
    }

    readFile(files) {
        if (files && files[0]) {
            const formPayLoad = new FormData();

            formPayLoad.append('uploaded_image', files[0]);
            this.sendImageToController(formPayLoad);
        }
    }

    renderImages() {
        return this.state.snapshots.map((snap) => (
            <div key={snap.id}>
                <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
                <p className="legend">{snap.created_at.match('[^T]*')}</p>
            </div>
        ));
    }

    render() {
        const {loaded} = this.state;

        return (
            <div>
                <Navbar />

                {loaded ? (
                    // <AddPictureForm readFile={this.readFile} />
                    <Grid container={true} spacing={8}>
                        <Grid item={true} sm={6} xs={12}>
                            <Paper sm={6} xs={12}>
                                <Carousel dynamicHeight={true} showThumbs={false}>
                                    {this.renderImages()}
                                </Carousel>
                            </Paper>
                        </Grid>
                        <Grid item={true} sm={6} xs={12}>
                            <Carousel dynamicHeight={true} showThumbs={false} selectedItem={1}>
                                {this.renderImages()}
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
