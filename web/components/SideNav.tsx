"use client";
import { usePathname } from "next/navigation";
import {
  Apple,
  CalendarDays,
  FolderInput,
  Home,
  HomeIcon,
  Library,
  LucideIcon,
  Package2,
  Settings,
  Target,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const navigationLinks = [
  {
    title: "Meal Plans",
    icon: <UtensilsCrossed className="h-5 w-5 shrink-0" />,
    link: "/mealplans",
  },
  {
    title: "Recipes",
    icon: <Library className="h-5 w-5 shrink-0" />,
    link: "/recipes",
  },
  {
    title: "Calendar",
    icon: <CalendarDays className="h-5 w-5 shrink-0" />,
    link: "/calendar",
  },
  {
    title: "Ingredients",
    icon: <Apple className="h-5 w-5 shrink-0" />,
    link: "/ingredients",
  },
  {
    title: "Nutrition Targets",
    icon: <Target className="h-5 w-5 shrink-0" />,
    link: "/nutrition",
  },
  {
    title: "Imports",
    icon: <FolderInput className="h-5 w-5 shrink-0" />,
    link: "/imports",
  },
];

interface SideNavProps {
  isCollapsed: boolean;
}

function Navigation({ isCollapsed }: SideNavProps) {
  return (
    <nav className="flex flex-col z-10 h-full border-r bg-card p-4 gap-y-2">
      {navigationLinks.map((link) => {
        return (
          <NavigationItem
            key={link.link}
            collapsed={isCollapsed}
            {...link}
          ></NavigationItem>
        );
      })}
    </nav>
  );
}

export { Navigation, type NavLink };

interface NavLink {
  title: string;
  icon: JSX.Element;
  link: string;
  collapsed: boolean;
}

function NavigationItem({ title, icon, link, collapsed }: NavLink) {
  const pathName = usePathname();
  const activeLink = pathName.startsWith(link);
  const toolTipProps = collapsed ? {} : { open: false };
  return (
    <TooltipProvider>
      <Tooltip {...toolTipProps}>
        <TooltipTrigger asChild>
          <Link
            className={cn(
              " flex gap-2 w-full items-center whitespace-nowrap text-sm font-medium justify-items-start  px-2.5 py-2.5 rounded-lg hover:bg-accent text-accent-foreground transition-all hover:text-foreground overflow-hidden",
              { "bg-primary text-primary-foreground": activeLink }
            )}
            href={link}
          >
            {icon}
            <p className={cn("transition-opacity", { "opacity-0": collapsed })}>
              {title}
            </p>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
