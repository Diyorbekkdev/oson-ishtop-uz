import { FieldProps, FormikErrors, FormikTouched } from "formik";
import { get } from "lodash";
import { FC } from "react";

interface ControlErrorProps {
	form: {
		touched: FormikTouched<any>;
		errors: FormikErrors<any>;
	};
	field: FieldProps["field"];
}

const ControlError: FC<ControlErrorProps> = ({ form, field }) => {
	const error = get(form.errors, field.name);
	const touched = get(form.touched, field.name);
	return (
		<>
			{touched && error && (
				<div className="text-pink text-sm pl-3 text-red-500">
					{touched && typeof error === "string" && error}
				</div>
			)}
		</>
	);
};

type TControlErrorProps = {
	message?: string;
};

export const ControlErrorMessage: FC<TControlErrorProps> = ({ message }) => {
	if (!message) {
		return null;
	}

	return <div className="text-sm text-red-500 pl-3">{message}</div>;
};

export default ControlError;
