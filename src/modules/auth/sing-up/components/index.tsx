import { EyeSlash } from "@/assets/icons/global/gloval.icons";
import { EyeIcon, UserIcon } from "@/assets/icons/signin.icons";
import { Button } from "@heroui/button";
import { Card, CardHeader } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { useForm } from "@tanstack/react-form";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { SignUpForm } from "../model";
import { SignUpSchema } from "../model/validators";
import img from "./img.png";

export const SignUp = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const form = useForm<SignUpForm, ZodValidator>({
		defaultValues: {
			username: "",
			password: "",
		},

		validatorAdapter: zodValidator(),
		validators: {
			onChange: SignUpSchema,
		},
	});

	const handleSubmit = async () => {
		form.handleSubmit();
		// if (form.state.errors.length === 0) return
		console.log(form.state.values);
	};

	return (
		<div className="w-full h-full grid lg:grid-cols-2 grid-cols-1 gap-5">
			<Card className="h-full" shadow="none">
				<CardHeader className="absolute z-10 top-5 flex-col !items-center">
					<p className="text-5xl text-black/50 uppercase font-bold">foodify</p>
				</CardHeader>
				<Image
					removeWrapper
					alt="Card background"
					className="z-0 w-full h-full object-cover"
					src={img}
				/>
				<CardHeader className="absolute z-10 bottom-5 flex-col !items-center">
					<p className="text-tiny  uppercase font-bold">
						© 2024 All Rights Reserved
					</p>
				</CardHeader>
			</Card>
			<Card shadow="none">
				<Card
					shadow="none"
					className="w-[450px] flex items-center justify-center m-auto gap-12"
					radius="none"
				>
					<div className="w-full">
						<p className="text-4xl mb-4">HUSH KELIBSIZ sdsd</p>
						<span>
							Hisobingizga kirish uchun username va parolingizni kiriting!
						</span>
					</div>
					<div className="w-full flex flex-col gap-4">
						<form.Field
							name="username"
							children={({ state, handleChange }) => {
								return (
									<>
										<Input
											value={state.value}
											size="lg"
											label="Username"
											labelPlacement="outside"
											variant="faded"
											placeholder="Enter your username"
											endContent={<UserIcon />}
											className="w-full"
											radius="sm"
											onChange={(e) => handleChange(e.target.value)}
											isInvalid={Boolean(state.meta.errors.length)}
											errorMessage={state.meta.errors[0]}
										/>
									</>
								);
							}}
						/>
						<form.Field
							name="password"
							children={({ state, handleChange }) => {
								return (
									<>
										<Input
											value={state.value}
											size="lg"
											label="Password"
											labelPlacement="outside"
											variant="faded"
											placeholder="Enter your password"
											endContent={
												<button
													className="focus:outline-none"
													type="button"
													onClick={toggleVisibility}
													aria-label="toggle password visibility"
												>
													{isVisible ? <EyeSlash /> : <EyeIcon />}
												</button>
											}
											type={isVisible ? "text" : "password"}
											className="w-full pt-4"
											radius="sm"
											onChange={(e) => handleChange(e.target.value)}
											isInvalid={Boolean(state.meta.errors.length)}
											errorMessage={state.meta.errors[0]}
										/>
									</>
								);
							}}
						/>
						<div className="flex items-center justify-between">
							<Checkbox color="default" defaultSelected>
								Eslab qolish
							</Checkbox>
							<span className="text-sm font-[600] hover:text-blue-400">
								Parolingizni unutdingizmi?
							</span>
						</div>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button
									color="success"
									size="lg"
									radius="sm"
									type="submit"
									onClick={handleSubmit}
									disabled={!canSubmit}
									className="text-white tracking-wider text-lg mt-6"
								>
									{isSubmitting ? "..." : "Kirish"}
								</Button>
							)}
						/>
					</div>
				</Card>
			</Card>
		</div>
	);
};
