const baseURL = 'http://localhost:3000/api/profiles/';

export default {
  getProfiles(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  postProfile(profile){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  }
}
