# Rollback Guide

## Current state (as of this writing)

- `main` has **not** been touched. It still points at `e717940` ("update"),
  the same commit that is live in production today.
- All of the redesign work lives on the `redesign-nextjs` branch
  (pushed to `origin/redesign-nextjs`) and only exists as a **Preview
  Deployment** in Vercel — it is not connected to the production domain.
- Because of this, there is nothing to roll back yet. Production is
  unaffected until someone explicitly merges `redesign-nextjs` into `main`
  and/or promotes a deployment to production in Vercel.

## If you promote the preview to production and need to undo it

Pick whichever is fastest for the situation:

### 1. Instant rollback from the Vercel dashboard (fastest, no git needed)
Vercel keeps every previous production deployment. Go to
Project → Deployments, find the last known-good deployment (the one
serving `e717940` / the old static site), and click **"Promote to
Production"** (or **"Instant Rollback"** if shown). This takes effect in
seconds and requires no code changes.

### 2. Revert the merge in git
If `redesign-nextjs` was merged into `main` via a merge commit:
```
git revert -m 1 <merge-commit-sha>
git push origin main
```
This creates a new commit that undoes the merge, keeping full history
(safer than force-pushing).

### 3. Reset `main` back to the pre-redesign commit (only if truly necessary)
```
git checkout main
git reset --hard e717940
git push origin main --force-with-lease
```
Use this only if the merge has not been built upon by anyone else and you
understand this rewrites shared history. Prefer option 1 or 2 first.

## Rolling back the domain only

If `hgamultiservi.com` was pointed at the new deployment and you just want
the domain back on the old site without touching git:
- In Vercel, go to the old project/deployment (or the previous
  production deployment of this same project) and reassign the domain to
  it under Project → Settings → Domains.

## Notes

- Stripe was never enabled in this redesign (checkout is a labeled
  placeholder), so there is no payment/billing state to reconcile during
  a rollback.
- The legacy static site (HTML/CSS/JS) is preserved in
  `legacy-static-site/` in this repo for reference even after rollback.
- **Vercel project setting change (not in this repo):** the `hga-multiservi`
  Vercel project's Framework Preset was explicitly set to **Next.js**
  (Project → Settings → General → Framework Preset). It was previously
  unset/auto, which caused Vercel to silently fall back to the generic
  `@vercel/static-build` builder and 404 on every route. If the old static
  site is ever redeployed to this same Vercel project, change the Framework
  Preset back to **Other** first, or it may fail to build/serve correctly.
