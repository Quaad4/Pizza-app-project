import { useEffect, useState, type SubmitEvent } from "react";
import Button from "./Button";
import { usePizzas, type Pizza } from "../context/PizzaProvider";
import { useParams } from "react-router";

type PizzaFormProps = {
    edit: boolean
}

export default function PizzaForm({ edit = false }: PizzaFormProps) {

    const { pizzas, updatePizza, addPizza, pizzaErrors } = usePizzas()
    
    const [success, setSuccess] = useState<boolean>(false)

    // Create Pizza
    const [createPizza, setCreatePizza] = useState<Omit<Pizza, 'id'>>({
        name: '',
        price: 0,
        rating: 0,
        active: true,
        description: ""
    })
    async function submitPizza(e: SubmitEvent) {
        e.preventDefault()

        const wasCreated = await addPizza(createPizza)
        if (!wasCreated) {
            return
        }

        setCreatePizza({
            name: "",
            price: 0,
            rating: 0,
            active: true,
            description: "",
        })

        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 5000)
    }

    // Edit Pizza
    const [pizza, setPizza] = useState<Omit<Pizza, 'id'> | undefined>()
    const { id } = useParams()
    const findPizza: Pizza | undefined = pizzas.find(pizza => pizza.id === Number(id))
    const [pizzaEdit, setPizzaEdit] = useState<Pizza | undefined>()

    useEffect(() => {
        setPizza(findPizza);
        setPizzaEdit(findPizza)
    }, [findPizza]);

    async function submitPizzaUpdate(e: SubmitEvent) {
        e.preventDefault()

        const wasUpdated = await updatePizza(pizzaEdit as Pizza)
        if (!wasUpdated) {
            return
        }

        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 5000)
    }


    // return Edit Pizza
    if (edit) {
        if (pizza === undefined) {
            return (
                <p>Can't find pizza</p>
            )
        }

        return (
            <div className="bg-white border border-4 rounded-lg shadow relative m-10">

                {success ? <h2 className="text-green-500 text-xl">Pizza Updated Successfully!</h2> : <></>}

                <div className="flex items-start justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold">
                        Edit pizza
                    </h3>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={submitPizzaUpdate}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2"> Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="margherita"
                                    required
                                    value={pizzaEdit?.name}
                                    onChange={(e) => setPizzaEdit(curr => ({ ...curr, name: e.target.value }) as Pizza)}
                                />
                                {pizzaErrors.name && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.name[0]}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="15"
                                    required
                                    value={pizzaEdit?.price}
                                    onChange={(e) => setPizzaEdit(curr => ({ ...curr, price: Number(e.target.value) }) as Pizza)}
                                />
                                {pizzaErrors.price && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.price[0]}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="rating" className="text-sm font-medium text-gray-900 block mb-2">Rating</label>
                                <input
                                    type="number"
                                    id="rating"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="4"
                                    required
                                    value={pizzaEdit?.rating}
                                    onChange={(e) => setPizzaEdit(curr => ({ ...curr, rating: Number(e.target.value) }) as Pizza)}
                                />
                                {pizzaErrors.rating && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.rating[0]}</p>}
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="active" className="text-sm font-medium text-gray-900 block mb-2">Active</label>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={pizzaEdit?.active}
                                    onChange={() => setPizzaEdit(curr => ({ ...curr, active: !pizzaEdit?.active }) as Pizza)}
                                />
                                {pizzaErrors.active && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.active[0]}</p>}
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">description</label>
                                <textarea
                                    id="description"
                                    rows={6}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                    placeholder="description..."
                                    required
                                    value={pizzaEdit?.description}
                                    onChange={(e) => setPizzaEdit(curr => ({ ...curr, description: e.target.value }) as Pizza)}
                                ></textarea>
                                {pizzaErrors.description && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.description[0]}</p>}
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 rounded-b">
                            <Button type="submit">Update Pizza</Button>
                        </div>
                    </form>
                </div>


            </div>
        )
    }

    // Return Create Pizza
    return (
        <div className="bg-white border border-4 rounded-lg shadow relative m-10">

            {success ? <h2 className="text-green-500 text-xl">Pizza Created Successfully!</h2> : <></>}

            <div className="flex items-start justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold">
                    Create pizza
                </h3>
            </div>

            <div className="p-6 space-y-6">
                <form onSubmit={submitPizza}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2"> Name</label>
                            <input
                                type="text"
                                id="name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="margherita"
                                required
                                value={createPizza.name}
                                onChange={(e) => setCreatePizza(curr => ({ ...curr, name: e.target.value }))}
                            />
                            {pizzaErrors.name && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.name[0]}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="price" className="text-sm font-medium text-gray-900 block mb-2">Price</label>
                            <input
                                type="number"
                                id="price"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="15"
                                required
                                value={createPizza.price}
                                onChange={(e) => setCreatePizza(curr => ({ ...curr, price: Number(e.target.value) }))}
                            />
                            {pizzaErrors.price && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.price[0]}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="rating" className="text-sm font-medium text-gray-900 block mb-2">Rating</label>
                            <input
                                type="number"
                                id="rating"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                placeholder="4"
                                required
                                value={createPizza.rating}
                                onChange={(e) => setCreatePizza(curr => ({ ...curr, rating: Number(e.target.value) }))}
                            />
                            {pizzaErrors.rating && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.rating[0]}</p>}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="active" className="text-sm font-medium text-gray-900 block mb-2">Active</label>
                            <input
                                type="checkbox"
                                name="active"
                                checked={createPizza.active}
                                onChange={() => setCreatePizza(curr => ({ ...curr, active: !createPizza.active }))}
                            />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">description</label>
                            <textarea
                                id="description"
                                rows={6}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                placeholder="description..."
                                required
                                value={createPizza.description}
                                onChange={(e) => setCreatePizza(curr => ({ ...curr, description: e.target.value }))}
                            ></textarea>
                            {pizzaErrors.description && <p className="text-m font-medium text-red-500 mt-1">{pizzaErrors.description[0]}</p>}
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 rounded-b">
                        <Button type="submit">Add pizza</Button>
                    </div>
                </form>
            </div>


        </div>
    )
}