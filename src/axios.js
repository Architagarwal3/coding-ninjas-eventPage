import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.codingninjas.com/api/v3",
});
export default instance;
