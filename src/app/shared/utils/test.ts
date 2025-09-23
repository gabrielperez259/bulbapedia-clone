import { ColorTypes } from "../../features/pokemon/models/types/color-types"

export const getColorType = (type: string) => {
    if(type in ColorTypes) {
      return ColorTypes[type as keyof typeof ColorTypes]

    } else  
      return console.log(type)
}