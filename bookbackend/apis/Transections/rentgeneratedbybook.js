const { ObjectId } = require('mongodb');
const connectDb = require('../../db/DbConnect');
const connectDb2 = require('../../db/DbConnect2');

async function RentGeneratedbyBook(req, res){

    try{

        const db = await connectDb();
        const dbcollectionbook = await db.collection('Books');
        const dbcollectionuser = await db.collection('Users');
        const db2 = await connectDb2();
        const db2collection = await db2.collection('bookstatus');

        const {bookname} = req.body;

        if ( bookname == null ) {
            return res.status(404).json({ message: " bookname  field is required" });
        }

        const book = await dbcollectionbook.findOne({bookname});

        if( !book ){
            return res.status(404).json({ message: " this book does not exist" });
        } 

        const transactions = await db2collection.find({bookname}).toArray();

        if (transactions.length === 0) {
            return res.status(404).json({ message: "No transactions found for this book" });
        }
        let rent=0
        transactions.filter(a => a.returnDate !== null).map((a) =>{
            rent += a.rent;
        });

        return res.status(200).json({
            bookname,
            totalrentgeneratedbybook: rent
        });

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {RentGeneratedbyBook}