export default function TodoItem({value}) {
    return (
        <div className='pt-2 pb-1 bg-slate-200 rounded-lg w-96 h-12 cursor-pointer'> 
            <span className='ml-4 text-zinc-900 font-medium text-lg'>
                {value.length < 30 ? value : `${value.substring(0, 30)}...`} 
            </span>
         </div> 
    )
}