import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';

export const main = handler(async (event) => {

	const keyParams = {
		TableName: Table.SavedLocations.tableName,
	};

	const keysInTable = await dynamoDb.scan(keyParams);

	return {
		statusCode: 200,
		body: JSON.stringify({
			items: keysInTable.Items,
			count: keysInTable.Count,
		}),
	};
});
