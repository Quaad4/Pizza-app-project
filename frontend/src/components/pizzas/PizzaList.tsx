import { usePizzas } from "../../context/PizzaProvider";
import PizzaListItem from "./PizzaListItem";

export default function ReviewList() {

    const { pizzas } = usePizzas()

    if(!pizzas.length) {
        return <p className="text-center text-zinc-500 py-12">No pizzas yet. Add one above to get started.</p>
    }

    return (
        <ul className="flex flex-row flex-wrap gap-3 p-5 justify-center items-center">
           {pizzas.map(pizza => (
             <PizzaListItem key={pizza.id} pizza={pizza}/>
           ))}
        </ul>
    )
}