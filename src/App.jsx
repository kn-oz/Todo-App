import { useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import {Route, Routes} from 'react-router-dom'
import Home from './Home'
import TodoEditor from './todoeditor'
import client from './query-provider'

const fetcher = (url, method, reqBody) => fetch('http://localhost:5500' + url, {
    method: method,
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(reqBody)
  })



function App() {

    const {data:list, isLoading, isError} = useQuery(['todoList'], () => {
                                                    return fetch('http://localhost:5500/api/get-todos', {mode: 'cors'}).then(response => response.json())
                                                }, { 
                                            select: data => { 
                                                 return data.todolist
                                                }
                                            }
                                          )

  const [input, setInput] = useState("")

  const mutation = useMutation((req) => fetcher(req.url, req.method, req.body), {
      onSuccess(data) {
          console.log("mutation successful", data)
          client.invalidateQueries(['todoList'])
      },
      onError(error) {
          console.log("there was an error", error)
      }
  })

  
  const addToList = async(event) => {
   event.preventDefault()
    const expr = new RegExp('\\S+')  //check if input contains anything other than spaces
    if (input && expr.test(input)) {
      await mutation.mutateAsync({url: '/api/create-todos', method: 'POST', body: {todo: input}})
      setInput("")
    }
}

const deleteFunction = async (todoId) => {
    await mutation.mutateAsync({url:'/api/remove-todo', method: 'DELETE', body: {id: todoId}})
}

const saveFunction = async (textValue, todoId) => {
    await mutation.mutateAsync({url:'/api/update-todo', method:'PUT', body: {id: todoId, value: textValue}})
}

const toggleStatusFunction = async (todoId, currentState) => {
    await mutation.mutateAsync({url:'/api/update-status', method:'PUT', body: {id:todoId}})
}

if (isLoading) return <h1>Loading...</h1>

if (isError) return <h1>oops...</h1>




  return(
      <div className='App bg-orange-400 min-h-screen'>
    <Routes>
        <Route exact path='/' element={<Home inputText={input} setInputText={setInput} todolist={list} addToTodolist={addToList} deleteToDo={deleteFunction} toggleStatus={toggleStatusFunction}/>}></Route>
        <Route exact path='todo/:todoId' element={<TodoEditor todolist={list} deleteToDo={deleteFunction} saveToDo={saveFunction}/>}></Route>
        <Route path="*" element={<h1 className='mt-8 text-white text-6xl font-semibold font-sans text-center'>There is nothing here</h1>} ></Route>
    </Routes>   
    </div> 
  )
}

export default App