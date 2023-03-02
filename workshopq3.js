let express = require('express') 
let path = require('path');  
let app = express(); 

app.listen(8082);

app.get('/power/:no1/:no2',function(req,res){

    let base = parseInt(req.params.no1);
    let exponent= parseInt(req.params.no2);
    let result = Math.pow(base,exponent)
    res.end('The result is ' +result);
});

app.get('/max',function(req,res){
    
    let n1 = parseInt(req.query.no1);
    let n2 = parseInt(req.query.no2);
    let n3 = parseInt(req.query.no3);
    let result = Math.max(n1,n2,n3);
    res.end('The max is '+ result);
})
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"/views/index.html"));
});
