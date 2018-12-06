const basePath = "../../resources/pages";

const getUserToken = () => {
  let tokenStr = document.cookie.split(';')
    .find(c => c.split('=')[0] == ' user_token')
  if(tokenStr) {
    return tokenStr.split('=').pop()
  }
}

async function submitLoginForm(e, d) {
  e.preventDefault()
  const loginInfo = {
    email: document.getElementById('email').value,
    password: document.getElementById("password").value
  }
 await fetch('https://sendit-it.herokuapp.com/api/v1/auth/login', {
    method: "POST",
    body: JSON.stringify(loginInfo),
    headers: {"Content-Type": "application/json"}
  })
  .then(function(response) {
      return response.json();
    })
  .then((res) => {
    console.log(res)
    debugger
    if(!res.token) throw('no token in response')
    //document.cookie = `user_token=${res.token}`
    window.localStorage.setItem('user_token', res.token)
    window.location.href = `${basePath}/dashboard.html` 
  })
  .catch(error => {
    console.log(error)
  })
}

function getParcels() {
  fetch('https://sendit-it.herokuapp.com/api/v1/users/1/parcels')
  .then(function(response) {
    return response.json();
  })
  .then((res) => {
    // we had stored the attributes to be filled in the rows using the data-attributes of the thead
    // so we grab the thead (for the data attributes)
    // and grab the tbody so we can append our new rows to them
    let tableHeadRef = document.getElementById('dashboard-table').getElementsByTagName('thead')[0]
    let tableRef = document.getElementById('dashboard-table').getElementsByTagName('tbody')[0]
    
    // we sort the data by id so it lines up neatly in asc order :)
    // then we iterate
    res.data.sort((d1, d2) => d1.id - d2.id).forEach(order => {

      // we create a new row on the body of the table
      let newRow   = tableRef.insertRow(tableRef.rows.length);

      // we want to create as many cells as there are on the header
      // notice we are leaving out the last row? For our button later :)
      for(var i = 0;i < tableHeadRef.rows[0].cells.length - 1;i++) {
        let newCell = newRow.insertCell(i);
        
        // text to be inserted in the cell?
        // the order is an object in the format {id: 1, currentlocation: 'lagos', toaddress: 'Aba', ...}
        // for the first cell in the header 
        let newText = document.createTextNode(order[tableHeadRef.rows[0].cells[i].dataset.name])
        newCell.appendChild(newText);
      }
      
      let btn = document.createElement('button');
      btn.innerText = 'View'
      let tag = document.createElement('a')
      tag.appendChild(btn)
      let newCell  = newRow.insertCell(i);
      newCell.appendChild(tag);
    })
  })
  .catch(error => console.error('Error:', error))
}

document.getElementById("submitBtn").addEventListener("click", submitLoginForm);
//document.getElementById("registerBtn").addEventListener("click", submitRegistrationForm);