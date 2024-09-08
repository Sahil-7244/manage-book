import { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

export default function FilterBooks() {
    const [filterType, setFilterType] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({
        bookname: '',
        minrent: '',
        maxrent: '',
        category: ''
    });

    const [filteredBooks, setFilteredBooks] = useState([]);

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterCriteria({
            bookname: '',
            minrent: '',
            maxrent: '',
            category: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterCriteria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        try {
            let url = `http://localhost:8000/`;
            let endpoint = '';

            if (filterType === 'name' && filterCriteria.bookname) {
                endpoint = 'findbooks';
            } else if (filterType === 'price' && filterCriteria.minrent && filterCriteria.maxrent) {
                endpoint = 'findbookswithpricerange';
            } else if (filterType === 'filter' && filterCriteria.minrent && filterCriteria.maxrent && filterCriteria.bookname && filterCriteria.category) {
                endpoint = 'findbooksbyfilter';
            } else {
                throw new Error('Invalid filter criteria');
            }

            url += endpoint;
            console.log(`Making request to: ${url}`); // Debugging info

            const response = await axios.post(url, filterCriteria);
            console.log(response.data); // Debugging info
            setFilteredBooks(response.data.Data || []); // Handle cases where Data might be undefined
        } catch (error) {
            console.error('Error fetching filtered books', error.response ? error.response.data : error.message);
        }
    };

    const cardColors = [
        'Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark',
    ];
    return (
        <Container className="mt-4">
            <h1>Filter Books</h1>

            <Form.Group className="mb-3">
                <Form.Label>Select Filter Type</Form.Label>
                <Form.Control as="select" value={filterType} onChange={handleFilterTypeChange}>
                    <option value="">--Select--</option>
                    <option value="name">Filter by Name</option>
                    <option value="filter">Filter</option>
                    <option value="price">Filter by Price Range</option>
                </Form.Control>
            </Form.Group>

            <Form onSubmit={handleFilter}>
                {filterType === 'name' && (
                    <Form.Group className="mb-3">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="bookname"
                            placeholder="Enter book name"
                            value={filterCriteria.bookname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                )}

                {filterType === 'filter' && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="bookname"
                                placeholder="Enter Book name"
                                value={filterCriteria.bookname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                placeholder="Enter category"
                                value={filterCriteria.category}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Min Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="minrent"
                                        placeholder="Min price"
                                        value={filterCriteria.minrent}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Max Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="maxrent"
                                        placeholder="Max price"
                                        value={filterCriteria.maxrent}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                )}

                {filterType === 'price' && (
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Min Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="minrent"
                                    placeholder="Min price"
                                    value={filterCriteria.minrent}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Max Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="maxrent"
                                    placeholder="Max price"
                                    value={filterCriteria.maxrent}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                )}

                <Button variant="dark" type="submit" disabled={!filterType}>
                    Filter
                </Button>
            </Form>

            <Row className="mt-4">
                {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                    <Col md={4} lg={3} key={index} className="mb-4">
                        <Card
                            bg={cardColors[index % cardColors.length].toLowerCase()}
                            text={cardColors[index % cardColors.length].toLowerCase() === 'light' ? 'dark' : 'white'}
                            className="h-100"
                        >
                            <Card.Header>Book ID: {book._id}</Card.Header>
                            <Card.Body>
                                <Card.Title>{book.bookname}</Card.Title>
                                <hr />
                                <Card.Text>
                                    Category: {book.category}<br />
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
