export type PreSaleLocale = 'fr' | 'en';

interface PreSaleWindow {
  startsAt: string | null;
  endsAt: string | null;
}

interface PreSaleCard {
  title: string;
  lines: string[];
}

interface PreSaleBottomCtas {
  primaryLabel: string;
  primaryAriaLabel: string;
  secondaryLabel: string;
  secondaryAriaLabel: string;
}

interface PreSaleCopy {
  stickyMessage: string;
  stickyCloseLabel: string;
  title: string;
  subtitle: string;
  artistLine: string;
  availabilityLine: string;
  heroCtaLabel: string;
  heroCtaAriaLabel: string;
  detailsLinkLabel: string;
  editorialParagraphs: string[];
  limitedEditionCard: PreSaleCard;
  luxeEditionCard: PreSaleCard;
  bottomCtas: PreSaleBottomCtas;
}

const copy: Record<PreSaleLocale, PreSaleCopy> = {
  fr: {
    stickyMessage: 'Prévente en cours — Récit choral',
    stickyCloseLabel: 'Fermer le rappel prévente',
    title: 'Récit choral',
    subtitle: 'Édition limitée — 150 exemplaires',
    artistLine: "Livre d'artiste de Myriam Tousignant",
    availabilityLine: 'Prévente exclusive — dès le 16 mars',
    heroCtaLabel: 'Précommander',
    heroCtaAriaLabel: 'Précommander Récit choral sur Square, ouverture dans un nouvel onglet',
    detailsLinkLabel: 'En savoir plus',
    editorialParagraphs: [
      "Récit choral est un livre d'artiste issu d'une recherche sur la mémoire, la filiation et la transformation des archives familiales en espace de réflexion partagée.",
      "Le lancement aura lieu en mai, en parallèle d'une exposition éphémère présentée du 6 au 9 mai à l'Atrium du métro de Longueuil."
    ],
    limitedEditionCard: {
      title: 'Édition limitée à 150 exemplaires',
      lines: [
        'Dédicace personnalisée',
        'Récupération du 6 au 9 mai ou soirée de lancement',
        'Envoi postal disponible (15 $)',
        'Expéditions la semaine du 11 mai'
      ]
    },
    luxeEditionCard: {
      title: 'Édition luxe',
      lines: ['25 exemplaires', 'Numérotés et signés', 'Reproduction incluse']
    },
    bottomCtas: {
      primaryLabel: 'Précommander',
      primaryAriaLabel: 'Précommander Récit choral sur Square, ouverture dans un nouvel onglet',
      secondaryLabel: 'Réserver mon exemplaire',
      secondaryAriaLabel: 'Réserver mon exemplaire sur Square, ouverture dans un nouvel onglet'
    }
  },
  en: {
    stickyMessage: 'Pre-sale live — Choral narrative',
    stickyCloseLabel: 'Close pre-sale reminder',
    title: 'Choral narrative',
    subtitle: 'Limited edition — 150 copies',
    artistLine: "Artist book by Myriam Tousignant",
    availabilityLine: 'Exclusive pre-sale — starting March 16',
    heroCtaLabel: 'Pre-order',
    heroCtaAriaLabel: 'Pre-order Choral narrative on Square, opens in a new tab',
    detailsLinkLabel: 'Learn more',
    editorialParagraphs: [
      'Choral narrative is an artist book born from research on memory, lineage, and the transformation of family archives into a shared reflective space.',
      'The launch will take place in May, alongside a temporary exhibition presented from May 6 to May 9 at the Atrium du metro de Longueuil.'
    ],
    limitedEditionCard: {
      title: 'Limited edition of 150 copies',
      lines: [
        'Personalized dedication',
        'Pickup from May 6 to May 9 or at the launch event',
        'Postal delivery available ($15)',
        'Shipments during the week of May 11'
      ]
    },
    luxeEditionCard: {
      title: 'Deluxe edition',
      lines: ['25 copies', 'Numbered and signed', 'Print reproduction included']
    },
    bottomCtas: {
      primaryLabel: 'Pre-order',
      primaryAriaLabel: 'Pre-order Choral narrative on Square, opens in a new tab',
      secondaryLabel: 'Reserve my copy',
      secondaryAriaLabel: 'Reserve my copy on Square, opens in a new tab'
    }
  }
};

const startsAt = import.meta.env.PUBLIC_PREVENTE_START_AT ?? '2026-01-01T00:00:00.000Z';
const endsAt = import.meta.env.PUBLIC_PREVENTE_END_AT ?? '2026-12-31T23:59:59.999Z';

export const PRE_SALE_CONFIG = {
  squareUrl:
    import.meta.env.PUBLIC_PREVENTE_SQUARE_URL ??
    'https://square.link/u/prevente-option-achat',
  backgroundImageUrl:
    import.meta.env.PUBLIC_PREVENTE_BG_IMAGE ??
    '/images/recit-choral-image.png',
  window: {
    startsAt,
    endsAt
  } satisfies PreSaleWindow,
  copy
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
