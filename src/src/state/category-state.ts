import { Category } from "../data/category";
export class FireFighter {
    static generate = () =>{
        var data = [Category.Comms] as any;
        return data;
    }
}

export const NoteCategories =FireFighter.generate();
console.log(NoteCategories);