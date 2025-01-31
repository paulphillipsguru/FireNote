import { Cat } from "./shared"
import Colours from "./colours";
import { Radio } from "./comms";
import { Form } from "./form";
export class Category {
    static Note = Cat("Note",Colours.Blue,[],[Form.Note])
    static Itasc = Cat("ITASC",Colours.Gray,[],[Form.Incident,Form.Threat,Form.Action,Form.Support,Form.Command])    
    static Comms = Cat("Communcation",Colours.Green,[Radio.FireGround,Radio.IncidentControllerFG],[ ]);
    static FireSpotType = Cat("Spot",Colours.Red,[],[Form.FlameHeight,Form.WidthOfFire])
    static FirePropertyType = Cat("Property",Colours.Red,[],[Form.Note])
    static Fire = Cat("Fire",Colours.Red,[this.FireSpotType,this.FirePropertyType],[])
}