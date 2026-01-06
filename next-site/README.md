# Portfolio Site (Next.js)

Source code for rbarmon.github.io

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
npm run build
cp -r out/* ..
cd ..
git add -A && git commit -m "message" && git push
```

## Structure

- `app/page.tsx` - Main page content
- `app/layout.tsx` - HTML wrapper, meta tags
- `app/globals.css` - Styles
- `components/DraggableCollage.tsx` - Hero collage
- `components/LanguageContext.tsx` - EN/JA toggle
