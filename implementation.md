# FABULOUSS Product Pages - Version 2 Implementation Plan

## 1. Product Direction

Transform the current long-form storefront into a luxury skincare boutique where the homepage introduces the brand and each product has its own focused, shareable page.

The homepage should encourage discovery. Product pages should provide the information needed to make a purchase. The order experience should remain available from every product page without losing selected products.

## 2. Current Starting Point

- The app currently has one main route: `/`.
- Product cards on the homepage scroll users to the order section.
- The order form currently supports a multi-product cart in local component state.
- Product information is distributed across:
  - `src/data/products.ts`
  - `src/data/medicube.ts`
  - `src/data/sadoer.ts`
- Product cards already expose product IDs through `onSelectProduct`.
- Routing is handled by `react-router-dom` in `src/App.tsx`.

## 3. Target Experience

### Homepage

Keep the homepage concise and editorial:

1. Announcement bar and navigation
2. Hero section with one primary call to action
3. Short brand or authenticity statement
4. Curated featured product grid
5. Medicube spotlight preview
6. SADOER collection preview
7. Trust signals and selected testimonials
8. Compact call to action linking to the collection or a product
9. Footer

Remove the full product catalog and long repeated sections from the homepage. Product previews should link to product pages instead of automatically scrolling to checkout.

### Product Detail Page

Each product should have a URL such as:

- `/products/medicube-kojic-acid-night-wrapping-mask`
- `/products/kormesic-vitamin-c-underarm-cream`
- `/products/sadoer-scar-removal-cream`

Every product page should use the same reusable layout:

1. Breadcrumb navigation
2. Large product image gallery or image showcase
3. Brand and product category
4. Product name
5. Price and stock status
6. Short luxury editorial description
7. Benefits list
8. How to use
9. Suitable-for or skin concern information
10. Quantity control
11. `Add to order` button
12. `Order via WhatsApp Concierge` button
13. Authenticity and delivery reassurance
14. Related products

The primary product action should add the product to the shared cart. It should not force the user to leave the product page or jump down a long homepage.

### Order Experience

The cart should be available from the header and from product pages.

Required behavior:

- Add one or more products to the cart.
- Increase or decrease quantity per product.
- Remove an individual product.
- Display subtotal and total item count.
- Preserve cart state while navigating between product pages.
- Preserve cart state on refresh where practical using `localStorage`.
- Continue to submit all selected products in the WhatsApp message.
- Require customer and delivery details only at checkout.

A slide-over cart is preferred for quick review. The existing full order form can remain as the checkout surface, but it should receive cart contents rather than own the product selection state.

## 4. Data Model

Create a single normalized product catalog rather than maintaining separate product lookup logic in multiple components.

Suggested interface:

```ts
export interface ProductDetail extends Product {
  slug: string;
  category: string;
  benefits: string[];
  howToUse: string[];
  skinConcerns?: string[];
  suitableFor?: string;
  gallery?: string[];
}
```

Create a catalog module such as:

`src/data/catalog.ts`

It should expose:

```ts
export const productCatalog: ProductDetail[] = [];
export const getProductBySlug = (slug: string) => ProductDetail | undefined;
export const getProductById = (id: string | number) =>
  ProductDetail | undefined;
```

Normalize all IDs to strings at the catalog boundary. Preserve the existing source data during migration, but avoid repeating `featured-` and `sadoer-` ID transformations inside UI components.

Product content should be written carefully. Do not claim clinical results, medical treatment, or guaranteed outcomes unless the business has supplied evidence for those claims.

## 5. Routing Plan

Update `src/App.tsx` with:

```tsx
<Route path="/" element={<Home />} />
<Route path="/products" element={<Products />} />
<Route path="/products/:slug" element={<ProductPage />} />
<Route path="*" element={<NotFound />} />
```

Create:

- `src/pages/Products.tsx`
- `src/pages/ProductPage.tsx`
- `src/components/product/ProductDetail.tsx`
- `src/components/product/ProductGallery.tsx`
- `src/components/product/ProductBenefits.tsx`
- `src/components/product/RelatedProducts.tsx`

`ProductPage.tsx` should:

1. Read the `slug` route parameter.
2. Resolve the product from the normalized catalog.
3. Render the reusable product detail layout.
4. Render a not-found state when the slug is invalid.
5. Update document title and description for the active product.

## 6. Cart Architecture

Move cart state above the order form so product pages and the header can access it.

Preferred structure:

- `src/context/CartContext.tsx`
- `src/hooks/useCart.ts`
- `src/components/cart/CartDrawer.tsx`
- `src/components/cart/CartItem.tsx`
- `src/components/cart/CartButton.tsx`

Cart item shape:

```ts
export interface CartItem {
  productId: string;
  quantity: number;
}
```

Cart context actions:

```ts
addItem(productId: string, quantity?: number): void;
removeItem(productId: string): void;
updateQuantity(productId: string, quantity: number): void;
clearCart(): void;
```

Mount the provider near the router or layout so it is shared across all routes.

The order form should no longer be responsible for adding or selecting products. It should read cart contents and handle customer details, delivery details, validation, and WhatsApp submission.

## 7. Homepage Component Changes

Update these components so product actions navigate to product pages:

- `src/components/home/FeaturedProducts.tsx`
- `src/components/home/Medicube.tsx`
- `src/components/home/Sadoer.tsx`

Replace the current scroll behavior in `src/pages/Home.tsx` with product links or a shared product-card link component.

Recommended behavior:

