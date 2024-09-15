// bg-zink-900
// bg-blue-950
// bg-rose-950
// bg-green-950

import { PRODUCT_CONFIG } from "@/app/config/products"

export const COLORS = [
    { label: 'Black', value: 'black', tw: 'zinc-900' },
    {
        label: 'Blue',
        value: 'blue',
        tw: 'blue-950',
    },
    { label: 'Rose', value: 'rose', tw: 'rose-950' },
    { label: 'Green', value: 'green', tw: 'green-950' },
] as const


export const MODELS = {
    name: "model",
    options: [
        {
            label: " IPhone X",
            value: " iphonex",
        },
        {
            label: " IPhone 11",
            value: " iphone11",
        },
        {
            label: " IPhone 12",
            value: " iphone12",
        },
        {
            label: " IPhone 13",
            value: " iphone13",
        },
        {
            label: " IPhone 14",
            value: " iphone14",
        },
        {
            label: " IPhone 15",
            value: " iphone15",
        },
    ]
} as const


export const MATERIAL = {
    name: "material",
    options: [
        {
            label: "Sillicon",
            valve: "sillicon",
            description: undefined,
            price: PRODUCT_CONFIG.material.sillicon
        },
        {
            label: "Soft Polycarbonate",
            valve: "polycarbonate",
            description: "Scratch-resistant coating",
            price: PRODUCT_CONFIG.material.polycarbonate
        },
    ]
} as const

export const FINISH = {
    name: "finish",
    options: [
        {
            label: "Smooth Finish",
            valve: "smooth",
            description: undefined,
            price: PRODUCT_CONFIG.finish.smooth
        },
        {
            label: "Texture Finish",
            valve: "textture",
            description: "Soft grippy texture",
            price: PRODUCT_CONFIG.finish.texture
        },
    ]
} as const