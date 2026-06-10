"use client";

import { useActionState } from "react";
import { create[EntityName], update[EntityName] } from "@/../db/data/[entity-name]";
import { typeOptions } from "@/lib/types";
import * as Form from "@radix-ui/react-form";

interface [EntityName]EditFormProps {
  [entityName]?: {
    id: number;
    title: string;
    content: string;
    formatter?: string;
    file_bundle?: string;
  };
  onSuccess?: () => void;
}

export default function [EntityName]EditForm({ [entityName], onSuccess }: [EntityName]EditFormProps) {
  const isEdit = !![entityName]Id;

  const [state, formAction, pending] = useActionState(
    async (_prevState: any, formData: FormData) => {
      try {
        const data = {
          title: formData.get("title"),
          content: formData.get("content"),
          formatter: formData.get("formatter") || undefined,
          file_bundle: formData.get("file_bundle") || undefined,
        };
        if (isEdit) {
          await update[EntityName]([entityName].id, data);
        } else {
          await create[EntityName](data);
        }
        onSuccess?.();
        return { success: true };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
    null
  );

  return (
    <Form.Root action={formAction} className="space-y-4">
      <Form.Field name="title">
        <Form.Label className="block font-medium mb-2">Title *</Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            required
            defaultValue={[entityName]?.title ?? ""}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter title"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="content">
        <Form.Label className="block font-medium mb-2">Content *</Form.Label>
        <Form.Control asChild>
          <textarea
            required
            defaultValue={[entityName]?.content ?? ""}
            className="w-full border rounded px-3 py-2 min-h-32"
            placeholder="Enter content"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="formatter">
        <Form.Label className="block font-medium mb-2">Format</Form.Label>
        <Form.Control asChild>
          <select defaultValue={[entityName]?.formatter ?? ""} className="w-full border rounded px-3 py-2">
            <option value="">Select format</option>
            {typeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Form.Control>
      </Form.Field>

      <Form.Field name="file_bundle">
        <Form.Label className="block font-medium mb-2">File Bundle</Form.Label>
        <Form.Control asChild>
          <input
            type="text"
            defaultValue={[entityName]?.file_bundle ?? ""}
            className="w-full border rounded px-3 py-2"
            placeholder="Optional file bundle"
          />
        </Form.Control>
      </Form.Field>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update" : "Create")}
        </button>
      </div>
    </Form.Root>
  );
}
