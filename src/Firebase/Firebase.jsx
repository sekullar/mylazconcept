import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import toast, { Toaster } from 'react-hot-toast';
import {  getFirestore,setDoc, doc  } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";






const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MESASUREMENTID
}



export const register = async (username, email, password,member) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password,member);
  
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: user.email, 
        role: "member",
        createdAt: new Date().toISOString(), //fixlencek, yanl1ış kaydediyor.
      });
  
    } catch (error) {
      console.error("Kayıt sırasında hata oluştu:", error);
    }
  };

export const login  =  async (email,password) => {
  try{
      const { user } = await signInWithEmailAndPassword(auth,email,password);
      return user;
  }
  catch(error){
    toast.dismiss();

    switch (error.code) {
      case "auth/invalid-credential":
        toast.error("Kullanıcı adı veya şifre yanlış");
        break;
      case "auth/too-many-requests":
        toast.error("Çok fazla istekte bulundunuz, lütfen bir süre sonra tekrar deneyin.");
        break;
      case "auth/invalid-email":
        toast.error("Geçersiz e-posta adresi!");
        break;
      default:
        toast.error("Giriş işlemi sırasında bir hata oluştu.");
        break;
    }

    return null;
  }
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {db};

// VERİTABANINA KULLANICI ADI KAYDI YAPILACAK, REGİSTERDE BU FONKSİYON SAĞLANACAK