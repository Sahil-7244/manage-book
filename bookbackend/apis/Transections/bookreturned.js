const { ObjectId } = require('mongodb');
const connectDb = require('../../db/DbConnect');
const connectDb2 = require('../../db/DbConnect2');

async function BookReturned(req, res){

    try{

        const db = await connectDb();
        const dbcollectionbook = await db.collection('Books');
        const dbcollectionuser = await db.collection('Users');
        const db2 = await connectDb2();
        const db2collection = await db2.collection('bookstatus');

        const {userid, bookname, returndate} = req.body;

        if (userid == null || bookname == null || returndate == null) {
            return res.status(404).json({ message: "userid, bookname and returndate fields are required" });
        }

        let userExist;
        if (ObjectId.isValid(userid)) {
            // If useridentifier is a valid ObjectId, search by userid
            userExist = await dbcollectionuser.findOne({ _id: new ObjectId(userid) });
        } else {
            // If useridentifier is a string, search by username
            userExist = await dbcollectionuser.findOne({ username: userid });
        }

        if(!userExist){
            return res.status(404).json({ message: "No user found" });
        }

        const transaction = await db2collection.findOne({
            userId: new ObjectId(userExist._id),
            bookname: bookname,
            status: 'issued'
        });

        if (!transaction) {
            return res.status(404).json({ message: "No issued book found for this user" });
        }

        const book = await dbcollectionbook.findOne({bookname});
        const issueDate = transaction.issueDate;
        const returnDateObj = new Date(returndate);
        const daysRented = Math.ceil((returnDateObj - issueDate) / (1000 * 60 * 60 * 24));

        const totalRent = daysRented * book.rentperday;

        await db2collection.updateOne({_id : transaction._id},{
            $set: {
                returnDate: returnDateObj,
                rent: totalRent,
                status: 'returned'
            }
        });

        return res.status(200).json({ message: "Book returned successfully", totalRent });

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {BookReturned}