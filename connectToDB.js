const mongoose = require('mongoose');

module.exports = async function () {
    return mongoose.connect(process.env.MONGOLAB_URI, {}).catch(err => {
        console.log('Error connecting to MongoDB', err);
    });
}
