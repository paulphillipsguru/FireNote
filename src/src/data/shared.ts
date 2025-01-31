export const Cat = (name: string, bgColour: any, childItems: any, form: Array<any>) => {
    if (childItems.length === 0) {
        childItems = undefined;
    }
    if (childItems !== undefined) {
        childItems = childItems.map((item: any) => ({ ...item, Title: name + ":" + item.Name }));        
    } else {

    }
    return { Name: name,Title: name, Initials: name.substring(0, 4).toUpperCase(), Bg: bgColour, Items: childItems, Form: form }
}