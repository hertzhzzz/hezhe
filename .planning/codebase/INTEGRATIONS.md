# External Integrations

**Analysis Date:** 2026-03-11

## APIs & External Services

**Supabase (Optional - Disabled):**
- Purpose: View counter for articles
- Implementation: `src/components/ViewCounter.astro`
- SDK: Direct REST API calls via fetch
- Client: Native fetch
- Auth: Anon key via PUBLIC_SUPABASE_ANON_KEY
- URL: PUBLIC_SUPABASE_URL
- Endpoints used:
  - `/rest/v1/rpc/increment_views` - Increment page view count
  - `/rest/v1/page_views` - Query page views by slug
- Status: **Not configured** - Requires Supabase project setup

## Data Storage

**Content Storage:**
- Markdown files in `src/content/posts/`
- Content Collections API for type-safe content management

**Configuration:**
- `src/data/profile.json` - Site configuration (author, social links, hero section)

**View Counter (Optional):**
- Supabase - stores page view counts
- Not implemented - requires Supabase project

## Authentication & Identity

**Authentication:**
- Not applicable - Static public blog, no user accounts
- No auth provider required

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Browser console.log for client-side errors (ViewCounter)

## CI/CD & Deployment

**Hosting:**
- Vercel or Netlify (configured for static deployment)
- Site URL: https://hezhe.wang

**CI Pipeline:**
- Not detected - Uses Vercel automatic deployment

## Environment Configuration

**Optional env vars:**
- PUBLIC_SUPABASE_URL - Supabase project URL
- PUBLIC_SUPABASE_ANON_KEY - Supabase anon key
- Note: Both are optional - view counter is disabled without them

**Secrets location:**
- None required for basic functionality

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## External Resources

**Fonts:**
- Google Fonts: Press Start 2P (pixel font for logo)

**No other external CDN dependencies**

---

*Integration audit: 2026-03-11*
