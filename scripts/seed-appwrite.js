/**
 * Appwrite Database Schema & Seeding Script for Intelligent Networks Lab (INL)
 * 
 * Usage:
 *   1. Make sure .env contains your credentials:
 *      VITE_APPWRITE_ENDPOINT=http://10.6.7.107/v1
 *      VITE_APPWRITE_PROJECT_ID=6a5f3b8d0037b4e0a298
 *      VITE_APPWRITE_DATABASE_ID=6a5f4aed002a0a785693
 *      APPWRITE_API_KEY=your_secret_api_key
 * 
 *   2. Run: pnpm run seed
 */

import { Client, Databases, ID } from 'appwrite';
import { 
  MOCK_PROJECTS, 
  MOCK_PUBLICATIONS, 
  MOCK_PEOPLE, 
  MOCK_NEWS 
} from '../src/data/mockData.js';

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || 'http://10.6.7.107/v1';
const projectId = process.env.VITE_APPWRITE_PROJECT_ID || '6a5f3b8d0037b4e0a298';
const databaseId = process.env.VITE_APPWRITE_DATABASE_ID || '6a5f4aed002a0a785693';
const apiKey = process.env.APPWRITE_API_KEY || '';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

console.log('====================================================');
console.log('🚀 Intelligent Networks Lab - Appwrite Seeder');
console.log('====================================================');
console.log(`Endpoint:    ${endpoint}`);
console.log(`Project ID:  ${projectId}`);
console.log(`Database ID: ${databaseId}`);
console.log(`API Key:     ${apiKey ? '✅ Provided (1-Click Auto-Schema Active)' : '⚠️ Not Set (Client Mode)'}`);
console.log('====================================================\n');

// REST API Helper for creating collections & attributes when API Key is provided
async function restRequest(path, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
    'x-appwrite-project': projectId,
  };
  if (apiKey) {
    headers['x-appwrite-key'] = apiKey;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(`${endpoint}${path}`, options);
    const data = await res.json();
    return { status: res.status, ok: res.ok, data };
  } catch (err) {
    return { status: 500, ok: false, data: { message: err.message } };
  }
}

// Schemas definitions for collections
const SCHEMAS = {
  projects: [
    { key: 'title', type: 'string', size: 255, required: true },
    { key: 'category', type: 'string', size: 100, required: true },
    { key: 'status', type: 'string', size: 50, required: true },
    { key: 'lead', type: 'string', size: 100, required: true },
    { key: 'description', type: 'string', size: 2000, required: false },
    { key: 'tags', type: 'string', size: 100, required: false, array: true },
    { key: 'featured', type: 'boolean', required: false },
    { key: 'image', type: 'string', size: 1000, required: false },
    { key: 'startDate', type: 'string', size: 50, required: false },
    { key: 'sponsor', type: 'string', size: 255, required: false },
  ],
  publications: [
    { key: 'title', type: 'string', size: 500, required: true },
    { key: 'authors', type: 'string', size: 100, required: false, array: true },
    { key: 'venue', type: 'string', size: 255, required: true },
    { key: 'year', type: 'integer', required: false },
    { key: 'type', type: 'string', size: 50, required: true },
    { key: 'doi', type: 'string', size: 255, required: false },
    { key: 'pdfUrl', type: 'string', size: 1000, required: false },
    { key: 'bibtex', type: 'string', size: 4000, required: false },
    { key: 'abstract', type: 'string', size: 4000, required: false },
    { key: 'tags', type: 'string', size: 100, required: false, array: true },
    { key: 'featured', type: 'boolean', required: false },
  ],
  people: [
    { key: 'name', type: 'string', size: 100, required: true },
    { key: 'role', type: 'string', size: 100, required: true },
    { key: 'category', type: 'string', size: 100, required: true },
    { key: 'title', type: 'string', size: 150, required: false },
    { key: 'avatar', type: 'string', size: 1000, required: false },
    { key: 'bio', type: 'string', size: 2000, required: false },
    { key: 'researchInterests', type: 'string', size: 100, required: false, array: true },
    { key: 'scholar', type: 'string', size: 1000, required: false },
    { key: 'github', type: 'string', size: 1000, required: false },
    { key: 'email', type: 'string', size: 255, required: false },
    { key: 'office', type: 'string', size: 100, required: false },
  ],
  news: [
    { key: 'title', type: 'string', size: 255, required: true },
    { key: 'date', type: 'string', size: 50, required: true },
    { key: 'category', type: 'string', size: 100, required: true },
    { key: 'summary', type: 'string', size: 2000, required: false },
    { key: 'content', type: 'string', size: 4000, required: false },
  ]
};

