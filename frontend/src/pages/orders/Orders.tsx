import OrderRow from "../../components/orders/OrderRow"
import { useOrders } from "../../context/OrderProvider"

export default function Orders() {

    const { orders } = useOrders()

    return (
        <div
            className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm mt-5"
        >
            <table className="w-full table-fixed">

                <tbody className="divide-y divide-slate-100">

                    {orders.map(order => (
                        <OrderRow order={order} key={order.id}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}