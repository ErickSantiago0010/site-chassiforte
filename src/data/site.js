export const WA_BH =
  "https://wa.me/553136562538?text=Ol%C3%A1%2C%20quero%20um%20or%C3%A7amento%20da%20Chassi%20Forte";
export const WA_BH_BASE = "https://wa.me/553136562538";
export const WA_CE = "https://wa.me/558532957268";
export const WORK_WITH_US =
  "https://wa.me/553136562538?text=Ol%C3%A1%2C%20quero%20trabalhar%20na%20Chassi%20Forte";

export const CONTACT = {
  phoneDisplay: "(31) 3656-2538",
  phoneHref: "tel:+553136562538",
  email: "chassiforte@hotmail.com",
  emailHref: "mailto:chassiforte@hotmail.com",
  street: "R. Padre Pedro Pinto, 2065",
  district: "Venda Nova, Belo Horizonte - MG",
  cep: "CEP 31615-310",
  cnpj: "CNPJ 30.970.804/0001-84",
  address: "R. Padre Pedro Pinto, 2065 — Venda Nova, BH",
  mapsHref:
    "https://maps.google.com/?q=R.+Padre+Pedro+Pinto,+2065+-+Venda+Nova,+Belo+Horizonte+-+MG",
  hours: "Seg a sex: 8h–18h · Sáb: 8h–12h",
};

export const NAV_LINKS = [
  { href: "/#resultados", label: "Resultados", hash: true, section: "resultados" },
  { href: "/#servicos", label: "Serviços", hash: true, section: "servicos" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/#faq", label: "FAQ", hash: true, section: "faq" },
  { href: "/blog", label: "Blog" },
  { href: "/#contato", label: "Contato", hash: true, section: "contato" },
];

export const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com/1816645938445775",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/chassiforte",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@chassiforte",
    icon: "tiktok",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@chassiforte",
    icon: "youtube",
  },
];

const icon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;

export const BRANDS_TOP = [
  { name: "Volvo", src: icon("volvo") },
  { name: "Citroën", src: icon("citroen") },
  { name: "BMW", src: icon("bmw") },
  { name: "Suzuki", src: icon("suzuki") },
  { name: "Mini", src: icon("mini") },
  { name: "Mercedes", src: icon("mercedes"), alt: "Mercedes-Benz" },
  { name: "Porsche", src: icon("porsche") },
  { name: "Land Rover", src: icon("landrover") },
  { name: "Jaguar", src: icon("jaguar") },
  { name: "Kia", src: icon("kia") },
  { name: "Peugeot", src: icon("peugeot") },
  { name: "Nissan", src: icon("nissan") },
  { name: "Honda", src: icon("honda") },
];

export const BRANDS_BOTTOM = [
  { name: "Volkswagen", src: icon("volkswagen") },
  { name: "Renault", src: icon("renault") },
  { name: "Toyota", src: icon("toyota") },
  { name: "Hyundai", src: icon("hyundai") },
  { name: "GMC", src: "/assets/images/brands/gmc.svg" },
  { name: "Cadillac", src: icon("cadillac") },
  { name: "Chrysler", src: icon("chrysler") },
  { name: "Ram", src: icon("ram") },
  { name: "Jeep", src: icon("jeep") },
  { name: "Mitsubishi", src: icon("mitsubishi") },
  { name: "Ford", src: icon("ford") },
];

export const COMPARE_ITEMS = [
  {
    after: "/assets/images/depois-1.webp",
    before: "/assets/images/antes-1.webp",
    afterAlt: "Veículo após correção estrutural",
    beforeAlt: "Veículo antes da correção",
  },
  {
    after: "/assets/images/depois-2.webp",
    before: "/assets/images/antes-2.webp",
    afterAlt: "Painel estrutural após reparo",
    beforeAlt: "Painel estrutural danificado",
  },
  {
    after: "/assets/images/depois-3.webp",
    before: "/assets/images/antes-3.webp",
    afterAlt: "Longarina alinhada após serviço",
    beforeAlt: "Longarina desalinhada",
  },
];

