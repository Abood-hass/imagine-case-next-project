import { CheckIcon, StarFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { ReactElement } from 'react'

const index = (
    {
        Name,
        Img,
        Review
    }: {
        Name: string,
        Img: string,
        Review: ReactElement<HTMLParagraphElement>
    }) => {
    return (
        <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20 ">
            <div className="flex gap-0.5 mb-2">
                {[...new Array(5)].map((_, i) => {
                    return <StarFilledIcon key={'start-' + ++i} className="h-5 text-teal-800 fill-teal-800" />
                })}
            </div>
            <div className="text-lg leading-8 ">
                <p>
                    {Review}
                </p>
            </div>
            <div className="flex gap-4 mt-2">
                <Image className="rounded-full h-12 w-12 object-cover" height={100} width={100} src={'/users/'+Img} alt={""} />
                <div className="flex flex-col">
                    <p className="font-semibold capitalize">{Name}</p>
                    <div className="flex gap-0.5 items-center text-zinc-600">
                        <CheckIcon className="h-4 w-4 stroke-[3px] text-teal-800" />
                        <p className="text-sm">شراء موثق</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default index