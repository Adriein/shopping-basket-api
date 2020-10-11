import { ListStatus } from "./ListStatus";
import { Product } from "./Product";
import { User } from "./User";

export interface List {
    title: string;
    users: User[];
    status: ListStatus;
    dateCreated: Date;
    products: Product[];

}