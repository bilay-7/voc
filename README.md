# Voice of Children Website

Production single-page React website for Voice of Children — objective-based STEM and life-skills education.

Built strictly in accordance with the **Voice of Children Website Development Task Brief** and approved high-fidelity design mockups/wireframes.

---

## 1. Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 with custom brand tokens and responsive typography
- **Typography:** Self-hosted `@fontsource` packages:
  - Serif (Headings & Badges): `Bodoni Moda` (weights 400, 500, 600, italic)
  - Sans-serif (Body & Metadata): `Outfit` (weights 300, 400, 500, 600)
- **Icons:** Custom SVG program glyphs matching design mockups + official vector icons for Instagram & Facebook
- **Backend / Database:** `@supabase/supabase-js` client configured for the `enquiries` table with local validation fallback

---

## 2. Design Tokens & Palette

Only the 6 brand tokens defined in Section 6.1 of the brief are used across the codebase:

| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#231F20` | Header, hero, dark sections, footer, main body text |
| `--gold` | `#AD974F` | Primary buttons, lines, arrows, active tabs, borders, icons |
| `--bronze` | `#8E793E` | Gold text and icons on light backgrounds, input focus borders |
| `--sun` | `#F5D36B` | Logo accents, section titles, hover states, active highlights |
| `--mist` | `#EAEAEA` | Alternate light sections, form container background |
| `--paper` | `#FFFFFF` | Main light backgrounds, cards, input surfaces |

---

## 3. Project Structure

```text
VOC-WEB/
├── public/
│   ├── assets/
│   │   ├── logo.png            # Official arched Voice of Children brand logo
│   │   ├── logo-emblem.png     # Emblem icon
│   │   ├── voc.mp4             # Web-optimized H.264 video for Traffic Path
│   │   └── traffic-poster.jpg  # Video fallback poster frame
│   ├── favicon.svg             # Gold brand favicon
│   ├── og-image.svg            # Open Graph social sharing banner
│   └── robots.txt              # Standard web crawler rules
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Sticky header with scrollspy & mobile drawer
│   │   ├── HeroGrid.jsx        # Grid #1: 3-column hero (Vision, Emblem, Mission)
│   │   ├── LearningCycle.jsx   # Grid #2: 3-card auto-advancing circular loop
│   │   ├── Programs.jsx        # 12-program responsive grid
│   │   ├── YoungGardeners.jsx  # Split-card botanical line-art layout
│   │   ├── AiWorkshop.jsx      # 8-module vertical/horizontal tabs & outcomes
│   │   ├── TrafficPark.jsx     # Traffic Path video player @ 0.65x & concise copy
│   │   ├── Contact.jsx         # Figure 12 editorial contact & validated form
│   │   ├── Footer.jsx          # Luxury dark footer with vector social links
│   │   └── Modal.jsx           # Accessible dialog (Esc, focus-trap, restore)
│   ├── data/
│   │   ├── content.js          # Approved text: profile, statements, contact
│   │   ├── programs.js         # 12 programs: titles, summaries, descriptions
│   │   └── aiWorkshop.js       # 8 modules: titles, subtitles, learning outcomes
│   ├── lib/
│   │   ├── icons.jsx           # 12 custom program SVGs, Instagram & Facebook
│   │   └── supabase.js         # Supabase client and enquiry insert logic
│   ├── App.jsx                 # Root component orchestrating modals & scroll
│   ├── index.css               # Design tokens, typography, and utility classes
│   └── main.jsx                # Application mount point
├── .env.example                # Template for environment variables
├── index.html                  # HTML entry point with meta tags & preloads
├── package.json                # Dependencies and npm scripts
└── vite.config.js              # Vite configuration
```

---

## 4. Local Setup & Running

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Add your Supabase credentials (never commit the `.env` file):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Note on Local Testing:** If Supabase credentials are not provided, the contact form validates all required fields client-side and triggers the approved confirmation message without throwing runtime errors.

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 5. Supabase Database Schema

