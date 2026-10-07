export interface Photo {
  id: number;
  url: string;
  urlHD: string;
  alt: string;
  title: string;
  subtitle: string;
  category: 'All' | 'Formal' | 'Casual' | 'Traditional' | 'Studio';
  tag?: string;
  aspect?: string;
}

export const photos: Photo[] = [
  {
    id: 1,
    url: '/sixth.png',
    urlHD: '/sixth.png',
    alt: 'Shah Hussain - Executive Portrait',
    title: 'Executive Portrait',
    subtitle: 'Studio Formal & Tailored',
    category: 'Formal',
    tag: 'Primary Portrait',
  },
  {
    id: 2,
    url: '/second.jpeg',
    urlHD: '/second.jpeg',
    alt: 'Shah Hussain - Casual Portrait',
    title: 'Warm & Composed',
    subtitle: 'Natural Light Portrait',
    category: 'Casual',
    tag: 'Casual',
  },
  {
    id: 3,
    url: '/third.jpeg',
    urlHD: '/third.jpeg',
    alt: 'Shah Hussain - Outdoor Portrait',
    title: 'Golden Hour Serenity',
    subtitle: 'Outdoor Ambience',
    category: 'Casual',
    tag: 'Outdoor',
  },
  {
    id: 4,
    url: '/fourth.jpeg',
    urlHD: '/fourth.jpeg',
    alt: 'Shah Hussain - Classic Formal Suit',
    title: 'Classic Formal',
    subtitle: 'Black Tie Elegance',
    category: 'Formal',
    tag: 'Formal',
  },
  {
    id: 5,
    url: '/fifth.jpeg',
    urlHD: '/fifth.jpeg',
    alt: 'Shah Hussain - Studio Mood',
    title: 'Studio Mood',
    subtitle: 'Clean Aesthetic Lighting',
    category: 'Studio',
    tag: 'Studio',
  },
  {
    id: 6,
    url: '/first.jpeg',
    urlHD: '/first.jpeg',
    alt: 'Shah Hussain - High Definition Profile',
    title: 'Clarity & Poise',
    subtitle: 'High Definition Profile',
    category: 'Studio',
    tag: 'HD Profile',
  },
  {
    id: 7,
    url: '/arabic-look.jpeg',
    urlHD: '/arabic-look.jpeg',
    alt: 'Shah Hussain - Traditional Arabic Attire',
    title: 'Traditional Grace',
    subtitle: 'Heritage & Traditional Attire',
    category: 'Traditional',
    tag: 'Traditional',
  },
  {
    id: 8,
    url: '/casual.jpeg',
    urlHD: '/casual.jpeg',
    alt: 'Shah Hussain - Casual Look',
    title: 'Casual Composure',
    subtitle: 'Natural & Relaxed Everyday',
    category: 'Casual',
    tag: 'Casual',
  },
  {
    id: 9,
    url: '/eid.jpeg',
    urlHD: '/eid.jpeg',
    alt: 'Shah Hussain - Festive Eid Occasion',
    title: 'Festive Occasion',
    subtitle: 'Eid & Celebration Moments',
    category: 'Traditional',
    tag: 'Festive',
  },
  {
    id: 10,
    url: '/formals.jpeg',
    urlHD: '/formals.jpeg',
    alt: 'Shah Hussain - Formal Attire',
    title: 'Formal Stature',
    subtitle: 'Elegance & Refinement',
    category: 'Formal',
    tag: 'Formal',
  },
  {
    id: 11,
    url: '/kurta.jpeg',
    urlHD: '/kurta.jpeg',
    alt: 'Shah Hussain - Traditional Kurta',
    title: 'Traditional Kurta',
    subtitle: 'Classic Ethnic Attire',
    category: 'Traditional',
    tag: 'Ethnic',
  },
  {
    id: 12,
    url: '/kurta-2.jpeg',
    urlHD: '/kurta-2.jpeg',
    alt: 'Shah Hussain - Ethnic Attire',
    title: 'Heritage Charm',
    subtitle: 'Cultural & Traditional Grace',
    category: 'Traditional',
    tag: 'Traditional',
  },
];
