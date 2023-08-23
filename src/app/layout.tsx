import { Providers } from "@/providers/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ChildrenLayout from "@/components/ChildrenLayout";

const montserrat = Montserrat({ subsets: ["latin"] });
// const inter = Poppins({ weight: ["100", "200", "300"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoutazJobs",
  description: "where you can find your dream job in tech and medical industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <Providers>
          <ChildrenLayout>{children}</ChildrenLayout>
        </Providers>
      </body>
    </html>
  );
}
