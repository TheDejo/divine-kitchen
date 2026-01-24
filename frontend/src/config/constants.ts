const ENVIRONMENT = {
    development: process.env.NODE_ENV === 'development',
    production: process.env.NODE_ENV === 'production',
};

const BASE_URL = 'http://localhost:3001/api';

const API_URL = {
    recipes: `${BASE_URL}/recipes`,
    recipeById: `${BASE_URL}/recipes/%id%`,
}



export const constants = {
    API_URL,
    ENVIRONMENT,
}