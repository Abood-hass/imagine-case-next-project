"use server";

import { BASE_PRICE, PRODUCT_CONFIG } from "@/app/config/products";
import { db } from "@/app/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
  configId,
}: {
  configId: string;
}) => {
  const configuration = await db.configuration.findUnique({
    where: { id: configId },
  });

  if (!configuration) throw new Error("No such configuration found");

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("You need to be logged in");
  }

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  price += PRODUCT_CONFIG.material[material!] + PRODUCT_CONFIG.finish[finish!];

  let order: Order | undefined = undefined;

  const exisitingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  console.log("Data to show", {
    userId: user.id,
    amount: price / 100,
    configurationId: configuration.id,
  });

  if (exisitingOrder) order = exisitingOrder;
  else
    order = await db.order.create({
      data: {
        userId: user.id,
        amount: price / 100,
        configurationId: configuration.id,
      },
    });

  const product = await stripe.products.create({
    name: "Custom IPhone Case",
    images: [configuration.imageURL],
    default_price_data: {
      currency: "usd",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?orderId=${order.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["US", "IS"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
  });

  return {
    url: stripeSession.url,
  };
};
