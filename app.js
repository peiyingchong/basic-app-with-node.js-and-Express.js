let express = require('express') 
let path = require('path');  //importing external libraries
let app = express(); //Express app = new Express()  an instancce of express

app.listen(8080);

//database =array
let db = [];


app.get('/',function(req,res){

    res.sendFile(path.join(__dirname,"/views/index.html"));

});

app.get('/add',function(req,res){

    let no1 = parseInt(req.query.number1);
    let no2 = parseInt(req.query.number2);
    let result = no1 + no2;
    let msg = 'the result of ${no1} + ${no2} is ${result}';
    res.send(msg);
});


app.get('/student/enrol',function(req,res){
    res.send('Here is student enrol')
});

app.get('/teacher/enrol',function(req,res){
    res.send('Hi Teacher')
});

//parameter order does not matter during query
//http://local:host:8080/addaccount?fees=1500&name=Max&age=23

// must follow API, structure of server
//http://localhost/addaccount/Max/23/Mel/1500

app.get('/addaccount/:name/:age/:address/:fees',function(req,res){
    let aName = req.params.name;
    let anAge = req.params.age;
    let anAddress = req.params.address;
    let aFees = req.params.fees;

    let msg = 'Student ${aName} age = ${anAge} address = ${anAddress} fees = {aFees}'
    res.send(msg);
});

//localhost:8080/multiq/2/3/6
app.get('/multiq/:no1/:no2/:q',function(req,res){
    let no1 = parseInt(req.params.no1);
    let no2 = parseInt(req.params.no2);
    let guess = parseInt(req.params.q);
    let msg = "";
    if(guess === (no1*no2))
        msg = "Its Correct";
    else
        msg = "Try Again";

        let obj = {
            no1:no1,
            no2:no2,
            guess:guess,
            op:'Multi',
            msg:msg
        }
        db.push(obj);

        res.send(msg);

});

app.get('/getall',function(req,res){
    res.send(db);
})



