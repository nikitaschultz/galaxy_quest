const baseURL = 'http://localhost:3000/api/profiles/';

export default {
  getProfiles(){
    return fetch(baseURL)
    .then(res => res.json())
  }


}
