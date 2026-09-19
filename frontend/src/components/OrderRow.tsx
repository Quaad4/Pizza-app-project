// import { Link } from "react-router"
import { type OrderWithPizza } from "../context/OrderProvider"
import Button from "./Button"

type OrderRowProps = {
    order: OrderWithPizza,
}

export default function OrderRow({ order }: OrderRowProps) {

    return (
        <tr className="group transition-colors duration-150 hover:bg-blue-50/40">
            <td className="px-5 py-4 text-sm font-medium">
                {order.id}
            </td>
            <td className="px-5 py-4 text-sm">{order.pizza?.name || 'No Name Found'}</td>
            <td className="px-5 py-4 text-sm">{order.quantity}</td>
            <td className="px-5 py-4 text-sm">
                <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold
                        ${order.status ?
                            "bg-emerald-100 text-emerald-700"
                            :
                            "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {order.status}
                </span>
            </td>
            <td className="px-5 py-4">
                <div>
                    {/* <Link
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                        to={`/pizzas/edit/${pizza.id}`}
                    >
                        Edit
                    </Link> */}

                    <Button
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100"
                        // onClick={() => removePizza(pizza.id)}
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    )
}