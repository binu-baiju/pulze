import { Providers } from "../components/Providers";

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
      </body>
    </html>
  );
}
