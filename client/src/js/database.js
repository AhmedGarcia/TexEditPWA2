import { openDB } from 'idb';

const initdb = async () => //Opens a database named jate, creating it if it doesn't exist.
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {   //Updates the content stored in IndexedDB under a specific id.
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);  // Connect to the database and the version we want to use
  const tx = jateDb.transaction('jate', 'readwrite');   // Create a new transaction and specify the store and data privileges
  const store = tx.objectStore('jate'); // Open up the desired object store
  const request = store.put({ id: 1, value: content });  // Use the .add() method on the store and pass in the content
  const result = await request;  // Get confirmation of the request
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {    //Retrieves the content from IndexedDB to be displayed in the text editor.
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;  // Get confirmation of the request
  console.log('result.value', result);
  return result?.value;
};

initdb();