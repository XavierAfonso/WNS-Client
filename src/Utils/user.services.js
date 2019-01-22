const axios = require('axios');

// Header
function getHeader(){

    const token = window.localStorage.getItem('token');

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token, 
    }

    return {headers};
}

function postLogin(username,password){
    return axios.post('/users/signin',{username,password})
    //return axios.get(`/notifications/${username}`, getHeader());
}

function postRegister(firstname,lastname,realUsername,username, password){
    return axios.post('/users/signup',{firstname,lastname,realUsername,username, password});
    //return axios.get(`/notifications/${username}`, getHeader());
}


// Get Notifications
function getNotifications(username){

    return axios.get(`/notifications/${username}`, getHeader());
}

// Get Notifications
function getMe(){
    return axios.get(`/users/me`, getHeader());
}

 // Get the followers
 function getFollowers(id){

    return axios.get(`/users/${id}/followers`, getHeader());
}

 // Post follow
 function postFollow(followerId){

    return axios.post(`/users/follow?to=${followerId}`, {}, getHeader());
}

 // Post Unfollow
 function postUnFollow(followerId){

    return axios.post(`/users/unfollow?to=${followerId}`, {}, getHeader());
}

 // like
 function likeAbook(idBook){

    return axios.post(`/books/like/${idBook}`, {}, getHeader());
}

function unLikeAbook(idBook){

    return axios.post(`/books/unlike/${idBook}`, {}, getHeader());
}

 // Get the followings (Don't exist yet)
 function getFollowings(id){

    return axios.get(`/users/${id}/followings`, getHeader());
}

// Get All likes books
function getBooksLiked(username){
    return axios.get(`/users/likes?id_user=${username}`, getHeader());
}

// Get the wall
function getWall(id){
    return axios.get(`/users/wall/${id}`, getHeader());
}

// Get specific user
function getUser(id){
    return axios.get(`/users/${id}`, getHeader());
}

// Get users
function getUsers(){
    return axios.get(`/users/`, getHeader());
}

// Get Books
function getBooksUser(id){

    return axios.get(`/books/?id_user=${id}`,getHeader());
}

// Delete a book
function deleteBooksUser(id){
  
    return axios.delete(`/books?id_book=${id}`,getHeader());
}

function searchBook(book_title,book_post_description,book_content,book_tags){
    

    return axios.post(`/books/search`, 
    { 
    "book_post_description" : book_post_description,
    "book_title" : book_title,
    "book_content": book_content,
    "book_tags" : book_tags
    }, getHeader());
}

export const userService = {
    getFollowers,
    getFollowings,
    getWall,
    getUser,
    getBooksUser,
    deleteBooksUser,
    postFollow,
    postUnFollow,
    searchBook,
    likeAbook,
    getBooksLiked,
    getNotifications,
    unLikeAbook,
    getMe,
    postLogin,
    postRegister,
    getUsers
};
