"use client";

// Design System Page - Centralized showcase of all UI components, icons, and design patterns

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IconWrapper } from "@/components/common/icon-wrapper";
import {
  ArrowLeftIcon,
  HeroHomeIcon,
  HeroSearchIcon,
  HeroUserIcon,
  Home01Icon,
  MoonIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UserIcon,
} from "@/lib/icons";
import {
  CardWrapper,
  EmptyState,
  ErrorMessage,
  LoadingSpinner,
  PageHeader,
  Section,
  SuccessMessage,
} from "@/components/common";
import {
  Form,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/forms";
import { ROUTES } from "@/constants/routes";

// Example form schema for design system
const exampleFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
  message: z.string().optional(),
});

type ExampleFormData = z.infer<typeof exampleFormSchema>;

export default function DesignSystemPage() {
  // Example form for demonstration
  const exampleForm = useForm<ExampleFormData>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      message: "",
    },
  });

  const handleExampleSubmit = (data: ExampleFormData) => {
    // Form submission handled here
    alert(`Form submitted with ${Object.keys(data).length} fields!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Section spacing="lg" containerSize="xl">
        {/* Header */}
        <div className="mb-12">
          <Link href={ROUTES.HOME}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeftIcon size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Design System
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Complete showcase of UI components, icons, and design patterns.
              Use this as a reference for building consistent interfaces.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12 flex flex-wrap gap-2">
          <a
            href="#icons"
            className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Icons
          </a>
          <a
            href="#buttons"
            className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Buttons
          </a>
          <a
            href="#forms"
            className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Forms
          </a>
          <a
            href="#common"
            className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Common Components
          </a>
          <a
            href="#badges"
            className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Badges
          </a>
        </div>
      </Section>

      {/* Icons Section */}
      <Section spacing="lg" containerSize="xl" id="icons">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Icons</h2>
            <p className="text-muted-foreground">
              Icon library using Huge Icons (primary) and Hero Icons
              (secondary).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Huge Icons - Direct Usage</CardTitle>
                <CardDescription>
                  Icons imported directly from the icon registry with custom
                  sizes and colors.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center flex-wrap">
                  <Home01Icon size={24} className="text-blue-500" />
                  <SearchIcon size={24} className="text-green-500" />
                  <UserIcon size={24} className="text-purple-500" />
                  <SettingsIcon size={32} className="text-orange-500" />
                  <SunIcon size={24} className="text-yellow-500" />
                  <MoonIcon size={24} className="text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Huge Icons - With IconWrapper</CardTitle>
                <CardDescription>
                  Using IconWrapper for consistent sizing with preset size
                  options.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center flex-wrap">
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hero Icons</CardTitle>
                <CardDescription>
                  Alternative icon library with &quot;Hero&quot; prefix.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center flex-wrap">
                  <HeroHomeIcon className="w-6 h-6 text-blue-500" />
                  <HeroSearchIcon className="w-6 h-6 text-green-500" />
                  <HeroUserIcon className="w-6 h-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Icon Sizes</CardTitle>
                <CardDescription>
                  Available preset sizes: xs (16px), sm (20px), md (24px), lg
                  (32px), xl (40px)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6 items-end">
                  <div className="flex flex-col items-center gap-2">
                    <Home01Icon size={16} />
                    <span className="text-xs text-muted-foreground">
                      xs (16px)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Home01Icon size={20} />
                    <span className="text-xs text-muted-foreground">
                      sm (20px)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Home01Icon size={24} />
                    <span className="text-xs text-muted-foreground">
                      md (24px)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Home01Icon size={32} />
                    <span className="text-xs text-muted-foreground">
                      lg (32px)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Home01Icon size={40} />
                    <span className="text-xs text-muted-foreground">
                      xl (40px)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="my-12" />

        {/* Buttons Section */}
        <Section spacing="lg" containerSize="xl" id="buttons">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Buttons</h2>
            <p className="text-muted-foreground">
              Button component variants and sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center flex-wrap">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator className="my-12" />

        {/* Common Components Section */}
        <Section spacing="lg" containerSize="xl" id="common">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Common Components</h2>
            <p className="text-muted-foreground">
              Reusable application components for consistent UI patterns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Container</CardTitle>
                <CardDescription>
                  Responsive container with preset sizes (sm, md, lg, xl, full)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded">
                  <div className="max-w-2xl mx-auto text-center">
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
                <div className="border rounded p-4">
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
                <div className="flex gap-6 items-center">
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
        </Section>

        <Separator className="my-12" />

        {/* Forms Section */}
        <Section spacing="lg" containerSize="xl" id="forms">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Form Components</h2>
            <p className="text-muted-foreground mb-2">
              Reusable form components with react-hook-form integration. All
              form fields include labels, error handling, and validation
              automatically.
            </p>
            <p className="text-sm text-muted-foreground">
              See{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
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
                <div className="grid md:grid-cols-2 gap-6">
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

                <div className="flex gap-4 mt-6">
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
        </Section>

        <Separator className="my-12" />

        {/* Badges Section */}
        <Section spacing="lg" containerSize="xl" id="badges">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Badges</h2>
            <p className="text-muted-foreground">Badge component variants.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Badge Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Footer Navigation */}
        <Section spacing="lg" containerSize="xl" className="mt-12">
          <div className="text-center pt-8 border-t">
            <p className="text-muted-foreground mb-4">
              Need help? Check out the documentation or get started building.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={ROUTES.HOME}>
                <Button variant="outline">
                  <Home01Icon size={16} className="mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href={ROUTES.DOCS}>
                <Button variant="outline">View Documentation</Button>
              </Link>
            </div>
          </div>
        </Section>
    </div>
  );
}
