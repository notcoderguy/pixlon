import prisma from "../../lib/prismadb"
import getSession from "./getSession"

const getCurrentUserData = async () => {
    try{
        const session = await getSession();
        if(!session?.user?.email) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where:{
                email : session?.user?.email as string
            }
        })

        if(!currentUser) {
            return null;
        }
        return currentUser;
    }catch(error){
        console.log(error, "CURRENT USER DATA ERROR @actions/getCurrentUserData.ts")
        return null;
    }
}

export default getCurrentUserData;