import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

export default class EditPictureForm extends Component {


  resetFrom = event => {
    event.target.reset();
    this.setState({
      selectedFile: null,
      stats: { chest_size: '', waist_size: '', neck_size: '', hip_size: '', weight: '' }
    });
  };

  render() {
    const { snapshots, index2, classes } = this.props;
    return (
      <Grid item sm={6} xs={12}>
        <Paper sm={6} xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Measurement{snapshots[index2].id}</TableCell>
                <TableCell>Result(inches)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Date
                </TableCell>
                <TableCell>{new Date(snapshots[index2].created_at).toDateString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Weight</TableCell>
                <TableCell>
                  <Input value={this.props.weight} onChange={this.props.handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Neck</TableCell>
                <TableCell>
                  <Input value={this.props.neck_size} onChange={this.props.handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Chest</TableCell>
                <TableCell>
                  <Input value={this.props.chest_size} onChange={this.props.handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Waist</TableCell>
                <TableCell>
                  <Input value={this.props.waist_size} onChange={this.props.handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hip</TableCell>
                <TableCell>
                  <Input value={this.props.hip_size} onChange={this.props.handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell onClick={() => this.deleteImage(snapshots[index2].id)}>
                  Delete snapshot
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell>Edit snapshot</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
}
