import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function getList() {
  return Promise.resolve([{id: "fdjsaf", expire: 32432423,name: "food", price: 12,size: 20}, {id: "fdjsaf", expire: 32432423,name: "water", price: 12,size: 20}])

}


function createRow(item) {
  return (<tr>
    <td>{item.name}</td>
    <td>{item.price}</td>
    <td>{item.size}</td>
    <td>{item.expire}</td>
  </tr>)


}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {list: []}
  }

  componentDidMount() {
    getList().then((list) => {
      this.setState({list: list})
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
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

          {this.state.list.map(createRow)}
          </tbody>
        </table>
      </div>

    );
  }
}

export default App;
