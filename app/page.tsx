import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { About } from "@/components/sections/about";
import { AppPreviews } from "@/components/sections/app-previews";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Mentorship } from "@/components/sections/mentorship";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { TrustBar } from "@/components/sections/trust-bar";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <AppPreviews />
        <Mentorship />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
