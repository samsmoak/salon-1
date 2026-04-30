export const STUDIO = {
  name: "Selin Hair Studio",
  shortName: "Selin",
  tagline: "Where artistry meets identity. Old Town Alexandria.",
  established: 2010,
  phone: "(571) 357-1732",
  phoneRaw: "5713571732",
  email: "selinhairstudio@gmail.com",
  address: "619 South Washington Street",
  city: "Alexandria",
  state: "VA",
  zip: "22314",
  area: "Old Town Alexandria",
  fullAddress: "619 South Washington Street, Alexandria, VA 22314",
  parking:
    "Street parking around the salon is free and easy. Note that some curb lanes operate as HOV lanes Monday–Friday from 4–6 PM.",
  promo: "New clients enjoy 20% off their first service.",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    yelp: "https://yelp.com",
  },
};

export const HOURS = [
  { day: "Monday", time: "10:00 AM – 7:00 PM", open: true },
  { day: "Tuesday", time: "10:00 AM – 7:00 PM", open: true },
  { day: "Wednesday", time: "10:00 AM – 7:00 PM", open: true },
  { day: "Thursday", time: "10:00 AM – 7:00 PM", open: true },
  { day: "Friday", time: "10:00 AM – 7:00 PM", open: true },
  { day: "Saturday", time: "9:00 AM – 6:00 PM", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

export const HOURS_PILL = "Mon–Fri 10am–7pm · Sat 9am–6pm · Sun Closed";

export type Service = {
  name: string;
  price: string;
  note?: string;
  category: "Cuts" | "Color" | "Styling" | "Treatments";
};

export const SERVICES: Service[] = [
  {
    name: "Women's Haircut",
    price: "$85–$95+",
    note: "Includes shampoo & styling",
    category: "Cuts",
  },
  {
    name: "Men's Haircut",
    price: "$60",
    note: "Includes shampoo & styling",
    category: "Cuts",
  },
  {
    name: "Retouch / Touch-up to 1 inch",
    price: "$105+",
    note: "Blow-out/cut and toner extra",
    category: "Color",
  },
  {
    name: "Partial Highlights / Touch-up to 1 inch",
    price: "$140+",
    note: "Blow-out/cut and toner extra",
    category: "Color",
  },
  {
    name: "Full Highlights / Touch-up to 1 inch",
    price: "$175+",
    note: "Blow-out/cut and toner extra",
    category: "Color",
  },
  {
    name: "Partial Babylights / Touch-up to 1 inch",
    price: "$220+",
    note: "Blow-out/cut and toner extra",
    category: "Color",
  },
  {
    name: "Full Babylights / Touch-up to 1 inch",
    price: "$270+",
    note: "Blow-out/cut and toner extra",
    category: "Color",
  },
  {
    name: "Ombré / Balayage / Touch-up to 3 inches",
    price: "$270+",
    note: "Blow-out/cut and toner extra",
    category: "Color",
  },
  {
    name: "Olaplex No.2 Bonding Treatment",
    price: "+$50",
    note: "Add-on to any chemical service",
    category: "Color",
  },
  {
    name: "Color Correction",
    price: "$170 / hour",
    note: "Custom consultation required",
    category: "Color",
  },
  {
    name: "Custom Blowout",
    price: "$65+",
    note: "Includes shampoo",
    category: "Styling",
  },
  {
    name: "Curling / Flat Iron Style",
    price: "$80+",
    note: "Includes shampoo",
    category: "Styling",
  },
  {
    name: "Up-do Styling",
    price: "$160+",
    note: "Must provide current hair photo + inspiration photos",
    category: "Styling",
  },
  {
    name: "Brazilian Keratin Treatment",
    price: "$420+",
    note: "Includes Olaplex No.1",
    category: "Treatments",
  },
];

export const SERVICE_CATEGORIES: Array<Service["category"]> = [
  "Cuts",
  "Color",
  "Styling",
  "Treatments",
];

export const SERVICE_NOTES = [
  "All quoted prices are starting prices and may increase based on complexity, length, density & texture of hair. Complimentary consultations available for price estimates.",
  "All chemical services include Olaplex No.1. Olaplex No.2 bonding treatment is an additional charge.",
  "For new chemical clients: we ask for your two-year color history and a photo of your current hair along with inspiration pictures.",
];

export const POLICIES = [
  {
    title: "Booking & Walk-ins",
    eyebrow: "Reservations",
    body: "Walk-ins are warmly welcomed. We strongly recommend appointments to secure your preferred stylist and time, especially for color and treatment services.",
  },
  {
    title: "Client Punctuality",
    eyebrow: "Time",
    body: "Clients arriving 15 or more minutes late may be asked to reschedule out of respect for the stylist and following clients. We will do our best to accommodate where possible.",
  },
  {
    title: "Satisfaction Guarantee",
    eyebrow: "Our Promise",
    body: "Your satisfaction is paramount. If you're not entirely pleased with your service, contact us within seven days and we will arrange a complimentary touch-up.",
  },
  {
    title: "Cancellation",
    eyebrow: "24 Hours",
    body: "We require 24-hour notice for cancellations or rescheduling. This courtesy allows us to offer your spot to clients on our waiting list.",
  },
  {
    title: "Gratuity & Payment",
    eyebrow: "Payment",
    body: "We accept all major credit cards, personal checks, and cash. Gratuity is not included in our pricing and is left entirely to your discretion.",
  },
  {
    title: "Products",
    eyebrow: "Returns",
    body: "Unused, unopened retail products may be returned with the original receipt for a full refund or exchange.",
  },
  {
    title: "COVID Policy",
    eyebrow: "Health",
    body: "If you are experiencing COVID-19 symptoms or have been recently exposed, please reschedule your appointment. We will waive any cancellation fees in these circumstances.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "I've been seeing Selin for nearly a decade. The balayage she did last month is the best my hair has ever looked — soft, dimensional, exactly the shade I had in mind.",
    name: "Caroline M.",
    detail: "Old Town · Color client since 2016",
  },
  {
    quote:
      "Walking into the studio feels like stepping into a quieter, more elegant version of the city. Every cut is precise, every conversation considered.",
    name: "Elena R.",
    detail: "Alexandria · 6-year client",
  },
  {
    quote:
      "The Olaplex treatments here changed my hair. After years of color elsewhere, my strands feel healthier than they did in my twenties.",
    name: "Priya S.",
    detail: "Color correction client",
  },
  {
    quote:
      "My stylist actually listens. We started with a small change three years ago, and she's slowly built my hair into something I genuinely love.",
    name: "Margaret L.",
    detail: "Cuts & color · since 2021",
  },
  {
    quote:
      "I came in for a Brazilian keratin and left with a completely new relationship to my mornings. Nothing frizzes, nothing rebels.",
    name: "Jennifer K.",
    detail: "Treatment client",
  },
  {
    quote:
      "The babylights are gentler and prettier than highlights I've had at much pricier salons in DC. Worth the trip every time.",
    name: "Sofia A.",
    detail: "DC · monthly client",
  },
  {
    quote:
      "The team takes color seriously here — two-year histories, patch consults, the whole craft. It shows in the result.",
    name: "Rachel D.",
    detail: "New chemical client, 2024",
  },
  {
    quote:
      "An up-do for my wedding that held flawlessly through twelve hours, three outfit changes, and a humid August evening. Magic.",
    name: "Hannah B.",
    detail: "Bridal styling",
  },
];

export const STYLISTS = [
  {
    name: "Selin",
    role: "Founder · Master Stylist",
    specialty: "Color Specialist · Balayage Expert",
    image: "/images/1580489944761-15a19d654956.jpg",
  },
  {
    name: "Maya",
    role: "Senior Stylist",
    specialty: "Precision Cuts · Editorial Styling",
    image: "/images/1544005313-94ddf0286df2.jpg",
  },
  {
    name: "Isabel",
    role: "Color Specialist",
    specialty: "Babylights · Color Correction",
    image: "/images/1573496359142-b8d87734a5a2.jpg",
  },
  {
    name: "Ava",
    role: "Stylist",
    specialty: "Blowouts · Up-do Styling",
    image: "/images/1438761681033-6461ffad8d80.jpg",
  },
  {
    name: "Camille",
    role: "Treatment Specialist",
    specialty: "Brazilian Keratin · Olaplex",
    image: "/images/1487412720507-e7ab37603c6f.jpg",
  },
];

export const HERO_SLIDES = [
  {
    label: "The Studio",
    image:
      "/images/1560066984-138dadb4c035.jpg",
  },
  {
    label: "The Craft",
    image:
      "/images/1522337360788-8b13dee7a37e.jpg",
  },
  {
    label: "The Color",
    image:
      "/images/1492106087820-71f1a00d2b11.jpg",
  },
  {
    label: "The Cut",
    image:
      "/images/1521590832167-7bcbfaa6381f.jpg",
  },
  {
    label: "The Finish",
    image:
      "/images/1595476108010-b4d1f102b1b1.jpg",
  },
];

export const GALLERY_IMAGES = [
  { src: "/images/1560066984-138dadb4c035.jpg", category: "Cuts", alt: "Salon studio interior" },
  { src: "/images/1522337360788-8b13dee7a37e.jpg", category: "Cuts", alt: "Precision haircut" },
  { src: "/images/1634301942574-b7c1d80cb9f1.jpg", category: "Color", alt: "Balayage color work" },
  { src: "/images/1595476108010-b4d1f102b1b1.jpg", category: "Styling", alt: "Finished blowout" },
  { src: "/images/1500840216050-6ffa99d75160.jpg", category: "Color", alt: "Highlights detail" },
  { src: "/images/1492106087820-71f1a00d2b11.jpg", category: "Color", alt: "Custom color result" },
  { src: "/images/1521590832167-7bcbfaa6381f.jpg", category: "Cuts", alt: "Editorial cut" },
  { src: "/images/1487412947147-5cebf100ffc2.jpg", category: "Styling", alt: "Up-do styling" },
  { src: "/images/1607701703246-e4a9c9b29b60.jpg", category: "Treatments", alt: "Hair treatment" },
  { src: "/images/1562322140-8baeececf3df.jpg", category: "Styling", alt: "Curls and waves" },
  { src: "/images/1605497788044-5a32c7078486.jpg", category: "Color", alt: "Color portrait" },
  { src: "/images/1493152325633-e5f60e5b39a5.jpg", category: "Cuts", alt: "Sleek bob" },
  { src: "/images/1526045431048-f857369baa09.jpg", category: "Treatments", alt: "Keratin smooth" },
];

export const GALLERY_CATEGORIES = ["All", "Color", "Cuts", "Styling", "Treatments"] as const;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/policies", label: "Policies" },
  { href: "/contact", label: "Contact" },
];
