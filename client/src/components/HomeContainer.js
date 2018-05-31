import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Home from './Home';
import Auth from '../modules/Auth';

export default class HomeContainer extends Component {
  state = { snapshots: [], loaded: false, index: null };

  componentDidMount() {
    this.getUserSnapshots();
  }

  getUserSnapshots = () => {
    fetch('/home', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log('RESPONSE', res);
        this.setState({ snapshots: res.snapshots, index1: 0, index2: 0, loaded: true });
      })
      .catch(errors => console.log(errors));
  };

  sendImageToController = formPayLoad => {
    console.log('Payload', formPayLoad);
    fetch('/snapshots', {
      method: 'POST',
      body: formPayLoad,
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(() => this.getUserSnapshots())
      .catch(err => console.log(err));
  };

  toggleClass = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  readFile = (event, file, stats) => {
    console.log('STATS', stats);
    event.preventDefault();
    if (file) {
      const formPayLoad = new FormData();
      formPayLoad.append('uploaded_image', file);
      formPayLoad.append('stats', JSON.stringify(stats));
      this.sendImageToController(formPayLoad);
    }
  };

  logPicture = event => {
    console.log(event.target.dataset.date);
    console.log(event.target.dataset.waist);
    // debugger;
    // console.log(event.target.data('key').key);
    console.log();
    // console.log(event.target.firstChild)
  };

  myHandler1 = (index) => {
    const currentIndex = index;
    if (this.state.loaded){
      this.setState({index1: currentIndex})
      console.log(this.state)
    }
  }

  myHandler2 = (index) => {
    const currentIndex = index;
    if (this.state.loaded){
      this.setState({index2: currentIndex})
      console.log(this.state)
    }
  }

  logId = (e) => {
    console.log(this.state.snapshots[e])
    const details = this.state.snapshots[e];
    if (details) {
      return (
        <div>
          <p>{details.waist_size}</p>
          <p>{details.chest_size}</p>
        </div>
      )
    }
    // return (
    //   <div>
    //     <p>{details.waist_size}</p>
    //     <p>{details.chest_size}</p>
    //   </div>
    // )
  }

  // renderImages = () =>
  //   this.state.snapshots.map(snap => (
  //     <div data-date={snap.created_at} data-waist={snap.waist_size} role='presentation' onClick={(event)=> this.logPicture(event)} key={snap.id} id={snap.id}>
  //       <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
  //       <p className={this.state.active ? null : 'legend'}>{snap.created_at.match('[^T]*')}</p>
  //     </div>
  //   ));

  renderImages = () =>
     (
      <div>
        <Carousel id='carousel2' selectedItem={this.state.index1} showThumbs={false} onChange={this.myHandler1} infiniteLoop>
          {this.state.snapshots.map(snap => (
            <div
              data-date={snap.created_at}
              data-waist={snap.waist_size}
              role="presentation"
              onClick={event => this.logPicture(event)}
              key={snap.id}
              id={snap.id}>
              <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
              <p className={this.state.active ? null : 'legend'}>
                {snap.created_at.match('[^T]*')}
              </p>
            </div>
          ))}
        </Carousel>
        <Carousel id='carousel2' selectedItem={this.state.index2} showThumbs={false} onChange={this.myHandler2} infiniteLoop>
          {this.state.snapshots.map(snap => (
            <div
              data-date={snap.created_at}
              data-waist={snap.waist_size}
              role="presentation"
              onClick={event => this.logPicture(event)}
              key={snap.id}
              id={snap.id}>
              <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
              <p className={this.state.active ? null : 'legend'}>
                {snap.created_at.match('[^T]*')}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    )

  // renderImages = () => {
  //   const snapShots = this.state.snapshots.map(snap => {
  //     <div
  //       data-date={snap.created_at}
  //       data-waist={snap.waist_size}
  //       role="presentation"
  //       onClick={event => this.logPicture(event)}
  //       key={snap.id}
  //       id={snap.id}>
  //       <img alt="snapshot" src={snap.picture.url} max-width="20%" height="500px" />
  //       <p className={this.state.active ? null : 'legend'}>{snap.created_at.match('[^T]*')}</p>
  //     </div>
  //
  //   }
  //   );
  //   return (
  //     <div>
  //     <Carousel
  //       onChange={() => {
  //         console.log('dude');
  //       }}
  //       dynamicHeight
  //       showThumbs={false}
  //       selectedItem={1}
  //       infiniteLoop>
  //       {snapShots}
  //     </Carousel>
  //     <p>I Rule</p>
  //   </div>
  //   );
  // };

  renderImageData = () =>
    this.state.snapshots.map(snap => (
      <table key={snap.id}>
        <tr>
          <th>Neck Size</th>
          <th>Chest Size</th>
          <th>Waist Size</th>
        </tr>
        <tr>
          <td>{snap.neck_size}</td>
          <td>{snap.created_at}</td>
          <td>{snap.waist_size}</td>
        </tr>
      </table>
    ));
  render() {
    const { loaded, snapshots, index1, index2 } = this.state
    const currentSlide1 = loaded ? snapshots[index1].picture.url : '';
    const currentSlide2 = loaded ? snapshots[index2].picture.url : '';

    return (
      <div>
        <Home
          logId={this.logId}
          loaded={this.state.loaded}
          renderImages={this.renderImages}
          renderImageData={this.renderImageData}
          readFile={this.readFile}
          currentSlide={this.myhander}
        />
        <div>
          <h3>{currentSlide1}</h3>
          <h3>{currentSlide2}</h3>
        </div>
      </div>
    );
  }
}
