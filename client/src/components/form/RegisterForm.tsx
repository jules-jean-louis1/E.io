import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const { handleSubmit, getValues } = useForm();

  const onSubmit = async () => {
    const dataUsers = getValues();
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

  console.log("RegisterForm", getValues());

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
