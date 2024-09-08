const connectDb = require('../../db/DbConnect');

async function Findbooksbyfilter(req, res){

    try{

        const db = await connectDb();
        const collection = db.collection('Books');

        const {bookname, category, minrent, maxrent} = req.body;
        const min = parseInt(minrent);
        const max = parseInt(maxrent);

        if(!bookname || !category || isNaN(minrent) || isNaN(maxrent)){
            return res.status(404).json({message : 'every field is required'});
        }

        let query = {
            $and: [
                {bookname : {$regex : bookname, $options : 'i'}},
                {category : {$regex : category, $options : 'i'}},
                {rentperday : {$gte : min, $lte : max}}
            ]
        };

        const booksdata = await collection.find(query).toArray();

        if(booksdata.length === 0){
            return res.status(404).json({message : 'No books found'});
        }
        else{
            return res.status(200).json({message : "Data Found", Data : booksdata});
        }

    }

    catch(error){

        return res.status(500).json({message : error.message});

    }

}

module.exports = {Findbooksbyfilter};