export { default } from 'next-auth/middleware'
export const config = {
    matcher : [
        '/todo/:path*',
        '/rank/:path*',
        '/my-page/:path*'
    ]
}