import { Api, Config, type StackContext, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  const WEATHER_API_SECRET_KEY = new Config.Secret(stack, 'WEATHER_API_SECRET_KEY');

  const api = new Api(stack, 'Api', {
    defaults: {
      // authorizer: "iam",
      function: {
        bind: [table, WEATHER_API_SECRET_KEY],
      },
    },
    routes: {
      'POST /notes': 'packages/functions/src/create.main',
      'GET /notes/{id}': 'packages/functions/src/get.main',
      'GET /notes': 'packages/functions/src/list.main',
      'PUT /notes/{id}': 'packages/functions/src/update.main',
      'DELETE /notes/{id}': 'packages/functions/src/delete.main',
      'GET /weather': 'packages/functions/src/weather.main',
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
  return { api };
}
