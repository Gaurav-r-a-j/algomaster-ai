"use client"

import React from "react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { zodResolver } from "@hookform/resolvers/zod"
// Design System Page - Centralized showcase of all UI components, icons, and design patterns

import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  HeroHomeIcon,
  HeroSearchIcon,
  HeroUserIcon,
  Home01Icon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CardWrapper,
  EmptyState,
  ErrorMessage,
  LoadingSpinner,
  PageHeader,
  SuccessMessage,
} from "@/components/common"
import { CodePreview } from "@/components/common/code-preview"
import { IconWrapper } from "@/components/common/icon-wrapper"
import {
  Form,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/forms"

// Example form schema for design system
const exampleFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
  message: z.string().optional(),
})

type ExampleFormData = z.infer<typeof exampleFormSchema>

export default function OverviewContent() {
  // Example form for demonstration
  const exampleForm = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      message: "",
    },
  })

  const handleExampleSubmit = (data: ExampleFormData) => {
    // Form submission handled here
    alert(`Form submitted with ${Object.keys(data).length} fields!`)
  }
  return (
    <div className="space-y-16">
      {/* Overview Section */}
      <div id="overview" className="scroll-mt-20">
        <div className="space-y-3">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            Overview
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            This design system provides a comprehensive set of reusable
            components, icons, and design patterns for building consistent
            interfaces.
          </p>
        </div>
      </div>

      {/* Icons Section */}
      <div id="icons" className="scroll-mt-20">
        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight">
              Icons
            </h2>
            <p className="text-muted-foreground text-sm">
              Icon library using Huge Icons (primary) and Hero Icons
              (secondary).
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <CodePreview
            code={`import { IconWrapper } from "@/components/common/icon-wrapper";
import { Home01Icon, SearchIcon, UserIcon, SettingsIcon, SunIcon, MoonIcon } from "@/lib/icons";

<IconWrapper icon={Home01Icon} size={24} className="text-blue-500" />
<IconWrapper icon={SearchIcon} size={24} className="text-green-500" />
<IconWrapper icon={UserIcon} size={24} className="text-purple-500" />
<IconWrapper icon={SettingsIcon} size={32} className="text-orange-500" />
<IconWrapper icon={SunIcon} size={24} className="text-yellow-500" />
<IconWrapper icon={MoonIcon} size={24} className="text-blue-400" />`}
            language="tsx"
            preview={
              <div className="flex flex-wrap items-center gap-4">
                <IconWrapper
                  icon={Home01Icon}
                  size={24}
                  className="text-blue-500"
                />
                <IconWrapper
                  icon={SearchIcon}
                  size={24}
                  className="text-green-500"
                />
                <IconWrapper
                  icon={UserIcon}
                  size={24}
                  className="text-purple-500"
                />
                <IconWrapper
                  icon={SettingsIcon}
                  size={32}
                  className="text-orange-500"
                />
                <IconWrapper
                  icon={SunIcon}
                  size={24}
                  className="text-yellow-500"
                />
                <IconWrapper
                  icon={MoonIcon}
                  size={24}
                  className="text-blue-400"
                />
              </div>
            }
          />

          <CodePreview
            code={`import { IconWrapper } from "@/components/common/icon-wrapper";
import { Home01Icon, SearchIcon, UserIcon, SettingsIcon, SunIcon } from "@/lib/icons";

// Using preset sizes
<IconWrapper icon={Home01Icon} size="xs" className="text-blue-500" />
<IconWrapper icon={SearchIcon} size="sm" className="text-green-500" />
<IconWrapper icon={UserIcon} size="md" className="text-purple-500" />
<IconWrapper icon={SettingsIcon} size="lg" className="text-orange-500" />
<IconWrapper icon={SunIcon} size="xl" className="text-yellow-500" />`}
            language="tsx"
            preview={
              <div className="flex flex-wrap items-center gap-4">
                <IconWrapper
                  icon={Home01Icon}
                  size="xs"
                  className="text-blue-500"
                />
                <IconWrapper
                  icon={SearchIcon}
                  size="sm"
                  className="text-green-500"
                />
                <IconWrapper
                  icon={UserIcon}
                  size="md"
                  className="text-purple-500"
                />
                <IconWrapper
                  icon={SettingsIcon}
                  size="lg"
                  className="text-orange-500"
                />
                <IconWrapper
                  icon={SunIcon}
                  size="xl"
                  className="text-yellow-500"
                />
              </div>
            }
          />

          <CodePreview
            code={`import { HeroHomeIcon, HeroSearchIcon, HeroUserIcon } from "@/lib/icons";

<HeroHomeIcon className="w-6 h-6 text-blue-500" />
<HeroSearchIcon className="w-6 h-6 text-green-500" />
<HeroUserIcon className="w-6 h-6 text-purple-500" />`}
            language="tsx"
            preview={
              <div className="flex flex-wrap items-center gap-4">
                <HeroHomeIcon className="h-6 w-6 text-blue-500" />
                <HeroSearchIcon className="h-6 w-6 text-green-500" />
                <HeroUserIcon className="h-6 w-6 text-purple-500" />
              </div>
            }
          />

          <CodePreview
            code={`import { IconWrapper } from "@/components/common/icon-wrapper";
import { Home01Icon } from "@/lib/icons";

// Available preset sizes: xs (16px), sm (20px), md (24px), lg (32px), xl (40px)
<div className="flex gap-6 items-end">
  <IconWrapper icon={Home01Icon} size={16} />
  <IconWrapper icon={Home01Icon} size={20} />
  <IconWrapper icon={Home01Icon} size={24} />
  <IconWrapper icon={Home01Icon} size={32} />
  <IconWrapper icon={Home01Icon} size={40} />
</div>`}
            language="tsx"
            preview={
              <div className="flex items-end gap-6">
                <div className="flex flex-col items-center gap-2">
                  <IconWrapper icon={Home01Icon} size={16} />
                  <span className="text-muted-foreground text-xs">
                    xs (16px)
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconWrapper icon={Home01Icon} size={20} />
                  <span className="text-muted-foreground text-xs">
                    sm (20px)
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconWrapper icon={Home01Icon} size={24} />
                  <span className="text-muted-foreground text-xs">
                    md (24px)
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconWrapper icon={Home01Icon} size={32} />
                  <span className="text-muted-foreground text-xs">
                    lg (32px)
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <IconWrapper icon={Home01Icon} size={40} />
                  <span className="text-muted-foreground text-xs">
                    xl (40px)
                  </span>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <Separator className="my-12" />

      {/* Buttons Section */}
      <div id="buttons" className="scroll-mt-20">
        <div className="mb-6 space-y-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            Buttons
          </h2>
          <p className="text-muted-foreground text-sm">
            Button component variants and sizes.
          </p>
        </div>

        <CodePreview
          code={`import { Button } from "@/components/ui/button";

// Button Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
          language="tsx"
          preview={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          }
        />
      </div>

      <Separator className="my-12" />

      {/* Common Components Section */}
      <div id="common" className="scroll-mt-20">
        <div className="mb-6 space-y-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            Common Components
          </h2>
          <p className="text-muted-foreground">
            Reusable application components for consistent UI patterns.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Container</CardTitle>
              <CardDescription>
                Responsive container with preset sizes (sm, md, lg, xl, full)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded p-4">
                <div className="mx-auto max-w-2xl text-center">
                  Container with max-w-2xl (sm)
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Section</CardTitle>
              <CardDescription>
                Page section with consistent spacing and container wrapper
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded border p-4">
                Section component provides consistent spacing and container
                wrapper
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Header</CardTitle>
              <CardDescription>
                Consistent page header with title, description, and actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PageHeader
                title="Example Page"
                description="This is an example page header"
                actions={<Button size="sm">Action</Button>}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Wrapper</CardTitle>
              <CardDescription>
                Wrapper for Card component with consistent structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardWrapper
                title="Card Title"
                description="Card description"
                footer={<Button size="sm">Action</Button>}
              >
                <p className="text-sm">Card content goes here</p>
              </CardWrapper>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empty State</CardTitle>
              <CardDescription>
                Component for displaying empty states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyState
                title="No items found"
                description="Get started by creating your first item"
                action={{
                  label: "Create Item",
                  onClick: () => alert("Create clicked"),
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loading Spinner</CardTitle>
              <CardDescription>
                Loading spinner with different sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-xs">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner size="md" />
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner size="lg" />
                  <span className="text-xs">Large</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Error and success message components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ErrorMessage message="This is an error message" />
              <SuccessMessage message="This is a success message" />
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Forms Section */}
      <div id="forms" className="scroll-mt-20">
        <div className="mb-6 space-y-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            Form Components
          </h2>
          <p className="text-muted-foreground mb-2">
            Reusable form components with react-hook-form integration. All form
            fields include labels, error handling, and validation automatically.
          </p>
          <p className="text-muted-foreground text-sm">
            See{" "}
            <code className="bg-muted rounded px-1 py-0.5 text-xs">
              components/forms/FORMS.md
            </code>{" "}
            for full documentation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Complete Form Example</CardTitle>
            <CardDescription>
              Example form using InputField, SelectField, and TextareaField
              components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form form={exampleForm} onSubmit={handleExampleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  name="name"
                  label="Name"
                  required
                  placeholder="Enter your name"
                />

                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />

                <div className="md:col-span-2">
                  <SelectField
                    name="country"
                    label="Country"
                    required
                    placeholder="Select a country"
                    options={[
                      { value: "us", label: "United States" },
                      { value: "uk", label: "United Kingdom" },
                      { value: "ca", label: "Canada" },
                    ]}
                  />
                </div>

                <div className="md:col-span-2">
                  <TextareaField
                    name="message"
                    label="Message"
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button type="submit">Submit Form</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => exampleForm.reset()}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Badges Section */}
      <div id="badges" className="scroll-mt-20">
        <div className="mb-6 space-y-2">
          <h2 className="text-foreground text-2xl font-semibold tracking-tight">
            Badges
          </h2>
          <p className="text-muted-foreground">Badge component variants.</p>
        </div>

        <CodePreview
          code={`import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
          language="tsx"
          preview={
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          }
        />
      </div>

      {/* Footer Navigation */}
      <div className="mt-12">
        <div className="border-t pt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Need help? Check out the documentation or get started building.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href={ROUTES.HOME}>
                <IconWrapper icon={Home01Icon} size={16} className="mr-2" />
                Back to Home
              </Link>
            </Button>
            <Link href={ROUTES.DOCS}>
              <Button variant="outline">View Documentation</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
