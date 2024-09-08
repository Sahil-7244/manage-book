import { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

export default function BooksIssuedInRange() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [books, setBooks] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://manage-book-backend.onrender.com/booksissuedingivenrangeofdate', {
                startdate: startDate,
                enddate: endDate
            });
            setBooks(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            alert('An error occurred while fetching data.');
            setBooks([]);
        }
    };

    const cardColors = [
        'Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',
    ];

    const color = cardColors[Math.floor(Math.random() * cardColors.length)].toLowerCase();

    return (
        <Container className="mt-4">
            <h1>Books Issued in Given Date Range</h1>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="dark" type="submit">
                    Fetch Books
                </Button>
            </Form>
            <br/>

            {books.length > 0 && (
                <Card
                bg={color}
                text={color === 'light' ? 'dark' : 'white'}
                className="h-100"
                >
                    <Card.Header>Books Issued Between {startDate} and {endDate}</Card.Header>
                    <Card.Body>
                        <ul>
                            {books.map((book, index) => (
                                <li key={index}>
                                    <strong>{book.bookname}</strong> issued to {book.issuedto} on {new Date(book.issueDate).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
