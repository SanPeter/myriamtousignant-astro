export type PreSaleLocale = 'fr' | 'en';

interface PreSaleCopy {
  badge: string;
  title: string;
  description: string;
  termsHeading: string;
  terms: string[];
  limitedEditionHeading: string;
  limitedEditionDetails: string;
  ctaLabel: string;
  ctaAriaLabel: string;
}

interface PreSaleWindow {
  startsAt: string | null;
  endsAt: string | null;
}

const copy: Record<PreSaleLocale, PreSaleCopy> = {
  fr: {
    badge: 'Prévente',
    title: 'Récit choral | Option d\'achat',
    description:
      'Réservez votre exemplaire de l\'édition limitée et soutenez la production du projet en cours.',
    termsHeading: 'Modalités clés',
    terms: [
      'Prévente en ligne via Square',
      'Paiement sécurisé, confirmation immédiate',
      'Expédition ou remise locale selon les options offertes à la commande'
    ],
    limitedEditionHeading: 'Édition limitée',
    limitedEditionDetails:
      'Tirage limité avec accompagnement éditorial de l\'artiste. Les quantités disponibles sont restreintes.',
    ctaLabel: 'Acheter sur Square',
    ctaAriaLabel: 'Ouvrir la page de prévente Square dans un nouvel onglet'
  },
  en: {
    badge: 'Pre-sale',
    title: 'Choral narrative | Purchase option',
    description:
      'Reserve your limited edition copy and support the ongoing production of the project.',
    termsHeading: 'Key terms',
    terms: [
      'Online pre-sale via Square',
      'Secure checkout with immediate confirmation',
      'Shipping or local pickup based on available checkout options'
    ],
    limitedEditionHeading: 'Limited edition',
    limitedEditionDetails:
      'Limited print run with artist editorial support. Available quantities are restricted.',
    ctaLabel: 'Buy on Square',
    ctaAriaLabel: 'Open the Square pre-sale page in a new tab'
  }
};

const startsAt = import.meta.env.PUBLIC_PREVENTE_START_AT ?? '2026-01-01T00:00:00.000Z';
const endsAt = import.meta.env.PUBLIC_PREVENTE_END_AT ?? '2026-12-31T23:59:59.999Z';

export const PRE_SALE_CONFIG = {
  squareUrl:
    import.meta.env.PUBLIC_PREVENTE_SQUARE_URL ??
    'https://square.link/u/prevente-option-achat',
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
