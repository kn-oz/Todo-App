import { BsCheck2Square} from 'react-icons/bs'
import {MdOutlineDelete} from 'react-icons/md'
import {RiSaveLine} from 'react-icons/ri'

function DeleteButton({id, deleteItem}) {
    return (
        <button onClick={() => deleteItem(id)} className='m-1 border-[1px] bg-zinc-200 rounded border-black hover:bg-red-600 active:bg-red-700' ><MdOutlineDelete size={32}/></button>
    )
}

function ToggleStatusButton({flag, id, toggle}) {
    return (
        <button onClick={() => toggle(id, flag)} className={`${flag? 'bg-green-500': 'bg-zinc-200 hover:bg-green-400'} m-1 border-[1px] rounded border-black`} > <BsCheck2Square size={32}/> </button>
    )
}

function SaveButton() {
    return (
        <button onClick={() => deleteItem(id)} className='m-1 border-[1px] bg-zinc-200 rounded border-black hover:bg-green-500 active:bg-green-600' ><RiSaveLine size={32}/></button>
    )
}

export {ToggleStatusButton, DeleteButton, SaveButton}