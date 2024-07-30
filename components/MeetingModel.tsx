import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

interface meetingModelsTypes {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className: string;
  buttonText: string;
  handelClick: () => void;
  children?: ReactNode;
  buttonIcon?: string;
  image?: string;
}

const MeetingModel = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handelClick,
  children,
  buttonIcon,
  image,
}: meetingModelsTypes) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
          <div className={cn(`flex flex-col gap-6`, className)}>
            {image && (
              <div className="flex justify-center">
                <Image src={image} alt="checked" width={72} height={72} />
              </div>
            )}
            <h1>{title}</h1>
            {children}
            <Button
              className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={handelClick}
            >
              {buttonIcon && (
                <Image
                  src={buttonIcon}
                  alt="button Icon"
                  width={13}
                  height={13}
                />
              )}
              {""}
              &nbsp;
              {buttonText || "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingModel;
