import { NextResponse } from "next/server";
import getCurrentUserData from "../../actions/getCurrentUserData";
import getSession from "../../actions/getSession";

export async function GET(){
    const session = await getSession();
    if(!session){
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const userData = await getCurrentUserData();

    if(!userData){
        return new NextResponse("User Not found", { status: 404 });
    }
    console.log("Route se hoon bhai",userData);
    return NextResponse.json(userData);
}