"use client";

import React, { useEffect, useState } from "react";
import Phone from "@/components/Phone";
import Confetti from "react-dom-confetti";
import type { Configuration } from "@prisma/client";
import { COLORS, MODELS } from "@/validator/option-validator";
import { cn, formatPrice } from "@/lib/utils";
import { CheckIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { BASE_PRICE, PRODUCT_CONFIG } from "@/app/config/products";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/ui/LoginModal";

function Index({ configuration }: { configuration: Configuration }) {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => setShowConfetti(true), []);

  const router = useRouter();

  const { id: configId } = configuration;
  const { user } = useKindeBrowserClient();

  const [isLoginModelOpen, setIsLoginModelOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const { color, model, finish, material } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: moduleLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  let totalPrice =
    BASE_PRICE +
    PRODUCT_CONFIG.material[material!] +
    PRODUCT_CONFIG.finish[finish!];

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URl");
    },
    onError: () =>
      toast({
        title: "Somthing went Wrong",
        description: "There is was error in our end, Please try again",
        variant: "destructive",
      }),
  });

  const handleCheckOut = () => {
    if (user) {
      createPaymentSession({ configId });
    } else {
      localStorage.setItem("configurationId", configId);
      setIsLoginModelOpen(() => true);
    }
  };

  return (
    <>
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
        aria-hidden={true}
      >
        <Confetti
          active={showConfetti}
          config={{
            elementCount: 200,
            spread: 90,
          }}
        />
      </div>

      <LoginModal isOpen={isLoginModelOpen} setIsOpen={setIsLoginModelOpen} />

      <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tw}`)}
            imgSrc={configuration.croppedImageURL!}
          />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {moduleLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <CheckIcon className="h-4 w-4 text-green-500 " />
            In stock and raedy to ship
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 text-base  ">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatable</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 years print warranty</li>
              </ol>
            </div>
            <div>
              <div>
                <p className="font-medium text-zinc-950">Materials</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside">
                  <li>High-quality, adurable material</li>
                  <li>Scratch and Fingerprint resistant coating</li>
                </ol>
              </div>
            </div>
            <div className="mt-8 col-span-2">
              <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                <div className="flow-root text-sm">
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Base price</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(BASE_PRICE / 100)}
                    </p>
                  </div>
                  {finish === "texture" ? (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">Texture finish</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(PRODUCT_CONFIG.finish.texture / 100)}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                  {material === "polycarbonate" ? (
                    <div className="flex items-center justify-between py-1 mt-2">
                      <p className="text-gray-600">Material finish</p>
                      <p className="font-medium text-gray-900">
                        {formatPrice(
                          PRODUCT_CONFIG.material.polycarbonate / 100
                        )}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="my-2 h-px bg-gray-200" />
                  <div className="flex item-center justify-between py-2">
                    <p className="font-semibold text-gray-900">Order total</p>
                    <p className="font-semibold text-gray-900">
                      {formatPrice(totalPrice / 100)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end pb-12">
                <Button
                  onClick={() => handleCheckOut()}
                  className="px-4 sm:px-6 lg:px-8 "
                >
                  Check out{" "}
                  <ArrowRightIcon className="h-4 w-4 ml-1.5 inline " />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
