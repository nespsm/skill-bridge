export const CATEGORY_STYLE_MAP: Record<string, { iconClass: string; cardClass: string }> = {
  CONSTRUCTION: {
    iconClass: 'icon-mask icon-xl icon-mechanic',
    cardClass: 'card-color-red-gd'
  },

  MACHINE: {
    iconClass: 'icon-mask icon-xl icon-driver',
    cardClass: 'card-color-blue-gd'
  },

  SAFETY: {
    iconClass: 'icon-mask icon-xl icon-guard',
    cardClass: 'card-color-green-gd'
  },

  SOFT: {
    iconClass: 'icon-mask icon-xl icon-painter',
    cardClass: 'card-color-gold-gd'
  },

  TECHNICAL_SUPPORT: {
    iconClass: 'icon-mask icon-xl icon-electrician',
    cardClass: 'card-color-voilet-gd'
  },

  TRADE: {
    iconClass: 'icon-mask icon-xl icon-mechanic',
    cardClass: 'card-color-orange-gd'
  }
};

export const FALLBACK_ICONS = [
  'icon-mask icon-xl icon-mechanic',
  'icon-mask icon-xl icon-electrician',
  'icon-mask icon-xl icon-painter',
  'icon-mask icon-xl icon-driver',
  'icon-mask icon-xl icon-guard'
];

export const FALLBACK_CARDS = [
  'card-color-red-gd',
  'card-color-blue-gd',
  'card-color-green-gd',
  'card-color-gold-gd',
  'card-color-orange-gd',
  'card-color-voilet-gd'
];