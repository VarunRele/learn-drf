import {user} from './user'
import { vehicle_info } from './vehicle_info'

export type log = {
    id: number
    owner?: user | null
    price: string
    quantity_unit: string
    fuel_type: string
    odo: string
    location: string | null
    vehicle_info: vehicle_info
    rud_url: string
}

export type logs = {
    count: number
    next: string | null
    previous: string | null
    results: log[] | null
}
