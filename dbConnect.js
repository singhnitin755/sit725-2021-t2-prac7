/// DATABASE Connections
//database connection
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://sit-725-2021:NitI75&^@sit-725.arscq.mongodb.net/SIT-725?retryWrites=true&w=majority"
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


