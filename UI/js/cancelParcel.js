window.onload = function(e) {
  const cancelParcel= () => {
    const basePath = "../../resources/pages";
    const parcelId = window.location.search.split('=').pop()
    fetch(`https://sendit-it.herokuapp.com/api/v1/parcels/${parcelId}/cancel`, {
      method: "PATCH",
      headers: {
        "Authorization": `${getUserToken()}`
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((res) =>{
      if(res.status == 200) window.location.href = `${basePath}/dashboard.html` 
    })
  }

  document.getElementById("cancel-order-button").addEventListener('click', cancelParcel);
}