import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class SnapshotData extends Component {
  render() {
    const { snapshots, index } = this.props;
    return (
      <Table>
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
            <TableCell>{snapshots[index].weight || 0}</TableCell>
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
        </TableBody>
      </Table>
    );
  }
}
