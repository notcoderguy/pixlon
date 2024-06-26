import { NextResponse } from "next/server";
import getSession from "../../actions/getSession";
import { clearUploads } from "../../actions/clearUploads";
import path from "path";

export async function POST(){
    const session = await getSession();
    if(!session){
        return new NextResponse("Unauthorized", {status : 401});
    }
    try {
        const directory = path.join(process.cwd(), 'public', 'uploads');
        await clearUploads(directory);
        return NextResponse.json("Uploads cleared", {status : 200});
    } catch (error) {
        return new NextResponse("Unable clear uploads", {status : 500});
    }
}