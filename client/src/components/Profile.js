import React, { Component } from 'react';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Auth from '../modules/Auth';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap'
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200
//   },
//   menu: {
//     width: 200
//   }
// });

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '125px'
  },
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    minWidth: 150,
    maxWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class Profile extends Component {
  state = { units_of_measurement: '', height: '', test: '' };
  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = () => {
    fetch('/profile', {
      method: 'GET',
      headers: {
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(res =>
        this.setState({
          units_of_measurement: res.user.units_of_measurement || '',
          height: res.user.height || ''
        })
      );
  };

  updateUserProfile = () => {
    fetch('/profile', {
      method: 'PUT',
      body: JSON.stringify({
        user: this.state
      }),
      headers: {
        'Content-Type': 'application/json',
        token: Auth.getToken(),
        Authorization: `Token ${Auth.getToken()}`
      }
    }).then(res => console.log(res.json()));
  };

  imperialHeightForm = () => {};

  metricHeightForm = () => {
    const units = this.state.units_of_measurement === 'imperial' ? 'in' : 'cm';
    return (
      <FormControl
        required
        className={this.props.classes.formControl}
        aria-describedby="height-helper-text"
      >
        <Input
          autoComplete="off"
          type="number"
          id="adornment-height"
          name="height"
          value={this.state.height}
          onChange={this.handleChange}
          endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
          inputProps={{
            'aria-label': 'Height'
          }}
        />
        <FormHelperText id="height-helper-text">Height</FormHelperText>
      </FormControl>
    );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes, history } = this.props;
    return (
      <div className="container">
        <h1>Update Settings</h1>
        <form className={classes.root}>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="units-required">Units</InputLabel>
            <Select
              value={this.state.units_of_measurement}
              onChange={this.handleChange}
              name="units_of_measurement"
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Units of Measurement
              </MenuItem>
              <MenuItem value={'imperial'}>Imperial</MenuItem>
              <MenuItem value={'metric'}>Metric</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          {this.metricHeightForm()}
          <div>
            <Button
              onClick={() => history.push('/home')}
              variant="raised"
              className={classes.button}
            >
              Back
            </Button>
            <Button
              onClick={this.updateUserProfile}
              variant="raised"
              color="primary"
              className={classes.button}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
