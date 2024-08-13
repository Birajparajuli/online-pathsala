import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseId, userId, transaction_uuid } = await req.json();
  const session = await auth();
  if (!session?.user) return null;
  if (userId) {
    // console.log("USER_ID=>", userId);
    // console.log("COURSE_ID=>", courseId);

    // end to remove
    if (!userId || !courseId) {
      return new NextResponse(
        `Webhook Error : Missing metadata [USER_ID_ID=>] ${userId} and [COURSE_ID_IS=>] ${courseId}`,
        {
          status: 400,
        }
      );
    }
    const purchaseInfo = await db.purchase.create({
      data: {
        userId: userId,
        courseId: courseId,
        paymentId: transaction_uuid,
      },
    });
    // console.log("PURCHASE_INFO", purchaseInfo);
  } else {
    return new NextResponse(`Webhook Error :Unhandled event type `, {
      status: 200,
    });
  }
  return new NextResponse(null, { status: 200 });
}

export async function PATCH(req: Request) {
  const { decodedData } = await req.json();
  console.log("DATA=>", decodedData);

  const session = await auth();
  if (!session?.user) return null;
  try {
    const updatePurchase = await db.purchase.update({
      where: {
        paymentId: decodedData?.transaction_uuid,
      },
      data: {
        paymentMethod: "eSewa",
        paymentStatus: decodedData.status,
        totalAmount: parseFloat(decodedData?.total_amount),
      },
    });

    return NextResponse.json(updatePurchase);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
