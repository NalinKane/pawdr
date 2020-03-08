import axios from "axios";

export default {

  getBooks: function() {
    return axios.get("/api/profile");
  },
  
  getBook: function(id) {
    return axios.get("/api/profile/" + id);
  },
  
  deleteBook: function(id) {
    return axios.delete("/api/profile/" + id);
  },
 
  saveBook: function(profileData) {
    return axios.post("/api/profile", bookData);
  }
};
