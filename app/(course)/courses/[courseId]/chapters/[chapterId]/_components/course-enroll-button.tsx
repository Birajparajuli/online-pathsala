"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}
const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // const { userId } = auth();
  // const { isLoaded, userId, sessionId, getToken } = useAuth();

  // if (!userId) {
  // 	toast.error("Please Login first");
  // 	return redirect("/sign-up");
  // }
  const onClick = async () => {
    try {
      setIsLoading(true);
      //   const response = await axios.post(`/api/courses/${courseId}/checkout`);
      //   window.location.assign(response.data.url);

      // Esewa
      const res = await fetch("http://localhost:3000/api/payment/esewa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log("Error sending payment request");
      }
      const formData = {
        amount: price,
        failure_url: "http://localhost:3000/payment-failure",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: data.hashedCode.signature,
        signed_field_names: data.hashedCode.signed_field_names,
        success_url: "http://localhost:3000/payment-success",
        tax_amount: "0",
        total_amount: price,
        transaction_uuid: data.transaction_uuid,
      };
      esewaCall(formData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong | Payment");
    } finally {
      setIsLoading(false);
    }
  };

  const esewaCall = (formData: any) => {
    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className="w-full md:w-auto "
      size="sm"
    >
      Enroll for {formatPrice(price)} |
      <img src="/esewa.png" alt="esewa" className="h-4 ml-1" />
    </Button>
  );
};

export default CourseEnrollButton;
