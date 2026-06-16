import { Suspense } from "react";
import [EntityName]List from "@/components/[entity-name]/[entity-name]-list";
import [EntityName]CreateButton from "@/components/[entity-name]/[entity-name]-create-button";
import { read[EntityName]s } from "@/../db/data/[entity-name]";

export default async function [EntityName]Page({
  searchParams,
}: {
  searchParams: Promise<{ offset?: string }>;
}) {
  const { offset: rawOffset } = await searchParams;
  const offset = parseInt(rawOffset ?? "0", 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">[EntityName]</h1>
        <[EntityName]CreateButton />
      </div>

      <Suspense fallback={<p className="text-center mt-6">Loading...</p>}>
        <[EntityName]List [entityName]ItemsPromise={read[EntityName]s(offset)} />
      </Suspense>
    </div>
  );
}
