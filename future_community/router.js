//导包
var express = require('express')
var fs = require('fs')
var repair = require('./models/repair')
var contact = require('./models/contact')
var topic = require('./models/topic')
var User = require('./models/user')
var md5 = require('blueimp-md5')



var comments,comments1,newsDetail = []

fs.readFile('./db.json','utf8',function(err,data){
	if(err){
		return res.status(50).send('Server error')
	}
	comments = JSON.parse(data).comments
	comments1 = JSON.parse(data).comments1
	newsDetail = JSON.parse(data).newsDetail
})


// 1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到路由容器router上
router.get('/',function(req,res){
	res.render('index.html', {
		comments: comments,
		comments1: comments1,
		newsDetail: newsDetail	
	})
})
router.get('/favicon.ico',function(req,res){
	fs.readFile('./favicon.ico',function(err,data){
		if(err){
			res.end('读取文件失败，请稍后重试...')
		}else{		
			res.end(data)
		}
	})
})
router.get('/solution_zhwy.html',function(req,res){
	res.render('solution_zhwy.html')
})
router.get('/newsDetail1',function(req,res){
	res.render('newsDetail1.html')
})
router.get('/newsDetail2',function(req,res){
	res.render('newsDetail2.html')
})
router.get('/newsDetail3',function(req,res){
	res.render('newsDetail3.html')
})
router.get('/post',function(req,res){
	res.render('post.html')
})
router.get('/post1',function(req,res){
	res.render('post1.html')
})
router.get('/pinglun',function(req,res){
	//使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
	var comment = req.query
    var date = new Date()
    comment.dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    comments.unshift(comment)
    res.redirect('/')
})
router.get('/pinglun1',function(req,res){
	//使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
	var comment = req.query
    var date = new Date()
    comment.dateTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    comments1.unshift(comment)
    res.redirect('/')
    // res.statusCode = 302
    // res.setHeader('Location', '/')
})

//报修页面
router.get('/repair.html',function(req,res){
	repair.find(function(err,repair){
		if(err){
			return res.status(500).send(' server error ')
		}
		res.render('repair.html',{
			repair: repair
		})
	})
})

//添加页面
router.get('/add.html',function(req,res){
	res.render('add.html')
})

//响应添加报修
router.post('/add.html',function(req,res){
	new repair(req.body).save(function(err){
		if(err){
	 		return res.status(500).send(' server error ')
	 	}
		res.redirect('./repair.html')
	})
})


//查找成功页面
router.post('/find.html',function(req,res){
	repair.findById((req.body.id).replace(/"/g,""),function(err,repair){
		if(repair == undefined){
			res.send('查无此编号，请输入正确的报修单id')
			return false
		}
		if(err){
			return res.status(500).send(' server error ')
		}
		res.render('find.html',{
			repair: repair
		})
	})	
})

//根据id查询页面
router.get('/findById.html',function(req,res){
	res.render('findById.html')
})

//根据id查询页面
router.get('/deleteById.html',function(req,res){
	res.render('deleteById.html')
})

//删除
router.post('/delete.html',function(req,res){
	repair.findByIdAndRemove((req.body.id).replace(/"/g,""),function(err){
		if(err){
			return res.status(500).send( ' 查无此编号，请输入正确的报修单id ' )
		}
		res.send('撤销订单成功')
	})
})

//响应联系我们表单提交
router.post('/index.html',function(req,res){
	new contact(req.body).save(function(err){
		if(err){
	 		return res.status(500).send(' server error ')
	 	}
	 	res.redirect('./')
	})
})

//产品详情页
router.get('/ProductDetails.html',function(req,res){
	res.render('ProductDetails.html')
})



//业主投诉登录页面
router.get('/login', function (req, res) {
  res.render('login.html')
})

//处理登录提交数据
router.post('/login', function (req, res) {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据
  var body = req.body

  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }
    
    // 如果邮箱和密码匹配，则 user 是查询到的用户对象，否则就是 null
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    // 用户存在，登陆成功，通过 Session 记录登陆状态
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

//业主投诉注册页面
router.get('/register', function (req, res) {
  res.render('register.html')
})

//处理注册提交数据
router.post('/register', function (req, res) {
  // 1. 获取表单提交的数据
  //    req.body
  // 2. 操作数据库
  //    判断改用户是否存在
  //    如果已存在，不允许注册
  //    如果不存在，注册新建用户
  // 3. 发送响应
  var body = req.body
  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: '服务端错误'
      })
    }
    if (data) {
      // 邮箱或者昵称已存在
      return res.status(200).json({
        err_code: 1,
        message: 'Email or nickname aleady exists.'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
	        return res.status(500).json({
	        err_code: 500,
	        message: '服务端错误'
      	})
      }

      // 注册成功，使用 Session 记录用户的登陆状态
      req.session.user = user

      // Express 提供了一个响应方法：json
      // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })

    })
  })
})

//业主投诉系统退出
router.get('/logout', function (req, res) {
  // 清除登陆状态
  req.session.user = null

  // 重定向到登录页
  res.redirect('/login')
})


//业主投诉主页
router.get('/complain.html',function(req,res){
  topic.find(function(err,topic){
    if(err){
      return res.status(500).send(' server error ')
    }
    res.render('complain.html',{
      topic: topic,
      user: req.session.user
    })
  })
})

//业主投诉新增页面
router.get('/topic/new', function (req, res) {
  res.render('topic/new.html',{
  	 user : req.session.user
  })
})

//处理新增投诉
router.post('/topic/new',function(req,res){
  new topic(req.body).save(function(err){
    if(err){
      return res.status(500).json({
          err_code: 500,
          message: err.message
        })
    }
    res.status(200).json({
      err_code: 0,
      message: 'ok'
    })
  })
})




//3.把router导出
module.exports = router