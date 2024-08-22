import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CheckIcon, StarFilledIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import UserReview from "@/components/UserReview";
import { Icons } from "@/components/Icons";
import { reviews } from '@/usersReviews'
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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


      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 ">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our
              <span className="relative px-2">
                customers
                <Icons.underLine className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
              </span>
              say
            </h2>

            <Image height={100} width={100} src={"/snake-2.png"} className="w-24
             order-0 lg:order-2" alt={""} />
          </div>

          <div className="mx-auto grid max-w-2xl grid-col-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            {/* <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20 ">
              <div className="flex gap-0.5 mb-2">
                {[...new Array(5)].map((_, i) => {
                  return <StarFilledIcon key={'start-' + ++i} className="h-5 text-green-600 fill-green-600" />
                })}
              </div>
              <div className="text-lg leading-8 ">
                <p>
                  "The case are looking great and i even get compliment about the texture and the material. I have the case for 
                  months and a half and <span className="bg-slate-800 text-white py-0.5 px-1">The image super clear</span>"
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <Image className="rounded-full h-12 w-12 object-cover" height={100} width={100} src={"/users/user-1.png"} alt={"user"} />
                <div className="flex flex-col">
                  <p className="font-semibold capitalize">jonathan</p>
                  <div className="flex gap-0.5 items-center text-zinc-600">
                    <CheckIcon className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified Purchase</p>
                  </div>
                </div>
              </div>

            </div> */}

            {reviews.map((rev, i) => (<UserReview Name={rev.userName} Img={rev.userimage} Review={rev.reviewText()} />))}


          </div>
        </MaxWidthWrapper>


        <div className="pt-16 overflow-x-hidden">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Upload Your Photo and get {" "}
                <span className="relative px-2 bg-green-600 text-white">
                  your own Case
                </span>
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">

              <Image src={"/arrow.png"} className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 -translate-x-1/2 
              left-1/2 z-10 rotate-90 md:rotate-0" alt={"arrow"} width={100} height={100} />

              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">

                <Image src={"/horse.jpg"} className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-offset-gray-900/10 h-full w-full" alt={"horse"} width={1000} height={1000} />

              </div>

              <Phone imgSrc="/horse_phone.jpg" className="w-60" />
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            {
              [
                "High-quality silicon material",
                "Scratch and Fingerprint reistant coating",
                "Wireless Charging compatible",
                "5 Years Print warrnaty",
              ].map((point) => <li key={point} className="w-fit">
                <CheckIcon className="h-5 w-5 text-green-600 inline mr-1.5" />
                {point}
              </li>)
            }

            <div className="flex justify-center">

              <Link className={buttonVariants({ size: "lg", className: "mx-auto mt-8" })} href={"/configure/upload"}>
                Create your own case Now
                <ArrowRightIcon className="h-4 w-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
