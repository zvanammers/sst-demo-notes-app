import { it } from 'vitest';
import { initProject } from 'sst/project';
import { App, getStack } from 'sst/constructs';
import { Template } from 'aws-cdk-lib/assertions';
import { ApiStack } from '../ApiStack';
import { StorageStack } from '../StorageStack';

it('AiStack has correct attributes', async () => {
	await initProject({ stage: 'test' });
	const app = new App({ mode: 'dev' });
	// WHEN
	app.stack(StorageStack).stack(ApiStack);
	// THEN
	const template = Template.fromStack(getStack(ApiStack));
	template.resourceCountIs('AWS::Lambda::Function', 2);
});
