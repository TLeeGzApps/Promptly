"use client";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BotMessageSquare, Blocks, Languages, Replace } from "lucide-react";
import { usePathname } from "next/navigation";
import React from 'react';
import Link from "next/link";

const navItems = [
  { href: "/generate", icon: BotMessageSquare, label: "Generate Prompt", tooltip: "Generate" },
  { href: "/convert", icon: Blocks, label: "Text to Prompt", tooltip: "Convert" },
  { href: "/translate", icon: Languages, label: "Translate Prompt", tooltip: "Translate" },
  { href: "/paraphrase", icon: Replace, label: "Paraphrase Text", tooltip: "Paraphrase" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.tooltip}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
