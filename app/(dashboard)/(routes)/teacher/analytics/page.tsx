import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";

const Analytics = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!session?.user) {
    return redirect("/");
  }
  const { data, totalRevenue, totalSale } = await getAnalytics(userId);

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Sales" value={totalSale} />
        <DataCard label="Total Revenue" value={totalRevenue} />
      </div>

      {/* <Chart data={data} /> */}
    </div>
  );
};

export default Analytics;
