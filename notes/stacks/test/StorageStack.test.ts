import { it } from 'vitest';
import { initProject } from 'sst/project';
import { App, getStack } from 'sst/constructs';
import { StorageStack } from '../StorageStack';
import { Match, Template } from 'aws-cdk-lib/assertions';

it('StorageStack has correct attributes', async () => {
	await initProject({ stage: 'test' });
	const app = new App({ mode: 'deploy' });
	// WHEN
	app.stack(StorageStack);
	// THEN
	const template = Template.fromStack(getStack(StorageStack));
	template.hasResourceProperties('AWS::DynamoDB::Table', {
		TableName: 'dev-my-app-Notes',
		KeySchema: [
			{
				AttributeName: 'userId',
				KeyType: Match.anyValue(),
			},
			{
				AttributeName: 'noteId',
				KeyType: Match.anyValue(),
			},
		],
		GlobalSecondaryIndexes: Match.absent(),
		LocalSecondaryIndexes: Match.absent(),
	});
});
