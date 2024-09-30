import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const Todo = () => {
    useEffect(() => {
        checkAuth();
        getTodo();
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

    // 代辦事項相關操作
    // 1. 取得
    const [todo, setTodo] = useState([]);
    const getTodo = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/todos`, {
                headers: {
                    Authorization: token
                }
            })

            if (res.ok) {
                const { data } = await res.json();
                setTodo(data);
                alert('資料成功取得')
            } else {
                alert('資料取得失敗')
            }
        } catch (err) {
            console.log(err);
        }
    }


    // 2. 新增
    const [content, setContent] = useState('');

    const addTodo = async (e) => {
        e.preventDefault();
        if (!content) {
            alert('欄位不可為空');
            return;
        }

        try {
            const res = await fetch(`${VITE_API_URL}/todos`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: content.trim()
                })
            })

            if (res.ok) {
                const { newTodo } = await res.json();
                setTodo([
                    ...todo,
                    newTodo
                ])
                alert('新增成功')
                setContent('');
            } else {
                alert('新增失敗')
            }

        } catch (err) {
            console.log(err);
        }
    }

    // 3. 編輯
    const editTodo = async (e, id) => {
        e.preventDefault();
        const inputText = prompt('請輸入修改內容文字:');

        if (inputText === '') {
            alert('內容不可空白');
            return;
        }

        if (!inputText) {
            alert('取消編輯');
            return;
        }

        try {
            const res = await fetch(`${VITE_API_URL}/todos/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: token,
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    content: inputText
                })
            })

            if (res.ok) {
                const newTodo = todo.map(item =>
                    (item.id !== id) ? item : { ...item, content: inputText }
                )
                setTodo(newTodo);
                alert('更新成功');
            } else {
                alert('更新失敗');
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 4. 刪除
    const deleteTodo = async (e, id) => {
        e.preventDefault();

        try {
            const res = await fetch(`${VITE_API_URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token
                }
            })

            if (res.ok) {
                setTodo(todo.filter(item => item.id !== id));
                alert('刪除成功')
            } else {
                alert('刪除失敗')
            }
        } catch (err) {
            console.log(err);
        }
    }


    // 切換狀態
    const toggleTodo = async (e, id) => {
        e.preventDefault();
        try {
            const res = await fetch(`${VITE_API_URL}/todos/${id}/toggle`, {
                method: 'PATCH',
                headers: {
                    Authorization: token
                }
            })

            if (res.ok) {
                const newTodo = todo.map(item =>
                    (item.id !== id) ? item : { ...item, status: !item.status }
                )
                setTodo(newTodo);
                alert('狀態更新成功')
            } else {
                alert('狀態更新失敗')
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 狀態頁籤切換
    const [statusTab, setStatusTab] = useState('all');
    const filterTodo = useMemo(() => {
        if (statusTab === 'completed') {
            return todo.filter(item => item.status === true);
        } else if (statusTab === 'pending') {
            return todo.filter(item => item.status === false);
        } else {
            return todo;
        }
    }, [todo, statusTab])

    // const filterTodo = todo.filter(item => {
    //     if (statusTab === 'completed') {
    //         return item.status === true
    //     } else if (statusTab === 'pending') {
    //         return item.status === false;
    //     } else {
    //         return item;
    //     }
    // });

    return (<>
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="/">ONLINE TODO LIST</a></h1>
                <ul>
                    <li className="todo_sm"><span>{getNickname}</span></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={handelSignOut} >登出</a></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" value={content} onChange={(e) => setContent(e.target.value)} />
                        <a style={{ cursor: 'pointer' }} onClick={addTodo}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li><a style={{ cursor: 'pointer' }} className={statusTab === 'all' ? 'activate' : ''} onClick={() => setStatusTab('all')}>全部</a></li>
                            <li><a style={{ cursor: 'pointer' }} className={statusTab === 'pending' ? 'activate' : ''} onClick={() => setStatusTab('pending')}>待完成</a></li>
                            <li><a style={{ cursor: 'pointer' }} className={statusTab === 'completed' ? 'activate' : ''} onClick={() => setStatusTab('completed')}>已完成</a></li>
                        </ul>
                        <div className="todoList_items">
                            <ul className="todoList_item">
                                {filterTodo.map(item => {
                                    return (
                                        <li key={item.id}>
                                            <label className="todoList_label">
                                                <input className="todoList_input" type="checkbox" checked={item.status}
                                                    onChange={(e) => { toggleTodo(e, item.id) }} />
                                                <span>{item.content}</span>
                                            </label>
                                            <a style={{ cursor: 'pointer' }} onClick={(e) => editTodo(e, item.id)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </a>
                                            <a style={{ cursor: 'pointer' }} onClick={(e) => deleteTodo(e, item.id)}>
                                                <i className="fa fa-times"></i>
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                            {statusTab === 'all'
                                ? (
                                    <div className="todoList_statistics">
                                        <p> {todo.filter(item => !item.status).length} 個待完成項目</p>
                                        <a style={{ cursor: 'pointer' }} onClick={e => setTodo(todo.filter(item => item.status === false))}>清除已完成項目</a>
                                    </div>
                                )
                                : statusTab === 'pending'
                                    ? (
                                        <div className="todoList_statistics">
                                            <p> {todo.filter(item => !item.status).length} 個待完成項目</p>
                                        </div>
                                    )
                                    : (
                                        <div className="todoList_statistics">
                                            <p> {todo.filter(item => item.status).length} 個完成項目</p>
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>)
}

export default Todo;