var express = require('express');
var app = express();
//var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));

app.use(require('./routes/truonghoc'));
app.use(require('./routes/thanhvien'));
//app.use(require('./routes/quyen'));
app.use(require('./routes/phanquyen'));
app.use(require('./routes/khoahoc'));
app.use(require('./routes/monhoc'));
app.use(require('./routes/chuongtrinhhoc'));
app.use(require('./routes/vnito'));
app.use(require('./routes/students_status'));
app.use(require('./routes/students_profile'));
app.use(require('./routes/classroom'));
app.use(require('./routes/class'));
app.use(require('./routes/lecturer'));

app.listen(5000);
console.log('Server running on port 5000');