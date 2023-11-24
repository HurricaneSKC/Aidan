import { GraphQLClient } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getQuestions(slug: string) {
  console.log("slug",slug)
  function snakeToCamel(str: string) {
    // Remove the "form" part and convert to camelCase
    return str.replace(/[-_](.)/g, (_: any, char: string) => char.toUpperCase()).replace("form", "");
  }

  try {
    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/plvcdls54u22/environments/master';
    const accessToken = 'IWFYuFvpHUrQAA7QUXurjwMwu1izhNCxx8rEQcCnCHA';
    
    const removeForm = slug.replace("-form", "");
    const FormCollection = snakeToCamel(removeForm);
    console.log("FormCollection", FormCollection);
    
    const query = `
      query ${FormCollection}FormCollectionQuery {
        ${FormCollection}FormCollection(order: indexOfQuestion_ASC) {
          items {
            sys {
              id
            }
            question
            type
            options
            sentence
            dependsOn
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

