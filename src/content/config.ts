import { defineCollection, z } from 'astro:content';

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
export const collections = {
  'projets': defineCollection({
    schema: projectSchema
  }),
  'art-public': defineCollection({
    schema: projectSchema
  }),
  'expositions': defineCollection({
    schema: projectSchema.extend({
      location: z.string().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    })
  }),
  'livres-artiste': defineCollection({
    schema: projectSchema
  }),
  'mediations': defineCollection({
    schema: projectSchema
  }),
  'biographie-demarche': defineCollection({
    schema: biographieSchema
  }),
  'boutique': defineCollection({
    schema: baseSchema.extend({
      price: z.number().optional(),
      available: z.boolean().optional().default(true),
    })
  }),
  'presse': defineCollection({
    schema: baseSchema
  }),
  'publications': defineCollection({
    schema: publicationSchema
  })
};
