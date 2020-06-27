const baseURL = 'http://localhost:3000/api/games/';

export default {
  getPlanets(){
    return fetch(baseURL)
    .then(res => res.json())
  }
}
