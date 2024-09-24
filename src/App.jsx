import { Route, Routes } from "react-router-dom"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import Todo from "./views/Todo"


function App() {
  return (
    <>
      <Routes>
        {/* 路由表 */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
