const connectDb = require('../../db/DbConnect');

async function Adduser(req, res){

    try{

        const db = await connectDb();
        const collection = db.collection('Users');
        
        const {username} = req.body;
        
        if(!username){
            return res.status(400).json({message:"All Fields are required"});
        }

        const userExist= await collection.findOne({username});
        if(userExist){
            return res.status(400).json({message:"This name user already exist."});
        }

        await collection.insertOne({
            username
        })

        return res.status(200).json({message:"User Inserted Successfully"});

    }

    catch(error){

        return res.status(500).json({message : error.messege});

    }

}

module.exports = {Adduser};