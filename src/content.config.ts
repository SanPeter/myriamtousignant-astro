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
  title: z.string(),
  description: z.string().optional(),
  heroImage: z.string().optional()
});

// Schéma pour les publications
const publicationSchema = baseSchema.extend({
  summary: z.string().optional(),
  publicationDate: z.string().optional()
});

// Définition des collections
const projets = defineCollection({
  schema: projectSchema,
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/projets'
  })
});

const artPublic = defineCollection({
  schema: projectSchema,
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/art-public'
  })
});

const expositions = defineCollection({
  schema: projectSchema.extend({
    location: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
  }),
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/expositions'
  })
});

const livresArtiste = defineCollection({
  schema: projectSchema,
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/livres-artiste'
  })
});

const mediations = defineCollection({
  schema: projectSchema,
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/mediations'
  })
});



const boutique = defineCollection({
  schema: baseSchema.extend({
    price: z.number().optional(),
    available: z.boolean().optional().default(true),
  }),
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/boutique'
  })
});

const presse = defineCollection({
  schema: baseSchema,
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/presse'
  })
});

const publications = defineCollection({
  schema: publicationSchema,
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/publications'
  })
});

const biographieDemarche = defineCollection({
  schema: biographieSchema,
   loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/biographie-demarche'
  }) 
});


// Exporter toutes les collections
export const collections = {
  'projets': projets,
  'art-public': artPublic,
  'expositions': expositions,
  'livres-artiste': livresArtiste,
  'mediations': mediations,
  'biographie-demarche': biographieDemarche,
  'boutique': boutique,
  'presse': presse,
  'publications': publications
};
