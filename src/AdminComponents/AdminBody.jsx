import ProductsEdit from "./ProductsEdit"
import { useContext, useEffect } from "react"
import { AdminPanelContext } from "../Context/AdminPanelContext"
import AdminAddProduct from "./AdminAddProduct"
import AdminPageEdit from "./AdminPageEdit"
import AdminStartup from "./AdminStartup"

const AdminBody = () => {

    const {pageValue} = useContext(AdminPanelContext)

    useEffect(() => {
    }, [pageValue])

    return(
        <>  
            
            {pageValue === "productsEdit" ? <ProductsEdit /> : ""}
            {pageValue === "addProduct" ? <AdminAddProduct /> : ""}
            {pageValue === "pagesEdit" ? <AdminPageEdit /> : ""}
            {pageValue === "adminStartup" ? <AdminStartup /> : ""}
        </>
    )
}

export default AdminBody