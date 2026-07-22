import { Client, Databases, Query } from 'appwrite';

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const isAppwriteConfigured = () => {
  return Boolean(endpoint && projectId && endpoint.trim() !== '' && projectId.trim() !== '' && projectId !== 'your_appwrite_project_id_here');
};

const client = new Client();

if (isAppwriteConfigured()) {
  client
    .setEndpoint(endpoint)
    .setProject(projectId);
}

export const databases = new Databases(client);
export { Query };
export default client;
