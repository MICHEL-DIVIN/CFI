import { CheckCircle } from "lucide-react";

const CodeBlock = () => (
    <div className="relative font-code">
      <pre className="bg-black/80 backdrop-blur-sm rounded-lg p-6 text-sm text-white overflow-x-auto border border-primary/20">
        <code className="language-javascript">
          <span className="text-gray-500">// src/app/page.tsx</span><br/>
          <span className="text-purple-400">import</span> {"{"} <span className="text-blue-300">Hackathon</span> {"}"} <span className="text-purple-400">from</span> <span className="text-yellow-300">'@/events'</span>;<br/><br/>
          <span className="text-purple-400">export default function</span> <span className="text-green-300">Home</span>() {"{"}<br/>
          {"  "}<span className="text-purple-400">return</span> (<br/>
          {"    "}<span className="text-gray-500">&lt;</span><span className="text-green-400">main</span><span className="text-gray-500">&gt;</span><br/>
          {"      "}<span className="text-gray-500">&lt;</span><span className="text-red-400">Hackathon.Welcome</span><br/>
          {"        "}<span className="text-blue-300">year</span>={"{"}<span className="text-yellow-300">2026</span>{"}"}<br/>
          {"        "}<span className="text-blue-300">motto</span>=<span className="text-yellow-300">"Innovate. Create. Collaborate."</span><br/>
          {"      "}<span className="text-gray-500">/&gt;</span><br/>
          {"    "}<span className="text-gray-500">&lt;/</span><span className="text-green-400">main</span><span className="text-gray-500">&gt;</span><br/>
          {"  "});<br/>
          {"}"}
        </code>
        <div className="absolute top-11 left-7 w-0.5 h-4 bg-white animate-pulse"></div>
      </pre>
    </div>
  );

const AboutSection = () => {
    return (
      <section id="about" className="py-20 md:py-32 bg-card/50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <CodeBlock />
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                <span className="text-primary">100%</span> Code<br/>
                <span className="text-primary">100%</span> Créativité
              </h2>
              <p className="mt-4 text-muted-foreground">
                Le Hackathon 2026 n'est pas une compétition de plus. C'est un carrefour de talents brillants, un tremplin pour des idées révolutionnaires et une célébration du pouvoir de la technologie pour résoudre des problèmes réels. Que vous soyez développeur expérimenté ou designer créatif, c'est votre terrain de jeu.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <span>
                    <strong>Application Web ou Mobile&nbsp;:</strong> Choisissez votre plateforme, libérez votre créativité et construisez une application entièrement fonctionnelle à partir de zéro.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <span>
                    <strong>Un Défi, Une Idée, Une Solution&nbsp;:</strong> Relevez des défis passionnants, imaginez des solutions innovantes et donnez vie à votre vision avec le soutien de mentors du secteur.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
