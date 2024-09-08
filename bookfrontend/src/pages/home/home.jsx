import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarr from '../reusedcomponent/navbar';
import Bookslist from './Bookslist';

export default function Home(){

    return(
        <>
            <Navbarr/>
            <Bookslist/>
        </>
    );
}