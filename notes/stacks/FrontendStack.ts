import { type StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';
import { StorageStack } from './StorageStack';

export function FrontendStack({ stack, app }: StackContext) {
	const { api } = use(ApiStack);
	const { auth } = use(AuthStack);
	const { bucket } = use(StorageStack);

	const site = new StaticSite(stack, 'ReactSite', {
		path: 'packages/frontend',
		buildCommand: 'pnpm run build',
		buildOutput: 'dist',
		environment: {
			VITE_API_URL: api.url,
			VITE_REGION: app.region,
			VITE_BUCKET: bucket.bucketName,
		},
	});

	stack.addOutputs({
		SiteUrl: site.url,
	});
}
