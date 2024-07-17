import axios from 'axios';
import { SERVER_IP } from '../../config';

// Function to create audit log entry
export const createAuditLog = async ({ userid, username, userrole, action }) => {
  try {
    const response = await axios.post(`http://${SERVER_IP}:3004/api/Auditlog`, {
      userid,
      username,
      userrole,
      action,
    });

    console.log(response)
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};

export default createAuditLog;
