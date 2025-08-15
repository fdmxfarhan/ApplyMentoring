var mongoose = require('mongoose');

var StudyPostSchema = new mongoose.Schema({
  countryName: String,
  countryID: String,
  content: String,
});

var StudyPost = mongoose.model('StudyPost', StudyPostSchema);

module.exports = StudyPost;


