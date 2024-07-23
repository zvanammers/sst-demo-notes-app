import { Api, Config, type StackContext, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
	const { table, locationsTable, dailyUpdateLimitsTable } = use(StorageStack);

	const WEATHER_API_SECRET_KEY = new Config.Secret(
		stack,
		'WEATHER_API_SECRET_KEY',
	);

	const api = new Api(stack, 'Api', {
		cors: {
			allowMethods: ['GET', 'POST'],
			// allowOrigins: [
			// 	'https://d1ms69azgi9yhj.cloudfront.net',
			// 	'https://weather.zvanammers.com',
			// 	'*localhost*',
			// ],
		},
		defaults: {
			throttle: {
				burst: 20,
				rate: 5,
			},
			// authorizer: "iam",
			function: {
				bind: [
					table,
					locationsTable,
					dailyUpdateLimitsTable,
					WEATHER_API_SECRET_KEY,
				],
			},
		},
		routes: {
			'GET /weather': 'packages/functions/src/weather.main',
			'POST /location': 'packages/functions/src/createLocation.main',
			'GET /locations': 'packages/functions/src/getLocations.main',
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	return { api };
}
