import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface formData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

function TodoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    defaultValues: {
      email: '@naver.com'
    }
  });
  const onValid = (data: formData) => {
    console.log(data);
  };
  const { email, firstName, lastName, password } = errors;
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
        <p>{email && `${email.message}`}</p>
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
        <p>{firstName && `${firstName.message}`}</p>
        <input
          type="text"
          placeholder="lastName"
          {...register("lastName", { required: "lastname required" })}
        />
        <p>{lastName && `${lastName.message}`}</p>
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: "password required" })}
        />
        <p>{password && `${password.message}`}</p>
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
