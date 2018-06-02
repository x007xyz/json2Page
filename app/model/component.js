'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ComponentSchema = new Schema({
    type: { type: String },
    content: { type: String },
    fields: [{
      name: { type: String },
      explain: { type: String, default: '' },
    }],
  });

  return mongoose.model('Component', ComponentSchema);
};
