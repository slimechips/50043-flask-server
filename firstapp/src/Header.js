import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  textField: {
    position: 'relative',
    marginBottom: theme.spacing(2),
  },
  myButton: {
    textTransform: 'None',
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { title } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <TextField 
          className={classes.textField}
          label="Search for a book"
          noWrap
          InputProps={{
            endAdornment:(
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />   
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
          <Button className={classes.myButton} onClick={handleClickOpen}>Add a book review</Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add a book review</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add a book review to this website, please enter the book's author, title and a brief description.
              </DialogContentText>
              <TextField
                margin="dense"
                id="name"
                label="Book Title"
                fullWidth
              />
              <TextField
                margin="dense"
                id="name"
                label="Author Name"
                fullWidth
              />
              <TextField
                margin="dense"
                id="name"
                label="Description"
                fullWidth
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <Button className={classes.myButton}>Trending</Button>
          <Button className={classes.myButton}>About</Button>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
