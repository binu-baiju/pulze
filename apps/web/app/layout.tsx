import { Providers } from "../components/Providers";
import toast, { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        {/* {children} */}
        <Toaster />
      </body>
    </html>
  );
}
