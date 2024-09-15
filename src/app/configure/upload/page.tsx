"use client"

import { cn } from "@/lib/utils"
import { ImageIcon, SymbolIcon, UploadIcon } from "@radix-ui/react-icons"
import { useState, useTransition } from "react"
import Dropzone, { FileRejection } from "react-dropzone"
import { Progress } from "@/components/ui/progress"
import { useUploadThing } from "@/lib/uploadingthing"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"


const page = () => {
    const { toast } = useToast()
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const router = useRouter()
    const [isPending, startTranstion] = useTransition()

    const { startUpload, isUploading } = useUploadThing('imageUploader', {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId;
            startTranstion(() => {
                router.push(`/configure/design?id=${configId}`);
            })
        },
        onUploadProgress(p) {
            setUploadProgress(p)
        }
    })

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles
        setIsDragOver(false)

        toast({
            title: `${file.file.type} type are not supported`,
            description: "Please choose a PNG, JPG, or JPEG Format",
            variant: 'destructive'
        })
    }

    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined })

        setIsDragOver(false)
    }

    return (
        <div className={cn("flex-1 relative h-full my-16 w-full reounded-xl bg-gray-900/5 p-2 rign-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center", {
            "ring-blue-900/25 bg-blue-900/10":
                isDragOver,
        })}>
            <div className="cursor-pointer relateive flex flex-1 flex-col items-center justify-center w-full">
                <Dropzone onDropRejected={onDropRejected} onDropAccepted={onDropAccepted}
                    accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="h-full w-full flex flex-col items-center justify-center" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isDragOver ? <UploadIcon className="h-8 w-8 lg:h-16 lg:w-16 text-zinc-500 mb-2" /> : isUploading || isPending ? <SymbolIcon className="animate-spin h-8 w-8 lg:h-16 lg:w-16 text-zinc-500 mb-2" /> : <ImageIcon className="h-8 w-8 lg:h-16 lg:w-16 text-zinc-500 mb-2" />
                            }
                            <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                                {
                                    isUploading ?
                                        <div className="flex flex-col items-center">
                                            <p>Uploading...</p>
                                            <Progress
                                                value={uploadProgress}
                                                className="mt-2 w-40 h-2 bg-gray-300" />
                                        </div> :
                                        isPending ?
                                            <div className="flex flex-col items-center">
                                                <p>Redireting, please wait...</p>
                                            </div> :
                                            isDragOver ?
                                                <p>
                                                    <span className="font-semibold">
                                                        Drop your {" "}
                                                    </span>
                                                    Image
                                                </p> :
                                                <p>
                                                    <span className="font-semibold">
                                                        Click to Upload {" "}
                                                    </span>
                                                    Image
                                                </p>
                                }
                            </div>
                            {
                                !isPending && <p className="text-xs text-zinc-500">PNG, JEPG, or JPG</p>
                            }
                        </div>
                    )}
                </Dropzone>
            </div>
        </div>
    )
}

export default page