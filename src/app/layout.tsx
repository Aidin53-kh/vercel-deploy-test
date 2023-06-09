"use client";

import { Providers } from "~/components/Providers";
import "~/styles/globals.css";

import { api } from "~/utils/api";

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <h1 className="text-lg font-bold">RootLayout</h1>
                    {children}
                </Providers>
            </body>
        </html>
    );
}

export default api.withTRPC(RootLayout);
