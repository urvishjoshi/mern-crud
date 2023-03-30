const mongoose = require('mongoose');

function DbConnectionUtility(connectionString) {
  async function connectingToDB() {
    try {
      await mongoose.connect(connectionString, {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
      console.log('Connected to DB');
    } catch (err) {
      console.log('Error connecting to the database');
      console.log(err.message);
    }
  }

  return {
    connect: connectingToDB
  };
}

module.exports = DbConnectionUtility;
