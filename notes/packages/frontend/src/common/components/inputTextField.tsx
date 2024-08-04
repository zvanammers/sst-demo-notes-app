import { Input } from 'antd';

const InputTextField = (
	name: string,
	value: string,
	action: React.Dispatch<React.SetStateAction<string>>,
	onPressEnter: () => void,
	addOnBefore: React.ReactNode,
) => {
	return (
		<Input
			placeholder={name}
			value={value}
			onPressEnter={onPressEnter}
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
				action(e.target.value)
			}
			allowClear
			addonBefore={addOnBefore}
		/>
	);
};

export default InputTextField;
