import { usePizzas } from "../context/PizzaProvider"
import PizzaRow from "../components/PizzaRow"

export default function Pizzas() {

    const { pizzas } = usePizzas()

    return (
        <div
            className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm mt-5"
        >
            <table className="w-full table-fixed">

                <tbody className="divide-y divide-slate-100">

                    {pizzas.map(pizza => {
                        return <PizzaRow key={pizza.id} pizza={pizza}/>
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}