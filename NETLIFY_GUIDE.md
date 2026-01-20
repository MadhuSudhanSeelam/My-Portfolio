# 🚀 Netlify Deployment & Admin Guide

Since your portfolio is built with **React & Vite** and hosted as a **Static Site** on Netlify, it works a bit differently than a site with a backend database.

## 1. How to Deploy to Netlify
1.  **Push your code to GitHub**:
    - Ensure all your latest changes are committed and pushed to your GitHub repository.
2.  **Connect to Netlify**:
    - Log in to [Netlify](https://www.netlify.com/).
    - Click **"Add new site"** -> **"Import from existing project"**.
    - Choose **GitHub** and select your portfolio repository.
3.  **Configure Build Settings**:
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
4.  **Deploy**: Click "Deploy Site". Netlify will give you a live URL (e.g., `madhu-portfolio.netlify.app`).

---

## 2. Using the Admin Panel on Netlify
Because static sites (like Netlify pages) are **"Read-Only"**, the Admin Panel cannot directly change the live website's files. Instead, we use a smart "Download & Commit" workflow.

### The Workflow:
1.  **Open your Live Admin Panel**: Go to `https://your-site.netlify.app/admin`.
2.  **Make Changes**: Edit your bio, add skills, or update projects using the UI editors.
3.  **Click "Save Changes"**:
    - This will **download** a file named `config.js` to your computer.
4.  **Update Your Project**:
    - Move this downloaded `config.js` file into your local project folder:
    - Path: `src/data/config.js` (Replace the old file).
5.  **Deploy**:
    - Run these commands in your terminal to push the update:
    ```bash
    git add .
    git commit -m "Update portfolio content from admin"
    git push
    ```
    - Netlify will detect the change and **automatically update your live site** in seconds!

### Why do it this way?
- **Security**: No database means no hackers can mess with your site.
- **Speed**: Static sites are incredibly fast.
- **Free**: Hosting on Netlify/Vercel is free for this type of setup.

---

## 3. Google Search (SEO)
I have installed `react-helmet-async` and added `robots.txt` + `sitemap.xml` to your `public/` folder.

**To get on Google faster:**
1.  **Deploy your site** to Netlify (as shown in Step 1).
2.  Go to [Google Search Console](https://search.google.com/search-console).
3.  **Add Property**: Enter your Netlify URL (e.g., `https://madhu-portfolio.netlify.app`).
4.  **Submit Sitemap**:
    - Go to "Sitemaps" in the sidebar.
    - Enter `sitemap.xml` and click **Submit**.
5.  **Wait**: Google takes a few days to a week to index new sites. Be patient!

**Important Note**: In `public/sitemap.xml` and `public/robots.txt`, verify that the URL is your *actual* Netlify link. If it says `your-site-name`, update it to your real URL!
