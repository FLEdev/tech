"use client";

import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

interface UpdateDialogProps {
  title: string;
  description?: string;
  component: React.ReactNode;
  onClose: () => void;
}

export default function Update[EntityName]Dialog({ title, description = "", component, onClose }: UpdateDialogProps) {
  return (
    <Dialog.Root defaultOpen onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="DialogDescription">
              {description}
            </Dialog.Description>
          )}
          {component}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close" onClick={onClose}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}



