

## Google OAuth 403 Error - Complete Fix

The 403 error you're seeing ("We're sorry, but you do not have access to this document") is NOT a code issue - it's a Google Cloud Console configuration issue. Based on my research, there are **2-3 missing configurations** that need to be added.

---

## Step-by-Step Fix (No Code Changes Needed)

### Step 1: Enable the Google People API (MOST IMPORTANT)

This is the **most common cause** of the 403 error. Supabase needs this API to fetch user profile data.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services → Library**
4. Search for **"Google People API"**
5. Click **Enable**

---

### Step 2: Add Supabase URL to Authorized JavaScript Origins

You currently only have the Lovable URL. You also need the Supabase URL.

1. Go to **APIs & Services → Credentials**
2. Click on your OAuth 2.0 Client ID
3. Under **Authorized JavaScript origins**, add BOTH:
   - `https://id-preview--00f58f88-09a0-4879-bf6c-18d6c51f378a.lovable.app` (you already have this)
   - `https://dmarkaigzovaqwpigtxe.supabase.co` (ADD THIS)

---

### Step 3: Add Authorized Domain to Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Scroll to **Authorized domains**
3. Add: `supabase.co`
4. Save changes

---

### Step 4: Wait and Test

1. Wait **2-5 minutes** for Google's settings to propagate
2. **Clear browser cookies** or use an **Incognito window**
3. Try Google Sign-In again

---

## Configuration Checklist

| Setting | Location | Required Value |
|---------|----------|----------------|
| Google People API | APIs & Services → Library | **Enabled** |
| JS Origin #1 | OAuth Client → JS Origins | `https://id-preview--00f58f88-09a0-4879-bf6c-18d6c51f378a.lovable.app` |
| JS Origin #2 | OAuth Client → JS Origins | `https://dmarkaigzovaqwpigtxe.supabase.co` |
| Redirect URI | OAuth Client → Redirect URIs | `https://dmarkaigzovaqwpigtxe.supabase.co/auth/v1/callback` |
| Authorized Domain | OAuth Consent Screen | `supabase.co` |

---

## Why This Happens

The OAuth flow works like this:
1. Your app redirects to Google
2. Google redirects to Supabase (`supabase.co/auth/v1/callback`)
3. Supabase calls the Google People API to get user info
4. Supabase redirects back to your app

If the People API is not enabled OR supabase.co isn't authorized, step 3 fails with a 403.

---

## No Code Changes Required

The implementation code is correct. This is purely a Google Cloud Console configuration issue.

