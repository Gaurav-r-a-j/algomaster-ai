"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { isActivePath } from "@/utils/common/path-utils"

import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  Home01Icon,
  SettingsIcon,
  UserIcon,
} from "@/lib/icons"
import { useProgressStats } from "@/hooks/use-progress-stats"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
} from "@/components/ui/sidebar"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Logo } from "@/components/common/logo"
import { ThemeToggle } from "@/components/common/theme-toggle"

interface DashboardLayoutProps {
  children: React.ReactNode
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
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const stats = useProgressStats()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-border border-b">
          <div className="flex items-center justify-between px-2 py-4">
            <Link
              href={ROUTES.HOME}
              className="transition-opacity hover:opacity-80"
            >
              <Logo />
            </Link>
            <ThemeToggle size="sm" />
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
                      isActive={isActivePath(pathname, item.url)}
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
              <div className="space-y-3 px-2 py-3">
                <div>
                  <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs">
                    <span>Overall Progress</span>
                    <span className="font-semibold">
                      {stats.completed} / {stats.total}
                    </span>
                  </div>
                  <Progress value={stats.percentage} className="h-2" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                  <IconWrapper
                    icon={CheckmarkCircleIcon}
                    size={12}
                    className="text-emerald-500"
                  />
                  <span>{stats.completed} lessons completed</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-border border-t">
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
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
