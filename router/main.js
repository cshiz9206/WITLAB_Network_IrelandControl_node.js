module.exports = function(router, fs)
{
    router.get('/', function(req, res) {
        // render 메소드의 res 인자로 JSON 데이터를 받아옴
        res.render('index', {
            title : "MY HOME",
            length : 5
        })
    })

    router.get('/put', function (req, res) {
        fs.readFile( __dirname + "/../data/" + "user.json", 'utf8', function (err, data) {
            console.log(req.data)
            console.log( data );
            res.end( data );
        });
     })

     router.put('/put/:cmdType', function(req, res){

        var result = {  };
        var cmdType = req.params.cmdType;
        console.log("cmdType");
        console.log(req.params.cmdType);

        // CHECK REQ VALIDITY
        if(!req.body["command"] || !req.body["targetDevice"] || !req.body["controlDevice"] || !req.body["data"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA
        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var cmds = JSON.parse(data);
            // ADD/MODIFY DATA
            cmds[cmdType] = req.body;
            console.log("cmds");
            console.log(cmds[cmdType]);

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json",
                         JSON.stringify(cmds, null, '\t'), "utf8", function(err, data){ // JSON.stringfy(1,2,3) : JSON 문자열로 변환(대상, 속성중선택, 구분자)
                result = {"success": 1};
                res.json(result); // 클라이언트에서 response.isSuccessful 확인에 사용
            })
        })
    });
}