"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { IconWrapper } from "@/components/common/icon-wrapper";
import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  Home01Icon,
  SettingsIcon,
  UserIcon,
} from "@/lib/icons";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgressStats } from "@/hooks/use-progress-stats";
import { Progress } from "@/components/ui/progress";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD,
    icon: Home01Icon,
  },
  {
    title: "Home",
    url: ROUTES.HOME,
    icon: BookOpenIcon,
  },
  {
    title: "Profile",
    url: ROUTES.PROFILE,
    icon: UserIcon,
  },
  {
    title: "Settings",
    url: ROUTES.SETTINGS,
    icon: SettingsIcon,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const stats = useProgressStats();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <IconWrapper icon={BookOpenIcon} size={20} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg tracking-tight">DSA Platform</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <IconWrapper icon={item.icon} size={16} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator />

          <SidebarGroup>
            <SidebarGroupLabel>Progress</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2 py-3 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Overall Progress</span>
                    <span className="font-semibold">
                      {stats.completed} / {stats.total}
                    </span>
                  </div>
                  <Progress value={stats.percentage} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <IconWrapper icon={CheckmarkCircleIcon} size={12} className="text-emerald-500" />
                  <span>{stats.completed} lessons completed</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-border">
          <div className="px-2 py-4">
            <SidebarMenuButton asChild>
              <Link href={ROUTES.HOME}>
                <IconWrapper icon={Home01Icon} size={16} />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1" />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
