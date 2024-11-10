import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ArrowRightIcon, CubeIcon, PlusIcon } from "@radix-ui/react-icons";

const index = ({ var1, var2 }: { var1: any; var2: any }) => {

  return (
    <>
      {var1 ? (
        <>
          <Link
            href={"/api/auth/logout"}
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            Sign Out
          </Link>

          {var2 ? (
            <Link
              href={"/dashboard"}
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Dashboard <CubeIcon className="pl-2 h-full w-6" />
            </Link>
          ) : (
            <Link
              href={"/configure/upload"}
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
            >
              Create Case <PlusIcon className="pl-2 h-full w-6" />
            </Link>
          )}
        </>
      ) : (
        <>
          <Link
            href={"/api/auth/register"}
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
           حساب جديد
          </Link>

          <Link
            href={"/api/auth/login"}
            className={buttonVariants({ size: "sm", variant: "ghost" })}
          >
            تسجيل دخول
            <ArrowRightIcon className="pl-2 h-full w-6" />
          </Link>

          <div className="h-8 w-px bg-zinc-200 hidden sm:block "></div>
        </>
      )}
    </>
  );
};

export default index;
