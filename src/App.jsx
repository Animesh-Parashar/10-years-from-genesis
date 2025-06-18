import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutusPage from './pages/AboutusPage/AboutusPage.jsx';
import TimelinePage from './pages/TimelinePage/TimelinePage'; 
import TriviaPage from './pages/TriviaPage/TriviaPage.jsx';
import './App.css'; // For global app layout styles if needed
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material'; // Example icons for a nav
import MerchPage from './pages/MerchPage/MerchPage.jsx';
import ScrollToTopButton from './components/moveToTop'; // Import the scroll to top button

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <Link to="/" className="nav-logo">ETH10Y</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/timeline">Timeline</Link>
            <Link to="/merchandise">Merchandise</Link>
            <Link to="/trivia">Trivia</Link>
            
            <Link to="/about">About</Link> 
            
            {/* <Link to="/about">About</Link> */}
            {/* <Link to="/events">Events</Link> */}
          </div>
          <div className="social-links-nav">
            <a href="https://github.com/ethereum" target="_blank" rel="noopener noreferrer"><GitHub /></a>
            <a href="https://twitter.com/ethereum" target="_blank" rel="noopener noreferrer"><Twitter /></a>
            <a href="https://www.linkedin.com/company/ethereum" target="_blank" rel="noopener noreferrer"><LinkedIn /></a>
          </div>
        </nav>

        <main className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/merchandise" element={<MerchPage />} />

            <Route path="/about" element={<AboutusPage />} /> 
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/trivia/*" element={<TriviaPage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            {/* Add more routes here */}
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Ethereum 10 Year Anniversary. Decentralize Everything!</p>
        </footer>
      </div>
      <ScrollToTopButton />
    </Router>
  );

}

export default App;