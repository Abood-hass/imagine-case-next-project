import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import NavBarBtns from "@/components/NavBarBtns";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const NavBar = async () => {

  const { getUser } = getKindeServerSession()

  const user = await getUser();

  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-[100] h-14 x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href={"/"} className="flex z-40 font-semibold ">
            Case<span className="text-green-600">Cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            <NavBarBtns var1={user} var2={isAdmin} />
          </div>

        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
