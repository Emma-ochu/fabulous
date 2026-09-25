# Agentic Contribution Guide

This document defines how AI coding agents should contribute to the FABULOUSS storefront. It complements the human contribution guidance in [README.md](README.md).

## Mission

Help the project become a trustworthy, elegant skincare shopping experience while keeping changes understandable, focused, accessible, and easy to verify.

## Before Editing

1. Identify the concrete route, component, data source, or failing command connected to the request.
2. Read the smallest nearby set of files needed to understand the behavior.
3. State one working hypothesis about the change and one check that could disprove it.
4. Inspect the current file contents before editing files that may have changed since the last task.
5. Check the existing route, state, and data model before adding a parallel abstraction.

Do not begin with broad repository mapping when a local implementation surface is available.

## Editing Rules

- Make the smallest coherent change that satisfies the request.
- Preserve user changes and unrelated working-tree changes.
- Use `apply_patch` for manual code edits.
- Prefer existing React, React Router, Tailwind, Zod, and Lucide patterns.
- Avoid changing public component props unless the feature genuinely requires it.
- Do not add dependencies for a problem the current stack can solve cleanly.
- Keep product and skincare claims factual and avoid unsupported medical promises.
- Do not add secrets, API keys, credentials, or private customer data.
- Do not commit changes or create branches unless explicitly requested.

## Frontend Standards

- Preserve semantic HTML and keyboard access.
- Keep visible focus states on links, buttons, fields, menus, drawers, and selectors.
- Use real links for navigation and real buttons for actions.
- Give product images meaningful alt text.
- Communicate stock and validation states with text as well as color.
- Check mobile, tablet, and desktop behavior for layout changes.
- Match the existing warm luxury direction: alabaster surfaces, obsidian accents, restrained champagne gold, editorial typography, and subtle motion.
- Avoid adding decorative UI that competes with product information or checkout actions.

## Product and Cart Safety

- Treat the normalized product catalog as the source of truth once Version 2 is implemented.
- Keep product IDs and slugs stable after publication.
- Never silently replace a user's cart when navigating between product pages.
- Preserve per-product quantities and calculate totals from catalog prices.
- Keep the WhatsApp message complete, readable, and consistent with the cart.
- Keep Nigerian phone normalization and order validation intact.
- Block checkout when there are no products to order.

## Validation Workflow

After the first substantive edit, run the narrowest useful check before continuing. For application changes, finish with:

```bash
pnpm run build
pnpm run lint
```

For visual changes, also inspect the affected route at mobile and desktop widths when browser tooling is available. Verify that text does not overflow, controls remain usable, and product images load.

For documentation-only changes, check Markdown links, code blocks, command names, and the surrounding project structure. Do not claim a test passed unless it was actually run.

## Communication

Agent updates should be concise and useful:

- Say what file or behavior is being inspected.
- Name the working hypothesis when implementation is not obvious.
- Report validation results accurately, including skipped or unavailable checks.
- Mention user-visible behavior changes and any remaining limitations.
- Avoid long explanations of unchanged code.

## Version 2 Priorities

The current product direction is documented in [implementation.md](implementation.md). Prioritize the following order:

1. Normalize the product catalog and stable slugs.
2. Move cart state above the order form.
3. Add `/products` and `/products/:slug` routes.
4. Give products reusable detail pages.
5. Shorten the homepage and link cards to product pages.
6. Preserve complete multi-product WhatsApp checkout.
7. Add SEO, accessibility, and responsive verification.
