import prisma from "../../lib/prismadb"

const getAllImageData = ()=>{
    try {
        const data = prisma.image.findMany();

        if(!data){
            return null;
        }

        return data;
    } catch (error) {
        console.log(error, "GET IMAGE DATA ERROR @actions/getAllimageData.ts")
        return null;
    }
}

export default getAllImageData;