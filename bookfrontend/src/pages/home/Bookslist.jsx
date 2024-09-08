import { useEffect, useState } from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

export default function Bookslist() {

    const [booksdata,setBooksdata] = useState([]);

    useEffect(() => {
            const Fetchbooksdata = async() =>{
                try{
                    const response = await axios.get("http://localhost:8000/fetchbooks");
                    setBooksdata(response.data.Data);
                }
                catch(error){
                    console.log(" ftching booksdata");
                }
            }
            Fetchbooksdata();
        },[]
    )

    const cardColors = [
        'Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',
      ];
    
      return (
        <Container className="mt-4">
            <h1>Book List</h1><br/>
          <Row>
            {booksdata.map((book, index) => (
              <Col md={4} lg={3} key={index} className="mb-4">
                <Card
                  bg={cardColors[index % cardColors.length].toLowerCase()} // Assign colors based on index
                  text={cardColors[index % cardColors.length].toLowerCase() === 'light' ? 'dark' : 'white'}
                  className="h-100"
                >
                  <Card.Header>book id: {book._id}</Card.Header>
                  <Card.Body>
                    <Card.Title>{book.bookname}</Card.Title>
                    <hr/>
                    <Card.Text>
                      Category: {book.category}<br/>
                      Rent per Day: {book.rentperday} 
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      );
    }