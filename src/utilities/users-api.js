// import axios from 'axios';

// // This is the base path of the Express route we'll define
// const BASE_URL = '/api/users';

// export async function signUp(userData) {
//   // Fetch uses an options object as a second arg to make requests
//   // other than basic GET requests, include data, headers, etc.

//   // FETCH
//   //   const res = await fetch(BASE_URL, {
//   //     method: 'POST',
//   //     headers: { 'Content-Type': 'application/json' },
//   //     // Fetch requires data payloads to be stringified
//   //     // and assigned to a body property on the options object
//   //     body: JSON.stringify(userData)
//   //   });

//   // AXIOS
//   const res = await axios.post(BASE_URL, userData, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // Check if request was successful
//   if (res.status === 200) {
//     // res.json() will resolve to the JWT
//     return res.data;
//   } else {
//     throw new Error('Invalid Sign Up');
//   }
// }

// export async function login(credentials) {
//   // AXIOS
//   const res = await axios.post(`${BASE_URL}/login`, credentials, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // Check if request was successful
//   if (res.status === 200) {
//     // res.json() will resolve to the JWT
//     return res.data;
//   } else {
//     throw new Error('Invalid Login');
//   }
// }
import { getToken } from './users-service';
const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

/*--- Helper Functions ---*/

async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
