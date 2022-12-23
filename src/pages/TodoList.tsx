import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface formData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordValid: string;
  extraErr?: string;
}

type formDataArr = "email" | "firstName" | "lastName" | "password" | "passwordValid";

function TodoList() {
  const { register, watch, handleSubmit, formState, setError, setValue } =
    useForm<formData>({
      defaultValues: {
        email: "@naver.com",
      },
    });
  
  const onValid = (data: formData) => {
    if (data.password !== data.passwordValid) {
      setError("password", { message: "Passwords are must be same" });
      setError(
        "passwordValid",
        { message: "Passwords are must be same" },
        { shouldFocus: true }
      );
    } else {
      const formDataKey = Object.keys(watch()) as formDataArr[];
      formDataKey.forEach((e) => setValue(e,  ""));
    }
    //setError("extraErr", {message: "server is offline"})
  };
  const {
    email: emailErr,
    firstName: firstNameErr,
    lastName: lastNameErr,
    password: passwordErr,
    passwordValid: passwordValidErr,
    extraErr,
  } = formState.errors;
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "50px auto",
        }}
      >
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: "email required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "pattern not right",
            },
          })}
        />
        <p>{emailErr && `${emailErr.message}`}</p>
        <input
          type="text"
          placeholder="firstName"
          {...register("firstName", {
            required: "firstname required",
            minLength: {
              value: 10,
              message: "too short",
            },
          })}
        />
        <p>{firstNameErr && `${firstNameErr.message}`}</p>
        <input
          type="text"
          placeholder="lastName"
          {...register("lastName", {
            required: "lastname required",
            validate: {
              noNico: (val) =>
                val !== "nico" || "firstName 'nico' is not allowed",
            },
          })}
        />
        <p>{lastNameErr && `${lastNameErr.message}`}</p>
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: "password required" })}
        />
        <p>{passwordErr && `${passwordErr.message}`}</p>
        <input
          type="passwordVaild"
          placeholder="passwordValid"
          {...register("passwordValid", { required: "passwordValid required" })}
        />
        <p>{passwordValidErr && `${passwordValidErr.message}`}</p>
        <button>Add</button>
        <p>{extraErr && `${extraErr.message}`}</p>
      </form>
    </div>
  );
}

export default TodoList;
