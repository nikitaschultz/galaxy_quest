const baseURL = 'http://localhost:3000/api/animalsmatch';

export default {
  getAnimals(){
    return fetch(baseURL)
    .then(res => res.json())
  }
}
