import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'hidden'
  },
  table: {
    minWidth: 700
  }
});

class EditSnapshotForm extends Component {
  state = {
    chest_size: this.props.snapshots[this.props.index].chest_size,
    waist_size: this.props.snapshots[this.props.index].waist_size,
    neck_size: this.props.snapshots[this.props.index].neck_size,
    hip_size: this.props.snapshots[this.props.index].hip_size,
    weight: this.props.snapshots[this.props.index].weight
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  resetForm = event => {
    event.target.reset();
    this.setState({
      selectedFile: null,
      stats: { chest_size: '', waist_size: '', neck_size: '', hip_size: '', weight: '' }
    });
  };

  render() {
    const { classes, snapshots, index, sendUpdatedSnapshotData } = this.props;
    return (
      <form onSubmit={event => sendUpdatedSnapshotData(event, this.state, snapshots[index].id)}>
        <Paper className={classes.root}>
          <Table onChange={this.handleChange}>
            <TableHead>
              <TableRow>
                <TableCell>Measurement{snapshots[index].id}</TableCell>
                <TableCell>Result(inches)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Date
                </TableCell>
                <TableCell>{new Date(snapshots[index].created_at).toDateString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Weight</TableCell>
                <TableCell>
                  <Input
                    name="weight"
                    autoComplete="off"
                    fullWidth
                    value={this.state.weight || 0}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Neck</TableCell>
                <TableCell>
                  <Input
                    name="neck_size"
                    autoComplete="off"
                    fullWidth
                    value={this.state.neck_size}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Chest</TableCell>
                <TableCell>
                  <Input
                    name="chest_size"
                    autoComplete="off"
                    fullWidth
                    value={this.state.chest_size}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Waist</TableCell>
                <TableCell>
                  <Input
                    name="waist_size"
                    autoComplete="off"
                    fullWidth
                    value={this.state.waist_size}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hip</TableCell>
                <TableCell>
                  <Input name="hip_size" autoComplete="off" fullWidth value={this.state.hip_size} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell onClick={() => this.props.deleteImage(snapshots[index].id)}>
                  Delete snapshot
                </TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TableCell onClick={() => this.props.toggleEditSnapshot(snapshots[index].id)}>
                  Edit snapshot
                </TableCell>
                <TableCell />
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <input type="submit" />
      </form>
    );
  }
}

export default withStyles(styles)(EditSnapshotForm);
