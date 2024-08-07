import { getEsewaPaymentHash } from "@/lib/esewa";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
export async function POST(req: NextRequest): Promise<NextResponse> {
  const uuid = uuidv4();
  const body = await req.json();
  const amount = body.amount;
  console.log("amount", amount);
  console.log("uuid", uuid);
  try {
    const hashedCode = await getEsewaPaymentHash({
      amount,
      transaction_uuid: uuid,
    });

    return NextResponse.json(
      { hashedCode, transaction_uuid: uuid },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Failed to generate code.", { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    return new NextResponse("Hi From Esewa", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to generate code.", { status: 500 });
  }
}
