
let express = require('express');
let app = express();

const PORT_NUMBER = 8081;

let db =[];

app.listen(PORT_NUMBER,function(){
    console.log('listening on port '+ PORT_NUMBER)
}); 
app.get('/',function(req,res){
    res.end("Port" +PORT_NUMBER);
})
//localhost:8080/addparcel?sender=Megan&address=Vic&weight=1.35&fragile=true
//localhost:8080/addparcel?sender=Harry&address=Melbourne&weight=1.5&fragile=True
//localhost:8080/addparcel?sender=Mike&address=NSW&weight=1.4&fragile=True
//localhost:8080/addparcel?sender=Sam&address=Mas&weight=20&fragile=false
app.get('/addparcel',function(req,res){

    let newId = Math.round(Math.random()*1000);
    let aSender = req.query.sender;
    let add = req.query.address;
    let theWeight = req.query.weight;
    let isFragile = req.query.fragile;

    let object = {
        id:newId,
        sender:aSender,
        address:add,
        weight:theWeight,
        fragile:isFragile
    }
    db.push(object);
    res.end("parcel added : " + newId);
})

app.get('/getparcels',function(req,res){
    res.send(generateList());
})

app.get('/deleteid/:id',function(req,res){
    let theIdz = parseInt(req.params.izd);
    for(let i=0; i<db.length; i++){
        if(db[i].id === theIdz ){
            db.splice(i,1)
        }
    }
    
})

app.get('/gettotalweight',function(req,res){
    let totalweight =0;
    for(let i=0;i<db.length;i++){
        totalweight += parseFloat(db[i].weight)
    }
    res.send("The total Weight is " + totalweight);
})
app.get('/smallparcels',function(req,res){
    let total = 0;
    for(let i =0; i <db.length;i++){
        if(parseFloat(db[i].weight)< 1.5){
        total +=1};
    }
    res.send("Total of small parcels = " + total);
})
app.get('/fragileparcels',function(req,res){
    let total_fragile =0;
    for(let i =0; i <db.length;i++){
        if(db[i].fragile === "true" || db[i].fragile === "True"){
        total_fragile +=1}
    }
    res.send("Total of Fragile Parcels = " + total_fragile); 
})
function generateList(){
    let st = 'ID     Sender     Address     Weight     Fragile</br>';
    for(let i=0; i<db.length; i++){
        st += db[i].id + ' | ' +  db[i].sender+ ' | ' + db[i].address + ' | ' + db[i].weight+' | ' +  db[i].fragile   + '</br>';
    }
    return st
}