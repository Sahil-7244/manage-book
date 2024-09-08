const { ObjectId } = require('mongodb');
const connectDb = require('../../db/DbConnect');
const connectDb2 = require('../../db/DbConnect2');

async function BooksIssuedingivenRangeofDate(req, res){

    try{

        const db = await connectDb();
        const dbcollectionuser = await db.collection('Users');
        const db2 = await connectDb2();
        const db2collection = await db2.collection('bookstatus');

        const {startdate, enddate} = req.body;

        if ( !startdate || !enddate ) {
            return res.status(404).json({ message: " startdate and enddate required  field is required" });
        }

        const start = new Date(startdate);
        const end = new Date(enddate);

        const transactions = await db2collection.find({issueDate:{$gte:start, $lte:end}}).toArray();

        if( transactions.length === 0 ){
            return res.status(404).json({ message: " No transaction found between given dates" });
        } 

        const booksingiventime = await Promise.all(transactions.map(async(a) => {
            const user = await dbcollectionuser.findOne({_id:new ObjectId(a.userId)});
            return{
            bookname: a.bookname,
            issuedto: user.username,
            issueDate: a.issueDate
        }}));

        return res.status(200).json(booksingiventime);

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {BooksIssuedingivenRangeofDate}