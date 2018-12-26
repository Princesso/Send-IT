class FrontEndHelpers {
  static getUserTokens() {
    const userToken = localStorage.getItem('user_token');
    if (!userToken) throw("No user token found")
    return userToken;
  }

  static getTokenFields() {
    const userToken = localStorage.getItem('user_token');
    const decoded =  JSON.parse(atob(userToken.split('.')[1]));
    return decoded;
  }

  static pagination() {

  }
}

export default FrontEndHelpers