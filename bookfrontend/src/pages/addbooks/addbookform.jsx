import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function Addbookform(){

    const [bookdata,setBookdata] = useState({
        bookname: '',
        category: '',
        rentperday: ''
    }) 

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setBookdata(prevState =>({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if (isNaN(bookdata.rentperday)) {
            alert('Rent per day must be a valid number');
            return;
        }
        
        try{

            const response = await axios.post('https://manage-book-backend.onrender.com/addbook',bookdata);
            if(response.status===200){
                alert(response.data.message);
                setBookdata({
                    bookname: '',
                    category: '',
                    rentperday: ''
                })
            }

        }
        catch(error){
            alert('failed to add book try again!!')
            console.log(error.message);
        }
    }

    return(
        <><Container className="mt-4">
            <h1>Add Book</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="book">
                <Form.Label column sm="2">
                <b>Book Name :</b>
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name='bookname' value={bookdata.bookname} placeholder="The Hobbit" onChange={handleChange} required/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="cat">
                <Form.Label column sm="2" >
                <b>Category :</b>
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name='category' value={bookdata.category} placeholder="Fiction" onChange={handleChange} required/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="rent">
                <Form.Label column sm="2" >
                <b>Rent per Day :</b>
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name='rentperday' value={bookdata.rentperday} placeholder="25" onChange={handleChange} required/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm="12">
                <Button type="submit" variant="dark" className="w-100">
                            Add Book
                        </Button>
                </Col>
            </Form.Group>
            </Form>
        </Container>
        </>
    );
}
