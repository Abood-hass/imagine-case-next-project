"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { usePathname } from "next/navigation"

const STEPS = [
    {
        name: "Add Image",
        description: "Choose an image for your case",
        url: "/upload",
    },
    {
        name: "Customize Design",
        description: "make the case yours",
        url: "/desgin",
    },
    {
        name: "Preview",
        description: "Check your final desgin",
        url: "/preview",
    },
]

const Steps = () => {
    const pathname = usePathname()

    return (
        <ol className="rounded-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
            {STEPS.map((step, i) => {
                const isCurrent = pathname.endsWith(step.url)
                const isCompleted = STEPS.slice(i + 1).some((step) => pathname.endsWith(step.url))
                const imgPath = `/steps-icons/icon-${i + 1}.png`

                return <li key={step.name} className="relative overflow-hidden lg:flex-1">
                    <div>
                        <span className={cn('absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full', {
                            "bg-zinc-700": isCurrent,
                            "bg-primary": isCompleted,
                        })} aria-hidden="true"></span>

                        <span className={cn(i !== 0 ? "lg-pl-9" : "", "flex items-center px-6 py-4 text-sm font-medium")}>
                            <span className={"flex-shrink-0"}>
                                <Image className={cn("flex h-10 w-10 object-contain items-center justify-center", {
                                    "border-none": isCompleted,
                                    "border-zinc-700": isCurrent,
                                })} alt={""} width={100} height={100} src={imgPath} />
                            </span>
                            <span className="ml-4 h-full mt-0.5 flex flex-col min-w-0 justify-center">
                                <span className={cn("text-sm font-semibold text-zinc-700", {
                                    "text-zinc-700": isCurrent,
                                    "text-primary": isCompleted,
                                })}>
                                    {step.name}
                                </span>
                                <span className="text-sm text-zinc-500">
                                    {step.description}
                                </span>
                            </span>
                        </span>
                    </div>
                </li>
            })}
        </ol>
    )
}

export default Steps