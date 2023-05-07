# Lexsitus v2 front-end

This project is created using vite. With easy-peasy as the store, react-router-dom for client side routing, Yup for form validation, formik for form state management, tailwind and sass for styling, axios for data fetching.

To run the project, cd into the project folder in your terminal and run
`yarn dev` to view the dev version on local.

To build, run `yarn build`.

## Project structure

* Models/&lt;model-name&gt;/* contains the files related to each entity. Mostly this will have an index.ts file with all the requests and a @types.ts file with all the TS type declarations. It might also contain a utils.ts file for utility functions while working with the entity and a parsers.ts file for parsing the data before data send and after data fetch if required.

* Screens/* contains the Page level elements. The top level exports from sub folders of the Screens folder will be mapped to routes in AppNavigation Eg.: Screens/Main/index.tsx is mapped to route '/' in AppNavigation.

* Stores/* contains the easy peasy stores for each entity/page/feature as required. All stores are combined into a giant `RootStore` in Stores/index.ts for easy access and usage.

* Hooks/* contains all the app level hooks i.e., hooks not meant for a specific feature in one or two locations but ones that can be used anywhere in the app.

* Components/* contains simple/dumb components that do no side effects and very little additional logic other than displaying data based on props.

* Features/* _will_ contain all larger components that may or may not have business features and may or may not use the store. These will use dumb components and will perform a larger role.

* Contexts/* _will_ contain all App level contexts. Eg.: dialog context, toast/snackbar context, etc.

> Note: Contexts and Features folders have not been created in the template and will need to be created as required.
