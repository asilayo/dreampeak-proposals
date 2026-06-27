# Dream Peak Safaris — Proposals & Pricing (team web app)

A shared, login-protected web app for building safari itineraries, pricing them
(B2C + B2B), generating client proposals and invoices. Hosted on **Vercel**, with
a shared **Supabase** database so everyone on the team sees one common list of
proposals from any laptop, anywhere.

You will create three free accounts (GitHub, Supabase, Vercel), paste a few keys,
and click Deploy. No coding required. Budget ~20–30 minutes the first time.

---

## What you get

- A public HTTPS link (e.g. `https://dreampeak-proposals.vercel.app`) you share with your coworker.
- Sign-in required (you create one account per teammate).
- One shared list of proposals — saved by anyone, visible to everyone.
- The "Generate with AI" button works, with the AI key kept safely on the server.
- "Print / PDF" works from the browser for proposals and invoices.

---

## Step 1 — Supabase (the shared database + logins)

1. Go to **https://supabase.com** → sign up → **New project**. Pick a name and a
   strong database password (you won't need the DB password again). Wait ~2 min
   for it to finish provisioning.
2. In the left sidebar open **SQL Editor → New query**, paste the entire contents
   of `supabase.sql` (included in this project), and click **Run**. You should see
   "Success". This creates the shared table and access rules.
3. Open **Project Settings → API**. Copy two values — you'll need them in Step 3:
   - **Project URL** (looks like `https://abcd1234.supabase.co`)
   - **anon public** key (a long string under "Project API keys")
4. Create your team logins: **Authentication → Users → Add user**. Enter an email
   and password for yourself; tick **Auto Confirm User**. Repeat for your coworker.
   (Optional but recommended: **Authentication → Providers → Email** and turn
   **Allow new users to sign up** OFF, so only people you add can log in.)

> The "anon public" key is safe to expose in a website — your data is protected by
> the access rules in `supabase.sql`, which only allow signed-in users.

---

## Step 2 — Put the code on GitHub

If you're comfortable with git, push this folder to a new GitHub repository.

If not, the easy way:
1. Go to **https://github.com** → **New repository** → name it `dreampeak-proposals` → Create.
2. On the new repo page click **uploading an existing file**, then drag in the
   **contents of this folder** (the `src/`, `api/` folders and the loose files like
   `package.json`, `index.html`, etc.). Commit.

---

## Step 3 — Deploy on Vercel

1. Go to **https://vercel.com** → sign up **with GitHub** → **Add New… → Project**
   → **Import** your `dreampeak-proposals` repo.
2. Vercel auto-detects **Vite**. Before clicking Deploy, open **Environment
   Variables** and add these three (Name → Value):
   - `VITE_SUPABASE_URL` → your Supabase **Project URL** (from Step 1.3)
   - `VITE_SUPABASE_ANON_KEY` → your Supabase **anon public** key (from Step 1.3)
   - `ANTHROPIC_API_KEY` → your Anthropic API key (from https://console.anthropic.com → API Keys). Only needed for the "Generate with AI" button — you can skip it and add it later; everything else works without it.
3. Click **Deploy**. After ~1 minute you'll get a live URL.

Share that URL with your coworker. They open it, sign in with the account you
created for them in Step 1.4, and they're in — same shared proposals as you.

> Changed env vars later? In Vercel go to **Deployments → ⋯ → Redeploy** so the new
> values take effect (the Supabase keys are baked in at build time).

---

## Run it on your own laptop (optional, for testing)

```bash
npm install
# create a .env file (copy .env.example) with your VITE_SUPABASE_* values
npm run dev
```

Then open the local URL it prints. Note: the **AI button** only works once
deployed to Vercel (it needs the serverless `/api/generate` function); locally it
will simply fall back to building a day-by-day skeleton from your selections.

---

## Notes

- **Seeing a teammate's latest proposals:** the proposal list loads when the page
  opens. If your coworker saves a new proposal while you already have the app open,
  refresh the page (or reopen the Proposals tab) to see it. (Live auto-refresh can
  be added later via Supabase Realtime.)
- **Custom domain:** in Vercel → Project → **Domains** you can attach something
  like `proposals.dreampeaksafaris.com`.
- **Changing the AI model:** edit the `model` value inside `generateAI` in
  `src/App.jsx` if you want a different Claude model.
- **Security:** the Anthropic key lives only in Vercel's server environment and is
  never shipped to the browser. Database access requires a login.

---

## What's inside

```
dreampeak-app/
├─ index.html              # page shell + fonts
├─ package.json            # dependencies
├─ vite.config.js          # build config
├─ vercel.json             # build output settings
├─ supabase.sql            # run once in Supabase to create the shared table
├─ .env.example            # the env vars you need
├─ api/
│  └─ generate.js          # serverless AI proxy (holds the secret key)
└─ src/
   ├─ main.jsx             # entry: login gate + mounts the app
   ├─ Auth.jsx             # sign-in screen
   ├─ supabaseClient.js    # connects to your Supabase project
   ├─ storage.js           # routes the app's storage to the shared table
   └─ App.jsx              # the full builder / pricing / proposal / invoice app
```
