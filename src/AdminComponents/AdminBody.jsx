import ProductsEdit from "./ProductsEdit"
import { useContext, useEffect } from "react"
import { AdminPanelContext } from "../Context/AdminPanelContext"
import AdminAddProduct from "./AdminAddProduct"

const AdminBody = () => {

    const {pageValue} = useContext(AdminPanelContext)

    useEffect(() => {
        console.log("aktif",pageValue)
    }, [pageValue])

    return(
        <>
            {pageValue === "productsEdit" ? <ProductsEdit /> : ""}
            {pageValue === "addProduct" ? <AdminAddProduct /> : ""}
        </>
    )
}

export default AdminBody