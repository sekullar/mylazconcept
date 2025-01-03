import User from "../images/user.svg"
import Logo from "../images/logo2.png"
import Shield from "../images/shield.svg"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";
import { UserInfoContext } from "../Context/UserInfoContext";
import "../css/header.css"
import { useState } from "react";

const Header = () => {

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  const [userRoleState,setUserRoleState] = useState(true);

  const {usernameSwap, userRoleSwap} = useContext(UserInfoContext);

  useEffect(() => {
  }, [usernameSwap])


    const navigateCheckCookie = () => {
        if(cookies.uid){
            navigate("/accountManager")
        }
        else{
            navigate("/register")
        }
    }

    useEffect(() => {
        if(usernameSwap == ""){
            navigate("/");
        }
    }, []) 

    useEffect(() => {
        setUserRoleState(userRoleSwap)
    }, [userRoleSwap])

    return(
        <>
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img src={Logo} className="w-[90px]" alt="Logo" />
                    <p className="inter-600 text-xl sm:block hidden">Toptan & Perakende</p>
                </div>
                <div className="flex items-center gap-4">
                    <div onClick={() => navigateCheckCookie()} className="flex items-center border hover-container-header p-3 rounded-xl border-1 border-slate-600 gap-2 cursor-pointer transition-all duration-300 sm:px-6 px-3 hover:border-zinc-900 hover:bg-zinc-900">
                        <img src={User} className="sm:w-[35px] w-[20px] group-hover:filter group-hover:invert" alt="User" />
                        {cookies.uid ? <p className="inter-500 sm:block hidden">Hoşgeldiniz{usernameSwap != "" ? `, ${usernameSwap}` : ""}</p> : <p className="inter-500 sm:block hidden">Giriş yap</p> }
                    </div> 
                    {userRoleState == "Admin" ? 
                    <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 rounded-lg p-3" onClick={() => navigate("/AdminPanel")}>
                        <img src={Shield} className="invert sm:w-[36px] w-[20px]" alt="Shield" />
                    </button>
                     : ""}
                </div>
            </div>
        </>
    )
}

export default Header



// CHECK INFO SAYFASINDAN USER DATA PAYLASIMI HAZIR CONTEXT İLE ÇEKİLEBİLİR, ÖZELLİK OLARAK KULLANILAİBLİNİR