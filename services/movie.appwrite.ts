import { environment } from "@/env/environment";
import { Client, Databases, ID, Query } from "react-native-appwrite";
import { APPWRITE_CONFIG } from "./api.config";

const DATABASE_ID = APPWRITE_CONFIG.DATABASE_ID!;
const COLLECTION_ID = APPWRITE_CONFIG.COLLECTION_ID!;

const client = new Client()
  .setEndpoint(APPWRITE_CONFIG.APPWRITE_URL)
  .setProject(APPWRITE_CONFIG.PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, media: MediaItem) => {
  try {
    // Normalize media type and title
    const media_type = media.media_type ?? (("title" in media) ? "movie" : "tv");
    const title = media_type === "movie" ? (media as Movie).title : (media as TVShow).name;

    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
      Query.equal("media_id", media.id),
    ]);

    if (result.documents.length > 0) {
      const existingMedia = result.documents[0];
      const currentCount = typeof existingMedia.count === "number" ? existingMedia.count : 0;

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMedia.$id,
        {
          count: currentCount + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        media_id: media.id,
        media_type,
        title,
        count: 1,
        poster_url: `${environment.POSTER_URL}${media.poster_path}`,
      });

      console.log('success')
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};


export const getTrendingMovies = async (): Promise<TrendingMedia[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMedia[];
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return undefined;
  }
};