import { Boxes, HardHat, Package, Wrench, type LucideIcon } from "lucide-react";

export const SERVICES: {
  key:
    | "constructionMaterials"
    | "generalSupply"
    | "equipmentMachinery"
    | "constructionServices";
  href: string;
  icon: LucideIcon;
}[] = [
  { key: "constructionMaterials", href: "/supply", icon: Boxes },
  { key: "generalSupply", href: "/supply", icon: Package },
  { key: "equipmentMachinery", href: "/equipment", icon: Wrench },
  { key: "constructionServices", href: "/construction", icon: HardHat },
];