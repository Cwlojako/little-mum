var mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/MyOwn')

var Schema = mongoose.Schema

var topicSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  }
})

module.exports = mongoose.model('Topic', topicSchema)
