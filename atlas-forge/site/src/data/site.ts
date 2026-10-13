// All the site copy in one place — Atlas Forge details.

/**
 * Colour theme. `accent: null` = pure black & white. Otherwise the accent
 * colour only touches small details (cursors, squares, progress, active menu).
 * Presets: blue '#2E68FF' (ink '#FFFFFF') · yellow '#FFD60A' (ink '#0E0E0E').
 */
export const THEME: { accent: string | null; accentInk: string } = {
	accent: '#2E68FF',
	accentInk: '#FFFFFF',
};

export const ACCENT_PRESETS = {
	blue: { accent: '#2E68FF', accentInk: '#FFFFFF' },
	yellow: { accent: '#FFD60A', accentInk: '#0E0E0E' },
	none: { accent: null, accentInk: '#0E0E0E' },
} as const;

export const SITE = {
	name: 'Atlas Forge',
	city: '',
	email: 'thealgerino23@gmail.com',
	/** Optional — leave empty ('') to hide the phone everywhere */
	phone: '',
	socials: [
		{ label: 'GitHub', href: '#' },
		{ label: 'LinkedIn', href: '#' },
		{ label: 'X', href: '#' },
	],
};

/**
 * Every visible sentence of the site, section by section. Titles are arrays:
 * one entry per line of the big pixel title (keep each line short).
 */
export type ExtraField =
	| { label: string; kind: 'date' }
	| { label: string; kind: 'select'; options: string[] }
	| { label: string; kind: 'text'; placeholder: string };

export const COPY = {
	hero: {
		label: '[Portfolio]',
		tagline: "Sites web, agents IA & flux e-commerce. Huit images pour explorer l'atelier.",
	},
	intro: {
		label: '[01] — Studio',
		title: ['Studio Digital', '& Ingénierie IA'],
		text: 'Conception de plateformes web haute performance, intégration d’agents IA sur-mesure et automatisation e-commerce COD pour entreprises ambitieuses.',
		primaryCta: 'Démarrer un projet',
		secondaryCta: 'Voir les projets',
	},
	services: { label: 'Services' },
	work: {
		label: '[02] — Travaux',
		title: ['Projets &', 'systèmes.'],
		text: 'Plateformes web, architectures d’automatisation et intégrations IA. Cliquez sur un projet pour découvrir son architecture.',
	},
	process: {
		label: '[03] — Processus',
		title: ['De l’idée aux', 'systèmes actifs.'],
	},
	about: {
		label: '[04] — À propos',
		title: ['Code, IA &', 'automatisation.'],
		text: 'Je suis Atlas Forge, studio d’ingénierie web et d’intelligence artificielle. J’accompagne entreprises, architectes et marques e-commerce dans la création de systèmes numériques performants et automatisés.',
		cta: 'Travaillons ensemble',
		/** Area of the portrait kept free of pixels (the face), in 0–1 coordinates */
		face: { x0: 0.33, y0: 0.12, x1: 0.72, y1: 0.48 },
	},
	testimonials: {
		label: '[05] — Ils en parlent',
		rating: '5,0/5 · 48 projets',
	},
	faq: {
		label: '[06] — FAQ',
		title: ['Questions', 'fréquentes.'],
		aside: 'Une autre question ?',
		asideLink: 'Écrivez-moi',
		asideEnd: ', je réponds sous 24 h.',
	},
	contact: {
		label: '[07] — Contact',
		title: ['Bâtissons votre', 'projet.'],
		text: 'Parlez-moi de votre besoin : plateforme web, agent IA ou automatisation e-commerce. Réponse et cadrage sous 24 h.',
		typeLabel: 'Type de mission',
		sessionTypes: ['Plateforme Web', 'Intégration IA', 'Automatisation COD', 'Système sur-mesure', 'Autre'],
		// 4th field of the form, next to the type: pick what this trade needs to quote.
		// kind 'date' (photographer: date of the shoot), 'select' (budget, deadline…)
		// or 'text' (free answer, with a placeholder)
		extraField: {
			label: 'Budget estimé',
			kind: 'select',
			options: ['< 2 000 €', '2 000 – 5 000 €', '5 000 – 10 000 €', '> 10 000 €'],
		} as ExtraField,
		messageLabel: 'Votre besoin',
		messagePlaceholder: 'Objectifs, contraintes, volumétrie… quelques mots suffisent.',
		responseTime: 'Réponse sous 24 h',
		mailSubject: 'Demande de projet — Atlas Forge',
	},
	footer: {
		description: 'Conception de plateformes web sur-mesure, implémentation d’agents IA et automatisation de processus métier.',
	},
	header: { cta: 'Démarrer un projet', ctaShort: 'Démarrer' },
};

