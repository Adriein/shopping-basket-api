import { ListStatus } from "../entities/ListStatus";
import { IProduct } from "./IProduct";
import { User } from "../entities/User";

export interface List {
    id: string;
    title: string;
    users: User[];
    status: ListStatus;
    dateCreated: Date;
    products: IProduct[];

}