async function autoCreateSchema() {
  if (!apiKey) {
    console.log('⚠️ Notice: APPWRITE_API_KEY is not set in .env.');
    console.log('👉 To auto-create attributes (title, name, authors, etc.) automatically with 1 click:');
    console.log('   1. In Appwrite Console (http://10.6.7.107), go to Overview -> API Keys -> Create API Key.');
    console.log('   2. Select scopes: collections.write, attributes.write, documents.write.');
    console.log('   3. Add APPWRITE_API_KEY=your_key into .env and run pnpm run seed again.\n');
    return false;
  }

  console.log('🛠️ Creating Collections & Attributes via REST API...');

  for (const [colId, attributes] of Object.entries(SCHEMAS)) {
    console.log(`\n📌 Collection '${colId}':`);

    // 1. Create collection if not exists
    const createCol = await restRequest(`/databases/${databaseId}/collections`, 'POST', {
      collectionId: colId,
      name: colId,
      permissions: ['read("any")', 'create("any")', 'update("any")', 'delete("any")'],
      documentSecurity: false,
    });

    if (createCol.ok) {
      console.log(`  ✓ Created collection '${colId}'`);
    } else if (createCol.data?.type === 'collection_already_exists') {
      console.log(`  ✓ Collection '${colId}' exists`);
    } else {
      console.log(`  ℹ️ Collection note:`, createCol.data?.message || createCol.data);
    }

    // 2. Create attributes
    for (const attr of attributes) {
      let endpointPath = `/databases/${databaseId}/collections/${colId}/attributes/string`;
      let payload = { key: attr.key, required: attr.required, array: Boolean(attr.array) };

      if (attr.type === 'string') {
        payload.size = attr.size || 255;
      } else if (attr.type === 'integer') {
        endpointPath = `/databases/${databaseId}/collections/${colId}/attributes/integer`;
      } else if (attr.type === 'boolean') {
        endpointPath = `/databases/${databaseId}/collections/${colId}/attributes/boolean`;
      }

      const attrRes = await restRequest(endpointPath, 'POST', payload);
      if (attrRes.ok) {
        console.log(`    + Created attribute '${attr.key}' (${attr.type}${attr.array ? ' array' : ''})`);
      } else if (attrRes.data?.type === 'attribute_already_exists') {
        console.log(`    = Attribute '${attr.key}' exists`);
      } else {
        console.log(`    ⚠️ Attribute '${attr.key}':`, attrRes.data?.message || attrRes.data);
      }
    }
  }

  console.log('\n⏳ Waiting 5 seconds for Appwrite attribute workers to complete indexing...');
  await new Promise(r => setTimeout(r, 5000));
  return true;
}

// Client SDK document seeding
const client = new Client();
client.setEndpoint(endpoint).setProject(projectId);
const databases = new Databases(client);

async function seedCollectionDocs(collectionId, items) {
  console.log(`\n📄 Populating documents in collection '${collectionId}'...`);
  let successCount = 0;

  for (const item of items) {
    const { $id, ...payload } = item;
    try {
      await databases.createDocument(databaseId, collectionId, ID.unique(), payload);
      console.log(`  ✓ Inserted: ${payload.title || payload.name}`);
      successCount++;
    } catch (err) {
      console.warn(`  ❌ Document insertion failed for '${payload.title || payload.name}':`, err.message);
    }
  }

  console.log(`  📊 Summary for '${collectionId}': ${successCount}/${items.length} inserted.`);
}

async function run() {
  await autoCreateSchema();

  console.log('\n🌱 Starting document population...');
  await seedCollectionDocs('projects', MOCK_PROJECTS);
  await seedCollectionDocs('publications', MOCK_PUBLICATIONS);
  await seedCollectionDocs('people', MOCK_PEOPLE);
  await seedCollectionDocs('news', MOCK_NEWS);

  console.log('\n====================================================');
  console.log('🎉 Appwrite seeding process completed!');
  console.log('====================================================');
}

run();
