const express = require('express');
const app = express();

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<project id>.firebaseapp.com",
    authDomain: "<project id>.firebaseapp.com",
});

var db=admin.database();
var userRef=db.ref(`usersOfApp`);

app.post("/addUser",(obj,res)=>{
    console.log(userRef);
    var oneUser=userRef.child(obj.name);
    console.log(oneUser,obj);
    oneUser.push(obj,(err)=>{
    if(err){
    res.status(300).json({"msg":"Something went wrong","error":err});
    }
    else{
    res.status(200).json({"msg":"user created sucessfully"});
    }
    })
})

port = 8082
app.listen(port,()=>{
    console.log(`Server Running on port ${port} `);
})