Create the `enquiries` table in your Supabase project:

```sql
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  parent_name text not null,
  phone text not null,
  email text,
  child_age integer not null,
  program text not null,
  message text
);

-- Enable Row Level Security (RLS)
alter table public.enquiries enable row level security;

-- Allow anonymous form submissions (insert-only)
create policy "Allow anonymous inserts"
  on public.enquiries
  for insert
  with check (true);
```

---

## 6. How to Update Website Content

To maintain strict compliance with Section 13, all website content is decoupled from components and stored in `src/data/`:

1. **Brand Statements & General Info:** Edit `src/data/content.js` (Vision, Mission, Statement, Social links, Phone/Email, Boot Camp details, Traffic Path info, Privacy Notice).
2. **Programs:** Edit `src/data/programs.js` (Titles, summaries, full descriptions, icon identifiers).
3. **AI Workshop Modules:** Edit `src/data/aiWorkshop.js` (Module numbers, titles, subtitles, outcomes list).
4. **Google Form Links:** Update `site.googleFormUrl` in `src/data/content.js` when the client provides the final Google Form URL.

---

## 7. Deviations from Brief (Documented as Required by Section 7)

All intentional adaptations are documented below:
1. **Logo Asset:** Extracted and vectorized high-resolution PNGs (`logo.png` and `logo-emblem.png`) from the client's provided image pack to ensure crisp rendering on retina displays until the client delivers an official `.svg` file.
2. **Pedal & Path Rename:** Renamed to **Traffic Path** per team lead instruction; anchor link alias `#traffic-path` is maintained alongside `#traffic-park` for backward compatibility.
3. **Video Codec Optimization:** Converted original Apple ProRes `.mov` to universal web-standard **H.264 MP4** (`voc.mp4`) with a custom fallback poster to ensure instant autoplay across all modern mobile and desktop browsers (Chromium, Safari, Edge, Firefox).
4. **Temporary Privacy Copy:** Sensible draft legal privacy notice implemented in `content.js` pending client approval as designated under Section 12.2.

---

## 8. Open Items (Pending Client Inputs — Section 12.2)

1. Live Google Form URL for Young Gardeners Boot Camp registration.
2. Production Supabase project URL and anon public key.
3. Official client SVG vector logo file.
4. Final approved privacy policy text.
5. Production DNS configuration for `www.voiceofchildren.international`.

---

## 9. Acceptance Criteria Verification Checklist (Section 13)

- [x] **Design & Layout:** Matches wireframes (Section 5) and mockups (Section 7) at 1440px and 390px.
- [x] **Grid #1 (Hero):** Vision left, logo center, mission right on desktop; responsive single-column on mobile.
- [x] **Grid #2 (Learning Cycle):** Continuous loop with gold curved arrows; auto-advancing rotation; respects `prefers-reduced-motion`.
- [x] **Brand Tokens:** Only the 6 approved colors and 2 typefaces used.
- [x] **Responsive Scaling:** Zero horizontal scrolling from 360px to 1920px.
- [x] **Single-Page Structure:** Sections appear in the exact order specified in Section 4.
- [x] **Approved Content:** Exact client copy from Sections 8–11 implemented without unauthorized changes.
- [x] **Modals:** All 12 programs open accessible modals with focus trap and `Esc` dismiss.
- [x] **Data Decoupling:** Content stored in data files, not hard-coded in components.
- [x] **No Lorem Ipsum:** All placeholder copy eliminated.
- [x] **Scrollspy & Nav:** Smooth scrolling with active highlighting.
- [x] **AI Workshop:** Keyboard-accessible and touch-friendly tabs with learning outcomes.
- [x] **Contact Form:** Field validation with success message feedback.
- [x] **Security:** Supabase credentials loaded via `import.meta.env` and git-ignored.
- [x] **External Links:** Google Form and social links open safely with `rel="noopener noreferrer"`.
- [x] **Build Quality:** `npm run build` succeeds cleanly with 0 errors.
