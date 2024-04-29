"use client";
import CuisineFilter from "./CuisineFIlter";
import CategoryFilter from "./CategoryFilter";
import CourseFilter from "./CourseFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NumericalFilter from "./NumericalFilter";
import { useState } from "react";
import { NumericalComparison } from "@/gql/graphql";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputWithIcon } from "../ui/InputWithIcon";
import { Search } from "lucide-react";

export default function RecipeFilter() {
  const [servings, setServings] = useState<NumericalComparison>();

  return (
    <div>
      <Tabs defaultValue="recipe" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="recipe" className="w-full">
            Recipes
          </TabsTrigger>
          <TabsTrigger value="filter" className="w-full">
            Filter
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recipe">
          <InputWithIcon className="mt-8 mb-12" startIcon={Search} />
        </TabsContent>
        <TabsContent value="filter">
          <Accordion type="single" collapsible>
            <AccordionItem value="recipe">
              <AccordionTrigger>Recipe</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  <NumericalFilter
                    id="servings"
                    name="Number of Servings"
                    setState={setServings}
                  />
                  <NumericalFilter
                    id="prepTime"
                    name="Preparation Time"
                    setState={setServings}
                  />
                  <NumericalFilter
                    id="cookTime"
                    name="Cooking Time"
                    setState={setServings}
                  />
                  <NumericalFilter
                    id="servings"
                    name="Marinade Time"
                    setState={setServings}
                  />
                  <NumericalFilter
                    id="totalTime"
                    name="Total Time"
                    setState={setServings}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="courses">
              <AccordionTrigger>Servings</AccordionTrigger>
              <AccordionContent>
                <CourseFilter />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cuisines">
              <AccordionTrigger>Cuisine</AccordionTrigger>
              <AccordionContent>
                <CuisineFilter />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="category">
              <AccordionTrigger>Category</AccordionTrigger>
              <AccordionContent>
                <CategoryFilter />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
