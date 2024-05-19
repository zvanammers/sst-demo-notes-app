import { Api, Config, type StackContext, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
	const { notesTable, weatherTable } = use(StorageStack);

	const WEATHER_API_SECRET_KEY = new Config.Secret(
		stack,
		'WEATHER_API_SECRET_KEY',
	);

	const api = new Api(stack, 'Api', {
		cors: {
			allowMethods: ['GET', 'POST', 'PUT'],
		},
		defaults: {
			// authorizer: "iam",
			function: {
				bind: [notesTable, weatherTable, WEATHER_API_SECRET_KEY],
			},
		},
		routes: {
			'POST /notes': 'packages/functions/src/create.main',
			'GET /notes/{id}': 'packages/functions/src/get.main',
			'GET /notes': 'packages/functions/src/list.main',
			'PUT /notes/{id}': 'packages/functions/src/update.main',
			'POST /weather': 'packages/functions/src/weather/createWeather.main',
			'DELETE /notes/{id}': 'packages/functions/src/delete.main',
			'GET /weather': 'packages/functions/src/weather/getWeather.main',
		},
	});
	stack.addOutputs({
		ApiEndpoint: api.url,
	});
	return { api };
}
