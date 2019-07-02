var path = require('path')
var express = require('express')
var router = require('./router')
var session = require('express-session')
var bodyParser = require('body-parser')

//创建服务器，等同于http.createServer()
var app = express()
//模板引擎
app.engine('html',require('express-art-template'))
//公开指定目录
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

//借用第三方包来获取以post方式提交的表单数据，必须放在路由器挂载前
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

app.use(session({
  // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
  // 目的是为了增加安全性，防止客户端恶意伪造
  secret: 'itcast',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

//把路由容器挂载到app上
app.use(router)

app.listen(3000,function(){
	console.log('running...')
})