const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TagsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  classId: {
    type: String,
    required: false
  },
  state: {
    type: Number,
    required: false,
    default: 1
  }, // 1 开启 0 不开启
  // 发布日期
  createDate: {
    type: Date,
    default: Date.now
  },
  // 最后修改日期
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});
TagsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('tags', TagsSchema, 'tags');
