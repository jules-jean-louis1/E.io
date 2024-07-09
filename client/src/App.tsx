import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./page/Home";
import { AuthPage } from "./page/AuthPage";
import { SocketContext, socket } from "./context/Socket";

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
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<AuthPage />} />
        </Route>
      </Routes>
    </SocketContext.Provider>
  );
}

export default App;
