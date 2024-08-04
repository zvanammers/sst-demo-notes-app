import { Api, Config, type StackContext, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
	const { table, locationsTable, countTable } = use(StorageStack);

	const WEATHER_API_SECRET_KEY = new Config.Secret(
		stack,
		'WEATHER_API_SECRET_KEY',
	);

	const api = new Api(stack, 'Api', {
		cors: {
			allowMethods: ['GET', 'POST', 'DELETE'],
			// allowOrigins: [
			// 	'https://d1ms69azgi9yhj.cloudfront.net',
			// 	'https://weather.zvanammers.com',

			// ],
		},
		defaults: {
			throttle: {
				burst: 20,
				rate: 5,
			},
			// authorizer: "iam",
			function: {
				bind: [table, locationsTable, countTable, WEATHER_API_SECRET_KEY],
			},
		},
		routes: {
			'GET /weather': 'packages/functions/src/getCurrentWeatherStats.main',
			'GET /forecast': 'packages/functions/src/getWeatherForecast.main',
			'POST /location': 'packages/functions/src/createLocation.main',
			'GET /locations': 'packages/functions/src/getLocations.main',
			'DELETE /location/{id}': 'packages/functions/src/deleteLocation.main',
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	return { api };
}
