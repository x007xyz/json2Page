'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FormSchema = new Schema({
    name: { type: String },
    fields: [{}],
  });

  return mongoose.model('Form', FormSchema);
};
