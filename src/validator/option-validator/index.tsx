// bg-black
// bg-blue-950
// bg-rose-950
// bg-green-950

import { PRODUCT_CONFIG } from "@/app/config/products"

export const COLORS = [
    { label: 'أسود', value: 'black', tw: 'black' },
    { label: 'أزرق', value: 'blue', tw: 'blue-950' },
    { label: 'روز', value: 'rose', tw: 'rose-950' },
    { label: 'أخضر', value: 'green', tw: 'green-950' },
] as const


export const MODELS = {
    name: "model",
    options: [
        {
            label: "IPhone X",
            value: "iphonex",
        },
        {
            label: "IPhone 11",
            value: "iphone11",
        },
        {
            label: "IPhone 12",
            value: "iphone12",
        },
        {
            label: "IPhone 13",
            value: "iphone13",
        },
        {
            label: "IPhone 14",
            value: "iphone14",
        },
        {
            label: "IPhone 15",
            value: "iphone15",
        },
    ]
} as const


export const MATERIAL = {
    name: "material",
    label: "خامات",
    options: [
        {
            label: "سيليكون",
            value: "sillicon",
            description: undefined,
            price: PRODUCT_CONFIG.material.sillicon
        },
        {
            label: "بوليكاربونات ناعم",
            value: "polycarbonate",
            description: "حماية من الخدوش",
            price: PRODUCT_CONFIG.material.polycarbonate
        },
    ]
} as const

export const FINISH = {
    name: "finish",
    label: "ملمس",
    options: [
        {
            label: "ملمس ناعم",
            value: "smooth",
            description: undefined,
            price: PRODUCT_CONFIG.finish.smooth
        },
        {
            label: "ملمس خشن",
            value: "texture",
            description: "Soft grippy texture",
            price: PRODUCT_CONFIG.finish.texture
        },
    ]
} as const