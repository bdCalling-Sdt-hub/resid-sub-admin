import axios from 'axios';

const baseAxios = axios.create({

  baseURL: "http://resid-plus.com",
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

export default baseAxios;