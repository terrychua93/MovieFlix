import { environment } from "@/env/environment"

export const TMDB_CONFIG ={
    BASE_URL: environment.BASE_URL,
    API_KEY: environment.API_KEY_MOVIE,
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${environment.API_KEY_MOVIE}`
    }
}

export const APPWRITE_CONFIG={
    DATABASE_ID: environment.APPWRITE_DATABASE_ID,
    METRICS_ID: environment.APPWRITE_METRICS_ID,
    BOOKMARKS_ID: environment.APPWRITE_BOOKMARKS_ID,
    PROJECT_ID: environment.APPWRITE_PROJECT_ID,
    APPWRITE_URL: environment.APPWRITE_URL
}