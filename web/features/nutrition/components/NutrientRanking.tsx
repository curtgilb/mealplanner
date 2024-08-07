"use client";
import {
  NutrientItem,
  NutrientPicker,
} from "@/components/pickers/NutrientPicker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getRankedNutrients,
  setRankedNutrients,
} from "@/features/nutrition/api/Nutrient";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation, useQuery } from "@urql/next";
import { ArrowDownUp, GripVertical } from "lucide-react";
import { useState } from "react";

export function NutrientRanking() {
  const [setResult, changeRanking] = useMutation(setRankedNutrients);
  const [canSave, setCanSave] = useState<boolean>(false);
  const [rankQuery] = useQuery({ query: getRankedNutrients });
  const [selectedNutrients, setSelectedNutrients] = useState<NutrientItem[]>(
    () => {
      if (rankQuery.data?.rankedNutrients) {
        return [...rankQuery.data.rankedNutrients];
      } else {
        return [];
      }
    }
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleSubmit() {
    changeRanking({
      nutrients: selectedNutrients.map((nutrient, index) => ({
        nutrientId: nutrient.id,
        rank: index + 1,
      })),
    }).then(() => {
      setCanSave(false);
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCanSave(true);
      setSelectedNutrients((nutrients) => {
        const oldIndex = nutrients.findIndex((item) => item.id === active.id);
        const newIndex = nutrients.findIndex((item) => item.id === over.id);

        return arrayMove(nutrients, oldIndex, newIndex);
      });
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Nutrient Ranking</CardTitle>
          <CardDescription>
            Pick the top 5 most important nutrients to you
          </CardDescription>
        </div>
        <NutrientPicker
          select={(nutrient) => {
            if (selectedNutrients.length < 5) {
              setCanSave(true);
              setSelectedNutrients([...selectedNutrients, nutrient]);
            }
          }}
          deselect={(nutrient) => {
            setSelectedNutrients(
              selectedNutrients.filter(
                (oldNutrient) => nutrient.id !== oldNutrient.id
              )
            );
            setCanSave(true);
          }}
          selectedIds={selectedNutrients.map((nutrient) => nutrient.id)}
          placeholder="Add a nutrient"
          multiselect={true}
        />
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            id="rank"
            items={selectedNutrients}
            strategy={verticalListSortingStrategy}
          >
            <ol className="flex flex-col gap-2 mb-6">
              {selectedNutrients.map((nutrient, index) => (
                <NutrientSortItem
                  key={nutrient.id}
                  id={nutrient.id}
                  name={nutrient.name}
                  index={index}
                />
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={!canSave} className="">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}

interface NutrientItemProps {
  name: string;
  id: string;
  index: number;
}

function NutrientSortItem({ id, name, index }: NutrientItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className="flex text-sm items-center gap-2 border rounded px-4 py-3 bg-white"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="h-4 w-4" />
      {`${index + 1}. ${name}`}
    </li>
  );
}
