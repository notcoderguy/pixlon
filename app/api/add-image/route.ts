import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import getSession from "../../actions/getSession";

export async function POST(request : Request){
    const session = await getSession();

    if(!session){
        return new NextResponse("Unauthorized", {status : 401});
    }

    try {
        const body = await request.json();
        const {title, imageUrl, format, tags, categories} = body;

        if (!title || !imageUrl || !format){
            return new NextResponse("missing info", {status : 400});
        }
        const tagsArray = tags.split(',').map((tag:string) => tag.trim());
        const categoriesArray = categories.split(',').map((category:string) => category.trim());

        const image = await prisma.image.create({
            data:{
                title, imageUrl, format, tags:tagsArray, categories:categoriesArray
            }
        })
      
    return NextResponse.json(image);
    } catch (error) {
        console.log(error, "IMAGE ADD ERROR @app/api/add-image/route.ts");
        return new NextResponse("internal error", { status: 500 });
    }
}