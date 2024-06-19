import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages:{
        signIn:"/editor"
    }
})

export const config = {
    matcher:[
        "/editor/:path*",
        // "/api/create/:path*"
    ]
}