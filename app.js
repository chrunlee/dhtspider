var query = require('simple-mysql-query');
query({
	host : 'localhost',
	port : '3306',
	username : 'root',
	password : 'root',
	database : 'items'
});
var count = 0;
var p2pspider = require('p2pspider');
p2pspider(function(data){
    //将获得的信息存储在数据库中，以待后续在数据库中查询
   	//1.只保留
   	data.pieces =null;
   	var name = data.name,
   		size = data.size,
   		address = data.address,
   		port = data.port,
   		infohash = data.infohash,
   		magnet = data.magnet,
   		str = JSON.stringify(data);
   	console.log(name);
   	query({
   		sql : 'insert into demo_magnet (name,filesize,fileaddress,fileport,infohash,magnet,json) values (?,?,?,?,?,?,?)',
   		params : [name,size,address,port,infohash,magnet,str]
   	}).then(rs=>{
   		count++;
   		console.log(`共计获取信息:${count}条`);
   	}).catch(err=>{
   		console.log(err);
   	})
});
