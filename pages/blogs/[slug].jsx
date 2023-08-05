import Image from "next/image";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { getBlogPost, getBlogPosts } from "../../helpers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const Topic = ({ post }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);

  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Navbar t={t} />
      <div
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-20 "
        id="topics"
      >
        <h1 className="text-5xl my-10 font-bold capitalize">{post.title}</h1>
        <div className="w-full overflow-hidden rounded-lg bg-gray-200 aspect-w-8 aspect-h-4 mt-10">
          <Image
            alt={post.title}
            src={post.image}
            fill
            className={cn(
              "object-cover duration-700 ease-in-out group-hover:opacity-75	",
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>

        <div className="py-4 pt-8">
          <h2 className="text-4xl font-semibold capitalize">
            {post.description}
          </h2>
        </div>
        <div>
          {post.body.map((paragraph) => (
            <div key={paragraph._id}>
              <p className="text-3xl font-bold mt-8">{paragraph.title}</p>
              <p className="text-xl mt-2 mb-8">{paragraph.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topic;

export async function getStaticProps({ params, locale }) {
  const post = await getBlogPost(params.slug);

  return {
    props: {
      post: post,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export async function getStaticPaths({ locales }) {
  const posts = await getBlogPosts();
  const paths = [];
  locales.forEach((locale) => {
    posts.forEach((post) => {
      paths.push({
        params: { slug: post.slug },
        locale,
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
}
