import { Stage, Layer, Line } from 'react-konva';
function Plant() {
	const drawBranch = (
		startX: number,
		startY: number,
		length: number,
		angle: number,
		depth: number,
	): number[][] => {
		if (depth === 0) return [];

		const endX = startX + length * Math.cos(angle);
		const endY = startY + length * Math.sin(angle);

		const branches = [
			[startX, startY, endX, endY],
			...drawBranch(endX, endY, length * 0.67, angle - Math.PI / 6, depth - 1),
			...drawBranch(endX, endY, length * 0.67, angle + Math.PI / 6, depth - 1),
		];

		return branches;
	};

	const branches = drawBranch(50, 200, 30, -Math.PI / 2, 10); // Initial depth set to 10

	return (
		<Stage width={100} height={200}>
			<Layer>
				{branches.map((branch, index) => (
					<Line
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						points={branch}
						stroke="black"
						strokeWidth={2}
						lineCap="round"
						lineJoin="round"
					/>
				))}
			</Layer>
		</Stage>
	);
}

export default Plant;
