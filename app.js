var query = require('simple-mysql-query');
query({
	host : 'localhost',
	port : '3306',
	user : 'root',
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
   	
      //在保存前检索infohash，重复的不要
      query({
         sql : 'select count(1) as num from demo_magnet where infohash=? ',params : [infohash]
      })
      .then(rs=> {
         var rst = rs[0];
         if(rst.length > 0){
            return 1;
         }else{
            return query({
               sql : 'insert into demo_magnet (name,filesize,fileaddress,fileport,infohash,magnet,json) values (?,?,?,?,?,?,?)',
               params : [name,size,address,port,infohash,magnet,str]
            });
         }
      }).then(rs=>{
         if(rs != 1){
            count++;
            console.log(`共计获取信息:${count}条`);
         }
      }).catch(err=>{
         console.log(err);
      })
});
