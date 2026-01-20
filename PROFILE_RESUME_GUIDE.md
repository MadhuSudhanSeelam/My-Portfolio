# Profile Picture & Resume Management Guide

## Overview
Your portfolio now supports **profile picture** and **resume/CV** management through the admin panel. You can easily update these assets anytime without touching the code!

---

## 🖼️ Adding Your Profile Picture

### Step 1: Upload Your Image
You have several options to host your profile picture:

1. **Imgur** (Recommended - Free & Easy)
   - Go to [imgur.com/upload](https://imgur.com/upload)
   - Upload your profile picture
   - Right-click on the uploaded image → "Copy image address"
   - Paste this URL in the admin panel

2. **GitHub** (If your repo is public)
   - Add image to your repo (e.g., `public/profile.jpg`)
   - Use: `https://raw.githubusercontent.com/yourusername/repo-name/main/public/profile.jpg`

3. **Other Services**
   - Google Photos (get shareable link)
   - Dropbox
   - Any image hosting service

### Step 2: Update in Admin Panel
1. Navigate to `/admin` on your portfolio
2. Go to **Profile** tab
3. Find the **Profile Picture** section
4. Paste your image URL in the input field
5. See live preview on the left
6. Click **Save Changes** button
7. Download the updated `config.js` file
8. Replace `src/data/config.js` with the downloaded file

---

## 📄 Adding Your Resume

### Step 1: Upload Your Resume PDF

**Option 1: Google Drive** (Recommended)
1. Upload your resume to [Google Drive](https://drive.google.com)
2. Right-click the file → **Get link**
3. Set permissions to "Anyone with the link can view"
4. Copy the link
5. **Important:** Convert the link format:
   - From: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
   - To: `https://drive.google.com/uc?export=download&id=FILE_ID`

**Option 2: Dropbox**
1. Upload to [Dropbox](https://www.dropbox.com)
2. Get shareable link
3. Change `?dl=0` to `?dl=1` at the end of the URL

**Option 3: GitHub**
1. Add resume to your repo (e.g., `public/resume.pdf`)
2. Use: `https://raw.githubusercontent.com/yourusername/repo-name/main/public/resume.pdf`

### Step 2: Update in Admin Panel
1. Navigate to `/admin` on your portfolio
2. Go to **Profile** tab
3. Find the **Resume / CV** section
4. Paste your resume URL
5. Click "Preview Resume" to test the link
6. Click **Save Changes** button
7. Download the updated `config.js` file
8. Replace `src/data/config.js` with the downloaded file

---

## 🎨 Where These Appear

### Profile Picture
- **Hero Section**: Displays prominently next to your name with a glowing blue border and pulse animation
- **Responsive**: Automatically centers on mobile devices

### Resume Button
- **About Section**: Shows a "Download Resume" button below your bio and stats
- **Only appears if**: You've set a valid resume URL (not "#")

---

## 🔄 Updating Anytime

To change your profile picture or resume:

1. **Go to Admin Panel** (`/admin` route)
2. **Update the URLs** in the Profile tab
3. **Save Changes** - Downloads new config file
4. **Replace** `src/data/config.js` with downloaded file
5. **Commit & Push** to deploy changes

---

## 💡 Pro Tips

### For Profile Picture:
- Use a **square image** (1:1 ratio) for best results
- Recommended size: **400x400px** or larger
- Use a **professional headshot** or avatar
- Ensure good lighting and clear face visibility

### For Resume:
- Keep file size **under 2MB** for fast loading
- Use **PDF format** for compatibility
- Name your file professionally: `FirstName_LastName_Resume.pdf`
- Update regularly (every 3-6 months)

### Security:
- Never share private/sensitive links
- Use "view only" permissions for Google Drive
- Test links in incognito mode to ensure they work publicly

---

## 🐛 Troubleshooting

**Profile picture not showing?**
- Check if the URL is publicly accessible (test in incognito)
- Verify the URL ends with an image extension (.jpg, .png, etc.)
- Try a different hosting service

**Resume not downloading?**
- Ensure the link is set to "Anyone with the link can view"
- For Google Drive, use the direct download format
- Test the link in a new browser tab

**Changes not reflecting?**
- Make sure you replaced the `config.js` file
- Clear browser cache (Ctrl+Shift+R)
- Check if dev server reloaded

---

## 📝 Example URLs

```javascript
// Profile Image Examples
"profileImage": "https://i.imgur.com/abc123.jpg"
"profileImage": "https://raw.githubusercontent.com/username/repo/main/public/profile.jpg"

// Resume URL Examples
"resumeUrl": "https://drive.google.com/uc?export=download&id=1ABC123xyz"
"resumeUrl": "https://www.dropbox.com/s/abc123/resume.pdf?dl=1"
"resumeUrl": "https://raw.githubusercontent.com/username/repo/main/public/resume.pdf"
```

---

## 🎯 Quick Start Checklist

- [ ] Upload profile picture to Imgur or Google Drive
- [ ] Copy image URL
- [ ] Go to `/admin` → Profile tab
- [ ] Paste image URL in Profile Picture field
- [ ] Upload resume PDF to Google Drive or Dropbox
- [ ] Get shareable link and convert format if needed
- [ ] Paste resume URL in Resume / CV field
- [ ] Test "Preview Resume" link
- [ ] Click "Save Changes"
- [ ] Download config.js
- [ ] Replace `src/data/config.js`
- [ ] Commit and push changes

---

**Need Help?** Check the admin panel tooltips (💡 icons) for quick guidance!
