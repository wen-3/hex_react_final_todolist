import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        const url = `${VITE_API_URL}/users/sign_up`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const result = await res.json();
            if (res.ok) {
                alert('註冊成功');
                navigate('/');
            } else {
                alert(result.message);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (<>
        <div>
            <form className="formControls" action="index.html">
                <h2 className="formControls_txt">註冊帳號</h2>
                <label className="formControls_label" htmlFor="email">Email</label>
                <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" onChange={handelOnChange} required />

                <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
                <input className="formControls_input" type="text" name="nickname" id="nickname" placeholder="請輸入您的暱稱" onChange={handelOnChange} required />

                <label className="formControls_label" htmlFor="password">密碼</label>
                <input className="formControls_input" type="password" name="password" id="password" placeholder="請輸入密碼" onChange={handelOnChange} required />

                <label className="formControls_label" htmlFor="password2">再次輸入密碼</label>
                <input className="formControls_input" type="password" name="password2" id="password2" placeholder="請再次輸入密碼" onChange={handelOnChange} required />

                <input className="formControls_btnSubmit" type="button" onClick={clickSignUp} value="註冊帳號" />
                <NavLink to='/' className='formControls_btnLink'>登入</NavLink>
            </form>
        </div>
    </>)
}

export default SignUp;