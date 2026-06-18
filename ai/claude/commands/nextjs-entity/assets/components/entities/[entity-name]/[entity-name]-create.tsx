"use client";

import [EntityName]EditForm from "./[entity-name]-edit-form";

interface CreateFormProps {
  onSuccess?: () => void;
}

export default function [EntityName]CreateForm({ onSuccess }: CreateFormProps) {
  return <[EntityName]EditForm onSuccess={onSuccess} />;
}
