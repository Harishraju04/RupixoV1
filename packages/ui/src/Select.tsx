interface SelectProps{
    options:{key:string,value:string}[],
    onSelect:(value:string)=>void
}
export default function Select({options,onSelect}:SelectProps){
    return (
      <div>
        <select className="bg-zinc-800  text-zinc-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>{onSelect(e.target.value)}}>
          {
            options.map(option=> <option value={option.key}>{option.value}</option>)
          }
        </select>
      </div>
    )
}