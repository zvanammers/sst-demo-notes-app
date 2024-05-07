import { randomUUID } from 'crypto';
import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';

export const main = handler(async (event) => {
	let data = {
		content: '',
		attachment: '',
	};

	if (event.body != null) {
		data = JSON.parse(event.body);
	}

	const params = {
		TableName: Table.Notes.tableName,
		Item: {
			userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
			noteId: randomUUID(),
			content: data.content,
			attachment: data.attachment,
			createAt: Date.now(),
		},
	};

	// await dynamoDb.put(params);

	return JSON.stringify(params.Item);
});
