import React, { Component } from 'react';

import NabBar from './Navbar';

import AddNewPost from './AddNewPost';
import Wall from './Wall';
import Footer from './Footer';

import './css/home.css';

class Home extends Component {
  render() {
    return (
      <>
      <NabBar />
      <div className="myContainer">
      <div class="row test">
        <div class="col1 col-lg-3">
        {/*Profil-->*/ }
        <div class="row">
          <div class="post1">
          </div>
        </div>

        </div>
        <div class="col2 col-lg-6">
         {/*Wall-->*/ }
        <div class="row">
          <div class="post2">
            <AddNewPost/>
            

            <Wall/>

          </div>
        </div>
        
        </div>
        <div class="col3 col-lg-3">
        {/*Informations-->*/ }
        <div class="row">
          <div class="post3">
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
