var express = require('express');
var router = express.Router();
var multer = require('multer');
var crypto = require('crypto');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');



	var storage = multer.diskStorage({
	   destination: './public/images/avatar',
	   filename: function (req, file, cb) {
		 crypto.pseudoRandomBytes(16,function(err, raw){
			if(err) return cb(err)		
			cb(null,raw.toString('hex') + path.extname(file.originalname))		
		 })
	   }
	});
	
	var upload = multer({ storage: storage });

	router.use(express.static(__dirname + "/public"));
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'iscdb'
});

connection.connect();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))
//post anh



//lay danh sach thanh vien
router.get('/menu_Lecturers', function (req, res) {
	connection.query('SELECT * from lecturers ', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});



router.get('/menu_Lecturers_user', function (req, res) {
	connection.query('SELECT concat(lastname," ",firstname) as fullname, phone, email, user_code from users where status = 1', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});



///xoa thanh vien
router.delete('/menu_Lecturers/:id', function (req, res) {

	var id = req.params.id; 
	var sql = "delete from lecturers where id_lec = '" + id + "'";
	
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
		}
	});
	


});

////them thanh vien

		var urlImage = {"urlImage_name" : ""};
router.post('/menu_Lecturers_image', upload.any(), function (reqimg, resimg) {
	
	
	
		   var str = (reqimg.files[0].path);
			var substr =  str.substr(str.lastIndexOf("r")+1,str.lenth);
				return  urlImage.urlImage_name = ("images/avatar/"+ substr);	
				
			

		

});
	router.post('/menu_Lecturers', function (req, res) {
								
						setTimeout(function(){
								var sql = 'insert into lecturers(code_lec,degree,major,image,description,user_code,status_lec) values ("'+req.body.code_lec+'","'+req.body.degree+'","'+req.body.major+'","'+urlImage.urlImage_name+'","'+req.body.description+'","'+req.body.user_code+'",1)';
								connection.query(sql, function (err, rows, fields) {
									if (err) {
										connection.end();
										throw err;
									}
									else {
										res.json(rows);
									}
								});
						},500);	
								
								
								
	});
	
				





///sua thanh vien
	
	var upload1 = multer({ storage: storage });

	 var urlImage_edit = {"urlImage_edit_thuoctinh":""};
	 
router.post('/menu_Lecturers_image_edit', upload1.any(), function (reqimg1, resimg1) {
	
	    var str1 = (reqimg1.files[0].path);
    var substr =  str1.substr(str1.lastIndexOf("r")+1,str1.lenth);
		return urlImage_edit.urlImage_edit_thuoctinh = ("images/avatar/"+ substr);
	

		
});


router.put('/menu_Lecturers/:id', function (req, res) {
	var id = req.params.id;
setTimeout(function(){
	var sql = "update lecturers set code_lec='" + req.body.code_lec + "',  degree='" + req.body.degree + "',  major='" + req.body.major + "', image='" + urlImage_edit.urlImage_edit_thuoctinh + "', description='" + req.body.description + "', user_code='" + req.body.user_code + "',  status_lec='" + req.body.status_lec + "' where id_lec = '" + id + "'";

	
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
			
		}
	});
},500);

});




module.exports = router;