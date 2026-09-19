import { useParams } from "react-router"
import OrderLineRow from "../../components/orders/OrderLineRow"
import { useOrders } from "../../context/OrderProvider"

export default function OrderLines() {

    const { ordersWithPizza } = useOrders()
    const { id } = useParams()
    const orderWithPizza = ordersWithPizza.find(order => order.id === Number(id))

    if(!orderWithPizza) {
        return (
            <>
                nothing found
            </>
        )
    }

    return (
        <div
            className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm mt-5"
        >
            <table className="w-full table-fixed">

                <tbody className="divide-y divide-slate-100">

                    {orderWithPizza.order_lines.map(order_line => {
                        return <OrderLineRow key={order_line.id} order_line={order_line}/>
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}