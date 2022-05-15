import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import AddVideo from "./components/AddVideo";
import LandingVideo from './components/LandingVideo';
import Footer from './components/views/Footer/Footer';
import NavBar from './components/views/NavBar/NavBar';
import DetailVideoPage from './components/views/DetailVideoPage/DetailVideoPage';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
    <NavBar />
    <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
    <Router>
      <Routes>
      <Route path='/nav' element={<NavBar />} />
      <Route path='*' element={<LandingVideo />} />
      <Route exact path="/video/:videoId" element={<DetailVideoPage />} />
        <Route path='/add' element={<AddVideo />} />
      </Routes>
    </Router>
    <Footer />
    </div>
    </>
  );
}

export default App;
