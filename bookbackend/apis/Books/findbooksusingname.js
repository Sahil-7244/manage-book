const connectDb = require('../../db/DbConnect');

async function Findbooks(req, res){

    try{

        const db = await connectDb();
        const collection = db.collection('Books');

        const {bookname} = req.body;

        const booksdata = await collection.find({ bookname: { $regex: bookname, $options: 'i' } }).toArray();

        if(booksdata.length === 0){
            return res.status(404).json({message : 'No books found'});
        }
        else{
            return res.status(200).json({message : "Data Found", Data : booksdata});
        }

    }

    catch(error){

        return res.status(500).json({messege : error.messege});

    }

}

module.exports = {Findbooks};