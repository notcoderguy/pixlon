import bcrypt from "bcryptjs";

import prisma from "../../../lib/prismadb";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import getSession from "../../actions/getSession";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();

    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, username: name, passwordHash: hashedPassword },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTRATION ERROR @app/api/register/route.ts");
    return new NextResponse("internal error", { status: 500 });
  }
}
