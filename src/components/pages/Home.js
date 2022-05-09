import React from 'react';
import Movies from '../Movies/Movies';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

export default function Home() {
    return (
      <>
        <Header />
        <Navigation />
        <div className="container">
          <Movies />
      </div>
      <Footer />
      </>
  )
}
