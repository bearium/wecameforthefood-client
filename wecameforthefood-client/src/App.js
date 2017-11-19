import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getlist() {
  return Promise.resolve([{id: "fdjsaf", date: 32432423}, {id: "fdjsaf", date: 32432423}])

}





class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <table border="1">
        <tbody>
        <tr>
        <td>Item</td>
        <td>Price</td>
        <td>Volume</td>
        <td>Expiry Date</td>
        </tr>
        </tbody>
        </table>








      </div>

    );
  }
}

export default App;
