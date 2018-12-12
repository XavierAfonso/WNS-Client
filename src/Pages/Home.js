import React, { Component } from 'react';

import NabBar from './Navbar';

import AddNewPost from '../Components/AddNewPost';
import Wall from '../Components/Wall';
import Footer from './Footer';

import '../css/home.css';

class Home extends Component {
  render() {
    return (
      <>
      <NabBar />
      <div className="myContainer">
      <div className="row test">
        <div className="col1 col-lg-3">
        {/*Profil-->*/ }
        <div className="row">
          <div className="post1">
          </div>
        </div>

        </div>
        <div className="col2 col-lg-6">
         {/*Wall-->*/ }
        <div className="row">
          <div className="post2">
            <AddNewPost/>
            

            <Wall/>

          </div>
        </div>
        
        </div>
        <div className="col3 col-lg-3">
        {/*Informations-->*/ }
        <div className="row">
          <div className="post3">
          </div>
        </div>
        </div>
      </div>
      </div>
      <Footer/>
      </>
    );
  }
}

export default Home;
