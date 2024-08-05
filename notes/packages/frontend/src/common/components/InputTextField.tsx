import { Input } from 'antd';

interface InputTextFieldProps {
	name: string;
	value: string;
	action: React.Dispatch<React.SetStateAction<string>>;
	onPressEnter: () => void;
	addOnBefore: React.ReactNode;
	isLoading?: boolean;
}

function InputTextField({
	name,
	value,
	action,
	onPressEnter,
	addOnBefore,
	isLoading,
}: InputTextFieldProps) {
	if (isLoading === undefined) {
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
	}
	return (
		<Input.Search
			placeholder={name}
			value={value}
			onPressEnter={onPressEnter}
			onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
				action(e.target.value)
			}
			addonBefore={addOnBefore}
			loading={isLoading}
		/>
	);
}

export default InputTextField;
