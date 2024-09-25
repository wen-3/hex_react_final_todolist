import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const Todo = () => {
    useEffect(() => {
        checkAuth();
    }, [])

    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1",
    );

    const [getNickname, setGetNickname] = useState('');

    const navigate = useNavigate();

    // 確認是否存在 token
    const checkAuth = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/users/checkout`, {
                headers: {
                    Authorization: token
                }
            })

            const { nickname } = await res.json();
            setGetNickname(nickname);

            if (res.ok) {
                alert('開始使用你的代辦清單吧~');
            } else {
                alert('已登出或無權使用')
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 登出
    const handelSignOut = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/users/sign_out`, {
                method: 'POST',
                headers: {
                    Authorization: token
                }
            })
            
            if (res.ok) {
                alert('登出成功')
                navigate('/');
            } else {
                alert('登出失敗')
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (<>
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="/">ONLINE TODO LIST</a></h1>
                <ul>
                    <li className="todo_sm"><span>{getNickname}</span></li>
                    <li><a onClick={handelSignOut} >登出</a></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" />
                        <a href="#">
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li><a href="#" className="active">全部</a></li>
                            <li><a href="#">待完成</a></li>
                            <li><a href="#">已完成</a></li>
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                                <li>
                                    <label className="todoList_label">
                                        <input className="todoList_input" type="checkbox" value="true" />
                                        <span>把冰箱發霉的檸檬拿去丟</span>
                                    </label>
                                    <a href="#">
                                        <i className="fa fa-times"></i>
                                    </a>
                                </li>
                            </ul>
                            <div className="todoList_statistics">
                                <p> 5 個已完成項目</p>
                                <a href="#">清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Todo;