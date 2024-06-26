import {NextResponse} from "next/server";
import getSession from "../../actions/getSession"
import { processImages } from "../../actions/optimiseImages";
import path from "path";

const uploadsDir = path.join("public", "uploads");

export async function POST(){
    const session = await getSession();
    if(!session){
        return new NextResponse("Unauthorized", {status : 401});
    }
    try {
        console.log(uploadsDir)
        await processImages(uploadsDir);
        return NextResponse.json("Successfully optimised images", {status : 200});
    } catch (error) {
        return new NextResponse("Failed to optimise images", {status:500});
    }
}