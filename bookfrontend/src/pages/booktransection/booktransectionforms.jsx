import { useState } from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import axios from 'axios';

export default function BookTransections() {
    //for Form
    const [formType, setFormType] = useState(''); // To store the selected form type
    const [formCriteria, setFormCriteria] = useState({
        userid: '',
        bookname: '',
        issuedate: '',
        returndate: ''
    });

    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
        setFormCriteria({
            userid: '',
            bookname: '',
            issuedate: '',
            returndate: ''
        });
    };

    const handleformChange = (e) => {
        const { name, value } = e.target;
        setFormCriteria(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            let url = `http://localhost:8000/`;

            if (formType === 'issuebook' && formCriteria.userid && formCriteria.bookname && formCriteria.issuedate) {
                url += `bookissued`;
            } else if (formType === 'returnbook' && formCriteria.userid && formCriteria.bookname && formCriteria.returndate) {
                url += `bookreturned`;
            }

            const response = await axios.post(url, formCriteria);
            alert(response.data.message);
            if(response.status===200){
                setFormCriteria({
                    userid: '',
                    bookname: '',
                    issuedate: '',
                    returndate: ''
                });
            }
        } catch (error) {
            console.log('Error ', error);
        }
    };

    
    return (
        <Container className="mt-4">
            <h1>Books Transaction</h1>

            {/* Step 1: Select Form Type */}
            <Form.Group className="mb-3">
                <Form.Label>Select Transaction Type</Form.Label>
                <Form.Control as="select" value={formType} onChange={handleFormTypeChange}>
                    <option value="">--Select--</option>
                    <option value="issuebook">Issue book</option>
                    <option value="returnbook">Return book</option>
                </Form.Control>
            </Form.Group>
            <Form onSubmit={handleForm}>
            {formType === 'issuebook' && (<>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name/User Id</Form.Label>
                        <Form.Control
                            type="text"
                            name="userid"
                            placeholder="Enter USer name or Id"
                            value={formCriteria.userid}
                            onChange={handleformChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="bookname"
                            placeholder="Enter book name"
                            value={formCriteria.bookname}
                            onChange={handleformChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Issue Date</Form.Label>
                        <Form.Control
                            type="text"
                            name="issuedate"
                            placeholder="2024-09-21"
                            value={formCriteria.issuedate}
                            onChange={handleformChange}
                            required
                        />
                    </Form.Group>
                    </>
                )}

                {formType === 'returnbook' && (<>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name/User Id</Form.Label>
                        <Form.Control
                            type="text"
                            name="userid"
                            placeholder="Enter USer name or Id"
                            value={formCriteria.userid}
                            onChange={handleformChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="bookname"
                            placeholder="Enter book name"
                            value={formCriteria.bookname}
                            onChange={handleformChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control
                            type="text"
                            name="returndate"
                            placeholder="2024-09-21"
                            value={formCriteria.returndate}
                            onChange={handleformChange}
                            required
                        />
                    </Form.Group>
                    </>
                )}
                {/* Submit Button */}
                <Button variant="dark" type="submit" disabled={!formType}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}