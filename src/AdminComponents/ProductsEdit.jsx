import Select from 'react-select'
import Modal from 'react-modal';
import Refresh from "../images/refresh.svg"
import { db } from "../Firebase/Firebase"
import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import "firebase/firestore"
import toast from 'react-hot-toast'
import Plus from "../images/plus.svg"
import { useContext } from 'react'
import { AdminPanelContext } from '../Context/AdminPanelContext'
import { useNavigate } from 'react-router-dom'
import Close from "../images/close.svg"
import { doc, deleteDoc } from "firebase/firestore";

const ProductsEdit = () => {

    const {pageValue,setPageValue} = useContext(AdminPanelContext)

    const [modalOpen,setModalOpen] = useState(false);

    const [allCategoryData,setAllCategoryData] = useState();
    const [selectedCategoryData,setSelectedCategoryData] = useState(); 
    
    const [showAllCategory,setShowAllCategory] = useState(false);
    const [showSelectedCategory,setShowSelectedCategory] = useState(false);


    // PRODUCT INFO KEEP STATE

    const [productName,setProductName] = useState("");
    const [productDesc,setProductDesc] = useState("");
    const [productPiece,setProductPiece] = useState("");
    const [productPicture,setProductPicture] = useState("");
    const [productId,setProductId] = useState("");
    const [productCategory,setProductCategory] = useState("");
    const [createdAt,setCreatedAt] = useState("");

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000); 

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        const hours = date.getHours();
        const minutes = date.getMinutes();
      
        const formattedDate = `${day.toString().padStart(2, "0")} ${month.toString().padStart(2, "0")} ${year}`;
        const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      
        return `${formattedDate} ${formattedTime}`;
      };
      

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const navigate = useNavigate();

    const options = [
        { value: 'all', label: 'Tümü' },
        { value: 'toys', label: 'Oyuncak' },
        { value: 'magnet', label: 'Magnet' },
        { value: 'gift', label: 'Hediyelik eşya' }
    ]

    const [selectedOption, setSelectedOption] = useState(null); 

    const fetchAllProducts = async () => {
        toast.loading("Yükleniyor...")
        try {
          const categories = ["gift", "toys", "magnet"]; 
          const allProducts = [];
      
          for (const category of categories) {
            const querySnapshot = await getDocs(collection(db, `products/${category}/products`));
            querySnapshot.forEach((doc) => {
              allProducts.push({ id: doc.id, category, data: doc.data() });
            });
          }
          console.log(allProducts)
          toast.dismiss();
          setAllCategoryData(allProducts)
          setShowAllCategory(true)
          setShowSelectedCategory(false)
          return allProducts; 
        } catch (error) {
          console.error("Error fetching all products:", error);
          toast.error("Tüm ürünler çekilirken bir hata oluştu.")
        }
      };

    const fetchProductByCategory = async (category) => {
        toast.loading("Yükleniyor...")
        try{
            const querySnapshot = await getDocs(collection(db, `products/${category}/products`));
            const productsList = [];

            querySnapshot.forEach((doc) => {
              productsList.push({ id: doc.id, data: doc.data() });
            });
            console.log(productsList)
            toast.dismiss();
            setSelectedCategoryData(productsList)
            setShowSelectedCategory(true)
            setShowAllCategory(false)
        } 
        catch(error){
            console.error(error)
            toast.dismiss();
            toast.error("Kategori çekilirken bir hata oluştu")
        }
    }

    

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

    const deleteProduct = async (state, id) => {
        try {
          const productRef = doc(db, `products/${state}/products/${id}`);
          
          await deleteDoc(productRef);
          
          console.log("Ürün başarıyla silindi!");
          toast.success("Ürün silindi!")
          setModalOpen(!modalOpen)
          fetchProductByCategory(selectedOption)
        } catch (error) {
          console.error("Silme sırasında hata oluştu:", error);
          toast.error("Ürün silinirken bir hata oluştu lütfen geliştiriciye danışın")
        }
      };

    useEffect(() => {
    }, [selectedOption])

    return(
        <>  <Modal style={customStyles} isOpen={modalOpen}>
            <div className="flex items-center">
                <div className="flex flex-col">
                    <div className='flex items-center justify-end'>
                            <img src={Close} className='w-[35px]' onClick={() => setModalOpen(!modalOpen)} alt="Close" />
                    </div>
                    <img src={productPicture} className='h-[300px]' loading='lazy' alt="Product Picture" />
                    <p className='inter-700 text-xl mt-5'>{productName}</p>
                    <div className='max-h-[250px]'>
                        <p className='inter-500 '>{productDesc}</p>
                    </div>
                    <p className='inter-500'>Ürün adeti: {productPiece}</p>
                    <p className='inter-500'>Ürün kategorisi: {productCategory}</p>
                    <p className='inter-500'>ID:{productId}</p>
                    <p className='inter-500'>Şu tarihte oluşturuldu: {formatTimestamp(createdAt)}</p>
                    <button className='inter-500 text-white bg-red-500 hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-lg mt-4' onClick={() => deleteProduct(productCategory,productId)}>Ürünü sil</button>
                </div>
               
                
            </div>
               
            </Modal>
            <button className='ms-4 my-3 bg-sky-500 hover:bg-sky-600 transition-all duration-300 rounded-lg px-4 py-2 inter-500 text-white' onClick={() => navigate("/home")}>Anasayfaya dön</button>
            <div className="border flex flex-col p-4 mx-4 rounded-lg max-h-[600px] overflow-auto h-[300px]">
                <div className="flex justify-between items-center mb-3">
                    <p className="inter-500 text-lg">{showAllCategory ? "Tüm kategorilerden ürünler" : ""}{showSelectedCategory ? `${selectedOption} kategorisi` : ""}</p>
                    <div className="flex items-center gap-3">
                        <Select options={options} onChange={(option) => setSelectedOption(option.value)}/>
                        <button className='bg-sky-500 hover:bg-sky-600 transition-all duration-300 p-2 rounded-lg' onClick={() => fetchCategory()}>
                            <img src={Refresh} className='invert' alt="Refresh" />
                        </button>
                    </div>
                </div>
                <div className={`${showAllCategory || showSelectedCategory  ? "hidden" : "ok"}`}>
                    <p className='inter-500 '>Ürünleri filrtelemek için kategori seçin ve yenileyin</p>
                </div>
                {showAllCategory ? 
                    allCategoryData.map((data,key) => {
                        return(
                            <div className='flex items-center justify-between border-b-2 mt-3 py-2' key={key}>
                                <p className='inter-500 ms-12'>{data.data.productName}</p>
                                <button className='inter-500 text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 rounded-lg px-4 py-2'>...</button>
                            </div>
                        )
                        
                    }) :""
                }
                {showSelectedCategory ? 
                    selectedCategoryData.map((data,key) => {
                        return(
                            <div className='flex items-center justify-between border-b-2 mt-3 py-2' key={key}>
                                <p className='inter-500 ms-12'>{data.data.productName}</p>
                                <button className='inter-500 text-white bg-sky-500 hover:bg-sky-600 transition-all duration-300 rounded-lg px-4 py-2 outline-0' onClick={() => {setProductName(data.data.productName); setProductDesc(data.data.productDesc); setProductId(data.data.productId); setProductPicture(data.data.productPicture); setProductPiece(data.data.productPiece); setCreatedAt(data.data.CreatedAt); setProductCategory(data.data.productCategory); setModalOpen(true)}}>...</button>
                            </div>
                        )
                        
                    }) :""
                }
            </div>
            <button className='bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-2 py-1 rounded-lg text-white inter-500 flex items-center mx-4 mt-5' onClick={() => setPageValue("addProduct")}>Ürün ekle <img src={Plus} className='w-[30px] invert ' alt="Plus"/></button>
        </> 
    )
}

export default ProductsEdit