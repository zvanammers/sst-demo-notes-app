import { type StackContext, StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';
import { StorageStack } from './StorageStack';
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { SystemsManager } from "aws-cdk-lib/aws-systemsmanagersap";

export function FrontendStack({ stack, app }: StackContext) {
	const { api } = use(ApiStack);
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
    customDomain: {
      domainName: "weather.zvanammers.com",
      isExternalDomain: true,
      cdk: {
        certificate: Certificate.fromCertificateArn(stack, "cert", "arn:aws:acm:us-east-1:381492042854:certificate/4db188e9-a96f-4e6c-8c75-22eff768a0ea")
      }
    }
	});

	stack.addOutputs({
		SiteUrl: site.url,
	});
}
