import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        {location.pathname === '/' && <Main />}
      </main>
      <Footer />
    </>
  );
}

export default App;