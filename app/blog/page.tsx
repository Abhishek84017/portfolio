import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { formatDate, posts, readingMinutes } from "@/data/posts";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Engineering notes from shipping production Flutter apps — performance, HIPAA-aware security and subscription billing.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <main id="main" className="py-16 md:py-24">
      <Container className="max-w-4xl">
        <p className="text-eyebrow flex items-center gap-3 text-muted">
          <span aria-hidden className="h-px w-8 bg-accent-2" />
          Notes
        </p>
        <h1 className="text-display mt-4 text-balance text-fg">
          Lessons from <span className="font-medium italic">production</span> Flutter.
        </h1>
        <p className="text-lede mt-6 max-w-2xl text-pretty text-muted">
          Practical write-ups from apps I&apos;ve shipped — the performance, security and billing details that
          don&apos;t fit on a resume.
        </p>

        <Stagger as="ul" className="mt-12 flex flex-col gap-4 md:mt-16">
          {posts.map((post) => (
            <StaggerItem as="li" key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass spotlight group block rounded-2xl p-6 transition-[transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-card-hover md:p-8"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden>·</span>
                  <span>{readingMinutes(post)} min read</span>
                  <span aria-hidden>·</span>
                  <span>{post.tags.join(" / ")}</span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-6">
                  <h2 className="text-h3 text-balance text-fg">{post.title}</h2>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="mt-1 shrink-0 text-muted transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg"
                  />
                </div>
                <p className="mt-3 text-pretty text-muted">{post.excerpt}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </main>
  );
}
