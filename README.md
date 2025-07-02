# Ecommerce App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your values.

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   # or
   yarn build && yarn start
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment

- Deploy easily to Vercel, Netlify, or any Node.js server.
- Ensure your environment variables are set in your deployment platform.
- For best SEO, update `public/robots.txt` and `public/sitemap.xml` with your live domain.

## Environment Variables

See `.env.example` for required variables:
- `NEXT_PUBLIC_SITE_URL` - Your deployed site URL
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT authentication

## Production Checklist
- [x] Custom 404 and error pages
- [x] SEO meta tags, robots.txt, sitemap.xml
- [x] Secure API routes and authentication
- [x] Optimized images and assets
- [x] Mobile responsive and accessible UI
- [x] Error handling and loading states

---

For more, see [Next.js deployment docs](https://nextjs.org/docs/deployment).
