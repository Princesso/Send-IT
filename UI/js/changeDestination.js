//refactor this
const getUserToken = () => {
  let tokenStr = window.localStorage.getItem('user_token')
  if(tokenStr) {
    return tokenStr
  } else {
    return "No token Found"
  }
}
window.onload = function(){
  async function changeDestination (e, d) {
    e.preventDefault()
    const newDestination = {
      toAddress: document.getElementById('new-destination').value
    } 
  const basePath = "../../resources/pages";
    const parcelId = window.location.search.split('=').pop()
    await fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelId}/destination`, {
      method: "PATCH",
      body: JSON.stringify(newDestination),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getUserToken()}`
      }
    })
    .then(function(response) {
      return response.json();
    })
  .then((res) => {
    if(res.status == 403) {
      document.getElementById("change-destination-error").innerText = "You do not own the parcel delivery order you are trying to change it's destination"
    }
    else if (res.status == 200) window.location.href = `${basePath}/dashboard.html` 
    else console.log("error")
  })
  }

  document.getElementById("update").addEventListener('click', changeDestination);
}