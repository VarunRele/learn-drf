export type vehicle_info = {
    id: number
    vehicle_type: string
    reg_number: string
}

export type vehicle_info_paginated = {
    count: number
    next: string | null
    previous: string | null
    results: vehicle_info[]
}