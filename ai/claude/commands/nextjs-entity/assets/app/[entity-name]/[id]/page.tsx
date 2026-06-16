import Link from "next/link";
import { read[EntityName] } from "@/../db/data/[entity-name]";
import { notFound } from "next/navigation";

interface [EntityName]DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function [EntityName]DetailPage({ params }: [EntityName]DetailPageProps) {
  const { id } = await params;
  const [entityName]Id = parseInt(id);

  if (isNaN([entityName]Id)) {
    notFound();
  }

  const [entityName] = await read[EntityName]([entityName]Id);

  if (![entityName]) {
    notFound();
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl">
        <div className="mb-6">
          <Link href="/[entity-name]" className="text-blue-600 hover:underline">
            ← Back to [EntityName]
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-2">{[entityName].title}</h1>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600 border-b pb-4">
            <div>
              <p className="font-semibold">ID</p>
              <p>{[entityName].id}</p>
            </div>
            <div>
              <p className="font-semibold">Created</p>
              <p>{formatDate([entityName].created)}</p>
            </div>
            {[entityName].formatter && (
              <div>
                <p className="font-semibold">Format</p>
                <p>{[entityName].formatter}</p>
              </div>
            )}
            {[entityName].file_bundle && (
              <div>
                <p className="font-semibold">File Bundle</p>
                <p>{[entityName].file_bundle}</p>
              </div>
            )}
            <div>
              <p className="font-semibold">Author ID</p>
              <p>{[entityName].authorId}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Content</h2>
            <div className="bg-gray-50 rounded border p-4 whitespace-pre-wrap break-words">
              {[entityName].content}
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/[entity-name]/${[entityName].id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </Link>
            <Link href="/[entity-name]" className="px-4 py-2 border rounded hover:bg-gray-50">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
