import { useState } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default function BookIssuers() {
    const [bookname, setBookname] = useState('');
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        setBookname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://manage-book-backend.onrender.com/listofbookissuers', { bookname });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    };

    const cardColors = [
        'Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',
    ];

    const color = cardColors[Math.floor(Math.random() * cardColors.length)].toLowerCase();

    return (
        <Container className="mt-4">
            <h1>Book Issuers</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={bookname}
                        onChange={handleChange}
                        placeholder="Enter book name"
                        required
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Fetch Issuers
                </Button>
            </Form>

            {data && (
                <div className="mt-4">
                    {data.totalcount === 0 ? (
                        <Card
                        bg={color}
                        text={color === 'light' ? 'dark' : 'white'}
                        className="h-100"
                        >
                            <Card.Header>Result</Card.Header>
                            <Card.Body>
                                <p>No transactions found for this book.</p>
                            </Card.Body>
                        </Card>
                    ) : (
                        <>
                            <Card
                            bg={color}
                            text={color === 'light' ? 'dark' : 'white'}
                            className="h-100"
                            >
                                <Card.Header>Book Issuers for "{bookname}"</Card.Header>
                                <Card.Body>
                                    <p>Total Count: {data.totalcount}</p>
                                    {data.currentlyissued === 'not issued currently' ? (
                                        <p>Currently Issued: Not issued currently</p>
                                    ) : (
                                        <p>
                                            Currently Issued: {data.currentlyissued.username} on {new Date(data.currentlyissued.issueDate).toLocaleDateString()}
                                        </p>
                                    )}
                                    <ListGroup>
                                        {data.issuers.length > 0 ? (
                                            data.issuers.map((issuer, index) => (
                                                <ListGroup.Item key={index}>
                                                    <strong>{issuer.username}</strong> issued on {new Date(issuer.issuedDate).toLocaleDateString()}
                                                    {issuer.returnDate ? `, returned on ${new Date(issuer.returnDate).toLocaleDateString()}` : ', Not Returned'}
                                                </ListGroup.Item>
                                            ))
                                        ) : (
                                            <p>No issuers found for this book.</p>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </div>
            )}
        </Container>
    );
}
