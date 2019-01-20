const {userService} = require('../src/Utils/user.services');
// const { expect } = require('chai');

// Dont work....
describe('Client', () => {
  it('Check if login work', () => {

    userService.postLogin("admin@gmail.com","admin").then((val) => {

      console.log(val);

    }).catch(err => console.log(err))
  });
});
