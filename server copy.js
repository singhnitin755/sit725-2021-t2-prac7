let express = require("express");
let app = express();

//var app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;




var port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.static(__dirname + '/public'));



const dummyProject={
  author:'satvika',
  imageUrl:'https://share.balsamiq.com/c/3S11bcuXgmEGB4ZYCkxpuy.png',
  //videoUrl:'https://youtu.be/SkgTxQm9DWM',
  uniqueID:'4',
  description:'We want to create an to do list ',
  title:'To do list'
}
let dummyData=[dummyProject,dummyProject]

//serve projects data to the requestor 
app.get('/api/projects',(req,res)=>{
  console.log('projects requested')
  
  // get projects from database
  getProjects(res)

})

app.post('/api/projects',(req,res)=>{
  console.log('New project posted')
  console.log('body',req.body)
  let project=req.body;
  insertProject(project,res)
})


app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});


//socket test
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  setInterval(()=>{
    socket.emit('number', parseInt(Math.random()*10));
  }, 1000);

});


http.listen(port,()=>{
  console.log("Listening on port ", port);
});



/// DATABASE Connections
//database connection 
const uri = "mongodb+srv://sit725-2021-t2:zI9YQ7KiprxVZ3Us@sit725.jzgkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

let projectsCollection;

// this function is used to open the connection 
const openConnection = (message) => {
  client.connect((err,db) => {
  
    projectsCollection = client.db().collection(collectionName);
    
    if(!err){
      console.log('Database Connected')
    }else{
      console.log('[error]',err)
    }
  });
}


// insert project into the db
// takes a project entry, add date to it and pushes into the collection
const insertProject=(project,res)=>{
  // insert into collection
  projectsCollection.insertOne(project,(err,result)=>{
    console.log('Project Inserted',result)
    res.send({result:200})
  }) 
}

// retrieve all projects
const getProjects=(res)=>{
  projectsCollection.find().toArray(function(err, result) {
    if (err) throw err;
    res.send(result)
  })
}
 
openConnection()