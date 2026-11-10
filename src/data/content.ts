import { MaintenancePlan, Testimonial, FaqItem } from '../types';
import heroWorkspaceImage from '../assets/images/jacob_developer_workspace_1793393794140.jpg';

export const HERO_IMAGE = heroWorkspaceImage;

export const PLANS: MaintenancePlan[] = [
  {
    id: 'basic',
    name: 'Standard Care',
    price: 100,
    period: '/ month',
    tagline: 'Full-stack website build upfront ($1,000) + essential monthly upkeep, hosting maintenance, and steady edits.',
    features: [
      '$1,000 upfront custom website build & deployment',
      'High-performance web hosting & SSL maintenance',
      'Proactive security monitoring & daily cloud backups',
      'Up to 3 content / text / photo updates per month included',
      '24/7 uptime health monitoring (99.9% guarantee)',
      'Direct developer support via email & phone',
    ],
    smallUpdatesLimit: 3,
    layoutEditsLimit: 0,
    extraSmallEditCost: 5,
    extraBigEditCost: 15,
    extraEditCostNote: 'Requires $1,000 upfront build. Extra updates: only $5 · Major layout edits: +$15',
    idealFor: 'Businesses needing a high-performance custom website ($1,000 upfront) plus reliable monthly maintenance.',
    highlights: [
      '$1,000 upfront build + $100/mo',
      '3 updates / month included',
      'Super affordable extras: only $5 small / +$15 big',
    ],
  },
  {
    id: 'plus',
    name: 'Growth Care',
    price: 125,
    period: '/ month',
    badge: 'Most Popular',
    tagline: 'Full-stack website build upfront ($1,000) + active monthly evolutions, 10 updates, 1 big layout edit, and priority queue.',
    features: [
      '$1,000 upfront custom website build & deployment',
      'High-performance web hosting & priority infrastructure',
      'Expedited support queue with faster turnaround',
      'Comprehensive security updates & daily off-site backups',
      'Up to 10 small updates per month included',
      '1 major layout edit per month included ($150 value)',
      'Lowest extra edits: only $3/small and +$10/big',
      'Monthly speed, SEO, and uptime health reports',
    ],
    smallUpdatesLimit: 10,
    layoutEditsLimit: 1,
    extraSmallEditCost: 3,
    extraBigEditCost: 10,
    extraEditCostNote: 'Requires $1,000 upfront build. 1 major layout edit included every month. Extra edits: only $3/small and +$10/big',
    idealFor: 'Growing businesses, active storefronts, and brands that regularly refresh content, campaigns, and layouts.',
    highlights: [
      '$1,000 upfront build + $125/mo',
      '10 updates + 1 major layout edit included',
      'Lowest extra edits: only $3 small / +$10 big',
    ],
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
    quote: 'Jacob took over our website hosting and monthly updates. Every time we need price updates or new photos uploaded, it gets done in hours. The peace of mind is easily worth 10x what he charges.',
    author: 'Elena R.',
    role: 'Studio Director',
    company: 'Design & Architecture',
    metric: 'Zero downtime in 8 months',
  },
  {
    id: '2',
    quote: 'Before Jacob, our storefront site broke during peak sales. His $1,000 custom build and monthly care fixed our speed, kept security rock-solid, and made monthly promo updates completely seamless.',
    author: 'Marcus C.',
    role: 'Founder & Retail Owner',
    company: 'Specialty Retail Co.',
    metric: '48hr turnaround on all edits',
  },
  {
    id: '3',
    quote: 'Having a real developer handle both our monthly maintenance and occasional layout updates has saved our marketing team countless hours. Responsive, reliable, and razor-sharp attention to detail.',
    author: 'Sarah L.',
    role: 'Operations Lead',
    company: 'Logistics & Services',
    metric: '+28% site speed improvement',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How does the pricing work? Is there an upfront fee?',
    answer: 'Yes. Every project begins with a $1,000 upfront custom website build fee, which covers full bespoke design, coding (React / Next.js / Tailwind), SEO architecture, mobile responsiveness, and deployment. Then, ongoing maintenance and hosting is paired with either our Standard Care ($100/month) or Growth Care ($125/month) plan.',
    category: 'plans',
  },
  {
    question: 'How do extra edits work on Standard Care ($100/mo) vs. Growth Care ($125/mo)?',
    answer: 'Extra edits are kept extremely affordable so you never feel nickel-and-dimed. On Standard Care ($100/mo), you get 3 updates included each month; extra small edits are just $5 each, and major layout edits are +$15 each. On Growth Care ($125/mo), you get 10 small updates and 1 major layout edit already included every month; extra small updates are discounted to only $3 each, and extra big layout edits are only +$10 each.',
    category: 'plans',
  },
  {
    question: 'What counts as a "small text/photo update"?',
    answer: 'A small update is any focused content tweak on an existing page that takes about 15–20 minutes to implement and verify. Examples include: swapping 1–3 images, editing paragraphs of text, updating prices or hours, fixing links, or adding a new testimonial. It does not include creating entirely new multi-page sections from scratch.',
    category: 'plans',
  },
  {
    question: 'What is a "major layout edit" / "big edit"?',
    answer: 'A major (big) layout edit involves restructuring an existing section, adding a brand-new interactive block (such as an accordion FAQ, a new lead capture form, or a comparison table), or revamping a header/footer layout. In Growth Care ($125/mo), you get 1 major layout edit included every month (extra big edits are only +$10 each). On Standard Care ($100/mo), you can add a major layout edit for just +$15 each.',
    category: 'plans',
  },
  {
    question: 'Can you maintain a website that someone else built?',
    answer: 'Yes! If you already have an existing website and need monthly care ($100/mo or $125/mo), I perform an onboarding technical audit to inspect code health, hosting credentials, and plugins, and then transition your site onto ongoing maintenance.',
    category: 'technical',
  },
  {
    question: 'How do I submit update requests each month?',
    answer: 'You can submit requests via direct email, a private Slack channel, or our quick client submission form. Simply attach the text or photos, specify what page you want changed, and I will confirm receipt and deploy the changes within 24 to 48 hours.',
    category: 'process',
  },
  {
    question: 'Are there any contracts or lock-in periods?',
    answer: 'None at all. The monthly maintenance plans are strictly month-to-month after your $1,000 upfront build is launched. You can upgrade, downgrade, or cancel whenever you wish with zero penalty or cancellation fees.',
    category: 'plans',
  },
  {
    question: 'What web hosting maintenance is included in the monthly fee?',
    answer: 'I monitor server performance, uptime, SSL security certificates, database connections, and ensure your domain records and daily cloud backups are healthy. If your site ever experiences unexpected downtime, I address and resolve it immediately.',
    category: 'technical',
  },
];

export const DEVELOPER_PROFILE = {
  name: 'Jacob George',
  role: 'Website Developer',
  email: 'blaiseplays12@gmail.com',
  secondaryEmail: 'jacobg.webdev@gmail.com',
  alternateEmail: 'jacobg.websitedev@outlook.com',
  allEmails: 'blaiseplays12@gmail.com,jacobg.webdev@gmail.com',
  phone: '940-204-0978',
  phoneFormatted: '(940) 204-0978',
  location: 'Remote · Serving Clients Worldwide',
  experience: '6+ Years Experience',
  turnaroundTime: '24–48 Hours',
  guarantee: 'Zero lock-in contracts · Direct developer access',
  upfrontPrice: '$1,000 upfront',
  upfrontPriceNumber: 1000,
  monthlyTiers: '$100/mo or $125/mo',
};
