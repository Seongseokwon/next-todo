import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import ReduxProvider from "@/redux/provider";
import {CookiesProvider} from "next-client-cookies/server";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};


export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <NextAuthProvider>
            <ReduxProvider>
                <CookiesProvider>
                    {children}
                    <div id='root-modal'/>
                </CookiesProvider>
            </ReduxProvider>
        </NextAuthProvider>
        </body>
        </html>
    );
}
