// import { apiProductGetProductRetrieve } from "../../api";
import { SitemapStream, streamToPromise, type SitemapItem } from "sitemap";
import { Readable } from "stream";

// An array with your links
const links: Partial<SitemapItem>[] = [
  { url: "/" },
  { url: "/products" },
  { url: "/blog" },
  { url: "/repair" },
  { url: "/repair/controllertest/" },
  { url: "/repair/console/" },
  { url: "/repair/aboutus/" },
  { url: "/repair/contactus/" },
];

async function recursiveFetch(fn: () => Promise<any>) {
  let { results, next } = await fn();

  while (next) {
    const body = await $fetch(next);
    results = [...results, ...body.results];
    next = body.next;
  }
  return results;
}

export default defineEventHandler(async (event) => {
  // finding all of the dynamic paths of sitemap

  // Create a stream to write to
  const stream = new SitemapStream({
    hostname: "https://cheatsg.ir",
    encoding: "utf8",
  });

  try {
    const products = await recursiveFetch(() =>
      $fetch(
        "https://backend-cheatsgame.iran.liara.run/api/product/get-product/"
      )
    );
    const blogs = await recursiveFetch(() =>
      $fetch("https://backend-cheatsgame.iran.liara.run/api/general/blog-list/")
    );
    for (let product of products) {
      links.push({ url: `/products/${product.slug}/` });
    }
    for (let blog of blogs) {
      links.push({ url: `/blog/${blog.slug}/` });
    }
    console.log(links);
  } catch (error) {}

  return await streamToPromise(Readable.from(links).pipe(stream));
});
