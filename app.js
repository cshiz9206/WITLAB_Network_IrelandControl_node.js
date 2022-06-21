
// var java = require("java");
// java.classpath.push("irelandController.jar");
// java.classpath.push("C:/Users/witlab/Desktop/IrelandControl/ControlEx/irelandController.jar");
// java.classpath.push("RXTXcomm.jar");
// java.classpath.push("C:/Users/witlab/Desktop/IrelandControl/ControlEx/RXTXcomm.jar");
// var serialConnection = java.import('Connection.Serial');
// var instance = new serialConnection()

var express = require('express'); // node_modules의 express 패키지를 가져온다.
var app = express(); //app이라는 변수에 express 함수의 변환 값을 저장한다.

var bodyParser = require('body-parser'); // body-parser : POST 데이터 처리를 위한 모듈
var session = require('express-session'); // express-session : 세션 관리를 위한 모듈
var fs = require("fs");

app.set('views', __dirname + '/views'); // 서버가 읽을 수 있도록 HTML 위치 정의,  __dirname : 현재 모듈의 위치
app.set('view engine', 'ejs'); // 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.engine('html', require('ejs').renderFile);

//환경변수에서 port를 가져온다. 환경변수가 없을시 5050포트를 지정한다.
var server = app.listen(process.env.PORT || 5050, function() {
    console.log("Express server has started");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret : '@#@$MYSIGN#@$#$', // 쿠키를 임의로 변조하는 것을 방지하기 위한 sign값 (작성자 맘대루)
    resave : false, // 세션을 항상 저장할 지 정함 (false 권장)
    saveUninitialized : true // uninitialized 세션 : 새로 생긴 후 변경되지 않은 세션
}))

// router 모듈인 main.js를 app에 전달 (무조건 마지막)
var router = require('./router/main')(app, fs);











////////////////////////
// var http = require('http');
// var bodyParser = require('body-parser');
// var retrofitRouter = require('./retrofit');

// app.use(bodyParser.urlencoded({extended : false}));
// app.use('/retrofit', retrofitRouter);

// //REST API의 한가지 종류인 GET 리퀘스트를 정의하는 부분입니다.
// //app.get이라고 작성했기 때문에 get 요청으로 정의가 되고
// //app.post로 작성할 경우 post 요청으로 정의가 됩니다.
// //REST API의 종류 (get, post, update, delete 등등)을 사용하여 End Point를 작성하실 수 있습니다.
// app.get('/', function(req, res) {
//     res.send("<h1>Express server Start</h1>")
// })

// app.post(`/`, (req, res) => {
//     console.log(req.body);
//     res.send({"result": "POST 호출"});
//   })
  
// app.put(`/:id`, (req, res) => {
//     console.log(`내용 PrimaryKey : ${req.params.id}`)
//     console.log(req.body);
//     res.send({"result": "UPDATE 호출"});
// })
  
// app.delete(`/:id`, (req, res) => {
//     console.log(req.params.id);
//     console.log(req.path)
//     res.send({"result": "DELETE 호출"});
// })

// // express 서버를 실행할 때 필요한 포트 정의 및 실행 시 callback 함수를 받습니다
// app.listen(port, function() {
//     console.log('start! express server');
// });