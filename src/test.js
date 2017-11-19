/**
 *
 * @param {Array<Object>} list
 */
function calcCost(list) {
  return list.reduce((total, current) => {
    return total + current.price;
  }, 0);
}

let api = "http://wecameforthefood.me/api/";

function getList() {
  return fetch(`${api}list`).then(response => response.json());
}

/**
 *
 * @param {Object} item
 * @returns {*}
 */
function addItem(item) {
  return fetch(`${api}`, {
    method: "POST",
    headers: {
      "Accept": "application/json, test/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

function deleteItem(id) {
  return fetch(`${api}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json, test/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
  });
}