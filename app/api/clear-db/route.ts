import getSession from "../../actions/getSession"
import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(){
    const session = await getSession();
    if(!session){
        return new NextResponse("Unauthorized", { status: 401 });
    }
    try {
        await prisma.image.deleteMany();
    } catch (error) {
        console.log(error);
        return new NextResponse(error, { status: 500 });
    }
    return new NextResponse("Uploads cleared", { status: 200 });
}