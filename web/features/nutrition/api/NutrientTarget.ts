import { graphql } from "@/gql";

export const setNutritionTarget = graphql(`
  mutation setNutrientTarget($target: NutrientTargetInput!) {
    setNutritionTarget(target: $target) {
      id
      target {
        id
        nutrientTarget
        preference
        threshold
      }
    }
  }
`);

export const getMacroNumbers = graphql(`
  query getMacroNumbers {
    macroTargets {
      alcohol
      calories
      carbs
      fat
      protein
    }
  }
`);

export const setMacroTarget = graphql(
  `
    mutation setMacroTargets($input: EditMacroTargetsInput!) {
      editMacroTargets(targets: $input) {
        id
        nutrientTarget
        preference
        threshold
      }
    }
  `
);
