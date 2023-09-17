import axios from 'axios';
import { stringify } from 'postcss';

interface ComponentArgs{
    email: string,
    password: string
}

export function setApiAxiosHeader(){
  const storedApiToken = localStorage.getItem('apiToken');

  if (storedApiToken) {
    console.log('API token exists:', storedApiToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedApiToken}`;
  } else {
    console.log("MISTAKE NO API KEY");
    }
}

export async function checkApiToken(email, password) {
  const storedApiToken = localStorage.getItem('apiToken');

  if (storedApiToken) {
    console.log('API token exists:', storedApiToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedApiToken}`;
  } else {
    console.log('API token does not exist', email, password);
    try {
      const response = await axios.post('/api/create-api-token', {
        email: email,
        password: password,
      });

      const newApiToken = response.data.token;

      localStorage.setItem('apiToken', newApiToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newApiToken}`;
    } catch (error) {
      console.error('Error creating API token:', error);
    }
  }
}

export async function deleteAllApiTokens() {
  try {
    setApiAxiosHeader();
    const response = await axios.get('/api/delete-tokens');

    // Clean up local storage and axios headers
    localStorage.removeItem('apiToken');
    delete axios.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Error deleting API tokens:', error);
  }
}