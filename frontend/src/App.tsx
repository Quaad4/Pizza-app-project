import Navbar from "./components/Navbar";
import PizzaProvider from "./context/PizzaProvider";
import { Routes, Route } from "react-router";
import Home from "./pages/pizzas/Home";
import CreatePizza from "./pages/pizzas/CreatePizza";
import Pizzas from "./pages/pizzas/Pizzas";
import EditPizza from "./pages/pizzas/EditPizza";
import Orders from "./pages/orders/Orders";
import OrderProvider from "./context/OrderProvider";
import OrderLines from "./pages/orders/OrderLines";

export default function App() {
  return (
    <PizzaProvider>
      <OrderProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePizza />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/pizzas/edit/:id" element={<EditPizza />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="orders/:id/orderLines" element={<OrderLines/>}></Route>
        </Routes>
      </OrderProvider>
    </PizzaProvider>
  )
}