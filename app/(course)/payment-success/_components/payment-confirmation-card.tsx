"use client";
import { Badge } from "@/components/ui/badge";
import { redirect, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const PaymentConfirmationCard = () => {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");

  if (!encodedData) {
    toast.error("Payment Data is not available");
    redirect("/");
  }
  let decodedData;
  try {
    const decodedString = atob(encodedData);
    decodedData = JSON.parse(decodedString);
  } catch (error) {
    toast.error("Invalid payment data format");
  }

  const createOrder = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/payment/esewa/purchase",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            decodedData,
          }),
        }
      );
      if (!res.ok) {
        toast.success("Order created successfully");
      }
    } catch (error) {
      toast.error("Invalid payment data format");
    }
  };
  createOrder();
  return (
    <div className="bg-white p-2 mt-6 rounded-md">
      <p>
        <strong>Transaction Id: </strong>
        {decodedData.transaction_uuid}
      </p>
      <p>
        <strong>Amount: </strong>Rs.
        {decodedData.total_amount}
      </p>
      <div>
        <strong> Status: </strong>
        <Badge className="ml-2" variant="secondary">
          {decodedData.status}
        </Badge>
      </div>
    </div>
  );
};
export default PaymentConfirmationCard;
