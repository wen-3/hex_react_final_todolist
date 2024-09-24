import { NavLink, useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const SignUp = () => {
    const navigate = useNavigate();
    const clickSignUp = (e) => {
        navigate('/');
    }

    return (<>
        <div>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">註冊帳號</h2>
                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required />
                <label className="formControls_label" htmlFor="name">您的暱稱</label>
                <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" />
                <label className="formControls_label" htmlFor="pwd1">密碼</label>
                <input className="formControls_input" type="password" name="pwd" id="pwd1" placeholder="請輸入密碼" required />
                <label className="formControls_label" htmlFor="pwd2">再次輸入密碼</label>
                <input className="formControls_input" type="password" name="pwd" id="pwd2" placeholder="請再次輸入密碼" required />
                <input className="formControls_btnSubmit" type="button" onClick={clickSignUp} value="註冊帳號" />
                <NavLink to='/' className='formControls_btnLink'>登入</NavLink>
            </form>
        </div>
    </>)
}

export default SignUp;