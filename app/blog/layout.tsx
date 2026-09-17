import { BlogHeader } from "@/components/blog/blog-header";
import { Footer } from "@/components/layout/footer";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <>
      <BlogHeader />
      {children}
      <Footer onHome={false} />
    </>
  );
}
