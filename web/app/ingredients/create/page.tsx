import SingleColumnCentered from "@/components/layouts/single-column-centered";
import { EditIngredient } from "@/features/ingredient/components/EditIngredient";

export default function CreateIngredientPage() {
  return (
    <SingleColumnCentered>
      <EditIngredient />
    </SingleColumnCentered>
  );
}
