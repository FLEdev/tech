'use client';

import { CaretDownIcon, CaretSortIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

export type SortableColumn = 'id' | 'title' | 'created';

interface SortHeaderProps {
  col: SortableColumn;
  label: string;
}

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  if (!active) return <CaretSortIcon className="ml-1 text-gray-300" />;
  return dir === 'asc' ? <CaretUpIcon className="ml-1" /> : <CaretDownIcon className="ml-1" />;
}

export default function SortHeader({ col, label }: SortHeaderProps) {
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withDefault('created').withOptions({ shallow: false })
  );
  const [dir, setDir] = useQueryState(
    'dir',
    parseAsString.withDefault('desc').withOptions({ shallow: false })
  );
  const [, setOffset] = useQueryState(
    'offset',
    parseAsInteger.withDefault(0).withOptions({ shallow: false })
  );

  function handleSort() {
    const nextDir = sort === col && dir === 'asc' ? 'desc' : 'asc';
    setSort(col);
    setDir(nextDir);
    setOffset(0);
  }

  return (
    <button
      onClick={handleSort}
      className="flex items-center gap-0.5 font-semibold hover:text-blue-600 transition-colors"
    >
      {label}
      <SortIcon active={sort === col} dir={dir as 'asc' | 'desc'} />
    </button>
  );
}
