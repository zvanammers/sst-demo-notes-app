import { randomUUID } from 'node:crypto';
import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';

export const main = handler(async (event) => {
	let data = {
		dt: '',
		temp: '',
		icon: '',
	};

	if (event.body != null) {
		data = JSON.parse(event.body);
	}

	const params = {
		TableName: Table.Weather.tableName,
		Item: {
			dt: data.dt,
			weatherId: randomUUID(),
			temp: data.temp,
			icon: data.icon,
		},
	};

	await dynamoDb.put(params);

	return JSON.stringify(params.Item);
});
