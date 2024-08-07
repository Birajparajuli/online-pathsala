"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { IconType } from "react-icons";
interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}
const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  // console.log(label);
  console.log(value);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("search");
  // const currentTitle = searchParams.get("title") || null;
  console.log(currentTitle);

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          search: currentTitle,
          // if item is selected ,and select again it will set null
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url, { scroll: false });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-s-slate-200 rounded-md flex items-center gap-x-1 hover:border-purple-700 transition",
        isSelected && "border-purple-700 bg-purple-200/20 text-purple-800"
      )}
    >
      {Icon && <Icon size={20} />}

      <div className="truncate"> {label}</div>
    </button>
  );
};

export default CategoryItem;
