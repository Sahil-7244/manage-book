import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

export default function Fetchusers(){
    const [userdata,setUserdata] = useState([]);
    
    const Fetchuserdata = async() =>{
        try{
            const response = await axios.get("https://manage-book-backend.onrender.com/fetchusers");
            setUserdata(response.data.Data);
        }
        catch(error){
            console.log(" failed Fatching users");
        }
    }

    useEffect(() => {
            Fetchuserdata();
        },[]
    )
    return(
        <>
            <Container className="mt-4">
                <h1>User List</h1>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userdata.map((a,i)=>{
                            return <tr key={i}>
                                <td>{a._id}</td>
                                <td>{a.username}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
