"use client";

import { sidebarLinks } from "@/constant/sidebarLinks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathName === link.href || pathName.startsWith(`${link.href}/`)

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                { "bg-blue-1": isActive }
              )}
            >
                <Image src={link.icon} alt={link.name} width={24} height={24} />
                <p className="text-lg font-semibold max-lg:hidden">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
