import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const clickLogin = (e) => {
        navigate('/todo');
    }

    return (<>
        <div>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required />
                <span>此欄位不可留空</span>
                <label className="formControls_label" htmlFor="pwd">密碼</label>
                <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required />
                <input className="formControls_btnSubmit" type="button" onClick={clickLogin} value="登入" />
                <NavLink to='/signup' className='formControls_btnLink'>註冊帳號</NavLink>
            </form>
        </div>
    </>)
}

export default Login;