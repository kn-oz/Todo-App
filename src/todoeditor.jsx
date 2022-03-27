import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import {MdOutlineDelete} from 'react-icons/md'
import {RiSaveLine} from 'react-icons/ri'


export default function todoEditor({todolist, deleteToDo, saveToDo}) {
    let navigate = useNavigate()

    let {todoId} = useParams()

    let ID = parseInt(todoId, 10)

    let requiredTodo = todolist.find(todo => todo.id === ID)

    console.log(requiredTodo)

    const [value, setValue] = useState(requiredTodo.value)

    return (
        <div className="m-auto flex flex-col justify-center items-center content-center">
            <div className="mx-[25%] my-[5%]">
            <div className="flex flex-row justify-end">
            <button onClick={() => {
                deleteToDo(ID)
                navigate('/')
                }} className='m-1 border-[1px] bg-zinc-200 rounded border-black hover:bg-red-600 active:bg-red-700' ><MdOutlineDelete size={32}/>
            </button>
            <button onClick={() => {
                saveToDo(value, ID)
                }} className='m-1 border-[1px] bg-zinc-200 rounded border-black hover:bg-green-500 active:bg-green-600' ><RiSaveLine size={32}/>
            </button>
            </div>
            <textarea className="rounded-md min-h-[720px] min-w-[360px] border:transparent focus:border-orange-300 focus:outline-none focus:border-black focus:border-[0.5px] resize-none  bg-slate-200 text-zinc-900" value={value} onChange={(event) => setValue(event.target.value)}></textarea>
            </div>
        </div>
    )
}