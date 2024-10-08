import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import showAlert from "../components/ShowAlert";

const { VITE_API_URL } = import.meta.env;

const Todo = () => {
    const [isLoading, setIsLoading] = useState(false);
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
                showAlert('success', `哈囉 ${nickname}\n 開始使用你的代辦清單吧~`);
            } else {
                showAlert('error', '已登出或無權使用', false, 1500);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 登出
    const handelSignOut = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${VITE_API_URL}/users/sign_out`, {
                method: 'POST',
                headers: {
                    Authorization: token
                }
            })

            if (res.ok) {
                showAlert('success', '登出成功', false, 1500);
                navigate('/');
            } else {
                showAlert('error', '登出失敗', false, 1500);
                alert('登出失敗')
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setIsLoading(false);
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
                setFilterTodo(data);
            } else {
                showAlert('error', '資料取得失敗', false, 1500);
            }
        } catch (err) {
            console.log(err);
        }
    }


    // 2. 新增
    const [content, setContent] = useState('');

    const addTodo = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            if (!content) {
                showAlert('warning', '欄位不可為空');
                return;
            }

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
                showAlert('success', '新增成功', false, 1500);
                setContent('');
                setStatusTab('all')
            } else {
                showAlert('error', '新增失敗', false, 1500);
            }

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    // 3. 編輯
    const editTodo = async (e, id) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const inputText = prompt('請輸入修改內容文字:');

            if (inputText === '') {
                showAlert('warning', '內容不可空白');
                return;
            }

            if (!inputText) {
                showAlert('warning', '取消編輯');
                return;
            }

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
                showAlert('success', '更新成功', false, 1500);
            } else {
                showAlert('error', '更新失敗', false, 1500);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    // 4. 刪除
    const deleteTodo = async (e, id) => {
        try {
            setIsLoading(true);
            e.preventDefault();

            const res = await fetch(`${VITE_API_URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token
                }
            })

            if (res.ok) {
                setTodo(todo.filter(item => item.id !== id));
                showAlert('success', '刪除成功', false, 1500);
            } else {
                showAlert('error', '刪除失敗', false, 1500);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
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
                showAlert('success', '狀態更新成功', false, 1500);
            } else {
                showAlert('error', '狀態更新失敗', false, 1500);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // 狀態頁籤切換
    const [statusTab, setStatusTab] = useState('all');
    const [filterTodo, setFilterTodo] = useState([]);

    useEffect(() => {
        if (statusTab === 'completed') {
            setFilterTodo(todo.filter(item => item.status === true));
        } else if (statusTab === 'pending') {
            setFilterTodo(todo.filter(item => item.status === false));
        } else {
            setFilterTodo(todo);
        }
    }, [todo, statusTab])

    return (<>
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1><a href="/">ONLINE TODO LIST</a></h1>
                <ul>
                    <li className="todo_sm"><span>{getNickname}</span></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={(e) => isLoading ? null : handelSignOut()} >登出</a></li>
                </ul>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">
                    <div className="inputBox">
                        <input type="text" placeholder="請輸入待辦事項" value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addTodo(e);
                                }
                            }}
                            disabled={isLoading} />
                        <a style={{ cursor: 'pointer' }} onClick={(e) => isLoading ? null : addTodo(e)}>
                            <i className="fa fa-plus"></i>
                        </a>
                    </div>
                    {todo.length === 0
                        ? <div>目前尚無待辦事項</div>
                        : (<div className="todoList_list">
                            <ul className="todoList_tab">
                                <li><a style={{ cursor: 'pointer' }} className={statusTab === 'all' ? 'active' : ''} onClick={() => setStatusTab('all')}>全部</a></li>
                                <li><a style={{ cursor: 'pointer' }} className={statusTab === 'pending' ? 'active' : ''} onClick={() => setStatusTab('pending')}>待完成</a></li>
                                <li><a style={{ cursor: 'pointer' }} className={statusTab === 'completed' ? 'active' : ''} onClick={() => setStatusTab('completed')}>已完成</a></li>
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
                                                <a style={{ cursor: 'pointer' }} onClick={(e) => isLoading ? null : editTodo(e, item.id)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </a>
                                                <a style={{ cursor: 'pointer' }} onClick={(e) => isLoading ? null : deleteTodo(e, item.id)} disabled={isLoading}>
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
                                            <a style={{ cursor: 'pointer' }} onClick={e => setFilterTodo(todo.filter(item => item.status === false))}>清除已完成項目</a>
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
                        </div>)
                    }
                </div>
            </div>
        </div >
    </>)
}

export default Todo;