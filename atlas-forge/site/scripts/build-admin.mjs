import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const adminSrc = path.join(root, 'admin', 'projets.html');
const outHtml = path.join(root, 'public', 'admin.html');
const dbDir = path.join(root, '.publish', 'db');

const projectFiles = fs.readdirSync(path.join(dbDir, 'projects')).filter(f => f.endsWith('.json'));
const initialProjects = projectFiles.map(f => {
	const id = path.basename(f, '.json');
	const data = JSON.parse(fs.readFileSync(path.join(dbDir, 'projects', f), 'utf8'));
	return { id, data };
});

const initialConfig = JSON.parse(fs.readFileSync(path.join(dbDir, 'site', 'config.json'), 'utf8'));

let html = fs.readFileSync(adminSrc, 'utf8');

// 1. Fix blob() helper so it resolves to /projects/assets/<id>.jpg or data URLs
html = html.replace(
	"const blob = (id) => '/_blob/' + id;",
	"const blob = (id) => id ? (id.startsWith('data:') || id.startsWith('blob:') || id.startsWith('http') ? id : '/projects/assets/' + id + '.jpg') : '';"
);

// 2. Polyfill window.claude when running in standalone browser
const polyfill = `
	// --- Local Offline & Browser Storage Adapter for Atlas Forge ---
	if (!window.claude) {
		const STORAGE_KEY = 'atlas_forge_admin_db_v1';
		let localData = null;
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) localData = JSON.parse(saved);
		} catch (_) {}

		if (!localData || !localData.projects || !Object.keys(localData.projects).length) {
			localData = {
				projects: Object.fromEntries(${JSON.stringify(initialProjects)}.map(p => [p.id, p.data])),
				trash: {},
				history: {},
				site: {
					config: ${JSON.stringify(initialConfig)},
					deploy: {
						status: 'done',
						target: 'local',
						siteUrl: 'http://localhost:5173',
						checkEveryMinutes: 720,
						lastPublishedAt: new Date().toISOString(),
						message: 'Prêt pour modifications locales'
					},
					edits: {
						lastEditAt: new Date().toISOString()
					}
				}
			};
			try { localStorage.setItem(STORAGE_KEY, JSON.stringify(localData)); } catch (_) {}
		}

		const listeners = new Set();
		function notify() {
			try { localStorage.setItem(STORAGE_KEY, JSON.stringify(localData)); } catch (_) {}
			for (const fn of listeners) {
				try { fn(); } catch (err) { console.error(err); }
			}
		}

		function getPath(pathStr) {
			const parts = pathStr.split('/');
			let cur = localData;
			for (const p of parts) {
				if (!cur || typeof cur !== 'object') return undefined;
				cur = cur[p];
			}
			return cur;
		}

		function setPath(pathStr, val) {
			const parts = pathStr.split('/');
			let cur = localData;
			for (let i = 0; i < parts.length - 1; i++) {
				const p = parts[i];
				if (!cur[p] || typeof cur[p] !== 'object') cur[p] = {};
				cur = cur[p];
			}
			cur[parts[parts.length - 1]] = val;
			notify();
		}

		function deletePath(pathStr) {
			const parts = pathStr.split('/');
			let cur = localData;
			for (let i = 0; i < parts.length - 1; i++) {
				cur = cur[parts[i]];
				if (!cur) return;
			}
			delete cur[parts[parts.length - 1]];
			notify();
		}

		const localDb = {
			doc(pathStr) {
				return {
					async get() {
						const d = getPath(pathStr);
						return { exists: d !== undefined, data: () => d ? JSON.parse(JSON.stringify(d)) : undefined };
					},
					async set(data) {
						setPath(pathStr, JSON.parse(JSON.stringify(data)));
					},
					async update(fields) {
						const cur = getPath(pathStr) || {};
						setPath(pathStr, { ...cur, ...JSON.parse(JSON.stringify(fields)) });
					},
					async delete() {
						deletePath(pathStr);
					},
					onSnapshot(callback, errback) {
						const run = () => {
							const d = getPath(pathStr);
							callback({ exists: d !== undefined, data: () => d ? JSON.parse(JSON.stringify(d)) : undefined });
						};
						run();
						listeners.add(run);
						return () => listeners.delete(run);
					}
				};
			},
			collection(colName) {
				return {
					doc(id) {
						return localDb.doc(colName + '/' + id);
					},
					onSnapshot(callback) {
						const run = () => {
							const col = localData[colName] || {};
							const docs = Object.entries(col).map(([id, data]) => ({
								id,
								data: () => JSON.parse(JSON.stringify(data))
							}));
							callback({ docs, metadata: { hasPendingWrites: false } });
						};
						run();
						listeners.add(run);
						return () => listeners.delete(run);
					}
				};
			}
		};

		const localAssets = {
			async upload(file) {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => {
						const hex = Array.from(crypto.getRandomValues(new Uint8Array(16)))
							.map(b => b.toString(16).padStart(2, '0')).join('');
						resolve({ id: reader.result }); // Store data URL directly
					};
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			}
		};

		const localUser = {
			async id() { return 'atlas-admin'; },
			async canEdit() { return true; }
		};

		window.claude = {
			async use(capability) {
				if (capability === 'db') return localDb;
				if (capability === 'assets') return localAssets;
				if (capability === 'user') return localUser;
				return null;
			}
		};
	}
`;

// Insert polyfill just before (async () => { db = await window.claude?.use?.('db');
html = html.replace('(async () => {\n\t\tdb = await window.claude?.use?.(\'db\');', `${polyfill}\n\t(async () => {\n\t\tdb = await window.claude?.use?.('db');`);

fs.writeFileSync(outHtml, html);
console.log('Successfully built public/admin.html with local storage support!');
