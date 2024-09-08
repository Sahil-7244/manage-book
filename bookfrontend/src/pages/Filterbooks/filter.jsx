import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarr from '../reusedcomponent/navbar';
import FilterBooks from './findbookbyfilter';

export default function Filter(){
    return(
        <>
            <Navbarr/>
            <FilterBooks/>
        </>
    );
}