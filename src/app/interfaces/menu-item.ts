export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryName: string;
}

export interface UpdateMenuItem {
    name?: string;
    description?: string;
    price?: number;
    categoryName?: string;
}