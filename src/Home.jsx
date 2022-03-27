import TodoItem from './todo-item'
import {DeleteButton, ToggleStatusButton} from './todo-buttons'
import {Link} from 'react-router-dom'

function Home({inputText, setInputText, todolist, addToTodolist, deleteToDo, toggleStatus}) {

  return (
    <div className='Home flex flex-col justify-start items-center box-border'>
      <h1 className=' mt-8 text-white text-6xl font-semibold font-sans text-center'>Add to do...</h1>
      <div className='mt-24 mb-12'>
        <form onSubmit={(event) => addToTodolist(event)}>
          <input className='m-0.5 rounded-md h-8 w-72 border:transparent focus:border-orange-300 focus:outline-none focus:border-black focus:border-[0.5px]' type="text" placeholder={" add to do..."}value={inputText} onChange={(event) => {
          setInputText(event.target.value)
         }}/>

          <button type='submit' className='m-1 border-2 rounded-md bg-orange-500 px-2 py-[0.15rem] text-white font-bold hover:bg-orange-300 active:border-orange-600'> + </button>
        </form>
      </div>
      {todolist && <div>
        {todolist.map(todo => {
          return (<div key={todo.id} className='flex flex-row mb-1.5 mx-0 mt-0'>
                    <Link to={`/todo/${todo.id}`} key={todo.id}>
                    <TodoItem value={todo.value}/> </Link>
                     <ToggleStatusButton toggle={toggleStatus} flag={todo.isDone} id={todo.id} />
                     <DeleteButton deleteItem={deleteToDo} id={todo.id}/>
                  </div>
          )         
        })}        
      </div>}
    </div>
  )
}

export default Home
