const { expect } = require('chai');

const axios = require('axios');

const baseServeur = 'http://127.0.0.1:8080';

let token = null;

// Header
function getHeader() {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token,
    }

    return { headers };
}

function postLogin(username, password) {
    return axios.post(`${baseServeur}/users/signin`, { username, password })
    //return axios.get(`/notifications/${username}`, getHeader());
}

function postRegister(firstname, lastname, realUsername, username, password) {
    return axios.post(`${baseServeur}/users/signup`, { firstname, lastname, realUsername, username, password });
    //return axios.get(`/notifications/${username}`, getHeader());
}


// Get Notifications
function getNotifications(username) {

    return axios.get(`${baseServeur}/notifications/${username}`, getHeader());
}

// Get Notifications
function getMe() {
    return axios.get(`${baseServeur}/users/me`, getHeader());
}

// Get the followers
function getFollowers(id) {

    return axios.get(`${baseServeur}/users/${id}/followers`, getHeader());
}

// Post follow
function postFollow(followerId) {

    return axios.post(`${baseServeur}/users/follow?to=${followerId}`, {}, getHeader());
}

// Post Unfollow
function postUnFollow(followerId) {

    return axios.post(`${baseServeur}/users/unfollow?to=${followerId}`, {}, getHeader());
}

// like
function likeAbook(idBook) {

    return axios.post(`${baseServeur}/books/like/${idBook}`, {}, getHeader());
}

function unLikeAbook(idBook) {

    return axios.post(`${baseServeur}/books/unlike/${idBook}`, {}, getHeader());
}

// Get the followings (Don't exist yet)
function getFollowings(id) {

    return axios.get(`${baseServeur}/users/${id}/followings`, getHeader());
}

// Get All likes books
function getBooksLiked(username) {
    return axios.get(`${baseServeur}/users/likes?id_user=${username}`, getHeader());
}

// Get the wall
function getWall(id) {
    return axios.get(`${baseServeur}/users/wall/${id}`, getHeader());
}

// Get specific user
function getUser(id) {
    return axios.get(`${baseServeur}/users/${id}`, getHeader());
}

// Get users
function getUsers() {
    return axios.get(`${baseServeur}/users/`, getHeader());
}

// Get Books
function getBooksUser(id) {

    return axios.get(`${baseServeur}/books/?id_user=${id}`, getHeader());
}

// Delete a book
function deleteBooksUser(id) {

    return axios.delete(`${baseServeur}/books?id_book=${id}`, getHeader());
}

function searchBook(book_title, book_post_description, book_content, book_tags) {


    return axios.post(`${baseServeur}/books/search`,
        {
            "book_post_description": book_post_description,
            "book_title": book_title,
            "book_content": book_content,
            "book_tags": book_tags
        }, getHeader());
}

describe('Client', () => {


    // User 1 
    let emailtest = "testMocha@gmail.com";
    let usernameTest ="testMocha";
    let firstnameTest ="testMocha";
    let lastnameTest ="testMocha";
    let passwordTest="testMocha"

    //User 2
    let emailtest2 = "testMocha2@gmail.com";
    let usernameTest2 ="testMoch2a";
    let firstnameTest2 ="testMocha2";
    let lastnameTest2 ="testMocha2";
    let passwordTest2="testMocha2"

    
    // This test must be run once
    it('Check if register work', (done) => {

        postRegister(firstnameTest,lastnameTest,usernameTest,emailtest, passwordTest).then((val) => {
  
          console.log(val.data);
          done();
  
      }).catch(err => console.log(err))
    });

    // This test must be run once
    it('Check if register work', (done) => {

        postRegister(firstnameTest2,lastnameTest2,usernameTest2,emailtest2, passwordTest2).then((val) => {
  
          console.log(val.data);
          done();
  
      }).catch(err => console.log(err))
    });


    it('Check if login work', (done) => {

        postLogin("admin@gmail.com", "admin").then((val) => {

            token = val.data.token;
            done();

        }).catch(err => console.log(err))
    });


    it('Get me', (done) => {

        getMe().then((val) => {

            console.log(val.data);
            done();

        }).catch(err => console.log(err));

    });

    it('Get list users', (done) => {

        getUsers().then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));

    });

    it('Get notifications user', (done) => {

        getNotifications(emailtest).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    it('Get followers user', (done) => {

        getFollowers(emailtest).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    it('Post followers user', (done) => {

        postFollow(emailtest2).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    it('Post unfollower user', (done) => {

        postUnFollow(emailtest2).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    it('Get followings user', (done) => {

        getFollowings(emailtest).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    it('Get books user', (done) => {

        getBooksUser(emailtest).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    // The user must have one book like
    /*it('Get book liked user', (done) => {

        getBooksLiked(emailtest).then((val) => {
            console.log(val.data);
            done();

        }).catch(err => console.log(err));
    });

    // the user must follow at least one person
    it('Get Wall user', (done) => {

        getWall(emailtest).then((val) => {
            if(val.status !==500){
            console.log(val.data);
            done();
         }

        }).catch(err => 
            console.log(err)
        );
    });*/

});
