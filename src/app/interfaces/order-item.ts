export interface OrderItem{
    id:string;
    orderId:string;
    menuItemId:string;
    menuItemName:string;
    price:number;
    quantity:number;
    description:string;
    status:string;
}

export interface CreateOrderItemDto {
    orderId:string;
    menuItemId:string;
    quantity:number;
    description:string;
}

export interface UpdateOrderItemDto {
    quantity:number;
    description:string;
}