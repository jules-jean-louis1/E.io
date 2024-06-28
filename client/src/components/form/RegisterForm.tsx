import { FC } from "react";
import { useForm } from "react-hook-form";

export const RegisterForm: FC = () => {
  const { handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    const dataUsers = useForm().getValues();
    if (
      data.username.length === 0 ||
      data.email.length === 0 ||
      data.password.length === 0
    ) {
      return;
    }
    (async () => {
      const data = await fetch("https://localhost:3000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUsers),
      });
      const resp = await data.json();
      console.log(resp);
    })();
  };

  console.log(useForm().getValues());
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
