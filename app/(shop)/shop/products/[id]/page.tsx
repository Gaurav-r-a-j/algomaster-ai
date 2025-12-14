export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <h1>Product Page: {params.id}</h1>
    </div>
  );
}

