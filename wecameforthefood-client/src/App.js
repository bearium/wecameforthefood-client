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

    this.state = {list: [],addItem : false, tempItem: {name:"", price:0, }};
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    getList().then((list) => {
      this.setState({list: list})

    })
  }

  addItem() {
    this.setState({addItem: !this.state.addItem})
  }
  subItem(){

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

        <button type="button" onClick={this.addItem}>Add item</button>

        {this.state.addItem ?

          <form action="">
            Iteam:
            <input type="text" name="item" value=""/>
            Price:
            <input type="text" name="price" value=""/>
            Size:
            <input type="text" name="Size" value=""/>
            Expiry Date:
            <input type="text" name="Expiry Date" value=""/>
            <input type="submit" value="Submit"/>
          </form>
          : ""
        }



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
