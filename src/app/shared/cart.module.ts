import { NewItem } from "./new-item.model";

export class Cart {
  email: string = "";
  address: string = "";
  name: string = "";
  phone: string = "";
  items: Array<NewItem> = [];
}
