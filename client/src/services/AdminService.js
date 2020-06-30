const baseURL = 'http://localhost:3000/api/admin/';

export default {
  getAdmin(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  updateAdmin(id, updatedData){
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {'Content-Type': 'application/json'}
    })
  }
}
