export const RoutesPaths = {
  root: '',
  offers: 'offers',
  offerDetail: 'offers/:id',
  offersLink: ['/', 'offers'] as const,
  offerById: (id: string) => ['/', 'offers', id] as const,
} as const;
