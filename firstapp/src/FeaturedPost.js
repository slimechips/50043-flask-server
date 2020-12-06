import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import ReviewDialog from './ReviewDialog'
import axios from 'axios';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;
  const [open, setOpen] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const title = post.title;
  const id = post.bookID;
  console.log(title);

  const handleClickOpen = () => {
    setOpen(true);
    axios.post('/review_search', {id})
    .then(res => {
      console.log(res);
      console.log(res.data);
      setReviews(res.data);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#" onClick={handleClickOpen}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                Title: {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Author: {post.authors}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Category: {post.category}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Brand: {post.brands}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                ID: {post.bookID}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Price: {post.prices}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} />
          </Hidden>
        </Card>
      </CardActionArea>
      <ReviewDialog
        bookTitle={post.title}
        handleClose={handleClose}
        open={open}
        reviews={reviews}/>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
