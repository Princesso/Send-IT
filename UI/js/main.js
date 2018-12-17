const getUserToken = () => {
  let tokenStr = window.localStorage.getItem('user_token')
  if(tokenStr) {
    return tokenStr
  } else {
    return "No token Found"
  }
}
