import type { ComponentProps } from "react"

type ButtonProps = {} & ComponentProps<"button">

export default function Button({...props}: ButtonProps) {
    return (
        <button
            {...props}
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
        >
        </button>
    )
}