import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schéma de base commun à plusieurs collections
const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date().optional(),
  draft: z.boolean().optional().default(false),
  weight: z.number().optional(),
  description: z.string().optional(),
  featured: z.boolean().optional().default(false)
});

// Schéma pour les collections qui ont des images (projets, art-public, expositions, etc.)
const projectSchema = baseSchema.extend({
  summaryImage: z.string().optional(),
  listImage: z.string().optional(),
  projectImages: z.array(z.string()).optional()
});

// Schéma spécifique pour la biographie
const biographieSchema = baseSchema.extend({
  heroImage: z.string().optional()
});

// Schéma pour les publications
const publicationSchema = baseSchema.extend({
  summary: z.string().optional(),
  publicationDate: z.string().optional()
});

// Définition des collections
const projets = defineCollection({
  type: 'content',
  schema: projectSchema
});

const artPublic = defineCollection({
  type: 'content',
  schema: projectSchema
});

const expositions = defineCollection({
  type: 'content',
  schema: projectSchema.extend({
    location: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  })
});

const livresArtiste = defineCollection({
  type: 'content',
  schema: projectSchema
});

const mediations = defineCollection({
  type: 'content',
  schema: projectSchema
});

const biographieDemarche = defineCollection({
  type: 'content',
  schema: biographieSchema
});

const boutique = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    price: z.number().optional(),
    available: z.boolean().optional().default(true),
  })
});

const presse = defineCollection({
  type: 'content',
  schema: baseSchema
});

const publications = defineCollection({
  type: 'content',
  schema: publicationSchema
});

// Exporter les collections
export const collections = {
  'projets': projets,
  'art-public': artPublic,
  'expositions': expositions,
  'livres-artiste': livresArtiste,
  'mediations': mediations,
  'biographie-demarche': biographieDemarche,
  'boutique': boutique,
  'presse': presse,
  'publications': publications,
};
