import React from 'react';
import Movies from '../Movies/Movies';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import Favorites from './Favorites';

export default function Home() {
    return (
      <>
        <Header />
        <Navigation />
        <div className="container">
          <Movies />
          <Favorites />
      </div>
      <Footer />
      </>
  )
}
