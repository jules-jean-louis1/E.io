import { useForm } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const { handleSubmit, register } = useForm<Inputs>();

  const onSubmit = async (dataUsers: Inputs) => {
    try {
      const data = await fetch("http://localhost:3000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUsers),
      });
      const resp = await data.json();
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
