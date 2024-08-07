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
