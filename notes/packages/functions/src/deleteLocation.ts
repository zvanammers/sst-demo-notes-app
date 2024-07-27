import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler, { ReturnWithStatus } from '@notes/core/handler';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const main = handler(async (event) => {
	if (event?.pathParameters?.id === undefined) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'Cannot save location, name is required in body.',
			} ),
		} as ReturnWithStatus;
	}
		
	const deleteParams: DocumentClient.DeleteItemInput = {
		TableName: Table.SavedLocations.tableName,
		Key: {
			name: event?.pathParameters?.id
		},
	};

	await dynamoDb.delete(deleteParams);

	return {
		statusCode: 200,
		body: JSON.stringify({ message: event?.pathParameters?.id  + ' un-bookmarked' }),
	};
});
