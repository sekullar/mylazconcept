import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../Firebase/Firebase";
import toast from 'react-hot-toast';
import { useCookies } from "react-cookie";
import { UserInfoContext } from "../Context/UserInfoContext";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from "../Firebase/Firebase";



const Login = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [data,setData] = useState();

    const [cookies, setCookie, removeCookie] = useCookies(['uid']);

    const {setUserRoleSwap,setUserMailSwap,setUsernameSwap} = useContext(UserInfoContext)

    const inOneYear = new Date();
    inOneYear.setFullYear(inOneYear.getFullYear() + 1); 

    const handleKeyDown = (e) => {
        if(e.key == "Enter"){
            sendLogin(e);
        } 
    }
    const fetchUserInfo = async (uid) => {
        try {
            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setData(userData);
                setUserRoleSwap(userData.role);
                setUsernameSwap(userData.username);
                navigate("/home");
            } else {
                toast.error("Kullanıcı bilgileriniz bulunamıyor, yeniden kayıt olmanız gerekebilir.");
            }
        } catch (error) {
            console.error("Kullanıcı bilgilerini alırken bir hata oluştu:", error);
            toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };
    
    const sendLogin = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Yükleniyor...");
            const user = await login(email, password);
    
            setCookie("uid", user.uid, { path: "/", expires: inOneYear });
            setUserMailSwap(user.email);
    
            await fetchUserInfo(user.uid);
    
            toast.dismiss();
            toast.success("Giriş yapıldı");
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error("Giriş başarısız. Lütfen tekrar deneyin.");
        }
    };
    
    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="inter-600 text-500 pt-8 text-sky-700 text-3xl absolute top-0">Mylazconcept</p>
                <div className="flex flex-col gap-4 justify-center  border p-5 rounded-lg px-28 py-12 pb-7">
                    <p className="inter-600 text-500 text-sky-700 text-3xl  text-center mb-4">Hoşgeldiniz!</p>
                    <div className="flex flex-col">
                        <p className="inter-500">E-Posta:</p>
                        <input type="mail" onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} className="border px-2 py-1 rounded-lg outline-0" placeholder="E-Posta"/>
                    </div>
                    <div className="flex flex-col">
                        <p className="inter-500">Şifre:</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="border px-2 py-1 rounded-lg outline-0" placeholder="Şifre"/>
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