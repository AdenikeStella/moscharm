import { Routes, Route } from "react-router-dom";
import {Cart, Home} from "../pages"
import { Checkout } from "../pages/Checkout";


export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  )
}
