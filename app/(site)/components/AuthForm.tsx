'use client';
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";

type variant = "Login" | "Register";

const Authform = () => {
    const [variant, setvariant] = useState<variant>("Login");
    const [isLoading, setIsLoading] = useState(false);

    const togglevariant = useCallback(() => {
        if (variant === "Login") {
            setvariant("Register");
        } else {
            setvariant("Login");
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "Login") {
            //Axios Register
        }
        if (variant === "Register") {
            //NextAuth SignIn
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        //NextAuth Social Sign In
    }
    return (
        <div className=" 
        mt-8
        sm:mx-auto
        sm:w-full
        sm:max-w-md
        ">
            <div className="
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
            ">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === "Register" && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                        />
                    )}
                    <Input
                        id="email"
                        label="Email address"
                        type="email"
                        register={register}
                        errors={errors}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                        >
                            {variant === "Login" ? "Sign in" : "Register"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    "
                        >
                            <div
                                className="
                                    w-full
                                    border-t
                                    border-gray-300
                                    "
                            />
                        </div>
                        <div
                            className="
                                    relative
                                    flex
                                    justify-center
                                    text-sm
                                    "
                        >
                            <span
                                className="
                                        bg-white
                                        px-2
                                        text-gray-500 
                                        "
                            >
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton />
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Authform;