var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'iscdb'
});

connection.connect();
router.use(bodyParser.json());


//lay danh sach khoa hoc
router.get('/menu_Class',function(req,res){
    connection.query('select * from class  ', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});

//lay danh sach mon hoc cua khoa hoc
router.get('/menu_Class_course',function(req,res){
    connection.query('select dis_code,dis_name from discipline  ', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});




//xoa truong hoc
router.delete('/menu_Class/:id', function(req,res){
	
	var id = req.params.id; 
	var sql = "delete from class where id_class = '" + id + "'";
	
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




//them khoa  hoc
router.post('/menu_Class',function(req,res){
	var sql = 'insert into class(code_class,name_class,dis_code,startday,endday,study_time) values ("'+req.body.code_class+'","'+req.body.name_class+'","'+req.body.dis_code+'","'+dateFormat(req.body.startday,"yyyy/m/dd")+'","'+dateFormat(req.body.endday,"yyyy/m/dd")+'","'+req.body.study_time+'")';
	
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



//sua khoa hoc
router.put('/menu_Class/:id', function(req, res){
	var id = req.params.id;
	var sql = "update class set code_class='" + req.body.code_class + "', name_class='" + req.body.name_class + "', study_time='" + req.body.study_time + "', startday='" + dateFormat(req.body.startday,"yyyy/m/dd") + "',endday='" + dateFormat(req.body.endday,"yyyy/m/dd") + "', dis_code='" + req.body.dis_code + "' where id_class = '" + id + "'";
	
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

module.exports = router;