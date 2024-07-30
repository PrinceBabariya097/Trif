"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constant/sidebarLinks";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger"
            width={24}
            height={24}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-dark-1 border-none">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Trif logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white">Trif</p>
          </Link>
          <SheetClose>
            <div className="flex flex-1 flex-col gap-6 mt-7">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathName === link.href ||
                  pathName.startsWith(`${link.href}/`);

                return (
                  <SheetClose asChild key={link.name}>
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg justify-start",
                        { "bg-blue-1": isActive }
                      )}
                    >
                      <Image
                        src={link.icon}
                        alt={link.name}
                        width={24}
                        height={24}
                      />
                      <p className="text-lg text-white font-semibold ">
                        {link.name}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
