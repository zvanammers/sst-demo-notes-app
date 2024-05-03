import { Table } from 'sst/node/table';
import dynamoDb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import type { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const main = handler(async (event) => {
	const noteParams = {
		TableName: Table.Notes.tableName,
		Key: {
			userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
			noteId: event?.pathParameters?.id,
		},
	};

	const result = await dynamoDb.get(noteParams);

	if (!result) {
		return 'Item not found';
	}

	let data = {
		content: '',
		attachment: '',
	};

	if (event.body != null) {
		data = JSON.parse(event.body);
	}

	const updateParams: DocumentClient.UpdateItemInput = {
		TableName: Table.Notes.tableName,
		Key: {
			userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
			noteId: event?.pathParameters?.id,
		},
		UpdateExpression: 'SET content = :content, attachment = :attachment',
		ExpressionAttributeValues: {
			':attachment': data.attachment || null,
			':content': data.content || null,
		},
		ReturnValues: 'ALL_NEW',
	};

	return JSON.stringify(await dynamoDb.update(updateParams));
});
