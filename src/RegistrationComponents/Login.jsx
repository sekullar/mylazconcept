import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../Firebase/Firebase";
import toast from 'react-hot-toast';
import { useCookies } from "react-cookie";



const Login = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies(['uid']);

    const inOneYear = new Date();
    inOneYear.setFullYear(inOneYear.getFullYear() + 1); 


    const sendLogin = async (e) => {
        e.preventDefault();
        try{
            toast.loading("Yükleniyor...");
            const user = await login (email,password);
            setCookie("uid", user.uid,{path: "/", expires: inOneYear})
            toast.dismiss();
            toast.success("Giriş yapıldı");
            navigate("/home")
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="inter-600 text-500 pt-8 text-sky-700 text-3xl absolute top-0">Mylazconcept</p>
                <div className="flex flex-col gap-4 justify-center  border p-5 rounded-lg px-28 py-12 pb-7">
                    <p className="inter-600 text-500 text-sky-700 text-3xl  text-center mb-4">Hoşgeldiniz!</p>
                    <div className="flex flex-col">
                        <p className="inter-500">E-Posta:</p>
                        <input type="mail" onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 rounded-lg outline-0" placeholder="E-Posta"/>
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-500">Şifre:</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 rounded-lg outline-0" placeholder="Şifre"/>
                    </div>
                    <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 inter-500 rounded-lg px-4 py-2 outline-0 text-white" onClick={(e) => sendLogin(e)}>Giriş yap</button>
                    <div className="w-full h-[2px] rounded-lg bg-slate-400"></div>
                    <button className="bg-sky-500 hover:bg-sky-600 rounded-lg text-white inter-500 px-4 py-2 transition-all duration-300 mt-3" onClick={() => navigate("/register")}>Hesabınız yok mu?</button>
                </div>  
            </div>
        </>
    )
}

export default Login