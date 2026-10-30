import { MaintenancePlan, ProjectItem, Testimonial, FaqItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_developer_workspace_1792787895618.jpg';

export const PLANS: MaintenancePlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 20,
    period: '/ month',
    tagline: 'Essential upkeep and steady edits for small business websites.',
    features: [
      'Web hosting maintenance',
      'Security updates & patch monitoring',
      'Up to 3 small text/photo updates per month',
      'Routine uptime & health checks',
      'Direct developer support via email',
    ],
    smallUpdatesLimit: 3,
    layoutEditsLimit: 0,
    extraSmallEditCost: 5,
    extraBigEditCost: 15,
    extraEditCostNote: 'Extra small edits: $5 · Major layout edits: only +$15 each',
    idealFor: 'Landing pages, local service websites, and portfolios that need steady monthly upkeep.',
    highlights: [
      '3 small text/photo updates included',
      'Hosting & security covered',
      'Extra small edits: $5 · Major layout edits: +$15',
    ],
  },
  {
    id: 'plus',
    name: 'Plus Plan',
    price: 40,
    period: '/ month',
    badge: 'Most Popular',
    tagline: 'Comprehensive maintenance, layout evolutions, and discounted extra edit rates.',
    features: [
      'Web hosting maintenance included',
      'Priority support with faster turnaround queue',
      'Comprehensive security updates & daily backups',
      'Up to 10 small updates per month included',
      '1 major layout edit per month included',
      'Discounted extra edits: only $3/small and +$10/big',
      'Monthly performance & health report',
    ],
    smallUpdatesLimit: 10,
    layoutEditsLimit: 1,
    extraSmallEditCost: 3,
    extraBigEditCost: 10,
    extraEditCostNote: '1 major layout edit included every month. Extra edits: only $3/small and +$10/big',
    idealFor: 'Growing businesses, active storefronts, and brands that regularly refresh content and layouts.',
    highlights: [
      '10 small updates + 1 major layout edit included',
      'Extra edits: only $3 small / +$10 big',
      'Priority turnaround queue',
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'archetype',
    title: 'Archetype Architectural Studio',
    client: 'Archetype Studio AG',
    category: 'Architecture & Design',
    image: '/src/assets/images/showcase_arch_studio_1792787896663.jpg',
    summary: 'A minimalist digital showcase with bespoke project grid, dark-mode styling, and sub-second page transitions.',
    metrics: [
      { label: 'Page Speed', value: '99/100' },
      { label: 'Monthly Inquiries', value: '+44%' },
      { label: 'Load Time', value: '0.42s' },
    ],
    techStack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel Edge'],
    maintenancePlanUsed: 'Plus Plan ($40/mo) for bi-weekly project photography updates ($3 extra/small) and landing section refinements.',
  },
  {
    id: 'terra-grain',
    title: 'Terra & Grain Specialty Coffee',
    client: 'Terra & Grain Roasters',
    category: 'E-Commerce Storefront',
    image: '/src/assets/images/showcase_artisan_coffee_1792787897466.jpg',
    summary: 'High-conversion artisanal storefront featuring weekly single-origin drops, roast profile cards, and customer subscriptions.',
    metrics: [
      { label: 'Checkout Conversion', value: '+28%' },
      { label: 'Monthly Uptime', value: '100%' },
      { label: 'Mobile Score', value: '98/100' },
    ],
    techStack: ['Shopify Headless', 'TypeScript', 'Tailwind', 'Stripe'],
    maintenancePlanUsed: 'Plus Plan ($40/mo) with seasonal menu updates, banner swaps, and promotional landing blocks.',
  },
  {
    id: 'nexus-analytics',
    title: 'Nexus Analytics Dashboard Web App',
    client: 'Nexus Cloud Technologies',
    category: 'SaaS & Web Application',
    image: '/src/assets/images/showcase_saas_platform_1792787897450.jpg',
    summary: 'Responsive marketing platform and client portal interface designed for high reliability, live chart widgets, and zero downtime.',
    metrics: [
      { label: 'Bounce Rate', value: '-35%' },
      { label: 'SEO Visibility', value: '+62%' },
      { label: 'Uptime Monitored', value: '99.98%' },
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    maintenancePlanUsed: 'Basic Plan ($20/mo) covering continuous SSL certificates, node dependencies, and monthly security patches.',
  },
];

export const SCOPE_ITEMS = {
  smallUpdates: [
    'Replacing or updating product/staff photos',
    'Updating text copy, announcements, or business hours',
    'Changing prices, menu items, or service rates',
    'Publishing prepared blog articles or news releases',
    'Swapping contact email, phone number, or map address',
    'Fixing broken hyperlinks or updating navigation links',
    'Adding customer reviews or trust badges to existing pages',
  ],
  majorEdits: [
    'Designing and coding a brand-new page section (e.g., FAQ, pricing table, testimonial slider)',
    'Restructuring the homepage layout or visual flow',
    'Adding an interactive contact modal or customized lead form',
    'Redesigning the top navigation header or footer architecture',
    'Refactoring a multi-column services display for mobile optimization',
  ],
  hostingSecurity: [
    'Cloud server hosting configuration and maintenance',
    'SSL certificate monitoring and auto-renewal',
    'Core platform and CMS security patch installations',
    'Proactive malware and vulnerability scanning',
    'Automated scheduled backups before applying updates',
    'DNS and domain health verification',
  ],
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Jacob took over our website hosting and maintenance eight months ago. Every time we need price updates or new case studies uploaded, it gets done in hours. The peace of mind is easily worth 10x what he charges.',
    author: 'Elena Rostova',
    role: 'Principal Architect',
    company: 'Archetype Studio',
    metric: 'Zero downtime in 8 months',
  },
  {
    id: '2',
    quote: 'Before Jacob, our coffee site broke twice during holiday sales. Switching to his Plus Plan fixed our speed, kept our security tight, and made monthly promo updates completely painless—plus extra small edits are only $3!',
    author: 'Marcus Chen',
    role: 'Founder & Head Roaster',
    company: 'Terra & Grain Co.',
    metric: '48hr turnaround on all edits',
  },
  {
    id: '3',
    quote: 'Having a real developer handle both our monthly maintenance and occasional layout updates has saved our marketing team countless hours. Responsive, reliable, and razor-sharp attention to detail.',
    author: 'Sarah Lindqvist',
    role: 'Operations Lead',
    company: 'NorthPath Logistics',
    metric: '+28% site speed improvement',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How do extra edits work on the Basic Plan vs. Plus Plan?',
    answer: 'On the Basic Plan ($20/mo), you get up to 3 small updates included; extra small edits are $5 each, and major layout edits are only +$15 each. On the Plus Plan ($40/mo), you get 10 small updates and 1 major layout edit already included; extra small updates are discounted to only $3 each, and extra big layout edits are only +$10 each.',
    category: 'plans',
  },
  {
    question: 'What counts as a "small text/photo update"?',
    answer: 'A small update is any focused content tweak on an existing page that takes about 15–20 minutes to implement and verify. Examples include: swapping 1–3 images, editing paragraphs of text, updating prices or hours, fixing links, or adding a new testimonial. It does not include creating entirely new multi-page sections from scratch.',
    category: 'plans',
  },
  {
    question: 'What is a "major layout edit" / "big edit"?',
    answer: 'A major (big) layout edit involves restructuring an existing section, adding a brand-new interactive block (such as an accordion FAQ, a new lead capture form, or a comparison table), or revamping a header/footer layout. In the Plus Plan, you get 1 major layout edit included every month (extra big edits are +$10 each). On the Basic Plan, you can add a major layout edit for just +$15 each.',
    category: 'plans',
  },
  {
    question: 'Can you maintain a website that someone else built?',
    answer: 'Yes! Whether your website is built on WordPress, React/Next.js, Webflow, Shopify, or plain HTML/CSS, I perform an initial technical audit to check code health, hosting credentials, and plugins, and then smoothly transition it onto the maintenance plan.',
    category: 'technical',
  },
  {
    question: 'How do I submit update requests each month?',
    answer: 'You can submit requests via direct email, a private Slack channel, or our quick client submission form. Simply attach the text or photos, specify what page you want changed, and I will confirm receipt and deploy the changes within 24 to 48 hours.',
    category: 'process',
  },
  {
    question: 'Are there any contracts or lock-in periods?',
    answer: 'None at all. All maintenance plans are strictly month-to-month. You can upgrade, downgrade, or cancel whenever you wish with zero penalty or cancellation fees.',
    category: 'plans',
  },
  {
    question: 'What web hosting maintenance is included?',
    answer: 'I monitor server performance, uptime, SSL security certificates, database connections, and ensure your domain records and backups are healthy. If your site ever experiences unexpected downtime, I address and resolve it immediately.',
    category: 'technical',
  },
];

export const DEVELOPER_PROFILE = {
  name: 'Jacob George',
  role: 'Website Developer',
  email: 'jacobg.webdev@gmail.com',
  alternateEmail: 'jacobg.websitedev@outlook.com',
  phone: '940-204-0978',
  phoneFormatted: '(940) 204-0978',
  location: 'Remote · Serving Clients Worldwide',
  experience: '6+ Years Experience',
  turnaroundTime: '24–48 Hours',
  guarantee: 'Zero lock-in contracts · Direct developer access',
};
