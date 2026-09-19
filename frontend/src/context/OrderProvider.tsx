import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import axios from 'axios';
import { usePizzas, type Pizza } from "./PizzaProvider";

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded'

export type Order = {
    id: number,
    pizza_id: number,
    quantity: number,
    status:  OrderStatus
}

export type OrderWithPizza = Order & {
    pizza?: Pizza
}

type Context = {
    orders: Order[],
    ordersWithPizza: OrderWithPizza[],
    addOrder: (id: number) => void,
}

type OrderProviderProps = {
    children: ReactNode
}

const OrderContext = createContext<null | Context>(null)

export default function OrderProvider({ children }: OrderProviderProps) {

    const { pizzas } = usePizzas()

    const [orders, setOrders] = useState<Order[]>([])

    const pizzaById = new Map(pizzas.map(pizza => [pizza.id, pizza]))

    const ordersWithPizza: OrderWithPizza[] = orders.map(order => ({
        ...order,
        pizza: pizzaById.get(order.pizza_id),
    }))

    async function fetchOrders(): Promise<Order[]> {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/orders')
            return Array.isArray(res.data.data) ? res.data.data as Order[] : []
        } catch (err) {
            console.error(err)
            return []
        }
    }

    useEffect(() => {
        async function loadOrders() {
            const fetchedOrders = await fetchOrders()
            setOrders(fetchedOrders)
        }

        loadOrders() 
    }, [])

    async function addOrder(pizzaId: number, quantity: number = 1, status: OrderStatus = 'pending'): Promise<boolean> {
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/orders', {pizza_id: pizzaId, quantity, status})
            setOrders(curr => [...curr, res.data])
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    return (
        <OrderContext value={{ orders, ordersWithPizza, addOrder }}>{children}</OrderContext>
    )
}

export function useOrders() {
    const orderContext = useContext(OrderContext)
    if (orderContext === null) throw new Error("Null context")

    return orderContext
}