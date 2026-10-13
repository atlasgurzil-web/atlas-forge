import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imagesRoot = path.join(root, '..', 'images');
const assetsDir = path.join(root, 'public', 'projects', 'assets');

fs.mkdirSync(path.join(imagesRoot, 'Hero'), { recursive: true });
fs.mkdirSync(path.join(imagesRoot, 'A-propos'), { recursive: true });
fs.mkdirSync(path.join(imagesRoot, 'Avis-clients'), { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

async function downloadFile(url, destPath) {
	if (fs.existsSync(destPath) && fs.statSync(destPath).size > 10000) {
		console.log(`Already exists: ${path.basename(destPath)}`);
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
		console.log(`Saved: ${path.basename(destPath)} (${Math.round(buffer.length / 1024)} KB)`);
		return true;
	} catch (err) {
		console.error(`Error ${url}:`, err.message);
		return false;
	}
}

const HERO_IMAGES = [
	{ name: '01-architecture-glass-facade.jpg', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' },
	{ name: '02-cyber-security-hardware.jpg', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
	{ name: '03-circuit-board-silicon.jpg', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475' },
	{ name: '04-minimal-developer-workspace.jpg', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
	{ name: '05-concrete-minimal-structure.jpg', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f' },
	{ name: '06-automated-logistics-hub.jpg', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d' },
	{ name: '07-geometric-atrium-interior.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c' },
	{ name: '08-robotic-automation-arm.jpg', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e' },
	{ name: '09-cloud-server-datacenter.jpg', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31' },
	{ name: '10-sahara-desert-landscapes.jpg', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9' },
	{ name: '11-code-editor-engineering.jpg', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c' },
	{ name: '12-modern-creative-studio.jpg', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174' },
];

const ABOUT_IMAGES = [
	{ name: '01-portrait-fondateur-studio.jpg', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
];

const TESTIMONIALS_IMAGES = [
	{ name: '01-cabinet-architecture-espace.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
	{ name: '02-cod-retail-logistique.jpg', url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745' },
	{ name: '03-nomad-desert-escapes.jpg', url: 'https://images.unsplash.com/photo-1542401886-65d6c61db217' },
];

async function run() {
	console.log('Downloading Hero images...');
	for (const item of HERO_IMAGES) {
		await downloadFile(item.url, path.join(imagesRoot, 'Hero', item.name));
	}

	console.log('Downloading About image...');
	for (const item of ABOUT_IMAGES) {
		await downloadFile(item.url, path.join(imagesRoot, 'A-propos', item.name));
	}

	console.log('Downloading Testimonials images...');
	for (const item of TESTIMONIALS_IMAGES) {
		await downloadFile(item.url, path.join(imagesRoot, 'Avis-clients', item.name));
	}

	console.log('Hero, About, and Testimonials downloads complete.');
}

run();
