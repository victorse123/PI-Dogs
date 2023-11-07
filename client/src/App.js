import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import About from './components/about/about';
import Adopt from './components/adopt/adopt';
import BreedDetails from './components/breedDetails/breedDetails';
import BreedForm from './components/breedForm/breedForm';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Home from './components/home/home';
import Landing from './components/landingPage/landing';

function App() {
  return (
    <div className="App">
      <Header />
      <Route path='/' exact component={Landing}/>
      <Route path='/home' component={Home}/>
      <Route path='/breed/:id' component={BreedDetails}/>
      <Route path='/create' component={BreedForm}/>
      <Route path='/adopt' component={Adopt}/>
      <Route path='/about' component={About}/>
      <Footer />
    </div>
  );
}

export default App;