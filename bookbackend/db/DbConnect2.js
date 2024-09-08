const {MongoClient} = require('mongodb');
const url = 'mongodb+srv://sahildb788:sahil7244@cluster1.7c2ai9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
const client = new MongoClient(url);

async function ConnectToMongoDB2(){

    try{

        await client.connect();
        const database = client.db('Transection');
        console.log('Connected to database2');
        return database;

    }

    catch(error){
        
        console.log(error);

    }

}

module.exports = ConnectToMongoDB2;