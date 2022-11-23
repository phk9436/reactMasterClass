import React, { useState } from "react";
import { useForm } from "react-hook-form";

function TodoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors)
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
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        <input
          type="text"
          placeholder="firstName"
          {...register("firstName", { required: true, minLength: {
            value: 10,
            message: "too short"
          } })}
        />
        <input
          type="text"
          placeholder="lastName"
          {...register("lastName", { required: true })}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: "password required" })}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
