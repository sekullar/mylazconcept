import Select from 'react-select'
import Refresh from "../images/refresh.svg"
import { db } from "../Firebase/Firebase"
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import "firebase/firestore"
import toast from 'react-hot-toast'
import Plus from "../images/plus.svg"
import { useContext } from 'react'
import { AdminPanelContext } from '../Context/AdminPanelContext'

const ProductsEdit = () => {

    const {pageValue,setPageValue} = useContext(AdminPanelContext)

    const options = [
        { value: 'all', label: 'Tümü' },
        { value: 'toys', label: 'Oyuncak' },
        { value: 'magnet', label: 'Magnet' },
        { value: 'gift', label: 'Hediyelik eşya' }
    ]

    const [selectedOption, setSelectedOption] = useState(null); 

    const fetchAllProducts = async () => {
        try {
          const categories = ["gift", "toys", "magnet"]; 
          const allProducts = [];
      
          for (const category of categories) {
            const querySnapshot = await getDocs(collection(db, `products/${category}/products`));
            querySnapshot.forEach((doc) => {
              allProducts.push({ id: doc.id, category, data: doc.data() });
            });
          }
      
          console.log("All products:", allProducts);
          return allProducts; 
        } catch (error) {
          console.error("Error fetching all products:", error);
          toast.error("Tüm ürünler çekilirken bir hata oluştu.")
        }
      };

    const fetchProductByCategory = async (category) => {
        try{
            const querySnapshot = await getDocs(collection(db, `products/${category}/products`));
            const productsList = [];

            querySnapshot.forEach((doc) => {
              productsList.push({ id: doc.id, data: doc.data() });
            });
            console.log(productsList);
        } 
        catch(error){
            console.error(error)
            toast.error("Kategori çekilirken bir hata oluştu")
        }
    }

    useEffect(() => {
        fetchProductByCategory("gift");
    }, [])

    const fetchCategory = () => {
        if(selectedOption == "toys" || selectedOption == "magnet" || selectedOption == "gift"){
            fetchProductByCategory(selectedOption)
        } 
        else{
            if(selectedOption == "all"){
                fetchAllProducts();
            }
            else{
                toast.error("Kategori yenilenirken bir hata oluştu")
            }
        }
       
        
    }

    useEffect(() => {
        console.log(selectedOption)
    }, [selectedOption])

    return(
        <>
            <div className="border flex flex-col p-4 mx-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="inter-500 text-lg">X Kategorisi</p>
                    <div className="flex items-center gap-3">
                        <Select options={options} onChange={(option) => setSelectedOption(option.value)}/>
                        <button className='bg-sky-500 hover:bg-sky-600 transition-all duration-300 p-2 rounded-lg' onClick={() => fetchCategory()}>
                            <img src={Refresh} className='invert' alt="Refresh" />
                        </button>
                    </div>
                </div>
                <div>
                    Ürün
                </div>
            </div>
            <button className='bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-2 py-1 rounded-lg text-white inter-500 flex items-center mx-4 mt-5' onClick={() => setPageValue("addProduct")}>Ürün ekle <img src={Plus} className='w-[30px] invert ' alt="Plus"/></button>
        </> 
    )
}

export default ProductsEdit