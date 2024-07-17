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
    console.error('Error creating audit log:', error);
    throw error;
  }
};

export default createAuditLog;
