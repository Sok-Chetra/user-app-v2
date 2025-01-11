import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "https://home-kong.hasura.app/v1/graphql",
    documents: ["app/**/*.tsx", "gql/*.graphql"],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        "./generated/graphql.ts": {
            // preset: "client",
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],

        },
    },
};

export default config;
