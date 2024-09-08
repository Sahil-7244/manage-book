const { ObjectId } = require('mongodb');
const connectDb = require('../../db/DbConnect');
const connectDb2 = require('../../db/DbConnect2');

async function ListofbookissuedByuser(req, res){

    try{

        const db = await connectDb();
        const dbcollectionuser = await db.collection('Users');
        const db2 = await connectDb2();
        const db2collection = await db2.collection('bookstatus');

        const {userid} = req.body;

        if ( userid == null ) {
            return res.status(404).json({ message: " userid  field is required" });
        }

        let userExist;
        if (ObjectId.isValid(userid)) {
            // If useridentifier is a valid ObjectId, search by userid
            userExist = await dbcollectionuser.findOne({ _id: new ObjectId(userid) });
        } else {
            // If useridentifier is a string, search by username
            userExist = await dbcollectionuser.findOne({ username: userid });
        }

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const books = await db2collection.find({userId: new ObjectId(userExist._id)}).toArray();;

        if( books.length === 0 ){
            return res.status(404).json({ message: " No transaction found for this user" });
        } 

        const booksissuedbyuser = books.map((a) => a.bookname);

        return res.status(200).json({
            username: userExist.username,
            booksissuedbyuser
        });

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {ListofbookissuedByuser}