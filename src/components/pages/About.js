import React from 'react';
import Header from './Header';
import Card from '../shared/Card';
import Footer from './Footer';
import Navigation from './Navigation';

export default function About() {
  return (
    <>
    <Header />
    <Navigation />
    <div className="container">
      <Card>
          <h1>About this application</h1>
          <p>This Movies List Application allows users to view Movie information and create a custom favorite's list.</p>
      </Card>
  </div>
  <Footer />
  </>
  )
}
