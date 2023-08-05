import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import TopicCard from "../../components/TopicCard";
import { getBlogPosts } from "../../helpers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Blogs = ({ posts }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const topics = [
    {
      title: "Why natural products?",
      description:
        "Chemical description have been used for long times, and this is a very bad thing.",
    },
    {
      title: "Why natural products?",
      description:
        "Chemical description have been used for long times, and this is a very bad thing.",
    },
    {
      title: "Why natural products?",
      description:
        "Chemical description have been used for long times, and this is a very bad thing.",
    },
  ];
  return (
    <div dir={router.locale === "ar" ? "rtl" : "ltr"}>
      <Navbar t={t} />
      <div
        className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 pt-20"
        id="posts"
      >
        <h1 className="text-4xl my-10 font-bold">Our Topics</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {posts ? (
            posts.map((post) => <TopicCard key={post._id} post={post} />)
          ) : (
            <p>No topics available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;

export async function getStaticProps({ locale }) {
  const posts = await getBlogPosts();

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      posts: posts,
    },
  };
}
