const fs = require("fs");
const path = require("path");

const root = process.cwd();
const ts = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);

const filesDir = __dirname;
const pagePath = path.join(root, "src", "pages", "PlaceDetailPage.jsx");
const cssPath = path.join(root, "src", "styles", "global.css");
const dataDir = path.join(root, "src", "data");
const compDir = path.join(root, "src", "components");

if (!fs.existsSync(pagePath)) {
  console.error("Khong tim thay src/pages/PlaceDetailPage.jsx");
  process.exit(1);
}
if (!fs.existsSync(cssPath)) {
  console.error("Khong tim thay src/styles/global.css");
  process.exit(1);
}
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

fs.copyFileSync(pagePath, `${pagePath}.bak-admin-history-${ts}`);
fs.copyFileSync(cssPath, `${cssPath}.bak-admin-history-${ts}`);

fs.copyFileSync(path.join(filesDir, "adminHistory2024.js"), path.join(dataDir, "adminHistory2024.js"));
fs.copyFileSync(path.join(filesDir, "AdministrativeTimeline.jsx"), path.join(compDir, "AdministrativeTimeline.jsx"));

let page = fs.readFileSync(pagePath, "utf8");

if (!page.includes("AdministrativeTimeline")) {
  const importLine = `import AdministrativeTimeline from "../components/AdministrativeTimeline";\n`;
  const lastImport = [...page.matchAll(/^import .+;$/gm)].pop();
  if (lastImport) {
    const insertAt = lastImport.index + lastImport[0].length + 1;
    page = page.slice(0, insertAt) + importLine + page.slice(insertAt);
  } else {
    page = importLine + page;
  }
}

function detectPlaceVar(source) {
  const candidates = ["place", "currentPlace", "selectedPlace", "detail", "locality"];
  for (const name of candidates) {
    const re = new RegExp(`\\b${name}\\b`);
    if (re.test(source)) return name;
  }
  return "place";
}

const placeVar = detectPlaceVar(page);
const timeline = `\n        <AdministrativeTimeline place={${placeVar}} />\n`;

if (!page.includes("<AdministrativeTimeline")) {
  if (page.includes("</main>")) {
    page = page.replace("</main>", `${timeline}      </main>`);
  } else if (page.includes("</section>")) {
    page = page.replace("</section>", `${timeline}      </section>`);
  } else {
    console.warn("Khong tu dong tim duoc vi tri chen. Hay chen thu cong: " + timeline);
  }
}

fs.writeFileSync(pagePath, page, "utf8");

let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes("admin-history-card")) {
  css += "\n" + fs.readFileSync(path.join(filesDir, "admin-history.css"), "utf8");
  fs.writeFileSync(cssPath, css, "utf8");
}

console.log("Da them khoi Qua trinh sap xep hanh chinh.");
console.log("Backup:");
console.log(`- ${pagePath}.bak-admin-history-${ts}`);
console.log(`- ${cssPath}.bak-admin-history-${ts}`);
console.log("Chay npm run dev de kiem tra.");
