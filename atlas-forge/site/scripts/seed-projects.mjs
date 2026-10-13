import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'public', 'projects', 'assets');
const dbDir = path.join(root, '.publish', 'db');
const projectsDbDir = path.join(dbDir, 'projects');
const siteDbDir = path.join(dbDir, 'site');

fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(projectsDbDir, { recursive: true });
fs.mkdirSync(siteDbDir, { recursive: true });

async function downloadToAsset(url, assetId) {
	const destPath = path.join(assetsDir, `${assetId}.jpg`);
	if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
		return true;
	}
	try {
		const fullUrl = url.includes('?') ? url : `${url}?w=2000&q=82&fm=jpg&fit=max`;
		const res = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
		if (!res.ok) {
			console.error(`Failed ${url}: HTTP ${res.status}`);
			return false;
		}
		const buffer = Buffer.from(await res.arrayBuffer());
		fs.writeFileSync(destPath, buffer);
		console.log(`Saved asset ${assetId}.jpg (${Math.round(buffer.length / 1024)} KB)`);
		return true;
	} catch (err) {
		console.error(`Error downloading ${url}:`, err.message);
		return false;
	}
}

function makeAssetId(name) {
	return crypto.createHash('md5').update(`atlas-forge-${name}`).digest('hex');
}

const PROJECTS_CONFIG = {
	name: 'Atlas Forge',
	fields: [
		{ key: 'client', label: 'Client' },
		{ key: 'equipe', label: 'Équipe' },
		{ key: 'livrables', label: 'Livrables' },
		{ key: 'outils', label: 'Stack' },
	],
};

