import Left from "../images/left.svg"
import { useContext, useEffect } from "react"
import { AdminPanelContext } from "../Context/AdminPanelContext"
import Select from 'react-select'
import PostCloudinaryImage from "./PostCloudinaryImage";
import Plus from "../images/plus.svg"
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; 
import toast from "react-hot-toast";
import { image } from "@cloudinary/url-gen/qualifiers/source";


const AdminAddProduct  = () =>{

    const {pageValue,setPageValue} = useContext(AdminPanelContext);
    const [mainTriggerPropsState,setMainTriggerPropsState] = useState(0);

    const [productName,setProductName] = useState("");
    const [productDesc,setProductDesc] = useState("");
    const [productCategory,setProductCategory] = useState("");
    const [productPiece,setProductPiece] = useState();
    const [productPicture,setProductPicture] = useState("");
    const [returnTriggerState,setReturnTriggerState] = useState(0);

    const options = [
        { value: 'toys', label: 'Oyuncak' },
        { value: 'magnet', label: 'Magnet' },
        { value: 'gift', label: 'Hediyelik eşya' }
    ]

    const generateRandomId = () => {
        return Math.random().toString(36).substring(2, 15);
    }
    
    useEffect(() => {
        if(mainTriggerPropsState == 1){
            setTimeout(() => {
                setMainTriggerPropsState(0)
            }, [500])
        }
    }, [mainTriggerPropsState])

    useEffect(() => {
        console.log(productPicture)
    }, [productPicture])
    
    const awaitRunFunc = () => {
        setMainTriggerPropsState(1);
    };

    useEffect(() => {
        if (returnTriggerState === 1) {
            console.log("RUNNED");
            addProduct();
        }
    }, [returnTriggerState]);
    
    
    const addProduct = async () => {
        const productId = generateRandomId();
    
        if (productName === "" || productDesc === "" || productPiece === "" || !productCategory) {
            toast.error("Ürün bilgileri eksik, lütfen tüm alanları doldurun.");
            return;
        }
    
        try {
            console.log("confirm")
            console.log("confirm 2")
            const productRef = doc(db, "products", `${productCategory.value}`, `products`, `${productId}`);
            const productData = {
                productName: productName,
                productDesc: productDesc,
                productPiece: productPiece,
                productPicture: productPicture,
                productId: productId,  
                productCategory: productCategory.value,  
                CreatedAt: Date.now() 

            };

    
            toast.dismiss(); 
            toast.loading("Ürün bilgileri veritabanına gönderiliyor...");
            if(productPicture == "" || !productPicture){
                alert("External error")
            }
            else{
                await setDoc(productRef, productData);
            }
    
            toast.dismiss();
            toast.success("Ürün başarıyla eklendi!");
    
            setProductName("");
            setProductDesc("");
            setProductCategory("");
            setProductPiece("");
            setProductPicture("");
        } catch (error) {
            toast.dismiss();
            console.error("Ürün eklenirken hata oluştu:", error);
            toast.error("Ürün eklenirken hata oluştu.");
        }
    };
    

    useEffect(() => {
    }, [productPiece])


    return(
        <>  
            <div className="flex flex-col mx-4">
                <div className="my-3">
                    <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 inter-500 text-white flex items-center rounded-lg px-4 pe-5 py-2" onClick={() => setPageValue("productsEdit")}><img src={Left} className="w-[30px] invert" alt="Left" />Anasayfaya dön</button>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-4 mt-5">
                        <div className="flex flex-col">
                            <p className="inter-500 text-lg">Ürün ismi: </p>
                            <input type="text" className="outline-0 border rounded-lg px-4 py-2" onChange={(e) => setProductName(e.target.value)} placeholder="Ürün ismi"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="inter-500 text-lg">Ürün açıklaması: </p>
                            <textarea type="text" className="outline-0 border rounded-lg px-4 py-2" onChange={(e) => setProductDesc(e.target.value)} placeholder="Ürün açıklaması"/>
                        </div>
                        <div className="flex flex-col">
                            <p className="inter-500 text-lg">Ürün kategorisi: </p>
                            <Select options={options} onChange={(selected) => setProductCategory(selected)}/>
                        </div>
                        <div className="flex flex-col">
                            <p className="inter-500 text-lg">Ürün stoğu: </p>
                            <input type="text" className="outline-0 border rounded-lg px-4 py-2" onChange={(e) => setProductPiece(e.target.value)} placeholder="Ürün stoğu"/>
                        </div>
                    </div>
                    <PostCloudinaryImage mainTriggerProps={mainTriggerPropsState} returnUrl={setProductPicture} returnTrigger={setReturnTriggerState}/>
                </div>
                <div className="flex justify-center mt-5 ">
                    <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-4 py-2  rounded-lg text-white inter-500 flex items-center text-lg outline-0" onClick={() => awaitRunFunc()}><img src={Plus} alt="Plus" className="invert"/>Ürün Ekle</button>
                </div>
            </div>
        </>
    )
}

export default AdminAddProduct