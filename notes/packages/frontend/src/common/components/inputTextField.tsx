import { Input } from 'antd';

const inputTextField = (
	name: string,
	value: string,
	action: React.Dispatch<React.SetStateAction<string>>,
	addOnBefore: React.ReactNode,
) => {
	return (
		<>
			<Input
				placeholder={name}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
					action(e.target.value)
				}
				allowClear
				addonBefore={addOnBefore}
			/>
		</>
	);
};

export default inputTextField;
