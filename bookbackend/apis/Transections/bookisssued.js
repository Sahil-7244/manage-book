const { ObjectId } = require('mongodb');
const connectDb = require('../../db/DbConnect');
const connectDb2 = require('../../db/DbConnect2');

async function BookIssued(req, res){

    try{

        const db = await connectDb();
        const dbcollectionbook = await db.collection('Books');
        const dbcollectionuser = await db.collection('Users');
        const db2 = await connectDb2();
        const db2collection = await db2.collection('bookstatus');

        const {userid,bookname,issuedate} = req.body;

        if (userid == null || bookname == null || issuedate == null) {
            return res.status(404).json({ message: "userid, bookname and issuedate fields are required" });
        }

        let userExist;
        if (ObjectId.isValid(userid)) {
            // If useridentifier is a valid ObjectId, search by userid
            userExist = await dbcollectionuser.findOne({ _id: new ObjectId(userid) });
        } else {
            // If useridentifier is a string, search by username
            userExist = await dbcollectionuser.findOne({ username: userid });
        }
        const bookExists = await dbcollectionbook.findOne({ bookname });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!bookExists) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Check if the book is already issued
        const activeTransaction = await db2collection.findOne({
            bookname: bookname,
            status: 'issued'
        });

        if (activeTransaction) {
            return res.status(400).json({ message: "Book is already issued" });
        }

        const transaction = {
            userId: userExist._id,
            bookname: bookname,
            issueDate: new Date(issuedate),
            returnDate: null, // Return date will be null until the book is returned
            status: 'issued',
            rent: 0 // Rent will be calculated when the book is returned
        };

        await db2collection.insertOne(transaction);

        return res.status(200).json({ message: "Book issued successfully", transaction });

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {BookIssued}