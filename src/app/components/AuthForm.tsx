"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setStateInViewTransition } from "@/utils/client";
import { useActionState, useState } from "react";
import { login, signup } from "../actions/auth";
import { FormActionType, FormState } from "../types";
import ErrorMessage from "./ErrorMessage";

const initFormState: FormState = {
  success: false,
  errors: null,
  data: {
    email: "",
    password: "",
  },
};

export default function AuthForm() {
  const [type, setType] = useState<FormActionType>("login");
  const [formState, formAction, isPending] = useActionState(
    handleSubmit,
    initFormState
  );

  async function handleSubmit(formState: FormState, formData: FormData) {
    if (isPending) return formState;
    if (type === "login") {
      return await login(formState, formData);
    } else {
      return await signup(formState, formData);
    }
  }

  function handleSwitch() {
    setStateInViewTransition(() => {
      setType((prev) => (prev === "login" ? "signup" : "login"));
    });
  }

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="xyz@gmail.com"
          defaultValue={formState.data.email}
          required
          pattern={EMAIL_VALIDATION.pattern}
          minLength={EMAIL_VALIDATION.minLength}
          maxLength={EMAIL_VALIDATION.maxLength}
          title={EMAIL_VALIDATION.title}
          className="w-full"
        />
        {!isPending && formState.errors?.fieldErrors?.email && (
          <ErrorMessage
            message={formState.errors.fieldErrors.email.join(", ")}
          />
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="* * * * * * * *"
          type="password"
          defaultValue={formState.data.password}
          required
          pattern={PASSWORD_VALIDATION.pattern}
          minLength={PASSWORD_VALIDATION.minLength}
          title={PASSWORD_VALIDATION.title}
          className="w-full"
        />
        {!isPending && formState.errors?.fieldErrors?.password && (
          <ErrorMessage
            message={formState.errors.fieldErrors.password.join(", ")}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <Button
          type="submit"
          formAction={formAction}
          // disabled={isPending}
          className={`w-full bg-lime-600 hover:bg-lime-700 ${
            isPending ? "animate-pulse" : ""
          }`}
        >
          {type === "login" ? "Log in" : "Sign up"}
        </Button>
        <Button
          type="button"
          onClick={handleSwitch}
          variant="link"
          disabled={isPending}
          className="w-full"
        >
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </Button>
      </div>
      {!isPending && formState.errors?.formErrors && (
        <ErrorMessage
          message={formState.errors.formErrors.join(", ")}
          className="text-center"
        />
      )}
    </form>
  );
}

const EMAIL_VALIDATION = {
  pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
  minLength: 5,
  maxLength: 50,
  title: "Please enter a valid email address",
};

const PASSWORD_VALIDATION = {
  pattern:
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{7,}$",
  minLength: 6,
  title:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character and be at least 6 characters long",
};
