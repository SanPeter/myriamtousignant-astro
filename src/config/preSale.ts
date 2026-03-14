interface PreSaleWindow {
  startsAt: string | null;
  endsAt: string | null;
}

interface PreSaleCard {
  title: string;
  lines: string[];
}

interface PreSaleEdition {
  id: string;
  name: string;
  badge?: string;
  summary: string;
  squareUrl: string;
  heroCtaLabel: string;
  stickyCtaLabel: string;
  cardCtaLabel: string;
  ariaLabel: string;
  toastMessage: string;
  card: PreSaleCard;
  featured?: boolean;
}

interface PreSaleCopy {
  stickyMessage: string;
  stickyTitle: string;
  stickyCloseLabel: string;
  title: string;
  subtitle: string;
  artistLine: string;
  availabilityLine: string;
  heroCtaIntro: string;
  detailsLinkLabel: string;
  editorialParagraphs: string[];
  sharedDetailsTitle: string;
  sharedDetailsLines: string[];
}

const copy: PreSaleCopy = {
  stickyMessage: 'Choisissez votre édition sur Square.',
  stickyTitle: 'Prévente en cours',
  stickyCloseLabel: 'Fermer le rappel prévente',
  title: 'Récit choral',
  subtitle: 'Tirage total limité à 150 exemplaires',
  artistLine: "Livre d'artiste de Myriam Tousignant",
  availabilityLine: 'Prévente exclusive — dès le 16 mars',
  heroCtaIntro: 'Précommander :',
  detailsLinkLabel: 'En savoir plus',
  editorialParagraphs: [
    "Récit choral est un livre d'artiste issu d'une recherche sur la mémoire, la filiation et la transformation des archives familiales en espace de réflexion partagée.",
    "Le lancement aura lieu en mai, en parallèle d'une exposition éphémère, présentée du 6 au 9 mai à l'Atrium du métro de Longueuil."
  ],
  sharedDetailsTitle: 'Informations de précommande',
  sharedDetailsLines: [
    'Dédicace personnalisée',
    'Récupération du 6 au 9 mai ou soirée de lancement',
    'Envoi postal disponible (15 $)',
    'Expéditions la semaine du 11 mai'
  ]
};

const startsAt = import.meta.env.PUBLIC_PREVENTE_START_AT ?? '2026-01-01T00:00:00.000Z';
const endsAt = import.meta.env.PUBLIC_PREVENTE_END_AT ?? '2026-12-31T23:59:59.999Z';
const defaultSquareUrl = import.meta.env.PUBLIC_PREVENTE_SQUARE_URL ?? 'https://square.link/u/zQCL95oQ';

const editions: PreSaleEdition[] = [
  {
    id: 'limited',
    name: 'Édition limitée',
    badge: '125 exemplaires',
    summary: 'Une édition accessible et soignée, pensée pour la prévente et la signature.',
    squareUrl: import.meta.env.PUBLIC_PREVENTE_SQUARE_URL_LIMITED ?? defaultSquareUrl,
    heroCtaLabel: 'Édition limitée',
    stickyCtaLabel: 'Édition limitée',
    cardCtaLabel: 'Précommander cette édition',
    ariaLabel: 'Précommander l’édition limitée de Récit choral sur Square, ouverture dans un nouvel onglet',
    toastMessage: 'Ouverture de Square pour l’édition limitée.',
    featured: true,
    card: {
      title: 'Édition limitée',
      lines: ['125 exemplaires sur le tirage total de 150']
    }
  },
  {
    id: 'luxe',
    name: 'Édition collectionneur',
    badge: '25 exemplaires',
    summary: 'Une version de collection en tirage plus restreint, pensée pour les collectionneurs.',
    squareUrl: import.meta.env.PUBLIC_PREVENTE_SQUARE_URL_LUXE ?? defaultSquareUrl,
    heroCtaLabel: 'Édition collectionneur',
    stickyCtaLabel: 'Édition collectionneur',
    cardCtaLabel: 'Précommander l’édition collectionneur',
    ariaLabel: 'Précommander l’édition collectionneur de Récit choral sur Square, ouverture dans un nouvel onglet',
    toastMessage: 'Ouverture de Square pour l’édition collectionneur.',
    card: {
      title: 'Édition collectionneur',
      lines: ['25 exemplaires sur le tirage total de 150', 'Numérotés et signés', 'Reproduction incluse']
    }
  }
];

export const PRE_SALE_CONFIG = {
  galleryImages: [
    '/images/prevente-recitchoral_01.jpg',
    '/images/prevente-recitchoral_02.jpg',
    '/images/prevente-recitchoral_03.jpg',
    '/images/prevente-recitchoral_04.jpg'
  ],
  window: {
    startsAt,
    endsAt
  } satisfies PreSaleWindow,
  copy,
  editions
};

function parseDate(dateValue: string | null): Date | null {
  if (!dateValue) {
    return null;
  }

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function isPreSaleVisible(windowConfig: PreSaleWindow, currentDate = new Date()): boolean {
  const start = parseDate(windowConfig.startsAt);
  const end = parseDate(windowConfig.endsAt);

  if (start && currentDate < start) {
    return false;
  }

  if (end && currentDate > end) {
    return false;
  }

  return true;
}
