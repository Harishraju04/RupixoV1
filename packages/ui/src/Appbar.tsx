
import {Button} from "./button";
interface AppbarProps{
   user?:{
    name?:string|null
   },
   onSigin:()=>void,
   onSignout:()=>void

}
export default function Appbar({user,onSigin,onSignout}:AppbarProps){
    return <div className="flex justify-between border-b px-4">
        <div className="text-xl flex flex-col justify-center p-3">Rupixo</div>
        <div className="flex flex-col justify-center p-2">
            <Button onClick={user?onSignout:onSigin}>{user?"Logout":"Login"}</Button>
        </div>
    </div>
}