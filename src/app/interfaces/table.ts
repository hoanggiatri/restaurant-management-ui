export interface Table {
    id: string;
    name: string;
    seats: number;
}

export interface CreateTableDto {
    name: string;
    seats: number;
}

export interface UpdateTableDto {
    name: string;
    seats: number;
}