export const SERVICES = [
  {
    title: "Alinhamento técnico de chassi",
    text: "Buracos e batidas deformam a estrutura e impedem o alinhamento correto. Corrigimos os desvios com solda MIG, restabelecemos a geometria original e emitimos laudo técnico.",
    image: "/assets/images/servico-chassi.webp",
    alt: "Equipamento de alinhamento técnico de chassi",
  },
  {
    title: "Correção de eixo traseiro",
    text: "Reposicionamento do eixo traseiro ao padrão de fábrica, eliminando puxadas e desgaste irregular dos pneus.",
    image: "/assets/images/servico-eixo.webp",
    alt: "Correção de eixo traseiro",
    reverse: true,
  },
  {
    title: "Cambagem e caster",
    text: "Quando o carro “não dá alinhamento”, corrigimos os ângulos de cambagem e cáster com precisão — sem adaptações agressivas — recuperando estabilidade e dirigibilidade.",
    image: "/assets/images/servico-camber.webp",
    alt: "Ajuste de cambagem e caster",
  },
  {
    title: "Solda MIG com precisão",
    text: "De pequenas correções a intervenções estruturais complexas: acabamento limpo, alta resistência mecânica e menor deformação das peças, respeitando as características originais do veículo.",
    image: "/assets/images/servico-solda.webp",
    alt: "Solda MIG em estrutura veicular",
    reverse: true,
  },
  {
    title: "Alinhamento de longarina",
    text: "Recuperação de longarinas torcidas ou deslocadas por colisão ou uso. Quando necessário, aplicamos reforço interno sem comprometer a originalidade estrutural.",
    image: "/assets/images/servico-longarina.webp",
    alt: "Alinhamento e reforço de longarina",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Empresa honesta. Recuperei a estrutura do meu Fiat Uno que não pegava alinhamento. Agora consigo fazer certinho.",
    author: "Marcos Almeida",
    rating: 5,
    time: "há 3 meses",
    avatar: "#EA4335",
  },
  {
    quote: "Atendimento top, com eficiência e rapidez na entrega do veículo.",
    author: "Daniel Levita",
    rating: 5,
    time: "há 1 mês",
    avatar: "#4285F4",
  },
  {
    quote: "Serviço muito bem executado, com rapidez e segurança. Recomendo.",
    author: "Everaldo Corgosinho",
    rating: 5,
    time: "há 2 semanas",
    avatar: "#34A853",
  },
  {
    quote: "Bom atendimento e serviço bem feito, com honestidade.",
    author: "José Carlos",
    rating: 5,
    time: "há 5 meses",
    avatar: "#FBBC05",
  },
  {
    quote: "Avaliaram tudo, tiraram minhas dúvidas sem cobrar nada. Equipe dedicada.",
    author: "Fernanda Ribeiro",
    rating: 5,
    time: "há 4 meses",
    avatar: "#9C27B0",
  },
  {
    quote: "Super indico: atendimento de primeira e serviço de qualidade.",
    author: "Rayanne Rocha",
    rating: 5,
    time: "há 6 semanas",
    avatar: "#00ACC1",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Como sei se meu chassi está torto?",
    answer:
      "Sinais comuns: carro puxando para um lado, volante torto em linha reta, desgaste irregular de pneus ou alinhamento que “não segura”. Na avaliação medimos a geometria e confirmamos com laudo.",
  },
  {
    question: "O alinhamento normal resolve o problema de chassi?",
    answer:
      "Não. O alinhamento convencional ajusta os ângulos das rodas, mas não corrige desvios estruturais na carroceria ou no eixo. Para isso é necessário equipamento especializado e técnica de estrutura veicular.",
  },
  {
    question: "Vocês emitem laudo técnico?",
    answer:
      "Sim. Emitimos laudo completo com diagnóstico, medições e resultado após a correção. Documentação aceita por seguradoras e funilarias.",
  },
  {
    question: "Quanto tempo leva o serviço?",
    answer:
      "Depende do tipo de correção. A maioria dos casos é concluída no mesmo dia. Se o serviço for mais complexo, você é informado antes de qualquer execução.",
  },
];

export const INSTAGRAM_POSTS = [
  {
    code: "DXhfBdCEa7f",
    href: "https://www.instagram.com/reel/DXhfBdCEa7f/",
    image: "/assets/images/instagram/DXhfBdCEa7f.jpg",
    label: "Hilux e Defender — recuperação estrutural",
    aria: "Abrir no Instagram: Hilux e Defender",
  },
  {
    code: "DcJR6V4xdWJ",
    href: "https://www.instagram.com/reel/DcJR6V4xdWJ/",
    image: "/assets/images/instagram/DcJR6V4xdWJ.jpg",
    label: "Hilux SW4 — avaliação estrutural do chassi",
    aria: "Abrir no Instagram: Hilux SW4",
  },
  {
    code: "DeiDeDLxYz8",
    href: "https://www.instagram.com/reel/DeiDeDLxYz8/",
    image: "/assets/images/instagram/DeiDeDLxYz8.jpg",
    label: "Problemas de alinhamento? Tem solução",
    aria: "Abrir no Instagram: alinhamento",
  },
  {
    code: "DasrY3ZRD3A",
    href: "https://www.instagram.com/reel/DasrY3ZRD3A/",
    image: "/assets/images/instagram/DasrY3ZRD3A.jpg",
    label: "Correção estrutural em ação",
    aria: "Abrir no Instagram: correção estrutural",
  },
  {
    code: "DaNczVQRWLy",
    href: "https://www.instagram.com/reel/DaNczVQRWLy/",
    image: "/assets/images/instagram/DaNczVQRWLy.jpg",
    label: "Troller — recuperação e soldagem do chassi",
    aria: "Abrir no Instagram: Troller",
  },
  {
    code: "DYUblXzxrXa",
    href: "https://www.instagram.com/reel/DYUblXzxrXa/",
    image: "/assets/images/instagram/DYUblXzxrXa.jpg",
    label: "CR-V — recuperação de longarina",
    aria: "Abrir no Instagram: CR-V longarina",
  },
];

export const BLOG_POSTS = [
  {
    href: "#contato",
    image: "/assets/images/servico-chassi.webp",
    alt: "Carro que não pega alinhamento",
    tag: "Estrutura",
    title: "Meu carro não pega alinhamento. O problema pode ser o chassi?",
    excerpt:
      "Quando o alinhamento não segura, o desvio costuma estar na estrutura. Veja os sinais e o que a avaliação técnica identifica.",
  },
  {
    href: "#contato",
    image: "/assets/images/depois-2.webp",
    alt: "Desgaste irregular de pneus",
    tag: "Diagnóstico",
    title: "Desgaste irregular de pneu: o que isso revela sobre a geometria",
    excerpt:
      "Pneu com desgaste interno ou externo pode indicar cambagem, caster ou deslocamento estrutural. Entenda a diferença.",
  },
  {
    href: "#contato",
    image: "/assets/images/servico-solda.webp",
    alt: "Laudo técnico de chassi",
    tag: "Laudo",
    title: "Para que serve o laudo técnico de correção estrutural",
    excerpt:
      "O laudo documenta medições e resultado da correção — útil para seguradoras, funilarias e tranquilidade do proprietário.",
  },
];

export const SERVICE_OPTIONS = [
  "Alinhamento de chassi",
  "Correção de eixo traseiro",
  "Cambagem e caster",
  "Solda MIG",
  "Alinhamento de longarina",
  "Outro",
];
