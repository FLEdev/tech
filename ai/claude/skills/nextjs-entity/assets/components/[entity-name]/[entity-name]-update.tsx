"use client";

import [EntityName]EditForm from "./[entity-name]-edit-form";

interface UpdateFormProps {
  [entityName]: {
    id: number;
    title: string;
    content: string;
    formatter?: string;
    file_bundle?: string;
  };
  onSuccess?: () => void;
}

export default function [EntityName]UpdateForm({ [entityName], onSuccess }: UpdateFormProps) {
  return <[EntityName]EditForm [entityName]={[entityName]} onSuccess={onSuccess} />;
}
