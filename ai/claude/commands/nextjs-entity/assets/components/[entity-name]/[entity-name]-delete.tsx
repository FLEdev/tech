"use client";

import { useActionState } from "react";
import { delete[EntityName] } from "@/../db/data/[entity-name]";

interface DeleteFormProps {
  [entityName]Id: number;
  onSuccess?: () => void;
}

export default function [EntityName]DeleteForm({ [entityName]Id, onSuccess }: DeleteFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prevState: any) => {
      try {
        await delete[EntityName]([entityName]Id);
        onSuccess?.();
        return { success: true };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <p className="text-sm text-gray-700">
        Are you sure you want to delete item <strong>#{[entityName]Id}</strong>? This action cannot be undone.
      </p>
      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {pending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </form>
  );
}
