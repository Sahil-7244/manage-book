const connectDb = require('../../db/DbConnect');

async function Fetchuser(req, res){

    try{

        const db = await connectDb();
        const collection = db.collection('Users');
        
        const userdata = await collection.find().toArray();

        if(userdata.length === 0){
            return res.status(404).json({message : 'No user found'});
        }
        
        return res.status(200).json({messege : "Data Found", Data : userdata});


    }

    catch(error){

        return res.status(500).json({messege : error.messege});

    }

}

module.exports = {Fetchuser};