import { Table } from "sst/node/table";
import dynamoDb from "@notes/core/dynamodb";
import handler from "@notes/core/handler";

export const main = handler(async (event) => {

    const params = {
        TableName: Table.Notes.tableName,
        Key: {
            userId: "123",
            noteId: event?.pathParameters?.id
        },
    };

    const result = await dynamoDb.get(params);

    return JSON.stringify(result.Item);
})