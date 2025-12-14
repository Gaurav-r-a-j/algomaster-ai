"use client";

/**
 * Icon Usage Examples
 * 
 * This component demonstrates different ways to use icons in the project.
 */

import { IconWrapper } from "@/components/common/icon-wrapper";
import {
  Home01Icon,
  SearchIcon,
  UserIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon,
  HeroHomeIcon,
  HeroSearchIcon,
  HeroUserIcon,
} from "@/lib/icons";

export function IconExamples() {
  return (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Huge Icons - Direct Usage</h2>
        <div className="flex gap-4 items-center">
          <Home01Icon size={24} className="text-blue-500" />
          <SearchIcon size={24} className="text-green-500" />
          <UserIcon size={24} className="text-purple-500" />
          <SettingsIcon size={32} className="text-orange-500" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Huge Icons - With IconWrapper (Preset Sizes)</h2>
        <div className="flex gap-4 items-center">
          <IconWrapper icon={Home01Icon} size="xs" className="text-blue-500" />
          <IconWrapper icon={SearchIcon} size="sm" className="text-green-500" />
          <IconWrapper icon={UserIcon} size="md" className="text-purple-500" />
          <IconWrapper icon={SettingsIcon} size="lg" className="text-orange-500" />
          <IconWrapper icon={SunIcon} size="xl" className="text-yellow-500" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Hero Icons - Direct Usage</h2>
        <div className="flex gap-4 items-center">
          <HeroHomeIcon className="w-6 h-6 text-blue-500" />
          <HeroSearchIcon className="w-6 h-6 text-green-500" />
          <HeroUserIcon className="w-6 h-6 text-purple-500" />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Icon Sizes Comparison</h2>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col items-center gap-2">
            <Home01Icon size={16} />
            <span className="text-xs">xs (16px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home01Icon size={20} />
            <span className="text-xs">sm (20px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home01Icon size={24} />
            <span className="text-xs">md (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home01Icon size={32} />
            <span className="text-xs">lg (32px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Home01Icon size={40} />
            <span className="text-xs">xl (40px)</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Themed Icons</h2>
        <div className="flex gap-4 items-center">
          <SunIcon size={24} className="text-yellow-500" />
          <MoonIcon size={24} className="text-blue-400" />
        </div>
      </section>
    </div>
  );
}

