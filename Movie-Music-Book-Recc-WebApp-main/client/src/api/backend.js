import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3010' });

export const signIn = (email, password) => API.post('/signin', { email: email, password: password});
export const signUp = (userName, email, password) => API.post('/signup', { userName: userName, email: email, password: password});

export const createWatchCount = (email) => API.post('/createWatchCount', { email: email });
export const getReccGenre = (email) => API.post('/getPerRecc', { email: email })
export const doesWatchCountExist = (email) => API.post("/doesWatchListExist", { email: email });