export const NAV = [
	{ label: 'Travaux', id: 'travaux' },
	{ label: 'Processus', id: 'processus' },
	{ label: 'À propos', id: 'apropos' },
	{ label: 'Contact', id: 'contact' },
];

export const STATS = [
	{ value: '45+', label: 'Projets déployés' },
	{ value: '99.8%', label: 'Disponibilité & uptime' },
	{ value: '5,0/5', label: 'Satisfaction clients' },
	{ value: '14 j', label: 'Délai moyen de livraison' },
];

/** Services scrolling in the band under the intro (short, one or two words each) */
export const SERVICES = [
	'Sites Web',
	'Agents IA',
	'E-commerce COD',
	'Automatisation',
	'API & Intégrations',
	'Architecture Cloud',
	'Portails Métier',
	'UX / UI Design',
];

export const PROCESS = [
	{
		title: 'Audit & Cadrage',
		text: 'Analyse approfondie de vos processus métier, sélection de la stack idéale et définition des métriques clés.',
		duration: 'J-15',
		icon: 'chat',
	},
	{
		title: 'Architecture',
		text: 'Conception technique, modélisation des flux de données, interfaces UI/UX et spécifications des agents IA.',
		duration: 'J-10',
		icon: 'plan',
	},
	{
		title: 'Ingénierie',
		text: 'Développement complet, intégration des modèles d’IA, connexion des APIs et tests d’automatisation sous charge.',
		duration: 'J-2',
		icon: 'code',
	},
	{
		title: 'Mise en ligne',
		text: 'Déploiement en production, formation aux outils, monitoring temps réel et automatisation continue.',
		duration: 'Jour J',
		icon: 'rocket',
	},
] as const;

export const TESTIMONIALS = [
	{
		quote:
			'Atlas Forge a conçu notre plateforme avec une fluidité exceptionnelle et un sens du détail rare. Nos clients sont immédiatement séduits par l’expérience.',
		author: 'Cabinet Khemisti & Associés',
		role: 'Architecture & Design d’Espace',
	},
	{
		quote:
			'L’automatisation des confirmations et des flux logistiques a réduit nos abandons et divisé le temps de traitement de nos commandes par quatre.',
		author: 'Nassim B.',
		role: 'Fondateur — COD Express & Retail',
	},
	{
		quote:
			'L’intégration de l’agent IA pour les réservations traite désormais 80% des requêtes instantanément. Une collaboration technique sans faille.',
		author: 'Yasmine Merad',
		role: 'Directrice des Opérations — Nomad Escapes',
	},
];

export const FAQ = [
	{
		q: 'Quels types de projets développez-vous ?',
		a: 'Nous concevons des sites vitrines haute performance, des applications web complexes, des agents conversationnels et automatisés par IA, ainsi que des tunnels e-commerce optimisés COD.',
	},
	{
		q: 'Comment fonctionne l’intégration de l’IA dans nos outils existants ?',
		a: 'Nous connectons les modèles d’IA (LLM, vision, assistants) directement à vos systèmes via API, webhooks ou scripts sur-mesure, en assurant une sécurité totale de vos données.',
	},
	{
		q: 'Quels sont les délais habituels de livraison ?',
		a: 'Entre 10 et 20 jours selon la complexité du système. Un prototype interactif et les jalons techniques vous sont partagés dès la première semaine.',
	},
	{
		q: 'Proposez-vous un accompagnement après la mise en ligne ?',
		a: 'Oui. Chaque livraison inclut une phase de prise en main, une documentation technique claire et un suivi de stabilité pour garantir des performances optimales.',
	},
	{
		q: 'Comment se déroulent le devis et les paiements ?',
		a: 'Après notre échange initial, nous établissons un cahier des charges et un devis fixe sans surprise. Les règlements s’effectuent en étapes validées (acompte et solde à la livraison).',
	},
];
