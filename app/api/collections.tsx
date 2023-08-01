const contentful = require('contentful');

interface SearchResult {
  name: string;
  description: string;
  url: string;
}

export default async function getUrls() {
  const SPACE_ID = 'plvcdls54u22';
  const ENVIRONMENT_ID = 'master';
  // const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;
  const accessToken = 'IWFYuFvpHUrQAA7QUXurjwMwu1izhNCxx8rEQcCnCHA';

  const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: accessToken,
    host: 'preview.contentful.com'
  });

  try {

    const collectionNames = await client.getContentTypes();
    console.log('Collection names:', collectionNames.items);
    let urlArray: SearchResult[]  = [];
    collectionNames.items.forEach((collection: any) => {
      console.log(collection.name);
      collection.url = collection.name.toLowerCase().replace(/\s/g, '-');
      urlArray = [...urlArray, {"url": `/${collection.url}`, "name": collection.name, "description": collection.description}]
    });
    console.log('URL array:', urlArray);

    return urlArray
    
  } catch (error) {
    console.error('Error retrieving collection names:', error);
    
  }
}
