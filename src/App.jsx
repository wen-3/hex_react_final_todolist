import { NavLink, Route, Routes } from "react-router-dom"
import SignUp from "./SignUp"
import Login from "./Login"
import Todo from "./Todo"

function App() {
  const navStyle = ({ isActive }) => {
    return {
      color: isActive && 'red'
    }
  }

  return (
    <>
      <nav>
        <NavLink to="/" style={navStyle}>註冊</NavLink>
        <NavLink to="/login" style={navStyle}>登入</NavLink>
        <NavLink to="/todo" style={navStyle}>Todo</NavLink>
      </nav>
      <Routes>
        {/* 路由表 */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
