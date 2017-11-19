import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SweetAlert from 'sweetalert-react';
import './vendor/sweetalert.css';

let api = "http://wecameforthefood.me/api/";

function getList() {
  return fetch(`${api}list`).then(response => response.json());
}

function addItem(item) {
  return fetch(`${api}item`, {
    method: "POST",
    headers: {
      "Accept": "application/json, test/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

function deleteItem(id) {
  return fetch(`${api}item`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json, test/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

/**
 * seconds to time
 * @author macdja38
 * @param secs
 * @returns {string}
 */
function secondsToTime(secs) {
  secs = Math.round(secs);

  let days = Math.floor(secs / (60 * 60 * 24));

  let divisor_for_hours = secs % (24 * 60 * 60);
  let hours = Math.floor(divisor_for_hours / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);
  if (days > 0) {
    return days + " Day" + s(days) + " and " + hours + " Hour" + s(hours);
  }
  else if (hours > 0) {
    return hours + " Hour" + s(hours) + " and " + minutes + " Minute" + s(minutes);
  }
  else if (minutes > 0) {
    return minutes + " Minute" + s(minutes) + " and " + seconds + " Second" + s(seconds);
  }
  else {
    return seconds + " Second" + s(seconds);
  }
}

/**
 * returns s if seconds is greater than one.
 * @param {number} v
 * @returns {string}
 * @private
 */
function s(v) {
  return (v > 1) ? "s" : "";
}

function getTimeTill(expire) {
  let diff = Date.parse(expire) - Date.now();
  return secondsToTime(diff / 1000);
}

/**
 *
 * @param {Array<Object>} list
 */
function calcCost(list) {
  return list.reduce((total, current) => {
    return total + current.price;
  }, 0);
}

/**
 *
 * @param {Array<Object>} list
 */
function calcSpace(list) {
  return list.reduce((total, current) => {
    return total + current.size;
  }, 0)
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      addItem: false,
      sweetShow: false,
      sweetIcon: "warning",
      sweetText: "",
      sweetTitle: "",
      tempItem: { name: "", price: 0, size: 0, expire: "1 day" },
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateList = this.updateList.bind(this);
    this.createRow = this.createRow.bind(this);
    this.handleApiResponse = this.handleApiResponse.bind(this);
  }

  componentDidMount() {
    this.updateList();
  }

  updateList() {
    getList().then((list) => {
      this.setState({ list: list })
    })
  }

  createRow(item) {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.size}</td>
        <td>{getTimeTill(item.expire)}</td>
        <td>
          <button type="button" onClick={() => this.handleApiResponse(deleteItem(item.id))}>delete item</button>
        </td>
      </tr>);
  }

  subItem() {
    return {
      name: this.state.tempItem.name,
      price: (this.state.tempItem.price),
      size: this.state.tempItem.size,
      expire: this.state.tempItem.expire,
    }
  }

  handleApiResponse(response) {
    response.then(r => {
      if (r.status === 400) {
        throw r.text();
      }
      this.updateList();
    }).catch(text => {
      console.log(text);
      if (text.then) {
        text.then(errorMsg => {
          this.setState({ sweetShow: true, sweetTitle: "Invalid Input", sweetText: errorMsg });
        })
      }
    });
  }

  handleChange(prop) {
    return (event) => {
      this.setState({ tempItem: Object.assign({}, this.state.tempItem, { [prop]: event.target.value }) });
    };
  }

  handleSubmit(event) {
    console.log(this.subItem());
    this.handleApiResponse(addItem(this.subItem()));
    this.addItem();
    event.preventDefault();
  }

  addItem() {
    this.setState({ addItem: !this.state.addItem })
  }

  warnings(percentCalc) {
    if (percentCalc > 65 && percentCalc < 95)
      return <p>Storage Levels are Good</p>
    if (percentCalc >= 95)
      return <p>Storage levels are close to full</p>
    else
      return <p>Storage levels are close to Empty</p>


  }


  render() {
    var maxspace = 80000;

    var percentCalc = (calcSpace(this.state.list) / maxspace) * 100


    return (

      <div className="App">


        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">LUNAR STORAGE</h1>
        </header>

        <p className="App-intro">
          {this.warnings(percentCalc)}
        </p>


        <button type="button" onClick={this.addItem}>Add item</button>

        {this.state.addItem ?

          <form onSubmit={this.handleSubmit}>
            Item:
            <input type="text" name="item" value={this.state.tempItem.name} onChange={this.handleChange("name")} />
            Price:
            <input type="number" name="price" value={this.state.tempItem.price} onChange={this.handleChange("price")} />
            Size:
            <input type="number" name="Size" value={this.state.tempItem.size} onChange={this.handleChange("size")} />
            Expiry Date:
            <input type="text" name="Expiry Date" value={this.state.tempItem.expire}
                   onChange={this.handleChange("expire")} />
            <input type="submit" value="Submit" />
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

          {this.state.list.map(this.createRow)}
          </tbody>
        </table>

        <table border="1">
          <tbody>
          <tr>
            <td>Total Items</td>
            <td>Total space</td>
            <td>Space used</td>
            <td>total cost</td>
          </tr>
          <tr>
            <td>{this.state.list.length}</td>
            <td>{calcSpace(this.state.list)}</td>
            <td>{percentCalc}</td>
            <td>{calcCost(this.state.list)}</td>
          </tr>
          </tbody>
        </table>

        <div>
          <SweetAlert
            icon={this.state.sweetIcon}
            show={this.state.sweetShow}
            title={this.state.sweetTitle}
            text={this.state.sweetText}
            onConfirm={() => this.setState({ sweetShow: false })}
          />
        </div>
      </div>

    );
  }
}

export default App;
