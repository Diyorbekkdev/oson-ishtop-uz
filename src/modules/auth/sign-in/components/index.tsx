import { EyeSlash } from "@/assets/icons/global/gloval.icons";
import { EyeIcon, UserIcon } from "@/assets/icons/signin.icons";
import img from "@/assets/images/hero.jpg";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { setAuth, setRememberMe } from "@/redux/slices/auth/sign-in";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { useForm } from "@tanstack/react-form";
import { ZodValidator, zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { SignInForm } from "../model";
import { SignInSchema } from "../model/validators";
import { useSignInFeatures } from "../routes/features";

export const SignIn = () => {
	const dispatch = useReduxDispatch();
	const { onSubmit } = useSignInFeatures();
	const { auth } = useReduxSelector(({ signIn }) => signIn);

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const form = useForm<SignInForm, ZodValidator>({
		defaultValues: {
			phone: "907661770",
			password: "Diyorbek$2001",
		},
		validatorAdapter: zodValidator(),
		validators: {
			onChange: SignInSchema,
		},
	});

	const handleSubmit = async () => {
		form.handleSubmit();
		await onSubmit(form?.state?.values);
	};

	return (
		<div className="w-full h-full grid lg:grid-cols-2 grid-cols-1 gap-5">
			<Card className="h-full" shadow="none">
				<Image
					removeWrapper
					alt="Card background"
					className="z-0 w-full h-full object-cover"
					src={img}
				/>
			</Card>
			<Card shadow="none" className="dark:bg-transparent">
				<Card
					shadow="none"
					className="w-[450px] dark:bg-transparent flex items-center justify-center m-auto gap-12"
					radius="none"
				>
					<div className="w-full">
						<p className="text-4xl mb-4">HUSH KELIBSIZ</p>
						<span>
							Hisobingizga telefon raqamingiz va parolingizni kiriting!
						</span>
					</div>
					<div className="w-full flex flex-col gap-4">
						<form.Field
							name="phone"
							validators={{
								onChange: ({ value }) => {
									if (!value)
										return "Email yoki username kiritishingiz majburiy";
								},
							}}
							children={({ state, handleChange }) => {
								return (
									<Input
										value={state.value}
										size="lg"
										label="Telefon raqam"
										labelPlacement="outside"
										variant="faded"
										placeholder="Telefon raqamingizni kiriting"
										endContent={<UserIcon />}
										className="w-full"
										radius="sm"
										type="text"
										onChange={(e) => {
											handleChange(e.target.value.trim());
											dispatch(
												setAuth({
													phone: e.target.value,
													username: e.target.value,
												}),
											);
										}}
										isRequired
										isInvalid={Boolean(state.meta.errors.length)}
										errorMessage={state.meta.errors[0]}
									/>
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
											isRequired
											onChange={(e) => handleChange(e.target.value.trim())}
											isInvalid={Boolean(state.meta.errors.length)}
											errorMessage={state.meta.errors[0]}
										/>
									</>
								);
							}}
						/>
						<div className="flex items-center justify-between">
							<Checkbox
								color="default"
								onValueChange={() => dispatch(setRememberMe())}
							>
								Eslab qolish
							</Checkbox>
						</div>
						<form.Subscribe
							children={({ values }) => (
								<Button
									isLoading={auth?.status === "loading"}
									isDisabled={!values?.phone || !values?.password}
									color="success"
									size="lg"
									radius="sm"
									type="submit"
									onPress={handleSubmit}
									className="text-white tracking-wider text-lg mt-6"
								>
									{"Kirish"}
								</Button>
							)}
						/>
					</div>
				</Card>
			</Card>
		</div>
	);
};
