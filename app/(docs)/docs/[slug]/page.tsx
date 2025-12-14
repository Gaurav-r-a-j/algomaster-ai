export default function DocsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Docs Article: {params.slug}</h1>
    </div>
  );
}

