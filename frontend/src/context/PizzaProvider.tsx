import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import axios from 'axios';

export type Pizza = {
    id: number,
    name: string,
    price: number,
    rating: number,
    active: boolean,
    description: string,
}

export type PizzaInput = Omit<Pizza, "id">
export type PizzaErrors = Partial<Record<keyof PizzaInput, string[]>>

type Context = {
    pizzas: Pizza[],
    addPizza: (pizza: PizzaInput) => Promise<boolean>,
    removePizza: (id: number) => void,
    updatePizza: (pizza: Pizza) => Promise<boolean>,
    pizzaErrors: PizzaErrors,
}

type PizzaProviderProps = {
    children: ReactNode
}

const PizzaContext = createContext<null | Context>(null)

export default function PizzaProvider({ children }: PizzaProviderProps) {
    const [pizzas, setPizzas] = useState<Pizza[]>([])

    const [pizzaErrors, setPizzaErrors] = useState<PizzaErrors>({})

    async function fetchPizzas(): Promise<Pizza[]> {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/pizzas')
            return Array.isArray(res.data.data) ? res.data.data as Pizza[] : []
        } catch (err) {
            console.error(err)
            return []
        }
    }

    useEffect(() => {
        async function loadPizzas() {
            const fetchedPizzas = await fetchPizzas()
            setPizzas(fetchedPizzas)
        }

        loadPizzas()
    }, [])

    async function addPizza(pizza: PizzaInput): Promise<boolean> {
        setPizzaErrors({})

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/pizzas', pizza)
            setPizzas(prev => [...prev, res.data])
            return true
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 422) {
                setPizzaErrors(err.response.data.errors)
            }
            return false
        }
    }

    async function updatePizza(pizza: Pizza): Promise<boolean> {
        try {
            const res = await axios.put(`http://127.0.0.1:8000/api/pizzas/${pizza.id}`, pizza)
            setPizzas(prev => prev.map(item => {
                if (item.id === pizza.id) {
                    return res.data
                }
                return item
            }))
            return true
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 422) {
                setPizzaErrors(err.response.data.errors)
            }
            return false
        }
    }

    async function removePizza(id: number) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            setPizzas(curr => curr.filter(pizza => pizza.id !== id))
            return true
        } catch (err) {
            console.error(err)
            return false
        }
    }

    return (
        <PizzaContext value={{ pizzas, addPizza, removePizza, updatePizza, pizzaErrors }}>{children}</PizzaContext>
    )
}

export function usePizzas() {
    const pizzaContext = useContext(PizzaContext)
    if (pizzaContext === null) throw new Error("Null context")

    return pizzaContext
}