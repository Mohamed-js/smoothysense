import { getProducts } from "../helpers";

// export default async function Sitemap() {
//   const allProducts = await getProducts();
//   const products = allProducts.map((product) => ({
//     url: `https://smoothysense.vercel.app/${product.uri}`,
//     lastModified: product.updatedAt,
//   }));
//   const enProducts = allProducts.map((product) => ({
//     url: `https://smoothysense.vercel.app/en/${product.uri}`,
//     lastModified: product.updatedAt,
//   }));
//   return [
//     {
//       url: "https://smoothysense.vercel.app",
//       lastModified: new Date(),
//     },
//     ...products,
//     ...enProducts,
//   ];
// }

function generateSiteMap(products) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://smoothysense.vercel.app</loc>
     </url>
     <url>
       <loc>https://smoothysense.vercel.app/login</loc>
     </url>
     <url>
       <loc>https://smoothysense.vercel.app/signup</loc>
     </url>
     <url>
       <loc>https://smoothysense.vercel.app/quiz/hair</loc>
     </url>
     ${products
       .map(({ slug }) => {
         return `<url>
                    <loc>https://smoothysense.vercel.app/products/${slug}</loc>
                  </url>`;
       })
       .join("\n")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
  // ${products
  //   .map(({ slug }) => {
  //     return `
  //   <url>
  //       <loc>https://smoothysense.vercel.app/en/products/${`${slug}`}</loc>
  //   </url>
  // `;
  //   })
  //   .join("")}
}

export async function getServerSideProps({ res }) {
  // ${products
  //   .map(({ slug }) => {
  //     return `
  //   <url>
  //       <loc>https://smoothysense.vercel.app/products/${`${slug}`}</loc>
  //   </url>
  // `;
  //   })
  //   .join("")}
  // We make an API call to gather the URLs for our site
  const products = await getProducts();
  console.log(
    products
      .map(({ slug }) => {
        return `<url><loc>https://smoothysense.vercel.app/products/${`${slug}`}</loc></url>`;
      })
      .join("")
  );

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(products);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
