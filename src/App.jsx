import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WhyChooseSection from './components/WhyChooseSection';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; // 
import SampleBookSection from './components/SampleBookSection';
import Footer from "./components/Footer";
import PostBookPage from "./pages/PostBookPage";
import MarketplacePage from "./pages/MarketplacePage";
import ActualListingsSection from './components/ActualListingSection';
import UserProfilePage from './pages/UserProfilePage';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <>
    <Navbar />

    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <>         
            <SearchBar />
            <WhyChooseSection />
            <SampleBookSection />
            <ActualListingsSection/>
            <Footer />
          </>
        }
      />

      {/*Pages Route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} /> 
      <Route path="/post-book" element={<PostBookPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/user-profile/:userId" element={<UserProfilePage />} />
      <Route path="/profile" element={<UserProfilePage />} /> 
      <Route path="/verify-email" element={<VerifyEmail />} />


    </Routes>
    </>
  );
}

export default App;
