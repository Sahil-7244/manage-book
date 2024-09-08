import { useState } from 'react';
import { Container, Form, Button, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

export default function BooksIssuedByUser() {
    const [userid, setUserid] = useState('');
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        setUserid(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/listofbookissuedbyuser', { userid });
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
            <h1>Books Issued by User</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>User ID/Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={userid}
                        onChange={handleChange}
                        placeholder="Enter User ID or Username"
                        required
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Fetch Books
                </Button>
            </Form>

            
            {data && (
                <div className="mt-4">
                    <Card
                    bg={color}
                    text={color === 'light' ? 'dark' : 'white'}
                    className="h-100"
                    >
                        <Card.Header>Books Issued by {data.username}</Card.Header>
                        <Card.Body>
                            {data.booksissuedbyuser.length > 0 ? (
                                <ListGroup>
                                    {data.booksissuedbyuser.map((book, index) => (
                                        <ListGroup.Item key={index}>{book}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>No books found for this user.</p>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
}
