const connectDb = require('../../db/DbConnect');

async function Addbook(req, res){

    try{

        const db = await connectDb();
        const collection = db.collection('Books');
        
        const {bookname, category} = req.body;
        let {rentperday} =req.body;
        rentperday = parseInt(rentperday,10);
        
        if(bookname == "" || category == "" || rentperday == null){
            return res.status(400).json({message:"All Fields are required"});
        }
        if(isNaN(rentperday)){
            return res.status(400).json({message:"Rent per Day must be a number"});
        }

        await collection.insertOne({
            bookname,
            category,
            rentperday
        })

        return res.status(200).json({message:"Book added Successfully"});

    }

    catch(error){

        return res.status(500).json({message : error.messege});

    }

}

module.exports = {Addbook};