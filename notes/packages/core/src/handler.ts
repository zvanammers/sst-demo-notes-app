import type { Context, APIGatewayProxyEvent } from 'aws-lambda';

export default function handler(
	lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>,
) {
	return async (event: APIGatewayProxyEvent, context: Context) => {
		// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
		// biome-ignore lint/style/useSingleVarDeclarator: <explanation>
		let body, statusCode;

		try {
			body = await lambda(event, context);
			statusCode = 200;
		} catch (error) {
			statusCode = 500;
			body = JSON.stringify({
				error: error instanceof Error ? error.message : String(error),
			});
		}
		return {
			body,
			statusCode,
			headers: {
				'Access-Control-Allow-Origin': '*cloudfront*',
				'Access-Control-Allow-Credentials': true,
			},
		};
	};
}
