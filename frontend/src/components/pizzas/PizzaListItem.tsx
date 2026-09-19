import { type Pizza } from "../../context/PizzaProvider"
import { useOrders } from "../../context/OrderProvider"
import Button from "../Button"

type PizzaListItemProps = {
    pizza: Pizza
}

export default function PizzaListItem({ pizza }: PizzaListItemProps) {
    const { addOrder } = useOrders()

    return (
        <div className="flex px-3 py-3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src="pizza.png" alt="Pizza" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{pizza.name}</div>
                    <p className="text-gray-700 text-base">
                        {pizza.description}
                    </p>
                </div>
                <div>
                    <div className="px-6 py-4 flex justify-between">
                        <div>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">⭐ {pizza.rating} </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">💲 {pizza.price}</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{pizza.active ? "✔️" : "❌" }</span>
                        </div>
                        <div>
                            <Button onClick={() => addOrder(pizza.id)} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">Order Pizza!</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}