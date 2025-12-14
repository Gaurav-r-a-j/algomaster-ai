import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import "highlight.js/styles/github-dark.css";
import { TableOfContents } from "@/components/features/docs/table-of-contents";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ClockIcon,
  CpuChipIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

import { getTopicBySlug, TOPICS } from "@/data/curriculum";
import { generateTopicSlug } from "@/utils/common/slug";
import { DataStructureVisualizer } from "@/components/features/learning/visualizers/data-structure-visualizer";
import { CodePlayground } from "@/components/features/learning/code-editor/code-playground";

// Force dynamic rendering if we want to ensure fresh data, 
// though static generation (generateStaticParams) is better for docs.
// For now, let's just make it work.

export async function generateStaticParams() {
  return TOPICS.map((topic) => ({
    slug: generateTopicSlug(topic.title),
  }));
}

export default async function DocsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. Fetch Topic
  // In a real app we might fetch from topic.id too, but slug is primary
  let topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  // 2. Navigation Logic (Prev/Next)
  const currentIndex = TOPICS.findIndex((t) => t.id === topic!.id);
  const prevTopic = currentIndex > 0 ? TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < TOPICS.length - 1 ? TOPICS[currentIndex + 1] : null;

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{topic.module}</span>
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {topic.title}
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {topic.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Badge variant={topic.difficulty === "Hard" ? "destructive" : "secondary"} className="text-sm px-3 py-1">
            {topic.difficulty || "Medium"}
          </Badge>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 px-3 py-1 rounded-md border border-border">
            <ClockIcon className="w-4 h-4" />
            <span className="font-mono">Time: {topic.complexity?.time || "N/A"}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 px-3 py-1 rounded-md border border-border">
            <CpuChipIcon className="w-4 h-4" />
            <span className="font-mono">Space: {topic.complexity?.space || "N/A"}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Main Content Tabs */}
      <Tabs defaultValue="explanation" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
          <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          <TabsTrigger value="code">Code Interpreter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="explanation" className="mt-6">
          <div className="flex gap-10">
            {/* Main Article Content */}
            <div className="flex-1 min-w-0 space-y-6">
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="p-0 prose prose-slate dark:prose-invert max-w-none 
                  prose-headings:scroll-m-20 prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:leading-7 prose-p:mb-6
                  prose-code:font-mono prose-code:text-sm prose-code:bg-muted prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:rounded
                  prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none
                ">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeSlug]}
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="relative my-6 rounded-lg border bg-muted/50 p-4">
                          <pre {...props} className="overflow-x-auto p-0 bg-transparent" />
                        </div>
                      ),
                    }}
                  >
                    {topic.content}
                  </ReactMarkdown>
                </CardContent>
              </Card>
            </div>

            {/* Sticky Table of Contents Sidebar */}
            <div className="hidden xl:block w-64 shrink-0">
               <div className="sticky top-6">
                 <TableOfContents content={topic.content} />
               </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="visualizer" className="mt-6">
             <div className="min-h-[500px]">
                <DataStructureVisualizer topic={topic} />
             </div>
        </TabsContent>

        <TabsContent value="code" className="mt-6">
            <CodePlayground topic={topic} />
        </TabsContent>
      </Tabs>

      <Separator className="my-10" />

      {/* Footer Navigation */}
      <div className="flex items-center justify-between">
        {prevTopic ? (
          <Button variant="outline" size="lg" className="group h-auto py-4 px-6 flex flex-col items-start gap-1" asChild>
            <Link href={`/docs/${generateTopicSlug(prevTopic.title)}`}>
              <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                <ChevronLeftIcon className="w-3 h-3" /> Previous
              </span>
              <span className="font-semibold text-base">{prevTopic.title}</span>
            </Link>
          </Button>
        ) : (
          <div /> 
        )}

        {nextTopic ? (
          <Button variant="outline" size="lg" className="group h-auto py-4 px-6 flex flex-col items-end gap-1" asChild>
            <Link href={`/docs/${generateTopicSlug(nextTopic.title)}`}>
               <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                Next <ChevronRightIcon className="w-3 h-3" />
              </span>
              <span className="font-semibold text-base">{nextTopic.title}</span>
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
