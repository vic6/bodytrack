import React, { Component } from 'react';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
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
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 120
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

  imperialHeightForm = () => {};

  metricHeightForm = () => (
    <FormControl className={this.props.classes.formControl} aria-describedby="height-helper-text">
      <Input
        autoComplete="off"
        id="adornment-height"
        name="height"
        value={this.state.height}
        onChange={this.handleChange}
        endAdornment={<InputAdornment position="end">cm</InputAdornment>}
        inputProps={{
          'aria-label': 'Height'
        }}
      />
      <FormHelperText id="height-helper-text">Height</FormHelperText>
    </FormControl>
  );

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container}>
        <FormControl required className={classes.formControl}>
          <InputLabel htmlFor="units-required">Units</InputLabel>
          <Select
            value={this.state.units_of_measurement}
            onChange={this.handleChange}
            name="units_of_measurement"
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Unists of Measurement
            </MenuItem>
            <MenuItem value={'imperial'}>Imperial</MenuItem>
            <MenuItem value={'metric'}>Metric</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        {this.metricHeightForm()}
      </form>
    );
  }
}

export default withStyles(styles)(Profile);
