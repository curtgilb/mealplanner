"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NumericalComparison } from "@/gql/graphql";
import { useRef } from "react";

interface NumericalFilterProps {
  id: string;
  name: string;
  min: number | undefined | null;
  max: number | undefined | null;
  onChange: (update: NumericalComparison) => void;
}

export default function NumericalFilter({
  id,
  name,
  min,
  max,
  onChange,
}: NumericalFilterProps) {
  const lteField = useRef<HTMLInputElement>(null);
  const gteField = useRef<HTMLInputElement>(null);

  function updateFilter() {
    const lte =
      lteField && lteField.current
        ? parseInt(lteField.current.value)
        : undefined;
    const gte =
      gteField && gteField.current
        ? parseInt(gteField.current.value)
        : undefined;
    const eq = lte === gte ? lte : undefined;

    onChange({ lte, gte, eq });
  }
  return (
    <div className="grid grid-cols-2 p-2 gap-y-4 gap-x-2">
      <p className="col-span-2 font-medium">{name}</p>
      <div>
        <Input
          ref={gteField}
          className="h-8"
          value={min ?? undefined}
          onChange={updateFilter}
          type="number"
          id={`${id}-min`}
          placeholder="Min"
        />
      </div>

      <div>
        <Input
          className="h-8"
          ref={lteField}
          value={max ?? undefined}
          onChange={updateFilter}
          type="number"
          id={`${id}-max`}
          placeholder="Max"
        />
      </div>
    </div>
  );
}
