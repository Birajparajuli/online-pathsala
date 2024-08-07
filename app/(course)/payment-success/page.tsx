import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import PaymentConfirmationCard from "./_components/payment-confirmation-card";
const PaymentSuccess = async () => {
  return (
    <div className="h-[80vh] flex justify-center items-center  m-auto">
      <div className="border rounded-md w-fit  p-6 bg-gray-100">
        <CheckCircle size={60} className="my-2 text-green-500 " />
        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="mt-4">Thank you for your payment.</p>
        <PaymentConfirmationCard />

        <div className="my-6 flex gap-4">
          <Button>
            <Link href="/courses">Go to Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccess;
