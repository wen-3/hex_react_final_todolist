const Todo = () =>{
    return(<>
    <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                <li><a href="#loginPage">登出</a></li>
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
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>打電話叫媽媽匯款給我</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>整理電腦資料夾</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>繳電費水費瓦斯費</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>約vicky禮拜三泡溫泉</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>約ada禮拜四吃晚餐</span>
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