import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import showAlert from "../components/ShowAlert";

const { VITE_API_URL } = import.meta.env;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handelOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const navigate = useNavigate();

    const clickLogin = async (e) => {
        try {
            setIsLoading(true);
            const { email, password } = formData;
            if (!email || !password) {
                showAlert('warning', '欄位皆為必填，請確實填寫');
                return;
            }

            const url = `${VITE_API_URL}/users/sign_in`;

            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const { token, nickname } = await res.json();
                document.cookie = `loginToken=${token}`;
                // showAlert('success', '登入成功', false, 1500);
                navigate(`/${nickname}/todo`);
            } else {
                switch (res.status) {
                    case 400:
                        showAlert('error', '登入失敗：欄位驗證失敗');
                        setFormData({
                            ...formData,
                            password: ''
                        })
                        break;
                    case 401:
                        showAlert('error', '登入失敗：帳號密碼驗證錯誤');
                        setFormData({
                            ...formData,
                            password: ''
                        })
                        break;
                    case 404:
                        showAlert('error', '登入失敗：用戶不存在');
                        setFormData({
                            ...formData,
                            email: '',
                            password: ''
                        })
                        break;
                }
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
                <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>

                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" onChange={handelOnChange} value={formData.email} required />

                <label className="formControls_label" htmlFor="password">密碼</label>
                <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handelOnChange} value={formData.password} required />

                <input className="formControls_btnSubmit" type="button" onClick={clickLogin} value="登入" disabled={isLoading} />
                <NavLink to='/signup' className='formControls_btnLink'>註冊帳號</NavLink>
            </form>
        </div>
    </>)
}

export default Login;