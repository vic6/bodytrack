import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'hidden'
  },
  table: {
    minWidth: 70
  }
});

class SnapshotData extends Component {
  render() {
    const { snapshots, index, classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Measurement{snapshots[index].id}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  Result(inches)
                  <div>
                    <IconButton aria-label="More">
                      <MoreVertIcon style={{ display: 'flex', justifyContent: 'flex-end' }} />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
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
            <TableRow>
              <TableCell onClick={() => this.props.toggleEditSnapshot(snapshots[index].id)}>
                Edit snapshot
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(SnapshotData);
