const express =require("express");
const bodyParser=require("body-parser");
const request =require("request");
const path=require("path");
const https=require("https");
const { url } = require("inspector");
const { json } = require("express");

const app =express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.Email;

    const data = {
        members :[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);

    const url="https://us13.api.mailchimp.com/3.0/lists/14862acf4e";

    const options={
        method : "POST",
        auth: "sonucs19:d18ee0dda5a3cd274ece56820e7008d5-us13"
    }

   const request= https.request(url,options,function(response){

        if(response.statusCode==200){
           res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
           console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is runnsing on port 8086");
})




//api key
//d18ee0dda5a3cd274ece56820e7008d5-us13

//list Id
//14862acf4e