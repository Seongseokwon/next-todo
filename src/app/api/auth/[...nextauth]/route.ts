import NextAuth, {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions:AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                console.log('Credentials', credentials);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    })
                });

                const user = await res.json();
                console.log('USER ##', user);
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }: {token: any, user: any, account: any}) {
            return {...token, ...user};
        },

        async session({ session, token }: {session: any, token: any }) {
            session.user = token as any;
            return session;
        }
    },
    pages: {
        signIn: '/auth/signIn'
    }


}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}