- Clicking the product image or name opens the product detail page.
- The card has a clear `View details` action.
- A secondary `Add to order` action may add directly to the cart without navigating.
- Do not make every card action jump to the bottom of the homepage.

Keep `Testimonials`, `WhyChooseUs`, and `Faq`, but shorten or reposition them so they support discovery rather than create another long uninterrupted scroll.

## 8. Navigation Changes

Update `src/components/layout/Navbar.tsx`:

- Add a `Shop` or `Collection` link to `/products`.
- Add a cart button with item count.
- Keep the current mobile drawer behavior and keyboard accessibility.
- Make the cart button keyboard reachable and provide an accessible label such as `Open shopping bag, 2 items`.
- Preserve the existing sticky frosted-glass visual treatment.

The announcement bar may link directly to a collection or featured product instead of only linking to `#order`.

## 9. Product Listing Page

Create a focused `/products` collection page with:

- Editorial collection heading
- Small category filters if useful
- Product grid
- Product cards using the same visual language as the homepage
- Links to product detail pages
- Optional direct add-to-order action

Avoid introducing filters that are not supported by the available product data. A small category selector is enough for the first release.

## 10. Checkout and WhatsApp Message

Keep the existing Zod validation for:

- Customer name
- Primary phone
- Optional backup phone
- State
- Delivery address

Before submission:

- Block checkout when the cart is empty.
- Build the WhatsApp message from every cart item.
- Include product name, category, quantity, unit price, and order total.
- Preserve Nigerian phone normalization.
- Keep the current WhatsApp destination and `window.open` behavior unless the business changes the number.

After WhatsApp opens, show the existing confirmation state and provide a way to return to shopping.

## 11. SEO and Sharing

For each product page:

- Set a unique document title.
- Set a unique meta description.
- Add canonical URL support.
- Add Product structured data where price, availability, image, and brand are reliable.
- Use the product image and name in Open Graph metadata when possible.
- Ensure invalid slugs render the existing not-found page.

Product slugs should remain stable once published. Do not derive slugs from display text at runtime.

## 12. Accessibility Requirements

Preserve and extend the existing accessibility work:

- Use semantic headings in order.
- Use real links for navigation.
- Use real buttons for cart actions.
- Keep visible focus styles.
- Ensure product gallery controls have accessible labels.
- Keep cart drawer focus behavior manageable on keyboard.
- Allow Escape to close the cart drawer and mobile menu.
- Announce cart updates where practical with a polite live region.
- Do not use color alone to communicate stock status or selection.
- Keep touch targets large enough on mobile.

## 13. Responsive Design Requirements

Verify at minimum:

- Mobile width around 375px
- Tablet width around 768px
- Desktop width around 1280px

Check:

- Product images do not push key content below the fold unexpectedly.
- Product page actions remain visible and readable on mobile.
- Cart drawer fits narrow screens.
- Product names and prices do not overflow.
- Related products remain horizontally usable or collapse to a grid.

## 14. Implementation Sequence

### Phase 1: Catalog Foundation

1. Normalize all product sources into `src/data/catalog.ts`.
2. Add stable slugs and detail fields.
3. Add product lookup helpers.
4. Add tests or lightweight checks for duplicate IDs and missing slugs.

### Phase 2: Shared Cart

1. Create `CartContext` and cart hook.
2. Add local storage persistence.
3. Add cart button and cart drawer.
4. Move multi-product state out of `OrderForm`.
5. Confirm WhatsApp output still includes multiple items.

### Phase 3: Product Routes

1. Add `/products` route and listing page.
2. Add `/products/:slug` route.
3. Build reusable product detail components.
4. Add related products and add-to-cart actions.
5. Add not-found handling.

### Phase 4: Homepage Simplification

1. Change product cards from scroll-to-order to product links.
2. Reduce repeated catalog content.
3. Keep one clear collection or featured-product CTA.
4. Add cart entry point to the header.

### Phase 5: SEO and Polish

1. Add dynamic metadata.
2. Add Product structured data.
3. Review keyboard navigation and focus behavior.
4. Verify responsive layouts.
5. Run build and lint checks.

## 15. Verification Checklist

### Functional

- [ ] Homepage product cards open the correct product page.
- [ ] Direct product URLs load after refresh.
- [ ] Invalid product URLs show a useful not-found state.
- [ ] Products can be added from the homepage, collection page, and product page.
- [ ] Multiple products remain in the cart.
- [ ] Each product quantity can be changed independently.
- [ ] Products can be removed without clearing the full cart.
- [ ] Cart survives navigation and refresh.
- [ ] Empty-cart checkout is blocked.
- [ ] WhatsApp message contains every cart item and the correct total.

### Visual

- [ ] Homepage feels shorter and more editorial.
- [ ] Product page is the primary place for product education.
- [ ] Cards and product detail layout use the existing warm luxury palette.
- [ ] Mobile, tablet, and desktop layouts remain balanced.
- [ ] Product image backgrounds and gallery states are consistent.

### Accessibility

- [ ] All interactive controls are keyboard accessible.
- [ ] Focus indicators remain visible.
- [ ] Cart drawer can be closed with Escape.
- [ ] Product images have meaningful alt text.
- [ ] Stock states are communicated with text, not color alone.
- [ ] No heading levels are skipped.

### Automated

```bash
pnpm run build
pnpm run lint
```

## 16. Definition Of Done

Version 2 is complete when customers can discover a product from the shorter homepage, open a dedicated product page, understand the product and its use, add multiple products to a persistent cart, and submit the complete order through WhatsApp without losing their selections during navigation.
