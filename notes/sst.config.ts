import { SSTConfig } from 'sst';
import { StorageStack } from './stacks/StorageStack';
import { ApiStack } from './stacks/ApiStack';
import { AuthStack } from './stacks/AuthStack';

export default {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	config(_input) {
		return {
			name: 'notes',
			region: 'us-east-1',
		};
	},
	stacks(app) {
		app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
	},
} satisfies SSTConfig;
