import { useContext, useEffect, useState, useSyncExternalStore } from "react"
import { UserInfoContext } from "../Context/UserInfoContext"
import { useNavigate } from "react-router-dom"
import AdminHeader from "./AdminHeader";
import Close from "../images/close.svg";
import Right from "../images/right.svg";
import "../css/admin.css"
import { AdminPanelContext } from "../Context/AdminPanelContext";
import AdminBody from "./AdminBody";

const AdminPanel = () => {

    const navigate = useNavigate();

    const {userRoleSwap,usernameSwap} = useContext(UserInfoContext);

    const {modalOpen,setModalOpen} = useContext(AdminPanelContext);

    const {pageValue,setPageValue} = useContext(AdminPanelContext);

    const [hiddenModal,setHiddenModal] = useState(false);

    useEffect(() => {
        if(userRoleSwap && userRoleSwap === null || userRoleSwap === undefined){
            navigate("/404NotFound")
        }
    }, [])

    useEffect(() => {
    }, [pageValue])

    useEffect(() => {
        if(!modalOpen){
            setTimeout(() => {
                setHiddenModal(true)
            }, 350)
        }
        else{
            setHiddenModal(false)
        }
    }, [modalOpen])

    

    return(
        <>  
            <div className={`bg-special-dark h-screen fixed w-full ${hiddenModal ? "hidden" : "ok"} ${modalOpen ? "openAni" : "closeAni "}`}>
                <div className={`bg-white h-screen  w-1/4 relative ${modalOpen ? "slideAniOpen" : "slideAniClose"}`}>
                    <div onClick={() => setModalOpen(!modalOpen)} >
                        <img src={Close} className="m-1 absolute top-0 end-0 w-[45px]" alt="Close" />
                    </div>

                    <div className="flex flex-col justify-between gap-5 pt-12 ps-4">
                        <p className="flex items-center inter-500 text-lg cursor-pointer" onClick={() => {setModalOpen(!modalOpen); setPageValue("productsEdit")}}>Ürün işlemleri <img src={Right} alt="Right" className="w-[25px]" /></p>
                        <p className="flex items-center inter-500 text-lg cursor-pointer" onClick={() => {setModalOpen(!modalOpen); setPageValue("usersEdit")}}>Üyelik işlemleri <img src={Right} alt="Right" className="w-[25px]" /></p>
                        <p className="flex items-center inter-500 text-lg cursor-pointer" onClick={() => {setModalOpen(!modalOpen); setPageValue("pagesEdit")}}>Sayfa işlemleri <img src={Right} alt="Right" className="w-[25px]" /></p>
                    </div>
                </div>
            </div>
            <AdminHeader userNameProps={usernameSwap}/>
            <AdminBody />
        </>
    )
}

export default AdminPanel