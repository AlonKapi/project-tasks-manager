import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container className="main-container" maxWidth="false" disableGutters>
        <AppProvider>
          <Header />
          <Main />
        </AppProvider>
        <Footer />
      </Container>
    </>
  );
}