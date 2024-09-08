import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

export default function RentGeneratedByBook() {
    const [bookname, setBookname] = useState('');
    const [data, setData] = useState(null);

    const handleChange = (e) => {
        setBookname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            const response = await axios.post('https://manage-book-backend.onrender.com/rentgeneratedbybook', { bookname });
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
            <h1>Total Rent Generated by Book</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={bookname}
                        onChange={handleChange}
                        placeholder="Enter Book Name"
                        required
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Fetch Rent
                </Button>
            </Form>

            {data && (
                <div className="mt-4">
                    <Card
                bg={color}
                text={color === 'light' ? 'dark' : 'white'}
                className="h-100"
                >
                        <Card.Header>Total Rent Generated by "{data.bookname}"</Card.Header>
                        <Card.Body>
                            <p>rs.{data.totalrentgeneratedbybook}</p>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
}
