import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'

export default function ReviewDialog(props) {
  var userReviews = props.reviews.map(function(e) {
    return{
      id: e.asin,
      rating: e.overall,
      text: e.reviewText,
      time: e.reviewTime,
      userID: e.reviewerID,
      username: e.reviewerName,
      sum: e.summary,
      unixTime: e.unixReviewTime
    }
  });
  console.log(userReviews)

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
<<<<<<< HEAD
        <DialogTitle id="form-dialog-title">Reviews</DialogTitle>
=======
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
>>>>>>> 603c54b1ab7c1d7e4d0d013e81986007b9d5a69a
        <DialogContent>
          <DialogContentText>
            These are the reviews about the book:
          </DialogContentText>
<<<<<<< HEAD
          {userReviews.map((r)=>(
            <Paper elevation={3} padding={5}>
              <Typography>
                <div>Book ID: {r.id}</div>
                <div>User:{r.username}</div>
                <div>User ID: {r.userID}</div>
                <div>Summary: {r.sum}</div>
                <div>Text: {r.text}</div>
                <div>Time: {r.time}</div>
                <div>Unix Time: {r.unixTime}</div>
              </Typography>
            </Paper>
          ))}
=======
          <Typography>
            Title: {props.bookTitle}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
>>>>>>> 603c54b1ab7c1d7e4d0d013e81986007b9d5a69a
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}