import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "..", "data.sqlite3");
export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    before_image TEXT NOT NULL,
    after_image TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    project_type TEXT,
    message TEXT,
    photo_path TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Add photo_path to pre-existing databases created before this column existed.
const contactColumns = db.prepare("PRAGMA table_info(contact_submissions)").all() as { name: string }[];
if (!contactColumns.some((c) => c.name === "photo_path")) {
  db.exec("ALTER TABLE contact_submissions ADD COLUMN photo_path TEXT");
}

// Seed with placeholder content on first run so the site isn't empty out of the box.
const reviewCount = (db.prepare("SELECT COUNT(*) as n FROM reviews").get() as { n: number }).n;
if (reviewCount === 0) {
  const insert = db.prepare(
    "INSERT INTO reviews (name, rating, text, status) VALUES (?, ?, ?, 'approved')"
  );
  const seedReviews: [string, number, string][] = [
    ["Sarah M.", 5, "Andrew and his crew redid our kitchen and it looks incredible. On time, on budget, no surprises."],
    ["Mike R.", 5, "Full roof replacement after storm damage. Fast, professional, and cleaned up every day."],
    ["Jen K.", 5, "We've used Triz for three different projects now. Always our first call."],
    ["Tom B.", 5, "Poured a new driveway and patio for us. Clean lines, finished ahead of schedule."],
    ["Dana P.", 4, "Great communication throughout our addition project. Would hire again."],
    ["Chris W.", 5, "Honest pricing and quality work on our deck build. Highly recommend."],
  ];
  const insertMany = db.transaction((rows: [string, number, string][]) => {
    for (const r of rows) insert.run(...r);
  });
  insertMany(seedReviews);
}

const galleryCount = (db.prepare("SELECT COUNT(*) as n FROM gallery").get() as { n: number }).n;
if (galleryCount === 0) {
  const insert = db.prepare(
    "INSERT INTO gallery (title, category, before_image, after_image, status) VALUES (?, ?, ?, ?, 'approved')"
  );
  const seedGallery: [string, string, string, string][] = [
    ["Franklin Kitchen Remodel", "Remodeling", "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop"],
    ["Full Tear-Off Roof Replacement", "Roofing", "https://images.unsplash.com/photo-1622015663084-307d19eabca2?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1200&auto=format&fit=crop"],
    ["Stamped Concrete Patio", "Concrete", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop"],
    ["Two-Story Home Addition", "Additions", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop"],
    ["Backyard Deck & Pergola", "Outdoor Living", "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=1200&auto=format&fit=crop"],
    ["Siding & Exterior Refresh", "Exteriors", "https://images.unsplash.com/photo-1596205250966-6a26f7c2b7cf?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=1200&auto=format&fit=crop"],
    ["Basement Remodel", "Remodeling", "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"],
    ["Covered Front Porch Addition", "Additions", "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop"],
  ];
  const insertMany = db.transaction((rows: [string, string, string, string][]) => {
    for (const r of rows) insert.run(...r);
  });
  insertMany(seedGallery);
}
