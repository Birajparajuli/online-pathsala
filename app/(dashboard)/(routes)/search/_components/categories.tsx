"use client";
import { Category } from "@prisma/client";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          // icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
