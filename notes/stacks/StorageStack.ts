import { Bucket, type StackContext, Table } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
	const bucket = new Bucket(stack, 'Uploads');

	const notesTable = new Table(stack, 'Notes', {
		fields: {
			userId: 'string',
			noteId: 'string',
		},
		primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
	});

	const weatherTable = new Table(stack, 'Weather', {
		fields: {
			dt: 'number',
			temp: 'string',
			icon: 'string',
		},
		primaryIndex: { partitionKey: 'dt' },
	});
	return { bucket, notesTable, weatherTable };
}
