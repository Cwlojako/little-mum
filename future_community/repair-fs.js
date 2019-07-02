/*
	*repair-fs.js
	*数据操作文件模块
	*职责：操作文件中的数据，只关心数据，不在乎处理业务
	*
*/
var fs = require('fs')
var repairPath = './repair.json'

/*获取所有维修条目*/
exports.find = function(callback){
	fs.readFile(repairPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		callback(null,JSON.parse(data).repair)
	})
}

/*根据id获取维修条目*/
exports.findById = function(id,callback){
	fs.readFile(repairPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		var repairs = JSON.parse(data).repair
		var ret = repairs.find(function(item){
			return item.id === parseInt(id)
		})
		callback(null,ret)
	})
}

/*添加保存报修条目*/
exports.save = function(obj,callback){
	fs.readFile(repairPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		var repairs = JSON.parse(data).repair
		//处理id,不重复
		obj.id = repairs[repairs.length-1].id + 1;
		//把用户传递的对象保存到数组中
		repairs.push(obj)
		//把对象数据转换成字符串
		var fileData = JSON.stringify({
			repair : repairs
		})
		//把字符串保存到文件中
		fs.writeFile(repairPath,fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}

/*根据id删除报修条目*/
exports.deleteById = function(id,callback){
	fs.readFile(repairPath,'utf-8',function(err,data){
		if(err){
			return callback(err)
		}
		var repairs = JSON.parse(data).repair
		var deleteId = repairs.findIndex(function(item){
			return item.id === parseInt(id)
		})
		if(deleteId == -1){
			return callback(true)
		}
		repairs.splice(deleteId,1)

		//把对象数据转换成字符串
		var fileData = JSON.stringify({
			repair : repairs
		})
		//把字符串保存到文件中
		fs.writeFile(repairPath,fileData,function(err){
			if(err){
				return callback(err)
			}
			callback(null)
		})
	})
}