import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CheckIcon, StarFilledIcon } from "@radix-ui/react-icons";
import Phone from "@/components/Phone";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper
          className={`pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-6 lg:pt-24 xl:pt-32 lg:pb-52`}
        >
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start ">
              <div className="absolute w-28  left-0 top-0 hidden lg:block">
                <Image
                  width={100}
                  height={100}
                  src="/snake-1.png"
                  className="w-full"
                  alt="Cobra"
                  placeholder="blur"
                  blurDataURL="data:image/png"
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorate memoeries with your own,
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memoeries, not just your
                phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />5
                    Year print gurantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <CheckIcon className="h-5 w-5 shrink-0 text-green-600" />
                    Modern Phones Support
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  {[...new Array(4)].map((_, i) => (
                    <>
                      <Image
                        key={"user-" + ++i}
                        className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                        src={`/users/user-${++i}.png`}
                        alt="user image"
                        width={100}
                        height={100}
                        placeholder="blur"
                        blurDataURL="data:image/png"
                      />
                    </>
                  ))}
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    {[...new Array(5)].map((_, i) => (
                      <>
                        <StarFilledIcon
                          key={"star-" + i}
                          className="h-4 w-4 text-green-600 fill-green-600"
                        />
                      </>
                    ))}
                  </div>
                  <p>
                    <span className="font-semibold">1.250K </span> Happy
                    Customer
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                height={100}
                width={100}
                src={"/your-image.png"}
                className="absolute w-40 left-56 -top-20 select-none hidden sm:block md:hidden xl:block"
                alt=""
              />

              <Image
                height={100}
                width={100}
                src={"/line.png"}
                className="absolute w-20 -left-6 -bottom-6 select-none "
                alt=""
              />

              <Phone className="w-64" imgSrc={"/testimonials/1.jpg"} />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
