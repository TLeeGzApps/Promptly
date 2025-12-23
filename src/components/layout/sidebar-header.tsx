import Link from "next/link";
import { Logo } from "@/components/icons";
import { SidebarHeader as BaseSidebarHeader } from "@/components/ui/sidebar";

export function SidebarHeader() {
  return (
    <BaseSidebarHeader>
      <Link href="/" className="flex items-center gap-2.5">
        <Logo className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold tracking-tight text-foreground font-headline">
          Promptly
        </h2>
      </Link>
    </BaseSidebarHeader>
  );
}
