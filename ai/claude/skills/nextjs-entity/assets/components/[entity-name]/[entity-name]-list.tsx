"use client";

import { use, useState } from "react"; // useState kept for selectedItem/deleteItem
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Flex, Table } from "@radix-ui/themes"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import ListPagination from "#components/list-pagination";

import ModalDialog from "@/components/modal-dialog";
import [EntityName]UpdateForm from "@/components/[entity-name]/[entity-name]-update";
import [EntityName]DeleteForm from "@/components/[entity-name]/[entity-name]-delete";

interface [EntityName]ListProps {
  [entityName]ItemsPromise: Promise<{
    items: any[];
    total: number;
    offset: number;
    limit: number;
  }>;
}

export default function [EntityName]List({ [entityName]ItemsPromise }: [EntityName]ListProps) {
  const router = useRouter();
  const data = use([entityName]ItemsPromise);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [deleteItem, setDeleteItem] = useState<any | null>(null);

  return (
    <>
      <Flex direction="column" gap="5" className="border rounded-lg size-max mx-auto">
        <Table.Root>
          <Table.Header>
            <Table.Row className="border-b">
              <Table.ColumnHeaderCell className="p-4">ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="p-4">Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="p-4">Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="p-4">Created Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="p-4">Edit</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="p-4">Delete</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.items.map((item: any) => (
              <Table.Row key={item.id} className="border-b hover:bg-gray-50">
                <Table.Cell className="p-4">{item.id}</Table.Cell>
                <Table.Cell className="p-4">
                  <Link href={`/[entity-name]/${item.id}`} className="text-blue-600 hover:underline">
                    {item.title}
                  </Link>
                </Table.Cell>
                <Table.Cell className="p-4 text-gray-600 line-clamp-2">
                  {item.content.substring(0, 100)}...
                </Table.Cell>
                <Table.Cell className="p-4">{formatDate(item.created)}</Table.Cell>
                <Table.Cell className="p-4">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Pencil2Icon className="w-4 h-4" />
                  </button>
                </Table.Cell>
                <Table.Cell className="p-4">
                  <button
                    onClick={() => setDeleteItem(item)}
                    className="p-2 hover:bg-red-100 rounded text-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>

      <ListPagination
        total={data.total}
        limit={data.limit}
      />

      {/* Dialogs */}
      {selectedItem && (
        <ModalDialog
          title="Update [EntityName]"
          description="Edit the details of this [EntityName]."
          component={<[EntityName]UpdateForm [entityName]={selectedItem} onSuccess={() => { setSelectedItem(null); router.refresh(); }} />}
          onClose={() => setSelectedItem(null)}
        />
      )}
      {deleteItem && (
        <ModalDialog
          title="Delete [EntityName]"
          description="This action cannot be undone."
          component={<[EntityName]DeleteForm [entityName]Id={deleteItem.id} onSuccess={() => { setDeleteItem(null); router.refresh(); }} />}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </>
  );
}
