import { type StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';
import { StorageStack } from './StorageStack';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export function FrontendStack({ stack, app }: StackContext) {
	const { api } = use(ApiStack);
	const { bucket } = use(StorageStack);

	const certArn = ssm.StringParameter.fromStringParameterAttributes(
		stack,
		'certArn',
		{ parameterName: '/manual/ssl/weather_arn' },
	).stringValue;

	const site = new StaticSite(stack, 'ReactSite', {
		path: 'packages/frontend',
		buildCommand: 'pnpm run build',
		buildOutput: 'dist',
		environment: {
			VITE_API_URL: api.url,
			VITE_REGION: app.region,
			VITE_BUCKET: bucket.bucketName,
		},
		customDomain:
			app.stageName === 'prod'
				? {
						domainName: 'weather.zvanammers.com',
						isExternalDomain: true,
						cdk: {
							certificate: Certificate.fromCertificateArn(
								stack,
								'cert',
								certArn,
							),
						},
					}
				: undefined,
	});

	stack.addOutputs({
		SiteUrl: site.url,
	});
}
