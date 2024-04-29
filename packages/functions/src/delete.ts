import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { type DocumentClient } from 'aws-sdk/clients/dynamodb';

export const main = handler(async (event) => {
  const deleteParams: DocumentClient.DeleteItemInput = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: '123',
      noteId: event?.pathParameters?.id,
    },
  };

  await dynamoDb.delete(deleteParams);

  return JSON.stringify({ status: true });
});
