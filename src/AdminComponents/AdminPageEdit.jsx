import { useState, useEffect } from "react"
import { doc,getDoc,setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import toast from 'react-hot-toast';

const AdminPageEdit = () => {

    const [bannerValue,setBannerValue] = useState("");
    const [bannerData,setBannerData] = useState();
    const [loading,setLoading] = useState(true);

    const fetchNavbarData = async () => {
        try {
            const docRef = doc(db, "siteManagement", "homeNavbar"); 
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLoading(false);
                setBannerData(docSnap.data());
                
            } else {
                setLoading(false)
                toast.error("Hata oluştu, lütfen geliştirici ile iletişime geçin")
                console.log("Belge bulunamadı!");
            }
        } catch (error) {
            console.error("Error getting document: ", error);
        }
      };

    const resetNavbarData = async () => {
        toast.loading("Yükleniyor...")
        const newNavbarData = {
            "active": bannerData.active,
            "text": bannerValue
        }
        try {
          const docRef = doc(db, "siteManagement", "homeNavbar"); 
          await setDoc(docRef, newNavbarData); 
          console.log("Veri başarıyla güncellendi!");
          toast.dismiss();
          toast.success("Banner güncellendi")
          setBannerValue("");
        } catch (error) {
          toast.dismiss();
          toast.error("Veri güncellenirken hata oluştu");
          console.error("Veri güncellenirken hata oluştu: ", error);
        }
      }; 

    const disableBanner = async () => {
        toast.loading("Yükleniyor...");
        const newNavbarData = {
            "active": "false",
            "text": bannerData.text
        }
        try {
            const docRef = doc(db, "siteManagement", "homeNavbar"); 
            await setDoc(docRef, newNavbarData); 
            console.log("Veri başarıyla güncellendi!");
            toast.dismiss();
            toast.success("Banner güncellendi")
            setBannerValue("");
            fetchNavbarData();
          } catch (error) {
            toast.dismiss();
            toast.error("Veri güncellenirken hata oluştu");
            console.error("Veri güncellenirken hata oluştu: ", error);
          }

    }

    const openBanner = async () => {
        toast.loading("Yükleniyor...");
        const newNavbarData = {
            "active": "true",
            "text": bannerData.text
        }
        try {
            const docRef = doc(db, "siteManagement", "homeNavbar"); 
            await setDoc(docRef, newNavbarData); 
            console.log("Veri başarıyla güncellendi!");
            toast.dismiss();
            toast.success("Banner güncellendi")
            setBannerValue("");
            fetchNavbarData();
          } catch (error) {
            toast.dismiss();
            toast.error("Veri güncellenirken hata oluştu");
            console.error("Veri güncellenirken hata oluştu: ", error);
          }

    }

    useEffect(() => {
        fetchNavbarData();
    }, [])

    return(
        <>
            <div className={`bg-white ${loading ? "flex" : "hidden"} w-full h-screen flex items-center justify-center`}>
                <div className="loader"></div>
            </div>
            <div className="mx-12 ">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <p className="inter-600 text-3xl">Anasayfa</p>
                            <div className="flex flex-col gap-5 mt-8">
                                <p className="inter-500">Banner kampanya yazısı</p>
                                <input type="text" className="inter-500 outline-0 border p-1 rounded-lg w-[300px]" value={bannerValue} onChange={(e) => setBannerValue(e.target.value)} placeholder="Kampanya yazısı girin"/>
                                <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white inter-500 px-4 py-2 rounded-lg max-w-[300px]" onClick={() => resetNavbarData()}>
                                    Kaydet
                                </button>
                                {bannerData && bannerData.active == "true" ? 
                                    <button className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white inter-500 px-4 py-2 rounded-lg max-w-[300px]" onClick={() => disableBanner()}>
                                        Devre dışı bırak
                                    </button>
                                :
                                <   button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white inter-500 px-4 py-2 rounded-lg max-w-[300px]" onClick={() => openBanner()}>
                                        Aktif et
                                    </button>
                                } 
                            </div>
                            <div className="flex flex-col gap-5 mt-16">
                                <p className="inter-500">Anasayfa Slider resimleri</p>
                                Buraya slider resim kontrolü eklenicek                                
                            </div>
                    </div>
                    <div className="w-[300px] h-[3px] bg-gray-300 rounded-lg my-12">

                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminPageEdit