const baseURL = 'http://localhost:3000/api/games/landmarkpuzzle';

export default {
  getLandmarks(){
    return fetch(baseURL)
    .then(res => res.json())
  }
}
