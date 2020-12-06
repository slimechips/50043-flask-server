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
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { requirePropFactory } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
//   {
//     title: 'Yes Hi this is a post',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
//   {
//     title: 'Yes Hi this is another post',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
// ];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'Team 13 Members',
  description:
    'Jason Chow, Tang Qinrui, Li Yiwen, Zeng Zimou, Shawn Chua',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Blog() {
  const classes = useStyles();
  // Added by me
  // const [currentTime, setCurrentTime] = useState(0);
  // useEffect(() => {
  //   axios.get('/time').then(res => {
  //     setCurrentTime(res.data.time);
  //   })
  // }, []);
  // End

  const [mainFPtitle, setMainFPtitle] = React.useState('Welcome to 13th Bookstore, one of many in SUTD but we are definitely the best.');
  const [mainFPdescription, setMainFPdescription] = React.useState('Follow us on Twitter for our latest promotions!');
  const [newSearch, setNewSearch] = React.useState(false);


  // useEffect(() => {
  //   axios.get('/book').then(res => {
  //     console.log(res);
  //     console.log(res.data);
  //     setMainFPtitle(res.data.bookTitle);
  //     setMainFPdescription(res.data.bookDescription);
  //   })
  // }, [newSearch]);

  const mainFeaturedPost = {
    title: mainFPtitle,
    description:
      mainFPdescription,
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
  };

const [postItems, setPostItems] = useState([]);

var featuredPosts = postItems.map(function(e) {
  return{
    title: e.bookTitle,
    category: e.categories,
    brands: e.brand,
    image: e.imgUrl,
    bookID: e.asin,
    authors: e.author,
    prices: e.price
  }
});


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header 
         title="13th Bookstore"
         setPostItems={setPostItems}
         setNewSearch={setNewSearch} 
         newSearch={newSearch} 
         setMainFPtitle={setMainFPtitle} 
         setMainFPdescription={setMainFPdescription} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <img src={require('./Analytics2.jpg')}/>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Short user guide" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="50.0043 Group 13" description="Database Project" />
    </React.Fragment>
  );
}
