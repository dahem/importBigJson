const { Task } = require('./models');
// console.log(models);
Task.findAll().then(x => console.log(x));
