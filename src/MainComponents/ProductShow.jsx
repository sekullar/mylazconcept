import Header from "./Header"
import { useContext } from "react"
import { ProductForwardContext } from "../Context/ProductForwardContext"
import { useEffect,useState } from "react";
import { db } from "../Firebase/Firebase"
import toast from 'react-hot-toast'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

const ProductShow = () => {

    const {categoryForward} = useContext(ProductForwardContext);
    const [loading,setLoading] = useState(true)
    const [productData,setProductData] = useState([]);

    useEffect(() => {
        console.log(categoryForward)
        fetchProductByCategory(categoryForward);
    }, [])

    const navigate = useNavigate();

    const fetchProductByCategory = async (category) => {
        try{
            const querySnapshot = await getDocs(collection(db, `products/${category}/products`));
            const productsList = [];

            querySnapshot.forEach((doc) => {
              productsList.push({ id: doc.id, data: doc.data() });
            });
            console.log(productsList)
            setProductData(productsList);
            setLoading(false);
        } 
        catch(error){
            console.error(error)
            toast.error("Kategori çekilirken bir hata oluştu")
        }
    }

    return(
        <>
            <div className={`bg-white fixed w-full h-screen ${loading ? "flex" : "hidden"} items-center justify-center`}>
                <div className="loader"></div>
            </div>
            <Header />
                <button className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg inter-500 text-white ms-12 mb-6 transition-all duration-300" onClick={() => navigate("/home")}>Anasayfaya dön</button>
                <div className="flex justify-center items-center gap-5 w-full px-12 flex-wrap">
                    {productData && productData.length > 0 ? (
                            productData.map((product, key) => {
                                return (
                                    <div className="2xl:w-1/3 max-w-[350px] lg:w-1/3 md:w-1/2  h-[400px] cursor-pointer" onClick={() => {navigate(`/productDetail?productId=${product.data.productId}&categoryPar=${product.data.productCategory}`);}}>
                                        <div key={key} className="flex flex-col border p-2 rounded-lg items-center h-full justify-center">
                                            <img src={product.data.productPicture} loading="lazy" className="w-[300px] h-[300px] object-contain" alt="Ürün" />
                                            <p className="inter-500">{product.data.productName}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Henüz bu kategoride ürün yok</p>
                        )}
                </div>
        </>
    )
}

export default ProductShow