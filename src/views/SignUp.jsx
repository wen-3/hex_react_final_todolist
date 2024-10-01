import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import showAlert from "../components/ShowAlert";

const { VITE_API_URL } = import.meta.env;

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
        nickname: ''
    })

    const handelOnChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const clickSignUp = async (e) => {
        try {
            setIsLoading(true);
            const { email, nickname, password, password2 } = formData;
            if (!email || !nickname || !password || !password2) {
                showAlert('warning', '欄位皆為必填，請確實填寫');
                return;
            }

            if (password.length < 6) {
                showAlert('warning', '密碼長度不足');
                setFormData({
                    ...formData, password: '', password2: ''
                });
                return;
            }

            if (password !== password2) {
                showAlert('warning', '密碼與確認密碼不一致');
                setFormData({
                    ...formData, password: '', password2: ''
                });
                return;
            }

            const url = `${VITE_API_URL}/users/sign_up`;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json();
            if (res.ok) {
                showAlert('success', '註冊成功', false, 1500);
                navigate('/');
            } else {
                showAlert('error', result.message);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (<>
        <div>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">註冊帳號</h2>
                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" onChange={handelOnChange} value={formData.email} required />

                <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
                <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" onChange={handelOnChange} value={formData.nickname} required />

                <label className="formControls_label" htmlFor="password">密碼</label>
                <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handelOnChange} value={formData.password} required />

                <label className="formControls_label" htmlFor="password2">再次輸入密碼</label>
                <input className="formControls_input" type="password" name="password2" id="password2" placeholder="請再次輸入密碼" onChange={handelOnChange} value={formData.password2} required />

                <input className="formControls_btnSubmit" type="button" onClick={clickSignUp} value="註冊帳號" disabled={isLoading} />
                <NavLink to='/' className='formControls_btnLink'>登入</NavLink>
            </form>
        </div>
    </>)
}

export default SignUp;