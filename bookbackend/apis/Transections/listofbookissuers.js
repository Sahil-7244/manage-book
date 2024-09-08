const { ObjectId } = require('mongodb');
const connectDb = require('../../db/DbConnect');
const connectDb2 = require('../../db/DbConnect2');

async function ListofbookIssuers(req, res){

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

        const currentTransaction = await transactions.find(a => a.status === 'issued');

        const users = await Promise.all(transactions.map(async(a) =>{
            const user = await dbcollectionuser.findOne({_id: new ObjectId(a.userId)});
            return {
                username: user.username,
                issuedDate: a.issueDate,
                returnDate: a.returnDate
            }
        }));

        const totalcount = transactions.length;

        return res.status(200).json({
            totalcount,
            issuers: users,
            currentlyissued: currentTransaction ? {
                username: await dbcollectionuser.findOne({ _id: new ObjectId(currentTransaction.userId) }).then(a=>a.username),
                issueDate: currentTransaction.issueDate
            } : 'not issued currently'
        });

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {ListofbookIssuers}