const RAW_PROJECTS = [
	{
		title: 'Khemisti Studio',
		category: 'Plateforme Web',
		year: 2025,
		summary: 'Plateforme immersive et portfolio interactif en 3D temps réel pour un cabinet d’architecture contemporaine.',
		description: [
			'Conception d’une identité numérique épurée mettant en valeur les maquettes et réalisations architecturales à travers une navigation cinématique et des rendus WebGL fluides.',
			'Intégration d’un espace privé pour les consultations d’appels d’offres et d’une galerie haute résolution optimisée pour le mobile comme pour les grands écrans.',
		],
		info: {
			client: 'Cabinet Khemisti & Associés',
			equipe: 'Lead Fullstack & UI/UX',
			livrables: 'Webapp 3D, CMS Headless, SEO & Optimisation CWV',
			outils: 'Next.js 15, Tailwind v4, Three.js, Vercel',
		},
		images: [
			{ role: 'cover', alt: 'Façade contemporaine du projet architectural', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
			{ role: 'gallery', alt: 'Intérieur minimaliste en béton ciré', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9' },
			{ role: 'gallery', alt: 'Détail de structure en verre et lumière', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c' },
			{ role: 'gallery', alt: 'Espace de vie ouvert sur jardin contemporain', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3' },
			{ role: 'gallery', alt: 'Vue nocturne du pavillon architectural', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d' },
		],
	},
	{
		title: 'Nexus COD Pipeline',
		category: 'Automatisation COD',
		year: 2025,
		summary: 'Moteur événementiel automatisant l’aiguillage, le calcul dynamique des frais et le tracking en direct sur 58 Wilayas.',
		description: [
			'Déploiement d’une architecture résiliente traitant plus de 4 000 commandes quotidiennes avec validation regex des numéros de téléphone et détection instantanée des doublons.',
			'Dispatch automatisé entre livraison à domicile et Stop-Desk selon la performance des transporteurs locaux, avec notifications SMS et WhatsApp.',
		],
		info: {
			client: 'COD Express & Retail Network',
			equipe: 'Ingénieur Automatisation & Backend',
			livrables: 'Orchestrateur multi-transporteurs, Webhooks, Sync ERP',
			outils: 'Node.js, n8n, PostgreSQL, Redis, APIs Logistiques',
		},
		images: [
			{ role: 'cover', alt: 'Centre logistique moderne et tri automatisé', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d' },
			{ role: 'gallery', alt: 'Colis étiquetés prêts pour expédition', url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745' },
			{ role: 'gallery', alt: 'Supervision des flux de stockage', url: 'https://images.unsplash.com/photo-1553413077-190dd305871c' },
			{ role: 'gallery', alt: 'Chariot de manutention et rayonnages', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec' },
			{ role: 'gallery', alt: 'Écran de contrôle logistique temps réel', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
		],
	},
	{
		title: 'Nomad AI Concierge',
		category: 'Intégration IA',
		year: 2024,
		summary: 'Agent autonome multilingue gérant les réservations de séjours et les recommandations touristiques en temps réel.',
		description: [
			'Mise en œuvre d’un assistant conversationnel capable de comprendre les requêtes complexes en français, anglais et dialecte local pour recommander les circuits touristiques adaptés.',
			'Connexion directe au calendrier des disponibilités et traitement automatisé des demandes d’hébergement avec qualification instantanée des leads.',
		],
		info: {
			client: 'Nomad Escapes & Eco-Resorts',
			equipe: 'Ingénieur IA & Fullstack',
			livrables: 'Agent multimodal, RAG vectoriel, Interface de chat native',
			outils: 'Gemini 2.5 Flash, Supabase pgvector, FastAPI, React',
		},
		images: [
			{ role: 'cover', alt: 'Camp éco-responsable dans le désert au crépuscule', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9' },
			{ role: 'gallery', alt: 'Ciel étoilé sur les dunes sahariennes', url: 'https://images.unsplash.com/photo-1542401886-65d6c61db217' },
			{ role: 'gallery', alt: 'Salon extérieur contemporain au cœur d’une oasis', url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090' },
			{ role: 'gallery', alt: 'Canyon naturel et reliefs rocheux', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800' },
			{ role: 'gallery', alt: 'Voyageurs observant le coucher de soleil', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1' },
		],
	},
	{
		title: 'Kalyon BTP Portal',
		category: 'Plateforme Web',
		year: 2024,
		summary: 'Application web centralisée pour la planification, le suivi des ressources et l’inventaire des grands chantiers.',
		description: [
			'Développement d’un portail collaboratif permettant aux conducteurs de travaux de téléverser leurs rapports quotidiens et de synchroniser les plannings d’approvisionnement en temps réel.',
			'Dashboard interactif avec graphiques d’avancement, alertes de maintenance préventive et synchronisation hors-ligne sur le terrain.',
		],
		info: {
			client: 'Kalyon Construction & BTP',
			equipe: 'Architecte Solution & Fullstack Dev',
			livrables: 'Dashboard analytique temps réel, Gestion documentaire, RBAC',
			outils: 'React 19, TypeScript, TanStack Query, Prisma, PostgreSQL',
		},
		images: [
			{ role: 'cover', alt: 'Grue de construction et structure urbaine moderne', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6' },
			{ role: 'gallery', alt: 'Structure métallique et poutres industrielles', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e' },
			{ role: 'gallery', alt: 'Ingénieurs consultant des plans sur tablette', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd' },
			{ role: 'gallery', alt: 'Chantier architectural au lever du jour', url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625' },
			{ role: 'gallery', alt: 'Complexe industriel moderne achevé', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f' },
		],
	},
	{
		title: 'Aura Voice Sales',
		category: 'Intégration IA',
		year: 2025,
		summary: 'Agent vocal ultra-rapide confirmant les commandes Cash-on-Delivery avec dialogue naturel et détection d’hésitation.',
		description: [
			'Automatisation des appels de confirmation de commande sous 5 minutes après validation du panier, avec traitement de la langue parlée et des désistements.',
			'Chute du taux de retour de colis (NPAI/refus) de 28% à moins de 8% dès le premier mois d’exploitation.',
		],
		info: {
			client: 'Aura Cosmetics & Parfums',
			equipe: 'Spécialiste IA Vocale & MLOps',
			livrables: 'Système d’appels entrants/sortants, Analyse des sentiments',
			outils: 'Gemini Live API, WebSockets, Python, SIP Trunk, Redis',
		},
		images: [
			{ role: 'cover', alt: 'Flacon de parfum de luxe et packaging soigné', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e' },
			{ role: 'gallery', alt: 'Microphone de studio et interface audio', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc' },
			{ role: 'gallery', alt: 'Produits cosmétiques alignés en boutique', url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388' },
			{ role: 'gallery', alt: 'Casque audio professionnel sur bureau épuré', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
			{ role: 'gallery', alt: 'Ambiance créative studio et design sonore', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4' },
		],
	},
	{
		title: 'Atlas Data Sync',
		category: 'Automatisation COD',
		year: 2024,
		summary: 'Pipeline automatisé synchronisant les stocks, factures et statuts d’expédition entre 12 fournisseurs et 3 marketplaces.',
		description: [
			'Mise en place de flux de données asynchrones sans rupture de service pour éliminer les ressaisies manuelles et les ruptures d’inventaire.',
			'Alerting automatisé en temps réel en cas de divergence ou de retard transporteur, garantissant une intégrité totale des flux financiers.',
		],
		info: {
			client: 'Maghreb Distribution & Logistique',
			equipe: 'Data Engineer & DevOps',
			livrables: 'Pipelines ETL automatisés, Connecteurs API sur-mesure',
			outils: 'Python, Docker, Apache Airflow, n8n, Supabase',
		},
		images: [
			{ role: 'cover', alt: 'Faisceau de fibre optique et transmission de données', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31' },
			{ role: 'gallery', alt: 'Salle de serveurs haute sécurité en datacenter', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8' },
			{ role: 'gallery', alt: 'Microprocesseur et circuits électroniques bleutés', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475' },
			{ role: 'gallery', alt: 'Dashboard de métriques réseau en temps réel', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f' },
			{ role: 'gallery', alt: 'Matrice de câblage haute vitesse', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
		],
	},
	{
		title: 'Sahara Horizon',
		category: 'Plateforme Web',
		year: 2025,
		summary: 'Expérience digitale immersive présentant des circuits sahariens exclusifs avec réservation instantanée et cartographie 3D.',
		description: [
			'Conception d’une interface visuelle percutante rythmée par la vidéo et la photographie haute définition des grands espaces sahariens.',
			'Système de réservation intuitif guidant l’utilisateur à travers les étapes de préparation, météo en direct et options d’équipements.',
		],
		info: {
			client: 'Sahara Horizon Expeditions',
			equipe: 'Lead Frontend & UI/UX Designer',
			livrables: 'Vitrine interactive, Cartographie interactive, Checkout',
			outils: 'Next.js, Mapbox GL, Tailwind CSS, Stripe, Motion',
		},
		images: [
			{ role: 'cover', alt: 'Dunes dorées au cœur du Sahara algérien', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9' },
			{ role: 'gallery', alt: 'Véhicule tout-terrain en piste désertique', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf' },
			{ role: 'gallery', alt: 'Cérémonie du thé traditionnel au bivouac', url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38' },
			{ role: 'gallery', alt: 'Architecture en pisé et ksour millénaires', url: 'https://images.unsplash.com/photo-1548013146-72479768bada' },
			{ role: 'gallery', alt: 'Massif rocheux du Tassili n’Ajjer', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
		],
	},
	{
		title: 'DocuMind Enterprise',
		category: 'Intégration IA',
		year: 2024,
		summary: 'Système de recherche intelligente indexant plus de 50 000 contrats et textes réglementaires en recherche vectorielle.',
		description: [
			'Accélération des revues contractuelles grâce à des citations exactes vérifiables et un agent de synthèse respectant les normes de confidentialité des données.',
			'Réduction de 65% du temps de recherche documentaire pour les juristes et auditeurs du cabinet.',
		],
		info: {
			client: 'Alliance Droit & Conseil',
			equipe: 'Chercheur NLP & Ingénieur Fullstack',
			livrables: 'Moteur de recherche sémantique, Extraction d’entités, Synthèse',
			outils: 'Python, FastAPI, LlamaIndex, Qdrant, React, Tailwind',
		},
		images: [
			{ role: 'cover', alt: 'Bibliothèque contemporaine et baies vitrées lumineuses', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da' },
			{ role: 'gallery', alt: 'Tablette affichant un document juridique numérisé', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b' },
			{ role: 'gallery', alt: 'Salle de réunion épurée pour cabinet de conseil', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
			{ role: 'gallery', alt: 'Graphe sémantique abstrait sur écran de veille', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5' },
			{ role: 'gallery', alt: 'Lignes de code d’analyse vectorielle', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' },
		],
	},
	{
		title: 'OptiRoute COD',
		category: 'Automatisation COD',
		year: 2025,
		summary: 'Optimisation algorithmique des livraisons urbaines regroupant les colis par quartier pour maximiser le taux de remise en main propre.',
		description: [
			'Génération d’itinéraires dynamiques adaptés au trafic et aux créneaux de disponibilité des clients pour les livraisons en paiement à la livraison.',
			'Augmentation de 32% du nombre de commandes livrées par coursier et par jour avec confirmation par code SMS sécurisé.',
		],
		info: {
			client: 'FastLogistics Urbaine',
			equipe: 'Développeur Algorithmique & Mobile',
			livrables: 'Algorithme de clustering géographique, App PWA pour livreurs',
			outils: 'TypeScript, Node.js, Leaflet, OR-Tools, PWA',
		},
		images: [
			{ role: 'cover', alt: 'Vue aérienne nocturne du réseau routier et flux urbains', url: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82' },
			{ role: 'gallery', alt: 'Coursier urbain avec sac de livraison', url: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1' },
			{ role: 'gallery', alt: 'Itinéraire GPS affiché sur smartphone', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b' },
			{ role: 'gallery', alt: 'Plateforme de départ des tournées de livraison', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d' },
			{ role: 'gallery', alt: 'Signature électronique de réception de colis', url: 'https://images.unsplash.com/photo-1556742049-0a67e5572263' },
		],
	},
];

async function seed() {
	fs.writeFileSync(path.join(siteDbDir, 'config.json'), JSON.stringify(PROJECTS_CONFIG, null, 2));

	console.log('Downloading and processing project assets...');
	for (let i = 0; i < RAW_PROJECTS.length; i++) {
		const proj = RAW_PROJECTS[i];
		const projSlug = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		console.log(`\nProject [${i + 1}/9]: ${proj.title}`);

		const coverImg = proj.images.find((img) => img.role === 'cover');
		const coverAssetId = makeAssetId(`${projSlug}-cover`);
		await downloadToAsset(coverImg.url, coverAssetId);

		const galleryItems = [];
		const galleryImgs = proj.images.filter((img) => img.role === 'gallery');
		for (let g = 0; g < galleryImgs.length; g++) {
			const gImg = galleryImgs[g];
			const gAssetId = makeAssetId(`${projSlug}-gallery-${g + 1}`);
			await downloadToAsset(gImg.url, gAssetId);
			galleryItems.push({
				asset: gAssetId,
				alt: gImg.alt,
			});
		}

		const projectDoc = {
			title: proj.title,
			category: proj.category,
			year: proj.year,
			summary: proj.summary,
			description: proj.description,
			info: proj.info,
			cover: {
				asset: coverAssetId,
				alt: coverImg.alt,
			},
			gallery: galleryItems,
			visible: true,
			order: i,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		const docPath = path.join(projectsDbDir, `${projSlug}.json`);
		fs.writeFileSync(docPath, JSON.stringify(projectDoc, null, 2));
		console.log(`Created document: ${path.basename(docPath)}`);
	}

	console.log('\nAll 9 project documents and assets prepared successfully.');
}

seed();
