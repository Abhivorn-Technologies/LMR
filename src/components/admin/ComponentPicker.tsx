'use client';

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Grid, Card, CardContent, CardActionArea, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { 
  Type, ImageIcon, LayoutGrid, MousePointerClick, LayoutTemplate, X, 
  AlignLeft, PlaySquare, FileVideo, Layout, Columns, AppWindow, 
  CreditCard, MessageSquare, ListTodo, Search, MapPin, 
  BarChart, Users, Star, Quote, SplitSquareHorizontal, Minus, 
  MenuSquare, Code, Settings, Link2, ListOrdered, Table, ImagePlus, Shield,
  Mail, Newspaper
} from 'lucide-react';

export type BlockTemplate = {
  type: string;
  category: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  template: any;
};

export const CATEGORIES = [
  'Basic', 'Media', 'Layout', 'Marketing', 'Forms', 'Navigation', 'Content', 'Advanced', 'Products'
];

export const AVAILABLE_BLOCKS: BlockTemplate[] = [
  {
    type: 'PremiumProductLayoutBlock', category: 'Products', label: 'Premium Product', description: 'The complete layout for insurance products including Hero, features, and FAQs.', icon: <LayoutTemplate size={28} className="text-emerald-500" />,
    template: { 
      type: 'PremiumProductLayoutBlock', 
      content: { 
        title: 'New Product', 
        subtitle: 'Comprehensive Coverage', 
        description: 'Get the best policy online.', 
        image: '/assets/image3.jpeg',
        badges: ['Premium Plan', 'Instant Policy'],
        featuresTitle: 'Key Features',
        featuresSubtitle: 'Our policies provide complete protection.',
        features: [
          { title: 'Feature 1', description: 'Description 1', iconName: 'ShieldCheck' }
        ],
        stepsTitle: 'How it works',
        stepsSubtitle: 'A simple process.',
        steps: [
          { title: 'Step 1', description: 'Description 1' }
        ],
        inclusions: [],
        exclusions: [],
        faqs: []
      } 
    }
  },
  {
    type: 'ContactBlock', category: 'Products', label: 'Contact Details', description: 'Contact details section with key contacts layout.', icon: <LayoutTemplate size={28} className="text-blue-500" />,
    template: { 
      type: 'ContactBlock', 
      content: { 
        title: 'Speak with our',
        highlightTitle: 'advisory team.',
        subtitle: 'Submit an inquiry below and our expert team will respond promptly during business hours.',
        contactsTitle: 'Key Contacts',
        contacts: [
          { name: 'John Doe', title: 'Director', phone: '+91 9999999999', email: 'john@example.com' }
        ]
      } 
    }
  },
  {
    type: 'AboutBlock', category: 'Content', label: 'About Us Section', description: 'About us page content layout.', icon: <LayoutTemplate size={28} className="text-emerald-500" />,
    template: { 
      type: 'AboutBlock', 
      content: { 
        hero: {
          tagline: 'Legacy of Trust',
          titleLine1: 'Advising clients for ',
          titleHighlight: 'over 2 decades.',
          titleLine2: 'Your trusted partner in ',
          titleLine3: 'insurance broking.',
          description: 'LMB Insurance Brokers brings unparalleled expertise to risk management...',
          image: '/assets/about/about-hero-image.png'
        }
      } 
    }
  },
  {
    type: 'ReinsuranceBlock', category: 'Products', label: 'Reinsurance Page', description: 'Reinsurance page layout with bento grid and timeline.', icon: <LayoutTemplate size={28} className="text-cyan-500" />,
    template: { 
      type: 'ReinsuranceBlock', 
      content: { 
        headline: "Global Treaty & Facultative Solutions",
        subheadline: "Empowering businesses with optimized risk transfer strategies and deep market capacity.",
        expertise: [
          { title: "Treaty Reinsurance", description: "Proportional and non-proportional treaty structures optimized for capital relief and volatility management." }
        ],
        process: ["Risk Assessment", "Market Selection", "Placement"],
        benefits: ["Enhanced Capacity", "Capital Relief"]
      } 
    }
  },
  // === BASIC ===
  {
    type: 'HeadingBlock', category: 'Basic', label: 'Heading', description: 'H1-H6 heading with custom styling.', icon: <Type size={28} className="text-gray-500" />,
    template: { type: 'HeadingBlock', content: { text: 'New Heading', level: 'h2', alignment: 'left', color: '#111827' } }
  },
  {
    type: 'ParagraphBlock', category: 'Basic', label: 'Paragraph', description: 'Standard text block.', icon: <AlignLeft size={28} className="text-gray-500" />,
    template: { type: 'ParagraphBlock', content: { text: 'Enter your paragraph text here.' } }
  },
  {
    type: 'ButtonBlock', category: 'Basic', label: 'Button', description: 'Standalone interactive button.', icon: <MousePointerClick size={28} className="text-gray-500" />,
    template: { type: 'ButtonBlock', content: { text: 'Click Me', link: '/', style: 'primary' } }
  },
  {
    type: 'DividerBlock', category: 'Basic', label: 'Divider', description: 'Horizontal line to separate content.', icon: <Minus size={28} className="text-gray-500" />,
    template: { type: 'DividerBlock', content: { style: 'solid', thickness: 1, color: '#e2e8f0' } }
  },
  {
    type: 'SpacerBlock', category: 'Basic', label: 'Spacer', description: 'Empty vertical space.', icon: <SplitSquareHorizontal size={28} className="text-gray-500" />,
    template: { type: 'SpacerBlock', content: { height: '64px' } }
  },
  {
    type: 'IconBlock', category: 'Basic', label: 'Icon', description: 'Standalone SVG icon.', icon: <Star size={28} className="text-gray-500" />,
    template: { type: 'IconBlock', content: { iconName: 'Star', size: '24px', color: '#00A3A0' } }
  },
  {
    type: 'TableBlock', category: 'Basic', label: 'Table', description: 'Data table.', icon: <Table size={28} className="text-gray-500" />,
    template: { type: 'TableBlock', content: { rows: [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']] } }
  },
  {
    type: 'CustomHtmlBlock', category: 'Basic', label: 'Custom HTML', description: 'Embed custom HTML or scripts.', icon: <Code size={28} className="text-gray-500" />,
    template: { type: 'CustomHtmlBlock', content: { html: '<div class="p-4 text-center">Custom HTML Snippet</div>' } }
  },
  {
    type: 'MapBlock', category: 'Basic', label: 'Map', description: 'Google Maps embed.', icon: <MapPin size={28} className="text-gray-500" />,
    template: { type: 'MapBlock', content: { mapUrl: 'https://www.google.com/maps/embed?pb=...' } }
  },

  // === MEDIA ===
  {
    type: 'ImageBlock', category: 'Media', label: 'Image', description: 'A single image display.', icon: <ImageIcon size={28} className="text-emerald-500" />,
    template: { type: 'ImageBlock', content: { src: '/images/placeholder.jpg', alt: 'Placeholder', caption: '' } }
  },
  {
    type: 'ImageGalleryBlock', category: 'Media', label: 'Gallery', description: 'Grid or masonry image gallery.', icon: <ImagePlus size={28} className="text-emerald-500" />,
    template: { type: 'GalleryBlock', content: { style: 'grid', columns: 3, images: [{ src: '/assets/image1.jpeg', alt: 'Image 1' }] } }
  },
  {
    type: 'VideoBlock', category: 'Media', label: 'Video', description: 'Embed YouTube, Vimeo or MP4.', icon: <FileVideo size={28} className="text-emerald-500" />,
    template: { type: 'VideoBlock', content: { videoUrl: '', autoplay: false, loop: false } }
  },
  {
    type: 'LogoSliderBlock', category: 'Media', label: 'Logo Slider', description: 'Infinite scrolling client logos.', icon: <PlaySquare size={28} className="text-emerald-500" />,
    template: { type: 'LogoMarquee', content: { speed: 'normal', logos: [{ url: '', alt: 'Logo 1' }] } }
  },

  // === LAYOUT ===
  {
    type: 'ContainerBlock', category: 'Layout', label: 'Container', description: 'Max-width wrapper for content.', icon: <Layout size={28} className="text-amber-500" />,
    template: { type: 'ContainerBlock', content: { maxWidth: '1200px', blocks: [] } }
  },
  {
    type: 'SectionBlock', category: 'Layout', label: 'Section', description: 'Full width section with background.', icon: <AppWindow size={28} className="text-amber-500" />,
    template: { type: 'SectionBlock', content: { backgroundColor: '#ffffff', padding: '64px 0', blocks: [] } }
  },
  {
    type: 'GenericCardGrid', category: 'Layout', label: 'Card Grid', description: 'A responsive grid of styled cards.', icon: <LayoutGrid size={28} className="text-amber-500" />,
    template: { type: 'GenericCardGrid', content: { title: 'Features', columns: 3, cards: [{ title: 'Card 1' }] } }
  },
  {
    type: 'ColumnsBlock', category: 'Layout', label: 'Columns', description: 'Multi-column layout.', icon: <Columns size={28} className="text-amber-500" />,
    template: { type: 'ColumnsBlock', content: { layout: '50/50', gap: '24px', leftBlocks: [], rightBlocks: [] } }
  },

  // === NAVIGATION ===
  {
    type: 'HeaderBlock', category: 'Navigation', label: 'Header', description: 'Main site navigation header.', icon: <MenuSquare size={28} className="text-blue-500" />,
    template: { type: 'HeaderBlock', content: { 
      logoText: 'LMB Insurance', 
      links: ['Home', 'About Us', 'Services', 'Contact'], 
      ctaText: 'Get a Quote' 
    } }
  },
  {
    type: 'FooterBlock', category: 'Navigation', label: 'Footer', description: 'Site footer with links.', icon: <Layout size={28} className="text-blue-500" />,
    template: { type: 'FooterBlock', content: { 
      title: 'LMB Insurance', 
      description: 'Providing comprehensive insurance solutions.', 
      quickLinks: ['Home', 'About Us', 'Services', 'Contact'],
      contactInfo: ['123 Insurance Ave, NY 10001', 'info@lmb-insurance.com', '+1 (555) 123-4567']
    } }
  },

  // === MARKETING ===
  {
    type: 'Hero', category: 'Marketing', label: 'Hero Banner', description: 'Large header with title & background.', icon: <LayoutTemplate size={28} className="text-purple-500" />,
    template: { type: 'Hero', content: { 
      title: 'Insurance advisory', 
      titleHighlight: 'built on', 
      trustWord: 'trust', 
      subtitleStart: 'Securing your ', 
      subtitleWords: ['tomorrow.', 'today.', 'future.', 'business.', 'legacy.'], 
      description: 'Insurance broking built on expertise, integrity, and client focus.',
      checkmarks: ['Composite broker', 'Speed and efficiency', 'Market access'],
      contactFormHeadline: 'Get Advisory',
      contactFormSubheadline: 'Share your details.'
    } }
  },
  {
    type: 'PricingBlock', category: 'Marketing', label: 'Pricing', description: 'Pricing tiers and plans.', icon: <CreditCard size={28} className="text-purple-500" />,
    template: { type: 'PricingBlock', content: { 
      title: 'Pricing Plans',
      plans: [
        { name: 'Basic', price: '$9', features: ['Feature 1', 'Feature 2'], isPopular: false, buttonText: 'Choose Plan' },
        { name: 'Pro', price: '$29', features: ['Feature 1', 'Feature 2', 'Feature 3'], isPopular: true, buttonText: 'Choose Plan' },
        { name: 'Enterprise', price: '$99', features: ['All Features', 'Priority Support'], isPopular: false, buttonText: 'Choose Plan' }
      ] 
    } }
  },
  {
    type: 'TestimonialsBlock', category: 'Marketing', label: 'Testimonials', description: 'Customer reviews and ratings.', icon: <Quote size={28} className="text-purple-500" />,
    template: { type: 'TestimonialsBlock', content: { title: 'What clients say', reviews: [{ author: 'John Doe', text: 'Great service!', rating: 5 }] } }
  },
  {
    type: 'CallToActionBlock', category: 'Marketing', label: 'Call to Action', description: 'A highlighted banner with a button.', icon: <MousePointerClick size={28} className="text-purple-500" />,
    template: { type: 'CallToActionBlock', content: { title: 'Ready to get started?', buttonText: 'Contact Us', buttonLink: '/contact' } }
  },
  {
    type: 'StatsBar', category: 'Marketing', label: 'Stats Bar', description: 'Animated number counters.', icon: <BarChart size={28} className="text-purple-500" />,
    template: { type: 'StatsBar', content: { stats: [{ value: '200+', label: 'Years of experience' }] } }
  },
  {
    type: 'TrustMockupPreview', category: 'Marketing', label: 'Trust Section', description: 'Two decades of excellence block.', icon: <Shield size={28} className="text-purple-500" />,
    template: { type: 'TrustMockupPreview', content: { 
      badgeText: 'Trusted Legacy', 
      titlePrefix: 'Over Two Decades of ', 
      titleHighlight: 'Excellence.', 
      description: 'Registered with IRDAI since 2003, LMB Insurance Brokers has built an unbreakable legacy of trust.',
      imageSrc: '/assets/minimal_corporate_architecture_1783160853048.png',
      experienceYears: '20+',
      experienceText: 'Years of Experience',
      badges: [
        { title: "CoR No: 116", subtitle: "IRDAI Certified", icon: "Shield" },
        { title: "Since 2003", subtitle: "First License", icon: "Clock" }
      ]
    } }
  },
  {
    type: 'CompanyLogosMarquee', category: 'Marketing', label: 'Company Logos', description: 'Scrolling logos of notable clients.', icon: <ImagePlus size={28} className="text-purple-500" />,
    template: { type: 'CompanyLogosMarquee', content: { 
      title: 'Our notable clients', 
      description: 'Government departments, PSUs and public corporations we are proud to serve.',
      logos: defaultCompanies
    } }
  },
  {
    type: 'ServicesPreview', category: 'Marketing', label: 'Services Preview', description: 'Grid of company services.', icon: <ListTodo size={28} className="text-purple-500" />,
    template: { type: 'ServicesPreview', content: { 
      title: 'What would you like us to take care of?', 
      description: 'Comprehensive broking across general insurance, life insurance, reinsurance, and risk management.',
      services: [
        {
          id: "gi", title: "General Insurance", icon: "Home",
          shortDescription: "Protect your assets, operations, and liabilities with tailored non-life insurance programs.",
          homePoints: ["Property & Asset Coverage", "Liability Protection", "Fleet & Motor Fleet"]
        },
        {
          id: "life", title: "Life Insurance", icon: "Heart",
          shortDescription: "Secure your family's financial future and your employees' well-being.",
          homePoints: ["Term Life Policies", "Group Mediclaim", "Keyman Insurance"]
        },
        {
          id: "reinsurance", title: "Reinsurance", icon: "Shield",
          shortDescription: "Risk transfer solutions for insurance companies and large conglomerates.",
          homePoints: ["Treaty Reinsurance", "Facultative Support", "Risk Modeling"]
        },
        {
          id: "claims", title: "Claim Services", icon: "FileText",
          shortDescription: "End-to-end dedicated claims management and advocacy when you need it most.",
          homePoints: ["24/7 Claims Desk", "Surveyor Liaison", "Dispute Resolution"]
        },
        {
          id: "risk", title: "Risk Management", icon: "Target",
          shortDescription: "Identify, quantify, and mitigate enterprise-level risks proactively.",
          homePoints: ["Site Inspections", "Valuation Services", "Safety Audits"]
        },
        {
          id: "consulting", title: "Consulting", icon: "Users",
          shortDescription: "Strategic advisory on policy structuring, portfolio reviews, and compliance.",
          homePoints: ["Portfolio Optimization", "Policy Auditing", "Regulatory Guidance"]
        }
      ]
    } }
  },
  {
    type: 'RetailServicesPreview', category: 'Marketing', label: 'Retail Services', description: 'Categorized service grid for retail.', icon: <LayoutGrid size={28} className="text-pink-500" />,
    template: { type: 'RetailServicesPreview', content: {
      cat1: 'Motor Insurance',
      motorInsurance: [
        { title: "Car", icon: "Car", href: "/services/general-insurance/car", banner: "Pay as you Drive" },
        { title: "Bike", icon: "Bike", href: "/services/general-insurance/two-wheeler/bike", banner: "Starting ₹714" },
        { title: "OD for Car", icon: "ShieldCheck", href: "/services/general-insurance/car/own-damage", banner: "Standalone OD Cover" },
        { title: "Rickshaw", icon: "Truck", href: "/services/general-insurance/commercial/auto-rickshaw", banner: "Auto & e-Rickshaws" },
        { title: "Taxi/Cab", icon: "Bus", href: "/services/general-insurance/commercial/taxi", banner: "" },
        { title: "Truck", icon: "Truck", href: "/services/general-insurance/commercial/truck", banner: "" },
      ],
      cat2: 'Health Insurance',
      healthInsurance: [
        { title: "Health", icon: "Stethoscope", href: "/services/general-insurance/health", banner: "Infinity Wallet" },
        { title: "OPD Health Insurance", icon: "Activity", href: "/services/general-insurance/health", banner: "" },
        { title: "Super Top-up", icon: "HeartPulse", href: "/services/general-insurance/health/super-top-up", banner: "" },
        { title: "Arogya Sanjeevani Policy", icon: "ShieldPlus", href: "/services/general-insurance/health", banner: "₹1 Cr SI starting ₹640/m" },
        { title: "Port Health Policy", icon: "Repeat", href: "/services/general-insurance/health/portability", banner: "Switch to Digit" },
        { title: "Employee Health", icon: "Users", href: "/services/general-insurance/health/group-medical", banner: "" },
      ],
      cat3: 'Business Insurance',
      businessInsurance: [
        { title: "D&O Insurance", icon: "Briefcase", href: "/services/general-insurance/business", banner: "" },
        { title: "Erection All Risk Insurance", icon: "Building2", href: "/services/general-insurance/business", banner: "" },
        { title: "Contractors All Risk", icon: "HardHat", href: "/services/general-insurance/business/contractors-all-risk", banner: "" },
        { title: "Workmen Compensation", icon: "UserCog", href: "/services/general-insurance/business/workmen-compensation", banner: "" },
        { title: "Marine Cargo Insurance", icon: "Ship", href: "/services/general-insurance/business", banner: "" },
        { title: "CPM Insurance", icon: "Factory", href: "/services/general-insurance/business/contractors-plant-machinery", banner: "" },
      ],
      cat4: 'Travel & Property',
      travelProperty: [
        { title: "International Travel", icon: "Plane", href: "/services/general-insurance/travel/international", banner: "Starting ₹225" },
        { title: "Student Travel", icon: "GraduationCap", href: "/services/general-insurance/travel", banner: "Up to $1M SI" },
        { title: "Property", icon: "Building", href: "/services/general-insurance/home/bharat-griha-raksha", banner: "" },
        { title: "Home", icon: "Home", href: "/services/general-insurance/home", banner: "Starting ₹150/year*" },
        { title: "Shop", icon: "Store", href: "/services/general-insurance/business", banner: "" },
        { title: "Fire", icon: "Flame", href: "/services/general-insurance/home/bharat-griha-raksha", banner: "" },
      ]
    } }
  },
  {
    type: 'IndustriesPreview', category: 'Marketing', label: 'Industries Grid', description: 'Grid of specialized sectors.', icon: <Table size={28} className="text-purple-500" />,
    template: { type: 'IndustriesPreview', content: { 
      title: 'Specialized sector expertise', 
      description: "Insurance programs meticulously tailored to your industry's exposures.",
      ctaText: "Don't see your industry listed?",
      ctaButtonText: "Consult With Our Experts"
    } }
  },
  {
    type: 'WhyPreview', category: 'Marketing', label: 'Why Choose Us', description: 'Three reasons why block.', icon: <Star size={28} className="text-purple-500" />,
    template: { type: 'WhyPreview', content: { 
      title: 'Why Choose Us?', 
      points: [{ title: 'Expertise', description: 'Years of experience in the industry.' }]
    } }
  },
  {
    type: 'TeamBlock', category: 'Marketing', label: 'Team', description: 'Meet the team members.', icon: <Users size={28} className="text-purple-500" />,
    template: { type: 'TeamBlock', content: { title: 'Meet Our Team', members: [{ name: 'Alice Johnson', role: 'Founder', image: '' }] } }
  },
  {
    type: 'BlogListBlock', category: 'Marketing', label: 'Blog List', description: 'Recent blog posts.', icon: <Newspaper size={28} className="text-purple-500" />,
    template: { type: 'BlogListBlock', content: { title: 'Latest Articles', posts: [{ title: 'Article 1', excerpt: 'Summary...', date: 'Oct 2024' }] } }
  },
  {
    type: 'FAQAccordionBlock', category: 'Marketing', label: 'FAQ Accordion', description: 'Expandable Q&A list.', icon: <MessageSquare size={28} className="text-purple-500" />,
    template: { type: 'FAQAccordionBlock', content: { title: 'Frequently Asked Questions', faqs: [{ question: 'Q?', answer: 'A.' }] } }
  },

  // === FORMS ===
  {
    type: 'ContactFormBlock', category: 'Forms', label: 'Contact Form', description: 'Standard contact form.', icon: <MessageSquare size={28} className="text-blue-500" />,
    template: { type: 'ContactFormBlock', content: { title: 'Get In Touch', subtitle: 'Send us a message.' } }
  },
  {
    type: 'NewsletterBlock', category: 'Forms', label: 'Newsletter', description: 'Email subscription form.', icon: <Mail size={28} className="text-blue-500" />,
    template: { type: 'NewsletterBlock', content: { title: 'Subscribe', subtitle: 'Get the latest updates directly to your inbox.' } }
  },

  // === FORMS ===
  {
    type: 'ContactFormBlock', category: 'Forms', label: 'Contact Form', description: 'Customizable contact form.', icon: <ListTodo size={28} className="text-rose-500" />,
    template: { type: 'ContactFormBlock', content: { fields: ['name', 'email', 'message'] } }
  },
  {
    type: 'NewsletterBlock', category: 'Forms', label: 'Newsletter', description: 'Email capture form.', icon: <MessageSquare size={28} className="text-rose-500" />,
    template: { type: 'NewsletterBlock', content: { heading: 'Subscribe', buttonText: 'Subscribe' } }
  },

  // === NAVIGATION ===
  {
    type: 'HeaderBlock', category: 'Navigation', label: 'Header Menu', description: 'Site navigation bar.', icon: <MenuSquare size={28} className="text-blue-500" />,
    template: { type: 'HeaderBlock', content: {} }
  },
  {
    type: 'FooterBlock', category: 'Navigation', label: 'Footer', description: 'Standard site footer.', icon: <Layout size={28} className="text-blue-500" />,
    template: { type: 'FooterBlock', content: {} }
  },

  // === CONTENT ===
  {
    type: 'RichTextBlock', category: 'Content', label: 'Rich Text', description: 'Flexible block with MS-Word formatting.', icon: <Type size={28} className="text-[#00A3A0]" />,
    template: { type: 'RichTextBlock', content: { text: '<h2>Welcome</h2><p>Start typing...</p>' } }
  },
  {
    type: 'BlogListBlock', category: 'Content', label: 'Blog List', description: 'Dynamic feed of blog posts.', icon: <ListOrdered size={28} className="text-[#00A3A0]" />,
    template: { type: 'BlogListBlock', content: { count: 3 } }
  },
  {
    type: 'TeamBlock', category: 'Content', label: 'Team', description: 'Team member profiles.', icon: <Users size={28} className="text-[#00A3A0]" />,
    template: { type: 'TeamBlock', content: { members: [{ name: 'John Doe', role: 'CEO', image: '' }] } }
  },

  // === ADVANCED ===
  {
    type: 'FreeformCanvasBlock', category: 'Advanced', label: 'Freeform Canvas', description: 'Drag and resize images visually.', icon: <MousePointerClick size={28} className="text-red-500" />,
    template: { type: 'FreeformCanvasBlock', content: { height: '600px', backgroundColor: '#f8fafc', items: [{ type: 'image', src: '/images/placeholder.jpg', x: 50, y: 50, width: 300, height: 200 }] } }
  },
  {
    type: 'MapBlock', category: 'Advanced', label: 'Google Map', description: 'Embed an interactive map.', icon: <MapPin size={28} className="text-red-500" />,
    template: { type: 'MapBlock', content: { latitude: 0, longitude: 0, zoom: 12 } }
  },
  {
    type: 'TableBlock', category: 'Advanced', label: 'Data Table', description: 'Rows and columns of data.', icon: <Table size={28} className="text-red-500" />,
    template: { type: 'TableBlock', content: { rows: 3, cols: 3, striped: true } }
  },
  {
    type: 'CustomHtmlBlock', category: 'Advanced', label: 'Custom HTML', description: 'Raw HTML/CSS/JS code.', icon: <Code size={28} className="text-red-500" />,
    template: { type: 'CustomHtmlBlock', content: { html: '<div>Hello World</div>' } }
  },
];

type ComponentPickerProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (template: any) => void;
};

import { defaultCompanies } from '@/components/sections/home/CompanyLogosMarquee';

export function ComponentPicker({ open, onClose, onSelect }: ComponentPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredBlocks = activeCategory === 'All' 
    ? AVAILABLE_BLOCKS 
    : AVAILABLE_BLOCKS.filter(b => b.category === activeCategory);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="lg" 
      fullWidth 
      sx={{ '& .MuiDialog-paper': { height: '85vh', borderRadius: '16px' } }}
    >
      <DialogTitle sx={{ m: 0, p: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Add New Component
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'grey.500' }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>
      
      <Box sx={{ display: 'flex', height: 'calc(100% - 65px)' }}>
        {/* Sidebar Categories */}
        <Box sx={{ width: '220px', borderRight: '1px solid #e2e8f0', bgcolor: '#f8fafc', overflowY: 'auto' }}>
          <List component="nav" sx={{ p: 2, '& .MuiListItemButton-root': { borderRadius: '8px', mb: 0.5 } }}>
            <ListItem disablePadding>
              <ListItemButton 
                selected={activeCategory === 'All'} 
                onClick={() => setActiveCategory('All')}
                sx={{ '&.Mui-selected': { bgcolor: '#00A3A015', color: '#00A3A0' } }}
              >
                <ListItemText primary={<Typography sx={{ fontWeight: activeCategory === 'All' ? 700 : 500, fontSize: '0.9rem' }}>All Components</Typography>} />
              </ListItemButton>
            </ListItem>
            
            <Box sx={{ my: 2, px: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</Typography>
            </Box>

            {CATEGORIES.map((category) => (
              <ListItem key={category} disablePadding>
                <ListItemButton 
                  selected={activeCategory === category} 
                  onClick={() => setActiveCategory(category)}
                  sx={{ '&.Mui-selected': { bgcolor: '#00A3A015', color: '#00A3A0' } }}
                >
                  <ListItemText primary={<Typography sx={{ fontWeight: activeCategory === category ? 700 : 500, fontSize: '0.9rem' }}>{category}</Typography>} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, p: 4, overflowY: 'auto', bgcolor: '#ffffff' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBlocks.map((block) => (
              <div key={block.type} className="h-full">
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#00A3A0',
                      boxShadow: '0 4px 12px rgba(0, 163, 160, 0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => onSelect(block.template)}
                    sx={{ height: '100%', p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                  >
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg inline-block">
                      {block.icon}
                    </div>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600, fontSize: '1rem', mb: 1, color: '#1e293b' }}>
                      {block.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                      {block.description}
                    </Typography>
                  </CardActionArea>
                </Card>
              </div>
            ))}
            {filteredBlocks.length === 0 && (
              <Box sx={{ width: '100%', gridColumn: '1 / -1', py: 10, textAlign: 'center', color: 'text.secondary' }}>
                <Typography>No components found in this category.</Typography>
              </Box>
            )}
          </div>
        </Box>
      </Box>
    </Dialog>
  );
}
