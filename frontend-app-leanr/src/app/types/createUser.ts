export type createUserSchema = {
    email?: string | null
    username?: string | null
    password?: string | null
}

export type token = {
    access: string
    refresh: string
}