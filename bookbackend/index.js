const connectDB = require('./db/DbConnect');
const connectDB2 = require('./db/DbConnect2');
const express = require('express');
const cors = require('cors');
const { Fetchbooks } = require('./apis/Books/fetchbooks');
const { Fetchuser } = require('./apis/Books/fetchuser');
const { Addbook } = require('./apis/Books/addbook');
const { Findbooks } = require('./apis/Books/findbooksusingname');
const { Findbookswithrange } = require('./apis/Books/findbookusingpricerange');
const { Findbooksbyfilter } = require('./apis/Books/findbookbyfilter');
const { BookIssued } = require('./apis/Transections/bookisssued');
const { BookReturned } = require('./apis/Transections/bookreturned');
const { Adduser } = require('./apis/Books/adduser');
const { ListofbookIssuers } = require('./apis/Transections/listofbookissuers');
const { RentGeneratedbyBook } = require('./apis/Transections/rentgeneratedbybook');
const { ListofbookissuedByuser } = require('./apis/Transections/listofbooksissuedbyuser');
const { BooksIssuedingivenRangeofDate } = require('./apis/Transections/booksissuedingivenrangeofdate');

//connect database
connectDB();
connectDB2();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false }));

const PORT = process.env.PORT || 8000;

//Allow cors
app.use(cors());

//Define routes
app.get('/fetchbooks', Fetchbooks);
app.get('/fetchusers', Fetchuser);
app.post('/addbook', Addbook);
app.post('/findbooks', Findbooks);
app.post('/findbookswithpricerange', Findbookswithrange);
app.post('/findbooksbyfilter', Findbooksbyfilter);
app.post('/bookissued', BookIssued);
app.post('/bookreturned', BookReturned);
app.post('/adduser', Adduser);
app.post('/listofbookissuers', ListofbookIssuers);
app.post('/rentgeneratedbybook', RentGeneratedbyBook);
app.post('/listofbookissuedbyuser', ListofbookissuedByuser);
app.post('/booksissuedingivenrangeofdate', BooksIssuedingivenRangeofDate);

//Start the server
app.listen(PORT, () => {
    console.log('server started on port',PORT);
})