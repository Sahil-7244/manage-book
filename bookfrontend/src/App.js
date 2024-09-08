import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Addbooks from './pages/addbooks/addbooks';
import Addusers from './pages/adduser/addusers';
import Filter from './pages/Filterbooks/filter';
import Home from './pages/home/home';
import BookTransection from './pages/booktransection/booktransection';
import MainFiltertransaction from './pages/filterbooktransaction/maintransectionfilterpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/addbooks' element={<Addbooks />} />
        <Route path='/addusers' element={<Addusers />} />
        <Route path='/filter' element={<Filter />} />
        <Route path='/booktransection' element={<BookTransection />} />
        <Route path='/filterbooktransection' element={<MainFiltertransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
