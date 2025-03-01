import './App.css'
import {Route, Routes} from "react-router-dom";
import {Products} from "./containers/Products/Products.tsx";
import {Nav} from "./components/Nav/Nav.tsx";
import {AddProduct} from "./containers/AddProduct/AddProduct.tsx";
import {PathEnum} from "./shared/enums/Path.enum.ts";
import {UpdateProduct} from "./containers/UpdateProduct/UpdateProduct.tsx";

function App() {

    return (
        <>
            <Nav/>
            <Routes>
                <Route path={PathEnum.INDEX} element={<Products/>}/>
                <Route path={PathEnum.ADD} element={<AddProduct/>}/>
                <Route path={PathEnum.UPDATE} element={<UpdateProduct/>}/>
            </Routes>
        </>

    )
}

export default App
