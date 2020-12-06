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
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import axios from 'axios';
import { XGrid, RowsProp, ColDef } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

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
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const rows = [
    {id: 1, col1: 'Some Book',  col2: 'Some Author', col3: 'Some Genre'},
    {id: 2, col1: 'Some Book',  col2: 'Some Author', col3: 'Some Genre'},
    {id: 3, col1: 'Some Book',  col2: 'Some Author', col3: 'Genre'},
    {id: 4, col1: 'Some Book',  col2: 'Some Author', col3: 'Genre'},
    {id: 5, col1: 'Some Book',  col2: 'Some Author', col3: 'Some Genre'},
];

export default function Blog() {
  const classes = useStyles();

  const [mainFPtitle, setMainFPtitle] = React.useState('Some Book');
  const [mainFPdescription, setMainFPdescription] = React.useState('More descriptions');
  const [newSearch, setNewSearch] = React.useState(false);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 1000,
    maxColumns: 6,
  });

  const handleClickSort =() => {
    axios.post('/sort')
    .then(res => {
      console.log(res);
      console.log(res.data);
      });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header 
         title="Amazon Bookstore" 
         setNewSearch={setNewSearch} 
         newSearch={newSearch} 
         setMainFPtitle={setMainFPtitle} 
         setMainFPdescription={setMainFPdescription} />
        <main>
          <div style={{ height: 700, width: '100%' }}>
            <XGrid 
              columns={[
                {field: 'col1', headerName: 'Book Title', flex: 1},
                {field: 'col2', headerName: 'Author', flex: 0.5, resizable: false},
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
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}
