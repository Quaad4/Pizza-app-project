import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { fetchPizzas } from '../context/PizzaProvider'

vi.mock('axios') 

describe('fetchPizzas', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('returns the pizzas from the API response', async () => {
        const mockPizzas = [
            { id: 1, name: 'Margherita', price: 8.5 },
            { id: 2, name: 'Pepperoni', price: 10 },
        ]

        vi.mocked(axios.get).mockResolvedValue({ data: { data: mockPizzas } })

        const result = await fetchPizzas()

        expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:8000/api/pizzas')
        expect(result).toEqual(mockPizzas)
    })

    it('returns an empty array when data.data is not an array', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: { data: null } })

        const result = await fetchPizzas()

        expect(result).toEqual([])
    })

    it('returns an empty array and logs when the request fails', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const error = new Error('Network Error')
        vi.mocked(axios.get).mockRejectedValue(error)

        const result = await fetchPizzas()

        expect(result).toEqual([])
        expect(consoleSpy).toHaveBeenCalledWith(error)
    })
})