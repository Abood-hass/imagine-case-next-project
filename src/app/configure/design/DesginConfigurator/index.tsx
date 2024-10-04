"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { cn, formatPrice } from "@/lib/utils"
import NextImage from "next/image"
import { Rnd } from "react-rnd"
import HandleComponent from '@/components/HandleComponent'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label, RadioGroup } from '@headlessui/react'
import { useRef, useState } from "react"
import { COLORS, FINISH, MATERIAL, MODELS } from '@/validator/option-validator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { BASE_PRICE } from "@/app/config/products"
import { useUploadThing } from "@/lib/uploadingthing"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"
import { SaveConfigArgs, saveConfig as _saveConfig } from "../action"
import { promise } from "zod"
import { useRouter } from "next/navigation"

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
    const { toast } = useToast();
    const router = useRouter()

    const { mutate: saveConfig } = useMutation({
        mutationKey: ["save-config"],
        mutationFn: async (args: SaveConfigArgs) => {
            await Promise.all([saveConfigration(), _saveConfig(args)])
        },
        onError: () => {
            toast({
                title: "Somthing went Wrong",
                description: "There is a problem, try again",
                variant: "destructive"
            })
        },
        onSuccess: () => {
            router.push(`/configure/preview?id=${configId}`)
        }
    })



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

    const [renderedDimension, setRenderedDimention] = useState({
        width: imageDimentions.width / 4,
        height: imageDimentions.height / 4,
    })

    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,
        y: 25
    })

    const phoneCaseRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startUpload } = useUploadThing("imageUploader")

    async function saveConfigration() {
        try {
            const {
                left: caseLeft,
                top: caseTop,
                width,
                height,
            } = phoneCaseRef.current!.getBoundingClientRect()

            const { left: containerLeft, top: containerTop } =
                containerRef.current!.getBoundingClientRect()

            const leftOffset = caseLeft - containerLeft
            const topOffset = caseTop - containerTop

            const actualX = renderedPosition.x - leftOffset
            const actualY = renderedPosition.y - topOffset

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')

            const userImage = new Image()
            userImage.crossOrigin = 'anonymous'
            userImage.src = imageUrl
            await new Promise((resolve) => (userImage.onload = resolve))

            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height
            )

            const base64 = canvas.toDataURL()
            const base64Data = base64.split(',')[1]

            const blob = base64ToBlob(base64Data, 'image/png')
            const file = new File([blob], 'filename.png', { type: 'image/png' })

            await startUpload([file], { configId })
        } catch (err) {
            toast({
                title: "Something went Wrong",
                description: "There was a problem while saving youe design, please try again",
                variant: "destructive"
            })
        }
    }

    function base64ToBlob(data: string, mimeType: string) {
        const byteCharacters = atob(data);

        // const byteNumbers = byteCharacters.split("").map((_, i) => byteCharacters.charCodeAt(i));

        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        return new Blob([byteArray], { type: mimeType })
    }

    return (
        <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
            <div ref={containerRef} className="relative h-[37.5rem] flex overflow-hidden col-span-2 w-full max-w-4xl items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-primary focus:ring-offset-2F">
                <div className={"relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]"}>
                    <AspectRatio
                        ref={phoneCaseRef}
                        ratio={896 / 1831}
                        className="pointer-events-none relative z-50 aspect-[896/1831] w-full">

                        <NextImage
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
                    onResizeStop={(_, __, ref, ___, { x, y }) => {
                        setRenderedDimention(() => ({
                            height: parseInt(ref.style.height.slice(0, -2)),
                            width: parseInt(ref.style.width.slice(0, -2)),
                        }))

                        setRenderedPosition({ x, y })
                    }}

                    onDragStop={(_, data) => {
                        const { x, y } = data;
                        setRenderedPosition({ x, y })
                    }}
                    lockAspectRatio
                    resizeHandleComponent={{
                        bottomRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                        topRight: <HandleComponent />,
                        topLeft: <HandleComponent />,
                    }}>
                    <div className="relative w-full h-full">
                        <NextImage
                            fill
                            src={imageUrl}
                            alt={""}
                            className="pointer-events-none"
                        />
                    </div>
                </Rnd>

            </div>

            <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
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
                                                <span className={cn(`bg-${color.tw}`, " h-8 w-8 rounded-full border border-black border-opacity-10")} />
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
                                                className="w-full justify-between" loadingText={""}>
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
                                    return <RadioGroup
                                        key={name}
                                        value={options[name]}
                                        onChange={(val) => {
                                            console.log(val)
                                            setOptions((prev) => ({
                                                ...prev,
                                                [name]: val,
                                            }))
                                        }}>

                                        <Label style={{ textTransform: 'capitalize' }}>
                                            {name}
                                        </Label>

                                        <div className="mt-3 space-y-4">
                                            {selectableOptions.map(option => {
                                                return <RadioGroup.Option
                                                    key={option.value} value={option}
                                                    className={({ active, checked }) =>
                                                        cn(
                                                            'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                                                            {
                                                                'border-primary': active || checked,
                                                            }
                                                        )
                                                    }

                                                >

                                                    <span className="flex item-center">
                                                        <span className="flex flex-col text-sm">
                                                            <RadioGroup.Label as="span">
                                                                {option.label}
                                                            </RadioGroup.Label>
                                                            {option.description && (
                                                                <RadioGroup.Description as="span" className={"text-gray-500"}>
                                                                    <span className="block sm:inline">
                                                                        {option.description}
                                                                    </span>
                                                                </RadioGroup.Description>
                                                            )}

                                                        </span>
                                                    </span>
                                                    <RadioGroup.Description as="span" className={"mt-2 flex text-sm sm:ml-4 sm:mt:0 sm:flex sm:text-right "}>
                                                        <span className="font-medium text-gray-900">
                                                            {formatPrice(option.price / 100)}
                                                        </span>
                                                    </RadioGroup.Description>
                                                </RadioGroup.Option>
                                            })}
                                        </div>

                                    </RadioGroup>
                                })}
                            </div>
                        </div>
                    </div>
                </ScrollArea >
                <div className="w-full px-8 h-16 bg-white">
                    <div className="w-full ">
                        <div className="w-full h-full flex gap-6 justify-center items-center">
                            <p className="font-medium whitespace-nowrap">
                                {formatPrice((BASE_PRICE + options.material.price + options.finish.price) / 100)}
                            </p>
                            <Button onClick={() => saveConfig(
                                {
                                    configId,
                                    color: options.color.value,
                                    finish: options.finish.value,
                                    material: options.material.value,
                                    model: options.model.value
                                }
                            )} size="sm" className="w-full">
                                Continue
                                <ArrowRightIcon className="h-4 w-4 ml-1.5 inline " />
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default index