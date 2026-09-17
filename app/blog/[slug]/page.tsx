import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/post-body";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatDate, getPost, posts, readingMinutes } from "@/data/posts";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [profile.name],
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const project = projects.find((p) => p.slug === post.project);
  const index = posts.indexOf(post);
  const next = posts[(index + 1) % posts.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <main id="main" className="py-16 md:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="group/back inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 ease-out-expo hover:text-fg"
        >
          <ArrowLeft
            size={16}
            aria-hidden
            className="transition-transform duration-200 ease-out-expo group-hover/back:-translate-x-1"
          />
          All notes
        </Link>

        <article className="mt-8">
          <header className="animate-rise">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{readingMinutes(post)} min read</span>
            </div>
            <h1 className="text-h2 mt-4 text-balance text-fg">{post.title}</h1>
            <p className="text-lede mt-4 text-pretty text-muted">{post.excerpt}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs leading-4 text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-12 border-t border-line pt-12 animate-rise [animation-delay:150ms]">
            <PostBody blocks={post.blocks} />
          </div>
        </article>

        <footer className="mt-16 flex flex-col gap-4 border-t border-line pt-12 sm:flex-row sm:items-stretch">
          {project ? (
            <Link
              href="/#projects"
              className="glass spotlight group flex-1 rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover"
            >
              <p className="text-eyebrow text-muted">From the project</p>
              <p className="mt-2 font-display text-xl font-semibold tracking-tight text-fg">{project.name}</p>
              <p className="mt-1 text-sm text-muted">{project.category}</p>
            </Link>
          ) : null}
          {next && next !== post ? (
            <Link
              href={`/blog/${next.slug}`}
              className="glass spotlight group flex-1 rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover"
            >
              <p className="text-eyebrow text-muted">Next note</p>
              <p className="mt-2 flex items-start justify-between gap-4 font-display text-xl font-semibold tracking-tight text-fg">
                {next.title}
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="mt-1 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                />
              </p>
            </Link>
          ) : null}
        </footer>

        <div className="mt-12 text-center">
          <Link href="/#contact" className={buttonClasses()}>
            <span className="relative">Work with me</span>
          </Link>
        </div>
      </Container>
    </main>
  );
}
