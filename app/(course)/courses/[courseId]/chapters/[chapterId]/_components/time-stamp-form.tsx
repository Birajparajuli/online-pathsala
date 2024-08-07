"use client";
import Timestamp from "react-timestamp";

interface TimeStampProps {
  createdAt: Date;
}
const TimeStampForm = ({ createdAt }: TimeStampProps) => {
  return (
    <div className="w-60 text-purple-600 font-bold">
      <Timestamp relative date={createdAt} autoUpdate />
    </div>
  );
};

export default TimeStampForm;
