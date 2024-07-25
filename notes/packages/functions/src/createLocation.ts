import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';

interface body {
	name: string;
	time: number;
	temperature: number;
}

export const main = handler(async (event) => {
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

	const keyParams = {
		TableName: Table.savedLocations.tableName,
		Key: { name: data.name },
	};

	const keyInTable = await dynamoDb.get(keyParams);

	if (keyInTable.Item !== undefined) {
		return {
			statusCode: 200,
			body: JSON.stringify({ message: data.name + ' is already bookmarked' }),
		};
	}

	const params = {
		TableName: Table.savedLocations.tableName,
		Item: {
			name: data.name,
			createdAt: Date.now(),
		},
	};

	await dynamoDb.put(params);

	return {
		statusCode: 200,
		body: JSON.stringify(params.Item),
	};
});
