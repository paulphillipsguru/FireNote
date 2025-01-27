export const Cat = (name: string, bgColour: any,childItems: any,form: Array<any>) =>{
    if (childItems.length ===0){
        childItems = undefined;
    }
    return {Name: name, Initials: name.substring(0,4).toUpperCase(), Bg:bgColour,Items:childItems,Form: form}
}