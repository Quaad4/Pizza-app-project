import { Link } from "react-router"
import { usePizzas, type Pizza } from "../context/PizzaProvider"
import Button from "./Button"

type PizzaRowProps = {
    pizza: Pizza,
}

export default function PizzaRow({ pizza }: PizzaRowProps) {

    const { removePizza } = usePizzas()

    return (
        <tr className="group transition-colors duration-150 hover:bg-blue-50/40">
            <td className="px-5 py-4 text-sm font-medium">
                {pizza.name}
            </td>
            <td className="px-5 py-4 text-sm">{pizza.price}</td>
            <td className="px-5 py-4 text-sm">{pizza.rating}</td>
            <td className="px-5 py-4 text-sm">
                <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold
                        ${pizza.active ?
                            "bg-emerald-100 text-emerald-700"
                            :
                            "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {pizza.active ? "Active" : "Inactive"}
                </span>
            </td>
            <td className="px-5 py-4">
                <div>
                    <Link
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                        to={`/pizzas/edit/${pizza.id}`}
                    >
                        Edit
                    </Link>

                    <Button
                        className="px-3 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100"
                        onClick={() => removePizza(pizza.id)}
                    >
                        Delete
                    </Button>
                </div>
            </td>
        </tr>
    )
}