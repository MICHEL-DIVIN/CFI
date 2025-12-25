import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BackgroundParticles from "@/components/background-particles";

export default function ResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <section className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] overflow-hidden">
          <BackgroundParticles />
          <div className="relative z-10 text-center px-4">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
              Résultats
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Les résultats du Hackathon 2026 seront annoncés ici. Revenez bientôt !
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
