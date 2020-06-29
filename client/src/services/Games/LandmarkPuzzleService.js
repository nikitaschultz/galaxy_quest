const baseURL = 'http://localhost:3000/api/landmarks';

export default {
  getLandmarks(){
    return fetch(baseURL)
    .then(res => res.json())
  }
}
