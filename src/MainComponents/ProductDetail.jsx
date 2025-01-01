import { useEffect, useState } from "react"
import Header from "./Header"
import { doc, getDoc, } from "firebase/firestore";
import { useSearchParams,useNavigate } from 'react-router-dom';
import { db } from "../Firebase/Firebase";
import toast from "react-hot-toast";

const ProductDetail = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const categoryPar = searchParams.get("categoryPar");
    const [product,setProduct] = useState(null);
    const [loading,setLoading]= useState(true);
    const [convertedTimestamp,setConvertedTimestamp] = useState();

    const convertTimestampToTRDate = () => {
        if (product && product.CreatedAt) {
          const timestamp = product.CreatedAt;
          const date = new Date(timestamp);
    
          const formattedDate = date.toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          });
    
          setConvertedTimestamp(formattedDate);
        }
      };


    const getProduct = async () => {
        try {
          const docRef = doc(db, `products/${categoryPar}/products/${productId}`);
          console.log(docRef)
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setLoading(false);
            convertTimestampToTRDate();
            setProduct(docSnap.data());
            return docSnap.data(); 
          } else {
            console.log("No such document!");
            return null;
          }
        } catch (error) {
          console.error("Error getting document:", error);
          toast.error("Böyle bir ürün yok")
        }
      };
      

    useEffect(() => {
        if(!productId){
            navigate("/home")
        }
        else{
            getProduct();
        }
    }, [])

    return(
        <>
            <div className={`bg-white fixed w-full h-screen ${loading ? "flex" : "hidden"} items-center justify-center`}>
                <div className="loader"></div>
            </div>
            <Header />
            <div className="flex justify-center items-center flex-col">
                <div className="flex">
                    <img src={product && product.productPicture} className="w-[500px]" alt="Product Picture" />
                    <div className="flex flex-col">
                        <p className="inter-600 text-4xl">{product && product.productName}</p>
                        <p className="inter-500 text-xl">{product && product.productDesc}</p>
                        <p className="inter-500">Ürün stoğu: {product && product.productPiece}</p>
                    </div>
                </div>
                <div className="w-[300px] h-[4px] rounded-lg bg-gray-300 mt-12"></div>
                <div className="flex flex-col mt-12">
                    <p className="inter-500">Ürün ID:{product && product.productId}</p>
                    <p className="inter-500">Ürün kategorisi: {product && product.productCategory}</p>
                    <p className="inter-500">Ürün ekleme tarihi: {convertedTimestamp}</p>
                </div>
            </div>
        </>
    )
} 

export default ProductDetail