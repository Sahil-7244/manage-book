import { Container, Nav, Navbar } from 'react-bootstrap';
import bookLogo from '../../img/booklogo.png';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbarr() {
    const [activeItem, setActiveItem] = useState("Home");
    const location = useLocation(); // Use useLocation from react-router-dom

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setActiveItem("Home");
                break;
            case "/addbooks":
                setActiveItem("addbooks");
                break;
            case "/addusers":
                setActiveItem("addusers");
                break;
            case "/filter":
                setActiveItem("filter");
                break;
            case "/booktransection":
                setActiveItem("booktransection");
                break;
            case "/filterbooktransection":
                setActiveItem("filterbooktransection");
                break;
            default:
                setActiveItem("");
                break;
        }
    }, [location.pathname]); // Add location.pathname as a dependency to re-run on location change

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img style={{ margin: '0px', padding: '0px', objectFit: 'cover', height: '50px', width: '100px',cursor:'pointer' }} src={bookLogo} alt='booklogo' />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className={`nav-item ${activeItem === "Home" ? "active" : ""}`}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/addbooks" className={`nav-item ${activeItem === "addbooks" ? "active" : ""}`}>Add Book</Nav.Link>
                        <Nav.Link as={Link} to="/addusers" className={`nav-item ${activeItem === "addusers" ? "active" : ""}`}>Add User</Nav.Link>
                        <Nav.Link as={Link} to="/filter" className={`nav-item ${activeItem === "filter" ? "active" : ""}`}>Filter</Nav.Link>
                        <Nav.Link as={Link} to="/booktransection" className={`nav-item ${activeItem === "booktransection" ? "active" : ""}`}>Book Transection</Nav.Link>
                        <Nav.Link as={Link} to="/filterbooktransection" className={`nav-item ${activeItem === "filterbooktransection" ? "active" : ""}`}>Filter Book Transection</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
