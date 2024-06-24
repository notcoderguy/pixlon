import getAllImageData from "../../actions/getAllimageData";
import {NextResponse} from "next/server"

export async function GET(){
    const imagesData = await getAllImageData();

    if(!imagesData){
        return new NextResponse("No Images Found", { status: 404 });
    }
    return NextResponse.json(imagesData);
}