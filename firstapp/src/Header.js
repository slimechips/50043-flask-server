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
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';

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
  const title = props.title;
  const [open, setOpen] = React.useState(false);
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [bookTitle, setBookTitle] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const review = {bookTitle, author, description, rating};
  const [search, setSearch] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBookTitle('');
    setAuthor('');
    setDescription('');
    setRating(0); 
  };

  const handleBookChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDescriptionCHange = (event) => {
    setDescription(event.target.value);
  };

  const handleAdd = () => {
    handleClose();
    console.log(bookTitle, author, rating, description);
    axios.post('/review', review)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearch = () => {
    axios.post('/search', {search})
    .then(res => {
      console.log(res);
      console.log(res.data);
      props.setMainFPtitle(res.data[0].bookTitle);
      props.setMainFPdescription(res.data[0].description);
    });
    setSearch('');
    props.setNewSearch(!props.newSearch);
  }

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
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment:(
              <InputAdornment>
                <IconButton onClick={handleSearch}>
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
                id="bookTitle"
                label="Book Title"
                type='text'
                fullWidth
                value={bookTitle}
                onChange={handleBookChange}
              />
              <TextField
                margin="dense"
                id="authorName"
                label="Author Name"
                type='text'
                fullWidth
                value={author}
                onChange={handleAuthorChange}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type='text'
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionCHange}
              />
              <Typography component="legend">Rating</Typography>
               <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newRating) => {
                    setRating(newRating);
                  }}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAdd} color="primary">
                Add
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
