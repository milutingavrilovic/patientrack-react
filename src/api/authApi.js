import axios from 'axios';

const ROOT_URL = 'http://localhost:3090';

class AuthApi {
  static signUp(user) {
    return axios.post(`${ROOT_URL}/signup`, {...user});
  }

  static signIn(user) {
    return axios.post(`${ROOT_URL}/signin`, {...user});
  }
}

export default AuthApi;