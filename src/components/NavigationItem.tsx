"use client";

import * as React from "react";
import { NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";

interface NavigationItemProps {
  href: string;
  title: string;
  isActive: boolean;
}

export function NavigationItem({ href, title, isActive }: NavigationItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-m font-medium transition-colors hover:bg-accent hover:text-accent-foreground
          ${isActive ? "bg-accent text-accent-foreground" : "text-foreground"}
        `}
      >
        <span>{title}</span>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
