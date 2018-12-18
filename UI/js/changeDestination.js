  //refactor this
const getUserToken = () => {
  let tokenStr = window.localStorage.getItem('user_token')
  if(tokenStr) {
    return tokenStr
  } else {
    return "No token Found"
  }
}

const newDestination = {
  toAddress: document.getElementById('new-destination').value
}
const changeDestination = () => {
  debugger
  console.log(newDestination.toAddress) 
const basePath = "../../resources/pages";
  const parcelId = window.location.search.split('=').pop()
  fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelId}/destination`, {
    method: "PATCH",
    body: JSON.stringify(newDestination),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${getUserToken()}`
    }
  })
  .then((response) => {
    //console.log(response)
    return response.json()
  })
  .then((res) => {
    //if(res.status == 200) window.location.href = `${basePath}/dashboard.html` 
  })
}

document.getElementById("update").addEventListener('click', changeDestination);