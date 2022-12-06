module.exports = (app) => {
  const user = require('../service/user.js');
  // User Login
  app.post('/login', user.login);
  // User SignUp
  app.post('/signUp', user.signup);
  
  // Create a new Note
  app.post('/user/create', user.create);

  // Retrieve all Notes
  app.get('/user/get-all-client', user.findAllClient);

  // Retrieve a single Note with noteId
  app.get('/user/:userId', user.findById);

  // Update a Note with noteId
  app.put('/user/:userId', user.update);

  // Delete a Note with noteId
  app.delete('/user/:noteId', user.delete);
}