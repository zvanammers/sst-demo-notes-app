import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import type { SavedLocationFields } from 'models/savedLocationFields';

interface body {
	name: string;
	time: number;
	temperature: number;
}

export const main = handler(async (event) => {
	// Section A: Input Checking
	let data: body = {
		name: '',
		time: 0,
		temperature: 0,
	};

	if (event.body != null) {
		data = JSON.parse(event.body);
	}

	if (data.name === '') {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: 'Cannot save location, name is required in body.',
			}),
		};
	}

	// Section B: Current Data Check
	const existingLocationData = await dynamoDb.get({
		TableName: Table.SavedLocations.tableName,
		Key: { name: data.name },
	});

	if (existingLocationData.Item !== undefined) {
		return {
			statusCode: 200,
			body: JSON.stringify({ message: `${data.name} is already bookmarked` }),
		};
	}

	// Section C: Create Params
	const SavedLocationsPutParams = {
		TableName: Table.SavedLocations.tableName,
		Item: {
			name: data.name,
			createdAt: Date.now(),
		},
	} as DocumentClient.Put;

	const countTable = await dynamoDb.get({
		TableName: Table.Counts.tableName,
		Key: { tableName: Table.SavedLocations.tableName },
	});

	const recordCount = (countTable.Item?.recordCount as number) ?? 0;
	if (recordCount >= 10) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				message: '10 locations have been bookmarked already',
			}),
		};
	}
	const recordVersion = (countTable.Item?.version as number) ?? 0;
	const conditionExpression =
		recordCount !== undefined ? '#version = :currentVersion' : undefined;

	const countTableParams = {
		TableName: Table.Counts.tableName,
		Key: { tableName: Table.SavedLocations.tableName },
		UpdateExpression:
			'set #recordCount = :newRecordCount, #version = :newVersion',
		ConditionExpression: conditionExpression,
		ExpressionAttributeNames: {
			'#recordCount': 'recordCount',
			'#version': 'version',
		},
		ExpressionAttributeValues: {
			':newRecordCount': recordCount + 1,
			':currentVersion': recordVersion,
			':newVersion': recordVersion + 1,
		},
	} as DocumentClient.Update;

	// Section D: DB Transaction
	try {
		const transaction = {
			TransactItems: [
				{ Put: SavedLocationsPutParams },
				{ Update: countTableParams },
			],
		} as DocumentClient.TransactWriteItemsInput;

		await dynamoDb.transactWriteItem(transaction);
	} catch (error) {
		throw new Error('Could not saved location');
	}

	return {
		statusCode: 200,
		body: JSON.stringify(SavedLocationsPutParams.Item as SavedLocationFields),
	};
});
