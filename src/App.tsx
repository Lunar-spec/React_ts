import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './FirstPage'; 

import './App.css'
import Data from './Data';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/data" element={<Data />}/>
      </Routes>
    </Router>
  );
};

export default App;
