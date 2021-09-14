import React from 'react';
import Header from "../Header/Header";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <>
      <Header loggedIn={loggedIn} />
    </>
  );
}

export default App;