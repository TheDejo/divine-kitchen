

const DATA = {
    recipe: 'data/recipes.json'
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
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
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    ID_OFFSET,
    ENCODING,
    JSON_SPACING,
    LAST_ITEM_INDEX_OFFSET,
    RECIPE_ROUTES
}