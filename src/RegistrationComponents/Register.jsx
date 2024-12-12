import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { register } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";


const Register = () => {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");

    const sendRegister = async () => {
        if(username == "" || mail == "" || password == ""){
            toast.error("Lütfen bilgileri boş bırakmayın!")
        }
        else{
            if(password.length < 6){
                toast.error("Şifreniz 6 haneden az olamaz!")
            }
            else{
                try{
                    toast.loading("Yükleniyor...")
                    const user = await register(username,mail, password);
                    toast.dismiss();
                    toast.success("İşlem başarılı!")
                    navigate("/home")
                }
                catch(error){
                    toast.error("Kayıt olunurken bir hata oluştu!")
                    console.error(error)
                }
            }
        }
    } 

    return(
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="inter-600 text-500 pt-8 text-sky-700 text-3xl absolute top-0">Mylazconcept</p>
                <div className="flex flex-col gap-4 justify-center  border p-5 rounded-lg px-28 py-12 pb-7">
                    <p className="inter-600 text-500 text-sky-700 text-3xl  text-center mb-4">Hoşgeldiniz!</p>
                    <div className="flex flex-col">
                        <p>Kullanıcı Adı:</p>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} className="border px-2 py-1 outline-0 rounded-lg" placeholder="Kullanıcı Adı:"/>
                    </div>
                    <div className="flex flex-col">
                        <p>E-Posta:</p>
                        <input type="mail" onChange={(e) => setMail(e.target.value)} className="border px-2 py-1 outline-0 rounded-lg" placeholder="E-Posta"/>
                    </div>
                    <div className="flex flex-col">
                        <p>Şifre:</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 outline-0 rounded-lg" placeholder="Şifre"/>
                    </div>
                    <button onClick={(e) => sendRegister(e)} className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 inter-500 rounded-lg px-4 py-2 outline-0 text-white">Kayıt ol</button>
                    <div className="w-full h-[2px] rounded-lg bg-slate-400"></div>
                    <button className="bg-sky-500 hover:bg-sky-600 rounded-lg text-white inter-500 px-4 py-2 transition-all duration-300 mt-5" onClick={() => navigate("/login")}>Zaten hesabınız var mı?</button>
                </div>  
            </div>
        </>
    )
}

export default Register;