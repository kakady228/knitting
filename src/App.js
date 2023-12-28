import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Header from './assets/components/Header/Header';

import logo from './assets/icons/logo.png';
import logo_text_svg from './assets/icons/logo_text.svg';
import intro_background from './assets/icons/intro_background.png';

import './App.css';
import Footer from './assets/components/Footer/Footer';
import GeneralPage from "./assets/pages/GeneralPage/GeneralPage";
import AddLotPage from "./assets/pages/AddLotPage/AddLotPage";
import FavoritesPage from "./assets/pages/FavoritesPage/FavoritesPage";
import UserPage from "./assets/pages/UserPage/UserPage";
import LotPage from "./assets/pages/LotPage/LotPage";
import LoginPage from "./assets/pages/LoginPage/LoginPage";
import RegPage from "./assets/pages/RegPage/RegPage";
import { useState } from "react";
import LogoutPage from "./assets/pages/LogoutPage/LogoutPage";

export default function App(props)
{
  const intro_text = 'Более 1000 мастер-классов по вязанию на любой выбор';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header logo={logo} logo_text={logo_text_svg} />
        </header>
        
          <Routes>
            <Route path="/" element={<GeneralPage intro_background={intro_background} intro_text={intro_text} />} />
            <Route path="/lot" element={<LotPage />}/>
            <Route path="/add_lot" element={<AddLotPage />}/>
            <Route path="/favorites" element={<FavoritesPage />}/>
            <Route path="/profile" element={<UserPage />} />
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/reg" element={<RegPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>

        <Footer />
      </div>
    </BrowserRouter>

  );
}