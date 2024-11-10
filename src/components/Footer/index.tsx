import React from 'react'
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import Link from 'next/link'

const index = () => {
    return (
        <footer className='bg-white relative h-20'>
            <MaxWidthWrapper>
                <div className='border-t border-gray-200' />
                <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
                    <div className='text-center ms:text-left pb-2 md:pd-0'>
                        <p className='text-sm text-muted-foreground'>
                            &copy; {new Date().getFullYear()} {"جميع الحقوق مستحقة"}
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex space-x-8">
                            <a href={"https://linktr.ee/abdullahhassouna"} className='text-sm text-muted-foreground hover:text-gray-600'>الشروط</a>
                            <a href={"https://linktr.ee/abdullahhassouna"} className='text-sm text-muted-foreground hover:text-gray-600'>قوانين الخصوصية</a>
                            {/* <a href={"https://linktr.ee/abdullahhassouna"} className='text-sm text-muted-foreground hover:text-gray-600'>Cookies Policy</a> */}
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}

export default index