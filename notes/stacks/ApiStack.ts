import { Api, Config, type StackContext, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
	const { table } = use(StorageStack);

	const WEATHER_API_SECRET_KEY = new Config.Secret(
		stack,
		'WEATHER_API_SECRET_KEY',
	);

	const api = new Api(stack, 'Api', {
		cors: {
			allowMethods: ['GET'],
			allowOrigins: ['https://d1ms69azgi9yhj.cloudfront.net'], 
		},
		defaults: {
			// authorizer: "iam",
			function: {
				bind: [table, WEATHER_API_SECRET_KEY],
			},
		},
		routes: {
			'GET /weather': 'packages/functions/src/weather.main',
		},
	});
	stack.addOutputs({
		ApiEndpoint: api.url,
	});
	return { api };
}
