import type { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import NextImage from "next/image"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { Button, buttonVariants } from "./button"

const LoginModal = (
    {
        isOpen,
        setIsOpen
    }: {
        isOpen: boolean,
        setIsOpen: Dispatch<SetStateAction<boolean>>
    }
) => {
    return (
        <Dialog
            onOpenChange={setIsOpen}
            open={isOpen} >

            <DialogContent>
                <DialogHeader>
                    <div className="flex flex-row justify-between items-center">
                        <div className="relative mx-auto w-24 mb-2">
                            <NextImage
                                height={40}
                                width={40}
                                src={"/snake-1.png"}
                                alt={"snake"}
                                className="object-contain m-auto"
                            />
                        </div>
                        <h3 className="flex-grow text-left text-2xl"> Login to Checkout your <span className="text-green-600">Order</span></h3>
                    </div>
                </DialogHeader>
                <DialogDescription>
                    <span className="text-lg">
                        In order to Finish the Order you need to have an account first.
                    </span>
                </DialogDescription>
                <DialogDescription className="text-base text-center py-2">
                    <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
                        <LoginLink className={buttonVariants({ variant: "default" })} children={"Login to Continue"} />
                        <RegisterLink className={buttonVariants({ variant: "secondary" })} children={"Sign Now"} />
                    </div>
                </DialogDescription>
            </DialogContent>

        </Dialog>
    )
}

export default LoginModal