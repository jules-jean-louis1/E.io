import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./page/Home";
import { AuthPage } from "./page/AuthPage";

const Layout = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;