export interface Order {
    id: string;
    totalPrice: number;
    status: string;
    tableName: string;
}

export interface CreateOrderDto{
    status: string;
    tableName: string;
}

export interface UpdateOrderDto{
    status?: string;
    tableName?: string;
    totalPrice?:number;
}