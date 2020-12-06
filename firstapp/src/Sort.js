import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post1.md';
import post2 from './blog-post2.md';
import post3 from './blog-post3.md';
import axios from 'axios';
import { XGrid, RowsProp, ColDef } from '@material-ui/x-grid';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const postItems = [{'book':'featured', 'curDate':'Nov 12','val':'test', 'imgTxt':'Image text'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'},
{'book':'featured1', 'curDate':'Nov 14','val':'test1', 'imgTxt':'Image text1'}];

var featuredPosts = postItems.map(function(e) {
  return{
    title: e.book,
    date: e.curDate,
    description: e.val,
    image: 'https://source.unsplash.com/random',
    imageText: e.imgTxt
  }
});

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();
  const [newSearch, setNewSearch] = React.useState(false);

  const [sortBooks, setSortBooks] = React.useState([]);

  useEffect(() => {
    axios.post('/sort')
    .then(res => {
      console.log(res);
      console.log(res.data);
      setSortBooks(res.data);
    });
  }, []);

  var rows = sortBooks.map(function(e, index) {
    return {
      id: index,
      col1: e.asin[0],
      col2: e.asin[1],
      col3: e.asin[2]
    }
  });

  const [mainFPtitle, setMainFPtitle] = React.useState('Some Book');
  const [mainFPdescription, setMainFPdescription] = React.useState('More descriptions');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header 
         title="13th Bookstore" 
         setNewSearch={setNewSearch} 
         newSearch={newSearch} 
         setMainFPtitle={setMainFPtitle} 
         setMainFPdescription={setMainFPdescription} />
        <main>
          <div style={{ height: 700, width: '100%' }}>
            <XGrid 
              columns={[
                {field: 'col1', headerName: 'Book ID', flex: 1},
                {field: 'col2', headerName: 'Review count', flex: 0.5, resizable: false},
                {field: 'col3', headerName: 'Genre', flex: 0.5, resizable: false},  
              ]} 
              rows={rows}
              onRowSelection={console.log(rows)}
            />
          </div>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="See what other people are reading now" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}
