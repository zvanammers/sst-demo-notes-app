import { Table } from "sst/node/table";
import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = handler(async (_event) => {

    const params: DocumentClient.QueryInput = {
        TableName: Table.Notes.tableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": "123",
        },
    };

    const result = await dynamoDb.query(params);

    return JSON.stringify(result.Items);
})