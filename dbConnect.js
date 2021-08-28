/// DATABASE Connections
//database connection
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://sit725-2021-t2:zI9YQ7KiprxVZ3Us@sit725.jzgkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let mongoClient = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

let projectsCollection;

mongoClient.connect((err,db) => {
    // projectsCollection = mongoClient.db().collection(collectionName);
     if(!err){
       console.log('Database Connected')
     }else{
       console.log('[error]',err)
     }
 });
 

exports.mongoClient = mongoClient;


