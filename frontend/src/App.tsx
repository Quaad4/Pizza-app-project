import Navbar from "./components/Navbar";
import PizzaProvider from "./context/PizzaProvider";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreatePizza from "./pages/CreatePizza";
import Pizzas from "./pages/Pizzas";
import EditPizza from "./pages/EditPizza";
import Orders from "./pages/orders";
import OrderProvider from "./context/OrderProvider";

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
        </Routes>
      </OrderProvider>
    </PizzaProvider>
  )
}