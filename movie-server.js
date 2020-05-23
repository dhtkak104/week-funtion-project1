const express=require("express") // 간단한 서버를 사용
const request=require("request") // 다른 사이트 서버를 연결해서 데이터를 읽기
const app=express(); // 서버 생성
const port=3355; // port => 0~65535 (0~2023 사용중)

// port 충돌방지 (크로스도메인)
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// 서버 대기중
app.listen(port,()=>{
    console.log("server start...", "http://localhost:3355");
});

app.get("/", (request,response)=>{
    response.send("Hollo node server!")
})

const Client=require("mongodb").MongoClient //  mongoDB 연결
app.get("/movie_real2", (request,response)=>{
    /*
        페이징처리
        1 page => 0     0~11
        2 page => 12    12~23
     */
    var page=request.query.page;
    var rowSize=12;
    var skip=(page*rowSize)-rowSize;
    
    /*
        NoSQL
        find({}) => select * from movie
        find({nmo:1}) => select * from movie where nmo=1
    */
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("movie").find({cateno:1}).skip(skip).limit(rowSize)
        .toArray(function (err, docs) {
            response.json(docs)
            client.close();
        })
    })
})

app.get("/movie_total", (request, response)=>{
    var cateno=request.query.cateno;
    var url="mongodb://211.238.142.181:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        // 14/12 => 1.xxx => 2
        db.collection("movie").find({cateno:Number(cateno)}).count(function(err,count){
            response.json({total:Math.ceil(count/12.0)})
            client.close();
            return count;
        })
    })
})

// /movie_home?no=2
app.get("/movie_home", (req,res)=>{
    var no = req.query.no;
    var site="";
    if(no==1) site="searchMainDailyBoxOffice.do";
    else if(no==2) site="searchMainRealTicket.do";
    else if(no==3) site="searchMainDailySeatTicket.do";
    else if(no==4) site="searchMainOnlineDailyBoxOffice.do";

    var url="http://www.kobis.or.kr/kobis/business/main/"+site;
    request({url:url}, function (err, request, json) {
        console.log(json);
        res.json(JSON.parse(json)); //JSON.parse() : string to json
    })

})