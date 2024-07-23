import type { Context, APIGatewayProxyEvent } from 'aws-lambda';

interface ReturnWithStatus {
	statusCode: number;
	body: string;
}

export default function handler(
	lambda: (
		evt: APIGatewayProxyEvent,
		context: Context,
	) => Promise<string> | Promise<ReturnWithStatus>,
) {
	return async (event: APIGatewayProxyEvent, context: Context) => {
		let body: string | ReturnWithStatus;
		let response: string | ReturnWithStatus;
		let statusCode: number;

		try {
			response = await lambda(event, context);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			if (typeof response !== 'string' && 'statusCode' in (response as any)) {
				response = response as ReturnWithStatus;
				statusCode = response.statusCode;
				body = response.body;
			} else {
				statusCode = 200;
				body = response;
			}
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

export type { ReturnWithStatus };
