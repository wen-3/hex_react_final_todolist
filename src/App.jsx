import { Route, Routes } from "react-router-dom"
import SignUp from "./SignUp"
import Login from "./Login"
import Todo from "./Todo"

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
