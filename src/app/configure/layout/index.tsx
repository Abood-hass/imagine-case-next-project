import React, { ReactNode } from 'react'
import MaxWidthWrappper from "@/components/MaxWidthWrapper"
import Steps from '@/components/ui/steps'

const index = ({ children }: { children: ReactNode }) => {
    return (<MaxWidthWrappper className='flex flex-1 flex-col'>
        <Steps />
        {children}
    </MaxWidthWrappper>)
}

export default index