import AWS from 'aws-sdk'
import { type DocumentClient } from 'aws-sdk/clients/dynamodb'

const client = new AWS.DynamoDB.DocumentClient()

export default {
  get: async (params: DocumentClient.GetItemInput) => await client.get(params).promise(),
  put: async (params: DocumentClient.PutItemInput) => await client.put(params).promise(),
  query: async (params: DocumentClient.QueryInput) => await client.query(params).promise(),
  update: async (params: DocumentClient.UpdateItemInput) => await client.update(params).promise(),
  delete: async (params: DocumentClient.DeleteItemInput) => await client.delete(params).promise()
}
