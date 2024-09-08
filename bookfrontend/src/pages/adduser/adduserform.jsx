import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default function Adduserform(){

    const [userdata,setUserdata] = useState({
        username: ''
    }) 

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUserdata(prevState =>({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        try{

            const response = await axios.post('http://localhost:8000/adduser',userdata);
            
            if(response.status===200){
                alert(response.data.message);
                setUserdata({
                    username: ''
                });
                window.location.reload();
            }

        }
        catch(error){
            if (error.response && error.response.status === 400) {
                alert('User already exists. Please try a different username.');
            }else{
                alert('failed to add user try again!!')
                console.log(error.message);
            }
        }
    }

    return(
        <><Container className="mt-4">
            <h1>Add User</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="user">
                <Form.Label column sm="2">
                <b>User Name :</b>
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name='username' value={userdata.username} placeholder="Vivek Patel" onChange={handleChange} required/>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Col sm="12">
                <Button type="submit" variant="dark" className="w-100">
                            Add User
                        </Button>
                </Col>
            </Form.Group>
            </Form>
        </Container>
        </>
    );
}