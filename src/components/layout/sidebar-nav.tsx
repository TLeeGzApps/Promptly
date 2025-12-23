"use client";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BotMessageSquare, Blocks, Languages, Replace } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from 'react';

const navItems = [
  { href: "/generate", icon: BotMessageSquare, label: "Generate Prompt", tooltip: "Generate" },
  { href: "/convert", icon: Blocks, label: "Text to Prompt", tooltip: "Convert" },
  { href: "/translate", icon: Languages, label: "Translate Prompt", tooltip: "Translate" },
  { href: "/paraphrase", icon: Replace, label: "Paraphrase Text", tooltip: "Paraphrase" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <SidebarContent>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.tooltip}
              onClick={() => router.push(item.href)}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
