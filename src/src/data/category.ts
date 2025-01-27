import { Cat } from "./shared"
import Colours from "./colours";
import { Radio } from "./comms";
export class Category {
    static Comms = Cat("Communcation",Colours.Green,[Radio.FireGround,Radio.IncidentControllerFG],[]);
}