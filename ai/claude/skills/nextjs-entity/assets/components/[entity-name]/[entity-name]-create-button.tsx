"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalDialog from "@/components/modal-dialog";
import [EntityName]CreateForm from "./[entity-name]-create";

export default function [EntityName]CreateButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create New
      </button>

      {open && (
        <ModalDialog
          title="Create [EntityName]"
          description="Add a new [EntityName]."
          component={<[EntitName]CreateForm onSuccess={() => { setOpen(false); router.refresh(); }} />}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
