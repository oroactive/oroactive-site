import { Nav } from "@/components/Nav";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  return { title: post?.title || "Blog OroActive", description: post?.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();
  return (
    <>
      <Nav />
      <main className="px-5 py-16">
        <article className="mx-auto max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-[.22em] text-orange">{post.category}</span>
          <h1 className="mt-4 font-display text-5xl font-black">{post.title}</h1>
          <p className="mt-6 text-xl leading-8 text-warm/70">{post.excerpt}</p>
          <div className="prose prose-invert mt-10 max-w-none text-warm/75">
            <p>Questa guida OroActive è predisposta per contenuti SEO, schema.org e aggiornamento tramite CMS interno.</p>
            <p>Il testo definitivo può essere gestito dalla dashboard contenuti e collegato alle pagine locali dei negozi.</p>
          </div>
        </article>
      </main>
    </>
  );
}
