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
import { Link } from 'react-router-dom'

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
  const [openBook, setOpenBook] = React.useState(false);

  const [reviewerName, setReviewerName] = React.useState('');
  const [reviewerID, setReviewerID] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [reviewText, setReviewText] = React.useState('');
  const [asin, setAsin] = React.useState('');
  const [overall, setOverall] = React.useState(0);
  const [bookTitle, setBookTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const review = {asin, reviewerName, reviewerID, summary, reviewText, overall};
  const books = {asin, bookTitle, author, price, category, brand};

  const [search, setSearch] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenBook = () => {
    setOpenBook(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenBook(false);
    setAsin('');
    setReviewerName('');
    setReviewerID('');
    setSummary('');
    setReviewText('');
    setOverall(0); 
    setBookTitle('');
    setPrice('');
    setCategory('');
    setBrand('');
    setAuthor('');
  };

  const handleAsinChange = (event) => {
    setAsin(event.target.value);
  };

  const handleReviewerNameChange = (event) => {
    setReviewerName(event.target.value);
  };

  const handleReviewerIDChange = (event) => {
    setReviewerID(event.target.value);
  };

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleBookTitleChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleAdd = () => {
    handleClose();
    console.log(asin, reviewerName, reviewerID, summary, reviewText, overall);
    axios.post('http://localhost:5000/review', review)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  const handleAddBook = () => {
    handleClose();
    console.log(asin, bookTitle, author, price, category, brand);
    axios.post('http://localhost:5000/books', books)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleSearch = () => {
    axios.post('http://localhost:5000/search', {search})
    .then(res => {
      console.log(res);
      console.log(res.data);
      props.setPostItems(res.data);
    });
    setSearch('');
    props.setNewSearch(!props.newSearch);
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h5"
          color='inherit'
          className={classes.toolbarTitle}>
            <Link to='/Home' color="inherit" >
              {title}
            </Link>          
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
                <Link to='/Home'>
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </Link>
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
                id="asin"
                label="Book ID"
                type='text'
                fullWidth
                value={asin}
                onChange={handleAsinChange}
              />
              <TextField
                margin="dense"
                id="reviewerName"
                label="Your Name"
                type='text'
                fullWidth
                value={reviewerName}
                onChange={handleReviewerNameChange}
              />
              <TextField
                margin="dense"
                id="reviewerID"
                label="Your ID"
                type='text'
                fullWidth
                value={reviewerID}
                onChange={handleReviewerIDChange}
              />
              <TextField
                margin="dense"
                id="summary"
                label="Brief summary of your review"
                type='text'
                fullWidth
                value={summary}
                onChange={handleSummaryChange}
              />
              <TextField
                margin="dense"
                id="reviewText"
                label="Description"
                type='text'
                fullWidth
                multiline
                rows={4}
                value={reviewText}
                onChange={handleReviewTextChange}
              />
              <Typography component="legend">Rating</Typography>
               <Rating
                  name="simple-controlled"
                  value={overall}
                  onChange={(event, newOverall) => {
                    setOverall(newOverall);
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
          <Button className={classes.myButton} onClick={handleClickOpenBook}>Add a new book</Button>
          <Dialog open={openBook} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-addbk-dialog-title">Add a Book</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To add a book to this website, please enter the book's author, title and a brief description.
              </DialogContentText>
              <TextField
                margin="dense"
                id="asin"
                label="Book ID"
                type='text'
                fullWidth
                value={asin}
                onChange={handleAsinChange}
              />
              <TextField
                margin="dense"
                id="bookTitle"
                label="Book Title"
                type='text'
                fullWidth
                value={bookTitle}
                onChange={handleBookTitleChange}
              />
              <TextField
                margin="dense"
                id="author"
                label="Author"
                type='text'
                fullWidth
                value={author}
                onChange={handleAuthorChange}
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type='text'
                fullWidth
                value={price}
                onChange={handlePriceChange}
              />
              <TextField
                margin="dense"
                id="category"
                label="Category"
                type='text'
                fullWidth
                value={category}
                onChange={handleCategoryChange}
              />
              <TextField
                margin="dense"
                id="brand"
                label="Brand"
                type='text'
                fullWidth
                value={brand}
                onChange={handleBrandChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddBook} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Link to='/Sort'>
            <Button className={classes.myButton}>Book Catalog</Button>
          </Link>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};