import { type DeciosionsJsonType } from ".";

export const sortInAscending = (property: "court" | "date") =>function (a: DeciosionsJsonType, b: DeciosionsJsonType) {  
    if (a[property] > b[property])  
        return 1;  
    if (a[property] < b[property])  
        return -1;  
   
    return 0;  
};

export const sortInDescending = (property: "court" | "date") =>function (a: DeciosionsJsonType, b: DeciosionsJsonType) {  
    if (a[property] < b[property])  
        return 1;  
    if (a[property] > b[property])  
        return -1;  
   
    return 0;  
};