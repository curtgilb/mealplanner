import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MealPlan } from "@/contexts/MealPlanContext";
import { MealPlanServingsFieldFragment } from "@/gql/graphql";
import { DisplayMode } from "@/app/mealplans/[id]/page";
import { MealPlanServings } from "@/contexts/ServingsContext";
import { useContext, useMemo } from "react";
import { PlanMode } from "../controls/ModeDropdown";
import { CookingDay } from "./CookingDay";
import { PlanDayProps } from "./DayInterface";
import { MealPlanDay } from "./MealPlanDay";
import { NutritionDay } from "./NutritionDay";
import { ShoppingDay } from "./ShoppingDay";
import { useRecipeLabelLookup } from "@/hooks/use-recipe-label-lookup";

const courses = ["Breakfast", "Lunch", "Dinner", "Snacks"];

// Aggregate days by day, then by course
interface DayManagerProps {
  days: number;
  display: DisplayMode;
  planMode: PlanMode;
}

export type ServingsLookup = Map<
  number, // Day
  Map<string, MealPlanServingsFieldFragment[]> //Course, servings
>;

export function DayManager({ days, planMode }: DayManagerProps) {
  const week = Math.ceil(days / 7);
  const mealServings = useContext(MealPlanServings);
  const servingsByMeal = useMemo(() => {
    return mealServings?.reduce((acc, cur) => {
      const day = acc.get(cur.day);
      if (!day) {
        acc.set(cur.day, new Map<string, MealPlanServingsFieldFragment[]>());
      }
      let servings = acc.get(cur.day)?.get(cur.meal);

      if (!servings) {
        acc.get(cur.day)?.set(cur.meal, []);
      }

      servings = acc.get(cur.day)?.get(cur.meal);
      if (servings) {
        servings.push(cur);
      }
      return acc;
    }, new Map<number, Map<string, MealPlanServingsFieldFragment[]>>());
  }, [mealServings]);

  const dayTypes: Record<PlanMode, React.FC<PlanDayProps>> = {
    meal_planning: MealPlanDay,
    shopping: ShoppingDay,
    nutrition: NutritionDay,
    cooking: CookingDay,
  };
  const Day = dayTypes[planMode];

  return (
    <ScrollArea className="w-full">
      <div className="flex flex-row w-full gap-6">
        {[...Array(7)].map((item, index) => {
          const displayNumber = index + 1;
          const dayNumber = (week - 1) * 7 + displayNumber;
          return (
            <Day
              key={dayNumber}
              dayNumber={dayNumber}
              displayNumber={displayNumber}
              servingsByMeal={servingsByMeal}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
