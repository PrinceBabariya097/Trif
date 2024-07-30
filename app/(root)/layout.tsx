import StreamVideoClientProvider from "@/provider/StreamVideoClientProvider";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoClientProvider>{children}</StreamVideoClientProvider>
    </main>
  );
};

export default RootLayout;
