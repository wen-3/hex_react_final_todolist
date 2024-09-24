import { Route, Routes } from "react-router-dom"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import Todo from "./views/Todo"
import Auth from "./views/layouts/Auth"


function App() {
  return (
    <>
      <Routes>
        {/* 路由表 */}
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
