import { doc,getDoc } from "firebase/firestore"
import { db } from "../Firebase/Firebase"
import { useState } from "react";
import { useEffect } from "react";

const Banner = () => {

    const [navbarData, setNavbarData] = useState([]);
    const [activeState,setActiveState] = useState(false)

    const fetchNavbarData = async () => {
        try {
            const docRef = doc(db, "siteManagement", "homeNavbar"); 
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setNavbarData(docSnap.data());
                
            } else {
                console.log("Belge bulunamadı!");
            }
        } catch (error) {
            console.error("Error getting document: ", error);
        }
      };

    useEffect(() => {
        fetchNavbarData();
    }, [])

    useEffect(() => {
        console.log(navbarData)
        setActiveState(navbarData.active)
    }, [navbarData])

    useEffect(() => {
        console.log(activeState)
    }, [activeState])

    return(
        <>
            <div className={`${activeState == "true" ? "flex" : "hidden"} justify-center py-2 bg-sky-600`}>
                <p className="inter-600 text-white text-center">{navbarData ? navbarData.text : "Sayfa hatası: yazı belirtilmemiş"}</p>
            </div> 
        </>
    )
}

export default Banner