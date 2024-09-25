import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const Login = () => {
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
        const { email, password } = formData;
        if (!email || !password) {
            alert('欄位皆為必填，請確實填寫!');
            return;
        }

        const url = `${VITE_API_URL}/users/sign_in`

        try {
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

                alert('登入成功');
                navigate(`/${nickname}/todo`);
            } else {
                switch (res.status) {
                    case 400:
                        alert('登入失敗：欄位不可為空');
                        break;
                    case 401:
                        alert('登入失敗：帳號密碼驗證錯誤');
                        break;
                    case 404:
                        alert('登入失敗：用戶不存在');
                        break;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<>
        <div>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>

                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" onChange={handelOnChange} required />

                <label className="formControls_label" htmlFor="password">密碼</label>
                <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handelOnChange} required />

                <input className="formControls_btnSubmit" type="button" onClick={clickLogin} value="登入" />
                <NavLink to='/signup' className='formControls_btnLink'>註冊帳號</NavLink>
            </form>
        </div>
    </>)
}

export default Login;