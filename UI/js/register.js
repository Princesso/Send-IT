const basePath = "../../resources/pages";

async function submitRegistrationForm(e, d) {
  e.preventDefault()
  const registrationInfo = {
    email: document.getElementById('email').value,
    password: document.getElementById("password").value,
    username: document.getElementById("username").value,
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
  }
  await fetch('https://sendit-it.herokuapp.com/api/v1/auth/signup', {
    method: "POST",
    body: JSON.stringify(registrationInfo),
    headers: {"Content-Type": "application/json"}
  })
  .then(function(response) {
      return response.json();
    })
  .then((res) => {
    if(res.status==200) window.location.href = `${basePath}/login.html`  
    else {
      debugger
      let newParagraph = document.createElement("p")
      let textNode = document.createTextNode("An error occurred while trying to register you")
      newParagraph.appendChild(textNode)

      let div = document.getElementById("register")
      div.insertBefore(newParagraph, div.childNodes[0])
      newParagraph.style.color('red')
    }
  })
  .catch(error => {
    console.log(error)
  })
}

document.getElementById("registerBtn").addEventListener("click", submitRegistrationForm);