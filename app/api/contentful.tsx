import { GraphQLClient } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getQuestions() {
  try {
    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/plvcdls54u22/environments/master';
    const accessToken = 'IWFYuFvpHUrQAA7QUXurjwMwu1izhNCxx8rEQcCnCHA';

    const query = `
      query utiFormCollectionQuery {
        utiFormCollection(order: indexOfQuestion_ASC) {
          items {
            sys {
              id
            }
            question
            type
            options
            sentence
          }
        }
      }
    `;

    const client = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await client.request(query);
    console.log('Data fetched from Contentful GraphQL API:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Contentful GraphQL API:', error);
  }
}

