"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Rnd } from "react-rnd"
import HandleComponent from '@/components/HandleComponent'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label, RadioGroup } from '@headlessui/react'
import { useState } from "react"
import { COLORS, FINISH, MATERIAL, MODELS } from '@/validator/option-validator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons"

interface DesginConfiguratorProps {
    configId: string,
    imageUrl: string,
    imageDimentions: {
        width: number,
        height: number,
    }
}

const index = ({
    configId,
    imageUrl,
    imageDimentions
}: DesginConfiguratorProps) => {

    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number],
        model: (typeof MODELS.options)[number],
        material: (typeof MATERIAL.options)[number],
        finish: (typeof FINISH.options)[number],
    }>({
        color: COLORS[0],
        model: MODELS.options[0],
        material: MATERIAL.options[0],
        finish: FINISH.options[0],
    });

    return (
        <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
            <div className="relative h-[37.5rem] flex overflow-hidden col-span-2 w-full max-w-4xl items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-primary focus:ring-offset-2F">
                <div className={"relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]"}>
                    <AspectRatio ratio={896 / 1831} className="pointer-events-none relative z-50 aspect-[896/1831] w-full">

                        <Image
                            sizes=""
                            fill
                            src={"/phone-template.png"}
                            alt={"phone-image"}
                            className="pointer-events-none z-50 select-none mx-auto" />

                    </AspectRatio>

                    <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />

                    <div className={cn("absolute inset-0 lefy-[3px] top-px right-[3px] bottom-px rounded-[32px]", `bg-${options.color.tw}`)} />

                </div>

                <Rnd
                    default={{
                        x: 300,
                        y: 205,
                        height: imageDimentions.height / 4,
                        width: imageDimentions.width / 4,
                    }}
                    lockAspectRatio
                    resizeHandleComponent={{
                        bottomRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                        topRight: <HandleComponent />,
                        topLeft: <HandleComponent />,
                    }}>
                    <div className="relative w-full h-full">
                        <Image
                            fill
                            src={imageUrl}
                            alt={""}
                            className="pointer-events-none"
                        />
                    </div>
                </Rnd>

            </div>

            <div className="h-[37.5rem] flex flex-col bg-white">
                <ScrollArea className="relative flex-1 overflow-auto">
                    <div aria-hidden="true" className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none" />

                    <div className="px-8 pb-12 pt-8">
                        <h2 className="tracking-tight font-bold text-3xl">
                            Custimze Your Case
                        </h2>

                        <div className="w-full h-px bg-zinc-200 my-6" />

                        <div className="relative mt-4 h-full flex flex-col justify-between">
                            <div className="flex flex-col gap-6">
                                <RadioGroup value={options.color} onChange={(color) => {
                                    setOptions((prev) => ({
                                        ...prev,
                                        color,
                                    }))
                                }}>
                                    <Label>Color: {options.color.label}</Label>
                                    <div className="mt-3 flex flex-wrap justify-center space-x-3">
                                        {COLORS.map((color) => (
                                            <RadioGroup.Option value={color} key={color.label} className={({ active, checked }) => cn("relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 fouce:ring-0 active:outline-none fouce:outline-none border-2  border-transparent", { [`border-${color.tw}`]: active || checked })}>
                                                <span className={cn(`bg-${color.tw}`, "h-8 w-8 rounded-full border border-black border-opacity-10")} />
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                                <div className="relative flex flex-col gap-3 w-full">
                                    <label>Modle:</label>
                                    <DropdownMenu>

                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                role="combobox"
                                                className="w-full justify-between">
                                                {options.model.label}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {MODELS.options.map(model => (
                                                <DropdownMenuItem

                                                    onClick={() => {
                                                        setOptions(
                                                            (prev) => ({ ...prev, model: model })
                                                        )
                                                    }}

                                                    key={model.label} className={cn('flex w-full text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                                                        {
                                                            "bg-zinc-100": model.label === options.model.label
                                                        })}>
                                                    <CheckIcon className={cn('mr-2 h-4 w-4 text-green-500', model.label === options.model.label ? "opacity-100" : "opacity-0")} />
                                                    {model.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>


                                {[MATERIAL, FINISH].map(({ name, options: selectableOptions }) => {
                                    return <RadioGroup key={name} value={options[name]} onChange={val => { setOptions(prev => ({ ...prev, [name]: val })) }}>

                                        <Label style={{ textTransform: 'capitalize' }}>
                                            {name}
                                        </Label>

                                        <div className="mt-3 space-y-4">
                                            {selectableOptions.map(option => {
                                                return <RadioGroup.Option
                                                    key={option.valve} value={option.valve}

                                                    className={
                                                        ({ active, checked }) => cn("relative block rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 fouce:outline-none ring-0 fouce:ring-0 outline-none sm:flex sm:justify-between cursor-pointer", { "border-primary": active || checked })}

                                                >

                                                    <span className="flex item-center">
                                                        <span className="flex flex-col text-sm">
                                                            <RadioGroup.Label as="span">
                                                                {option.label}
                                                            </RadioGroup.Label>
                                                            {option.description && (
                                                                <RadioGroup.Description as="span" className={"text-gray-500"}>
                                                                    <span>
                                                                        {option.description}
                                                                    </span>
                                                                </RadioGroup.Description>
                                                            )}
                                                        </span>
                                                    </span>

                                                </RadioGroup.Option>
                                            })}
                                        </div>

                                    </RadioGroup>
                                })}
                            </div>
                        </div>
                    </div>
                </ScrollArea >
            </div >
        </div >
    )
}

export default index