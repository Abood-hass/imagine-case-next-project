import { notFound } from 'next/navigation'
import { db } from '@/app/db'
import DesginConfigurator from './DesginConfigurator'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

const page = async ({ searchParams }: PageProps) => {
    const { id } = searchParams

    if (!id || typeof id !== "string") {
        return notFound()
    }

    const configuration = await db.configuration.findUnique({
        where: { id }
    })

    if (!configuration) {
        return notFound()
    }

    const { imageURL, width, height } = configuration

    return (

        <DesginConfigurator
            configId={configuration.id}
            imageUrl={imageURL}
            imageDimentions={{ width, height }} />
    )
}

export default page