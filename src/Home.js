import React, { Component } from 'react';

import NabBar from './Navbar';

import './css/home.css';

class Home extends Component {
  render() {
    return (
      <>
      <NabBar />
      <div className="myContainer">
      <div class="row">
        <div class="col1 col-lg-3">
        Profil
        <div class="row">
          <div class="col-lg-offset-1 col-lg-10 col-lg-offset-1 post">
          </div>
        </div>

        </div>
        <div class="col2 col-lg-6">
        Wall
        <div class="row">
          <div class="col-lg-offset-1 col-lg-10 col-lg-offset-1 post">
          </div>
        </div>
        
        </div>
        <div class="col3 col-lg-3">
        Information
        <div class="row">
          <div class="col-lg-offset-1 col-lg-10 col-lg-offset-1 post">
          </div>
        </div>
        </div>
      </div>
      </div>
      </>
    );
  }
}

export default Home;
