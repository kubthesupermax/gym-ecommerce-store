# Gym Ecommerce App

## Overview

This is a **mock eCommerce application** built using Next.js and TypeScript to showcase various features of an online store.

## Features

- Browse and filter gym equipment and accessories
- Add items to the cart
- Checkout functionality
- User authentication
- Responsive design

## Tech Stack

- **Frontend**: Next.js, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: NextAuth.js
- **Data Handling**: Static product data (mocked JSON)

## Folder Structure

```
├── app
│   ├── about
│   ├── cart
│   ├── categories
│   ├── checkout
│   ├── contact
│   ├── login
│   ├── products
│   ├── profile
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components
│   ├── auth-provider.tsx
│   ├── cart-drawer.tsx
│   ├── navbar.tsx
│   ├── product-card.tsx
│   ├── ui (Reusable UI components)
├── lib
│   ├── products.ts
│   ├── types.ts
│   └── utils.ts
├── public (Images and assets)
├── styles (Global styles)
├── hooks (Custom React hooks)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Setup

1. Clone the repository
   ```sh
   git clone https://github.com/your-repo/gym-ecommerce.git
   cd gym-ecommerce
   ```
2. Install dependencies
   ```sh
   npm install  # or yarn install
   ```
3. Run the development server
   ```sh
   npm run dev  # or yarn dev
   ```

## Deployment

You can deploy this app on platforms like Vercel or Netlify.

## Notes

- This is a **mock eCommerce app** intended for learning and demonstration purposes only. It does not process real transactions.
- Feel free to modify and expand the project as needed!

---
