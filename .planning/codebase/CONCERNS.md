# Concerns

Technical debt, known issues, and areas of concern in the codebase.

## Technical Debt

- **CSS Architecture**: CSS is in a single global file (`src/styles/global.css`). As the site grows, consider component-scoped styles.
- **No TypeScript**: Project uses JavaScript only. No type checking or IDE autocomplete for Astro components.

## Known Issues

- **No critical issues identified** - Static blog with minimal complexity.

## Security

- No user authentication (static site)
- No database connections
- No sensitive data handling
- CDN-hosted static assets

## Performance

- Static site generation - good performance baseline
- No client-side JavaScript framework - fast initial load
- Images could benefit from lazy loading optimization

## Fragile Areas

- **Build process**: Depends on Astro build pipeline
- **Content source**: Markdown files in repository - any syntax errors could break builds
- **Deployment**: Vercel-dependent for automated deployments

## Recommendations

1. Add TypeScript for better developer experience
2. Consider image optimization pipeline
3. Add build-time validation for Markdown frontmatter
