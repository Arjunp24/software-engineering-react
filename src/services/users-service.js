import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "https://fathomless-lake-10838.herokuapp.com"
const USERS_API = `${BASE_URL}/api/users`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${BASE_URL}/users/${uid}`)
        .then(response => response.data);

export const findIdByUsername = (username) =>
    axios.get(`${USERS_API}/${username}/id`)
        .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

const service = {
  findAllUsers
}

export default service;