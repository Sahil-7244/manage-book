import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarr from '../reusedcomponent/navbar';
import Adduserform from './adduserform';
import Fetchusers from './userlist';


export default function Addusers(){
    return(
        <>
            <Navbarr/>
            <Adduserform/>
            <Fetchusers/>
        </>
    );
}