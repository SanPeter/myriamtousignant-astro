import { z } from 'astro:content';

// Ce fichier facilite la validation de type pour les collections
export type { CollectionEntry } from 'astro:content';

// Schéma pour les entrées image
export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional()
});

// Définir des interfaces directement au lieu d'utiliser z.infer
export interface ProjectsSchema {
  title: string;
  date?: Date;
  draft?: boolean;
  weight?: number;
  description?: string;
  featured?: boolean;
  summaryImage?: string;
  listImage?: string;
  projectImages?: string[];
}

export interface ArtPublicSchema extends ProjectsSchema {}

export interface ExpositionsSchema extends ProjectsSchema {
  location?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface LivresArtisteSchema extends ProjectsSchema {}

export interface MediatiionsSchema extends ProjectsSchema {}

export interface BiographieSchema {
  title: string;
  date?: Date;
  draft?: boolean;
  weight?: number;
  description?: string;
  featured?: boolean;
  heroImage?: string;
}

export interface BoutiqueSchema {
  title: string;
  date?: Date;
  draft?: boolean;
  weight?: number;
  description?: string;
  featured?: boolean;
  price?: number;
  available?: boolean;
}

export interface PresseSchema {
  title: string;
  date?: Date;
  draft?: boolean;
  weight?: number;
  description?: string;
  featured?: boolean;
}

export interface PublicationSchema {
  title: string;
  date?: Date;
  draft?: boolean;
  weight?: number;
  description?: string;
  featured?: boolean;
  summary?: string;
  publicationDate?: string;
}
