import React, {useEffect, useState} from 'react';

export const Todo = () => {
    const [taskList, setTaskList] = useState(() => {
        const saved = localStorage.getItem('taskList')
        return saved ? JSON.parse(saved) : []
    });

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);


    const [task, setTask] = useState('')
    const [data, setData] = useState('')
    const [importance, setImportance] = useState('Не важна')
    const [filter, setFilter] = useState('Все')



    function  resTaskNew(e) {
        e.preventDefault()
        if(!task.trim()) return
        if(!data) return

        const newTask = {
            id: Date.now(),
            task,
            data,
            importance,
            completed: false
        }
        setTaskList(res => [...res, newTask])
        setTask('')
        setData('')
        setImportance('Не важна')
    }

    const filteredTasks = taskList.filter((task) => {
        if(filter === 'Все') return true
        return task.importance === filter
    })

    function setTodayDate() {
        const today = new Date()
        const yyyy = today.getFullYear()
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const dd = String(today.getDate()).padStart(2, '0')
        const todayStr =`${yyyy}-${mm}-${dd}`
        setData(todayStr)
    }

    function deleteTask(id) {
        setTaskList(taskList.filter((t) => t.id !== id))
    }


    return (
        <div>
            <form onSubmit={resTaskNew}>
                <label>Название задачи:</label>
                <input type="text" value={task} onChange={(e) =>  setTask(e.target.value)}/>

                <label>Дата задачи:</label>
                <input
                    type='date'
                    value={data}
                    min="2020-01-01"
                    max="2060-12-31"
                    onChange={(e) =>  setData(e.target.value)}
                />

                <label>Важность:</label>
                <select value={importance} onChange={(e) =>  setImportance(e.target.value)}>
                    <option value="Не важна">Не важна</option>
                    <option value="Важна">Важна</option>
                    <option value="СуперВажна">СуперВажна</option>
                </select>
                <button>Ok</button>
            </form>

        <div>
            <ul>
                {filteredTasks.map(t => {
                    return (
                        <li key={t.id}>
                            {t.task} {t.data} {t.importance}
                            <button onClick={() => deleteTask(t.id)}>❌</button>
                        </li>
                    )
                })}
            </ul>
        </div>

            <div>
                <button onClick={() => setFilter('Все')}>Все</button>
                <button onClick={() => setFilter('Не важна')}>Не важна</button>
                <button onClick={() => setFilter('Важна')}>Важна</button>
                <button onClick={() => setFilter('СуперВажна')}>СуперВажна</button>
            </div>
        </div>
    );
};

