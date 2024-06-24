import { NextResponse } from "next/server"
import getSession from "../../actions/getSession"
import {saveImageData} from "../../actions/insertImageData"

export async function POST(){
    const session = await getSession();
    if(!session){
        return new NextResponse("Unauthorized", {status : 401});
    }
    try {
        const result = await saveImageData();
        console.log(result)
        return NextResponse.json({saved: result}, {status : 200});
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to save metadata", {status :500});
    } 
}