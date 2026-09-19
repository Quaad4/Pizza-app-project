import type { OrderLineWithPizza } from "../../context/OrderProvider"

type OrderLineRowProps = {
    order_line: OrderLineWithPizza
}

export default function OrderLineRow({order_line}: OrderLineRowProps) {

    return (
        <tr className="group transition-colors duration-150 hover:bg-blue-50/40">
            <td className="px-5 py-4 text-sm font-medium">
                Pizza name: {order_line.pizza.name}
            </td>
            <td className="px-5 py-4 text-sm font-medium">
                Quantity: {order_line.quantity}
            </td>
        </tr>
    )
}