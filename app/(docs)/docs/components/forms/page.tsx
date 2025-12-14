"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PageHeader } from "@/components/common"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import {
  Form,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/forms"

const exampleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Please select a country"),
  message: z.string().optional(),
})

type ExampleFormData = z.infer<typeof exampleSchema>

export default function FormsDocsPage() {
  const exampleForm = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      message: "",
    },
  })

  const handleSubmit = (data: ExampleFormData) => {
    alert(`Form submitted: ${JSON.stringify(data, null, 2)}`)
  }

  return (
    <Section className="py-12">
      <Container>
        <PageHeader
          title="Form Components"
          description="Reusable form components with react-hook-form integration"
        />

        <div className="mt-8 space-y-12">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Individual Component Documentation
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: "Form", slug: "form" },
                { name: "InputField", slug: "input-field" },
                { name: "TextareaField", slug: "textarea-field" },
                { name: "SelectField", slug: "select-field" },
                { name: "FormField", slug: "form-field" },
              ].map((component) => (
                <Link
                  key={component.slug}
                  href={`${ROUTES.DOCS}/components/${component.slug}`}
                  className="hover:bg-muted block rounded-lg border p-4 transition-colors"
                >
                  <h3 className="font-semibold">{component.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    View documentation →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-12">
          {/* InputField */}
          <Card>
            <CardHeader>
              <CardTitle>InputField</CardTitle>
              <CardDescription>
                Text input field with label and error handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Props</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>
                      <code>name</code>: string (required)
                    </li>
                    <li>
                      <code>label</code>: string
                    </li>
                    <li>
                      <code>type</code>: &quot;text&quot; | &quot;email&quot; |
                      &quot;password&quot; | &quot;number&quot; |
                      &quot;tel&quot; | &quot;url&quot;
                    </li>
                    <li>
                      <code>required</code>: boolean
                    </li>
                    <li>
                      <code>placeholder</code>: string
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Live Example</h4>
                  <Form form={exampleForm} onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                    </div>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TextareaField */}
          <Card>
            <CardHeader>
              <CardTitle>TextareaField</CardTitle>
              <CardDescription>
                Textarea field with label and error handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Props</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>
                      <code>name</code>: string (required)
                    </li>
                    <li>
                      <code>label</code>: string
                    </li>
                    <li>
                      <code>rows</code>: number (default: 4)
                    </li>
                    <li>
                      <code>required</code>: boolean
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Live Example</h4>
                  <Form form={exampleForm} onSubmit={handleSubmit}>
                    <TextareaField
                      name="message"
                      label="Message"
                      rows={4}
                      placeholder="Enter your message"
                    />
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SelectField */}
          <Card>
            <CardHeader>
              <CardTitle>SelectField</CardTitle>
              <CardDescription>
                Select dropdown with label and error handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Props</h4>
                  <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                    <li>
                      <code>name</code>: string (required)
                    </li>
                    <li>
                      <code>label</code>: string
                    </li>
                    <li>
                      <code>options</code>: Array&lt;
                      {`{ value: string; label: string }`}&gt; (required)
                    </li>
                    <li>
                      <code>required</code>: boolean
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Live Example</h4>
                  <Form form={exampleForm} onSubmit={handleSubmit}>
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
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complete Form Example */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Form Example</CardTitle>
              <CardDescription>
                Example form using all form components together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form form={exampleForm} onSubmit={handleSubmit}>
                <div className="space-y-6">
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
                  <TextareaField
                    name="message"
                    label="Message"
                    placeholder="Enter your message"
                  />
                  <Button type="submit">Submit Form</Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  )
}
