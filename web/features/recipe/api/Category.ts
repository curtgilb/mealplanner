import { graphql } from "@/gql";

const getCategoriesQuery = graphql(`
  query getCategories($search: String) {
    categories(searchString: $search) {
      id
      name
    }
  }
`);

const createCategoryMutation = graphql(`
  mutation createCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`);

export { getCategoriesQuery, createCategoryMutation };
