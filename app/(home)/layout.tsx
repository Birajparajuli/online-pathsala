import HomeNav from "./_components/nav";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-50">
      <HomeNav />
      {children}
    </div>
  );
};

export default HomeLayout;
