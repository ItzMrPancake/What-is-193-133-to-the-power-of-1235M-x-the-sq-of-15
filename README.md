# Jacob George | Website Developer & Maintenance Plans

Personal portfolio and website maintenance plans for **Jacob George**, website developer.

- **Basic Plan ($20 / month)**: Web hosting maintenance, security updates, 3 small updates/mo, $5/extra small edit, only +$15/major layout edit.
- **Plus Plan ($40 / month)**: Web hosting, priority support, security updates, 10 small updates + 1 major layout edit/mo, discounted extras (only $3/extra small, +$10/extra big layout edit).
- **Direct Contact**: `jacobg.webdev@gmail.com` · `jacobg.websitedev@outlook.com` · `940-204-0978`
- **Email Flow**: All inquiries and onboarding requests automatically prepare and open the user's email application (Apple Mail, Outlook, Gmail web, or default client) with the complete message pre-filled directly to Jacob George.

---

## 🚀 How to Deploy from `main` Branch on GitHub

This repository is fully configured for automated continuous deployment directly from the `main` branch.

### Option 1: Free Deployment via GitHub Pages (Built-in Workflow)

We have included a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy Jacob George website"
   git push origin main
   ```

2. **Enable GitHub Actions for Pages** (one-time setup in GitHub):
   - Go to your repository on GitHub.
   - Click **Settings** (top tabs).
   - In the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** &rarr; **Source**, change from *Deploy from a branch* to **GitHub Actions**.

3. **Watch it Deploy**:
   - Click the **Actions** tab in your repository.
   - You will see the **Deploy to GitHub Pages** workflow run automatically.
   - Once completed, your live site URL will appear at the top of the **Pages** settings screen (e.g., `https://<your-username>.github.io/<repo-name>/`).

*(Note: `vite.config.ts` has been configured with `base: './'` so all images, CSS, and JavaScript load properly whether hosted on a subpath or a custom domain).*

---

### Option 2: Deploy to Vercel (1-Click from GitHub)

1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New...** &rarr; **Project**.
3. Select this repository from your list.
4. Keep the default settings (the included `vercel.json` automatically handles the build and SPA routing).
5. Click **Deploy**. Any future commits pushed to `main` will automatically build and publish!

---

### Option 3: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and log in with GitHub.
2. Click **Add new site** &rarr; **Import an existing project**.
3. Select this repository. The included `netlify.toml` automatically configures the `dist/` directory and build script.
4. Click **Deploy Site**. Every push to `main` will deploy immediately.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Run TypeScript linter
npm run lint
```
