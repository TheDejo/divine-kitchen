const ENVIRONMENT = {
    development: process.env.NODE_ENV === 'development',
    production: process.env.NODE_ENV === 'production',
};

const DATA = {
    recipe: 'data/recipes.json'
}

const ID_OFFSET = 1;
const ENCODING = 'utf8' as const;
const JSON_SPACING = 2;
const LAST_ITEM_INDEX_OFFSET = 1;

export const RECIPE_ROUTES = {
    BASE: 'recipes',
    ID_PARAM: 'id',
    BY_ID: ':id',
};


export const constants = {
    DATA,
    ENVIRONMENT,
    ENCODING,
    ID_OFFSET,
    JSON_SPACING,
    LAST_ITEM_INDEX_OFFSET,
    RECIPE_ROUTES
}