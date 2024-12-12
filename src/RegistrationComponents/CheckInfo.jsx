import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from "../Firebase/Firebase";
import toast from 'react-hot-toast';
import { useContext } from "react";
import "../css/loader.css"
import { UserInfoContext } from "../Context/UserInfoContext";


const CheckInfo = () => {
    
    const [cookies, setCookie, removeCookie] = useCookies(['uid']);

    const [data,setData] = useState([])

    const navigate = useNavigate();


    const {setUsernameSwap,setUserRoleSwap,setMailSwap} = useContext(UserInfoContext)

    useEffect(() => {
        if(data != []){
            setUsernameSwap(data.username)
            setUserRoleSwap(data.role)
        }
    }, [data])


    const fetchUserInfo = async () => {
        try{
            const uid = cookies.uid;
            const userDocRef = doc(db,"users",uid);
            const userDoc = await getDoc(userDocRef);
            console.log(userDoc.data())
            setData(userDoc.data());
            if(userDoc.exists()){
                navigate("/home")
            }
            else{
                toast.error("Kullanıcı bilgileriniz bulunamıyor, yeniden kayıt olmanız gerekebilir.");
            }
        }
        catch{

        }
    }

    useEffect(() => {
        if(cookies.uid){
            fetchUserInfo();
        }
        else{
            navigate("/home")
        }
    }, [])

    return(
        <>
            <div className="bg-white position-fixed w-full h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        </>
    )
}

export default CheckInfo