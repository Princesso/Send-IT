import Helper from '../js/helpers'

const getUserToken = () => {
  let tokenStr = window.localStorage.getItem('user_token')
  if(tokenStr) {
    return tokenStr
  } else {
    return "No token Found"
  }
}

const basePath = "../../resources/pages";

async function getParcels() {
  await fetch('https://sendit-it.herokuapp.com/api/v1/parcels', {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${getUserToken()}`
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then((res) => {
    if (res.status==204 || res.status == 400) {
      document.getElementById("dashboard-error").innerText = "You have not created any parcel delivery orders"
    }

    // we had stored the attributes to be filled in the rows using the data-attributes of the thead
    // so we grab the thead (for the data attributes)
    // and grab the tbody so we can append our new rows to them
    let tableHeadRef = document.getElementById('dashboard-table').getElementsByTagName('thead')[0]
    let tableRef = document.getElementById('dashboard-table').getElementsByTagName('tbody')[0]

    let totalOrders = 0
    let totalDelivered = 0
    let totalPending = 0
    let totalCanceled = 0
    
    // we sort the data by id so it lines up neatly in asc order :)
    // then we iterate
    res.data.sort((d1, d2) => d1.id - d2.id).forEach(order => {
      totalOrders += 1
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
      

      const decoded =  JSON.parse(atob(getUserToken().split('.')[1]));

      btn.onclick = (e) => {
        if (!decoded.isAdmin) tag.href = `${basePath}/order-detail.html?parcelId=${order.id}`
        else tag.href = `${basePath}/admin-action.html?parcelId=${order.id}`
      }

      document.getElementById('total-orders').innerHTML = totalOrders
      document.getElementById('total-delivered').innerHTML = totalDelivered
      document.getElementById('total-pending').innerHTML = totalPending
      document.getElementById('total-canceled').innerHTML = totalCanceled
      document.getElementById("username").innerHTML = ""
    })
  })
  .catch(error => console.error('Error:', error))
}

document.addEventListener( "DOMContentLoaded", getParcels, false );