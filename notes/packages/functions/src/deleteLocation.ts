import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler, { type ReturnWithStatus } from '@notes/core/handler';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const main = handler(async (event) => {
	// Section A: Validate Input
	if (event?.pathParameters?.id === undefined) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'Cannot save location, name is required in body.',
			}),
		} as ReturnWithStatus;
	}

	// Section B: Create Params
	const deleteParams: DocumentClient.DeleteItemInput = {
		TableName: Table.SavedLocations.tableName,
		Key: {
			name: event?.pathParameters?.id,
		},
	};

	const countTable = await dynamoDb.get({
		TableName: Table.Counts.tableName,
		Key: { tableName: Table.SavedLocations.tableName },
	});

	const recordVersion = countTable.Item?.version as number;
	const recordCount = countTable.Item?.recordCount as number;

	const countTableParams = {
		TableName: Table.Counts.tableName,
		Key: { tableName: Table.SavedLocations.tableName },
		UpdateExpression:
			'set #recordCount = :newRecordCount, #version = :newVersion',
		ConditionExpression: '#version = :currentVersion',
		ExpressionAttributeNames: {
			'#recordCount': 'recordCount',
			'#version': 'version',
		},
		ExpressionAttributeValues: {
			':newRecordCount': recordCount - 1,
			':currentVersion': recordVersion,
			':newVersion': recordVersion + 1,
		},
	} as DocumentClient.Update;

	// Section D: DB Transaction
	try {
		const transaction = {
			TransactItems: [{ Delete: deleteParams }, { Update: countTableParams }],
		} as DocumentClient.TransactWriteItemsInput;

		await dynamoDb.transactWriteItem(transaction);
	} catch (error) {
		throw new Error('Could not delete location');
	}

	// await dynamoDb.delete(deleteParams);

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: `${event?.pathParameters?.id} un-bookmarked`,
		}),
	};
});
