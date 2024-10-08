"use client";
import { graphql } from "@/gql";
import { FetchUnitsQuery } from "@/gql/graphql";
import { useMutation, useQuery } from "@urql/next";
import { useState } from "react";
import { Picker } from "../picker";
import { ItemPickerProps } from "./Picker";

const getUnitsQuery = graphql(`
  query fetchUnits {
    units {
      id
      name
      symbol
      abbreviations
    }
  }
`);

const createUnitMutation = graphql(`
  mutation createUnit($unit: CreateUnitInput!) {
    createUnit(input: $unit) {
      id
      name
      symbol
      abbreviations
    }
  }
`);

type UnitItem = FetchUnitsQuery["units"][number];

export function UnitSelector<
  T extends { id: string; name: string },
  QType,
  QVariables extends AnyVariables
>({
  queryDocument,
  listKey,
  defaultValue,
  onChange,
}: BasicMultiSelectProps<T, QType, QVariables>) {
  const [selected, setSelected] = useState<T[]>(defaultValue);
  return (
    <div>
      <GenericCombobox<T, QType, QVariables, true, true>
        queryDocument={queryDocument}
        listKey={listKey}
        formatLabel={(item) => item.name}
        placeholder="Select..."
        createNewOption={(newValue) => {
          console.log(newValue);
        }}
        autoFilter
        multiSelect={true}
        onSelect={(rule) => {
          setSelected(rule);
          onChange(rule);
        }}
        value={selected}
      />

      <TagList list={selected} />
    </div>
  );
}
