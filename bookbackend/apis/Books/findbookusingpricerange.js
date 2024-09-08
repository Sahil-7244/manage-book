const connectDb = require('../../db/DbConnect');

async function Findbookswithrange(req, res){

    try{

        const db = await connectDb();
        const collection = db.collection('Books');

        const {minrent, maxrent} = req.body;
        const min = parseInt(minrent);
        const max = parseInt(maxrent);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: "Both minRent and maxRent must be valid numbers" });
        }

        const booksdata = await collection.find({ rentperday: { $gte: min, $lte: max } }).toArray();

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

module.exports = {Findbookswithrange};