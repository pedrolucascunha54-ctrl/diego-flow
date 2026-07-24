export const SITE = {
  name: "FLOW TATTOO",
  artist: "Diego Mesquita",
  tagline: "Sua história. Minha arte.",
  locality: "Brasil",
  description:
    "Estúdio especializado em tatuagem de realismo preto e cinza. Projetos exclusivos, técnica apurada e um processo conduzido do primeiro traço à cicatrização.",
  url: "https://flowtattoo.com.br",
  instagram: "https://www.instagram.com/diego.flowtattoo",
  address: "R. Comendador José Esteves, 785 - Centro, Lavras - MG, 37200-176",
  mapsUrl:
    "https://www.google.com/maps/place/Cond+do+Edif%C3%ADcio+Jo%C3%A3o+Batista+Ribeiro+-+R.+Comendador+Jos%C3%A9+Esteves,+785+-+Centro,+Lavras+-+MG,+37200-176/@-21.2411631,-44.9994724,17z/data=!3m1!4b1!4m6!3m5!1s0x9ffdf4d91cc151:0xe4b3d49457ed50bc!8m2!3d-21.2411681!4d-44.9968975!16s%2Fg%2F1ptyl30bb",
};

export type Specialty = {
  title: string;
  description: string;
};

export const SPECIALTIES: Specialty[] = [
  {
    title: "Realismo Preto e Cinza",
    description:
      "Retratos, figuras e composições com riqueza de detalhes e sombras realistas.",
  },
  {
    title: "Blackwork",
    description:
      "Cobertura intensa, padrões gráficos e contrastes marcantes.",
  },
  {
    title: "Fechamentos",
    description:
      "Cobertura total com acabamento uniforme, transformando histórias em novas possibilidades.",
  },
  {
    title: "Cover Up",
    description:
      "Transformamos o que já não te representa em arte que conta uma nova história.",
  },
  {
    title: "Projetos Exclusivos",
    description:
      "Artes autorais criadas para você, de forma única e personalizada.",
  },
  {
    title: "Arte Sacra",
    description:
      "Fé, devoção e espiritualidade eternizadas em traços realistas e imponentes.",
  },
  {
    title: "Mitologia",
    description:
      "Deuses, heróis e criaturas lendárias em composições épicas e detalhadas.",
  },
  {
    title: "Anime Realista",
    description:
      "Personagens marcantes com realismo, profundidade e fidelidade impressionante.",
  },
];

// each reel is one of the client's Flow-generated preview clips — the
// number/icon/title/description are already burned into the footage, so
// the site just plays it full-bleed instead of overlaying its own text
export type SpecialtyReel = {
  video: string;
  poster: string;
  covers: string[];
};

export const SPECIALTY_REELS: SpecialtyReel[] = [
  {
    video: "/video/specialties/reel-01.mp4",
    poster: "/posters/specialties/reel-01.jpg",
    covers: [SPECIALTIES[0].title],
  },
  {
    video: "/video/specialties/reel-02.mp4",
    poster: "/posters/specialties/reel-02.jpg",
    covers: [SPECIALTIES[1].title, SPECIALTIES[2].title],
  },
  {
    video: "/video/specialties/reel-03.mp4",
    poster: "/posters/specialties/reel-03.jpg",
    covers: [SPECIALTIES[3].title, SPECIALTIES[4].title],
  },
  {
    video: "/video/specialties/reel-04.mp4",
    poster: "/posters/specialties/reel-04.jpg",
    covers: [SPECIALTIES[5].title, SPECIALTIES[6].title, SPECIALTIES[7].title],
  },
];

export type PortfolioItem = {
  slug: string;
  title: string;
  category: string;
  index: string;
  image: string;
  beforeImage?: string;
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "grito-ancestral",
    title: "Grito Ancestral",
    category: "Realismo Preto e Cinza",
    index: "01",
    image: "/images/portfolio/grito-ancestral.webp",
  },
  {
    slug: "arcanjo-miguel",
    title: "Coroa de Espinhos",
    category: "Mitologia & Arte Sacra",
    index: "02",
    image: "/images/portfolio/arcanjo-miguel.webp",
  },
  {
    slug: "justica-interior",
    title: "Justiça Interior",
    category: "Projeto Exclusivo",
    index: "03",
    image: "/images/portfolio/justica-interior.webp",
  },
  {
    slug: "retrato-urbano",
    title: "Retrato Urbano",
    category: "Realismo Preto e Cinza",
    index: "04",
    image: "/images/portfolio/retrato-urbano.webp",
  },
  {
    slug: "alem-da-orbita",
    title: "Além da Órbita",
    category: "Realismo Cósmico",
    index: "05",
    image: "/images/portfolio/alem-da-orbita.webp",
  },
  {
    slug: "atras-da-mascara",
    title: "Atrás da Máscara",
    category: "Realismo Preto e Cinza",
    index: "06",
    image: "/images/portfolio/atras-da-mascara.webp",
  },
  {
    slug: "retrato-selvagem",
    title: "Retrato Selvagem",
    category: "Realismo Preto e Cinza",
    index: "07",
    image: "/images/portfolio/retrato-selvagem.webp",
  },
  {
    slug: "medusa",
    title: "Medusa",
    category: "Mitologia",
    index: "08",
    image: "/images/portfolio/medusa.webp",
  },
  {
    slug: "riso-sombrio",
    title: "Riso Sombrio",
    category: "Realismo Preto e Cinza",
    index: "09",
    image: "/images/portfolio/riso-sombrio.webp",
  },
];
