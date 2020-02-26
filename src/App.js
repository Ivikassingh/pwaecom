import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Componets/Header';
import Search from './Componets/Search';
import Product from './Componets/Product';

function App() {
  return (
    <div>
       <Header/>
       <Search/>
       <Product/>
    </div>
  );
}

export default App;
