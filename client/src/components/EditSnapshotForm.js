import React, { Component } from 'react';
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

export default class EditSnapshotForm extends Component {
  state = {
    chest_size: this.props.snapshots[this.props.index].chestSize,
    waist_size: this.props.waist_size,
    neck_size: this.props.waist_size,
    hip_size: this.props.waist_size,
    weight: this.props.snapshots[this.props.index].weight
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  resetFrom = event => {
    event.target.reset();
    this.setState({
      selectedFile: null,
      stats: { chest_size: '', waist_size: '', neck_size: '', hip_size: '', weight: '' }
    });
  };

  render() {
    const { snapshots, index, sendUpdatedSnapshotData } = this.props;
    console.log('ID', snapshots[index].id);
    return (
      <form onSubmit={(event)=>sendUpdatedSnapshotData(event, this.state, snapshots[index].id)}>
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
                <Input name="weight" autoComplete="off" fullWidth value={this.state.weight} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Neck</TableCell>
              <TableCell>{snapshots[index].neck_size || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Chest</TableCell>
              <TableCell>{snapshots[index].chest_size || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Waist</TableCell>
              <TableCell>{snapshots[index].waist_size || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hip</TableCell>
              <TableCell>{snapshots[index].hip_size || 0}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell onClick={() => this.props.deleteImage(snapshots[index].id)}>
                Delete snapshot
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell onClick={() => this.props.editImage(snapshots[index].id)}>
                Edit snapshot
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
        <input type='submit'/>
      </form>
    );
  }
}
