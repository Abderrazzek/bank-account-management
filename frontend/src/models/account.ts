export interface Account {
    id: string
    ownerId: number
    firstName: string
    lastName: string
    currency: string
    balance: number
    historyBalance: HistoryBalance[]
    isDeleted: boolean
}

export interface HistoryBalance {
    date: string
    balance: number
}
