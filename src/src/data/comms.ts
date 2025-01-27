import { Cat } from "./shared"
import Colours from "./colours";
import { Form } from "./form";
export class Radio {
    static FireGround = Cat("Fire Ground",Colours.Green,[],[Form.Channel]);
    static IncidentControllerFG = Cat("ICS Fire Ground",Colours.Green,[],[Form.Channel]);
}