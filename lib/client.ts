import sanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
  projectId: "ks7nc3h1",
  dataset: "production",
  apiVersion: "2022-11-13",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});
export const urlFor = (source:any) => builder.image(source);
const builder = imageUrlBuilder(client)