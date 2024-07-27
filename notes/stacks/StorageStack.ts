import { Bucket, type StackContext, Table } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
	const bucket = new Bucket(stack, 'Uploads');

	const table = new Table(stack, 'Notes', {
		fields: {
			userId: 'string',
			noteId: 'string',
		},
		primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
	});

	const locationsTable = new Table(stack, 'SavedLocations', {
		fields: {
			name: 'string',
			// time: 'number',
			// temperature: 'string',
		},
		primaryIndex: { partitionKey: 'name' }, // , sortKey: 'time' },
	});

	const countTable = new Table(stack, 'Counts', {
		fields: {
			tableName: 'string',
			dailyUpdateCount: 'number',
			recordCount: 'number',
			version: 'number',
			// expireAt: "number",
		},
		primaryIndex: { partitionKey: 'tableName' },
		timeToLiveAttribute: 'expireAt',
	});

	return { bucket, table, locationsTable, countTable };
}
