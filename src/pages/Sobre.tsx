import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Heart, Users, Lightbulb } from "lucide-react";

const Sobre = () => {
  const values = [
    {
      icon: Target,
      title: "Nossa Missão",
      description: "Fortalecer a economia local conectando microempreendedores com clientes, gerando empregos e reduzindo a desigualdade.",
    },
    {
      icon: Heart,
      title: "Nossa Visão",
      description: "Ser a principal plataforma de apoio aos pequenos negócios, promovendo o desenvolvimento sustentável das comunidades.",
    },
    {
      icon: Users,
      title: "Nossos Valores",
      description: "Inclusão, transparência, colaboração e compromisso com o desenvolvimento social e econômico local.",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Utilizamos tecnologia para democratizar o acesso ao mercado e facilitar a conexão entre comerciantes e consumidores.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4 animate-fade-in max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold">
                Sobre a <span className="text-gradient">MapFood</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Uma plataforma criada para apoiar microempreendedores e fortalecer a economia local
              </p>
            </div>

            {/* Story Section */}
            <Card className="card-elevated max-w-4xl mx-auto">
              <CardContent className="p-8 space-y-6">
                <h2 className="text-3xl font-bold">Nossa História</h2>
                <div className="space-y-4 text-muted-foreground text-lg">
                  <p>
                    A MapFood nasceu da necessidade de criar uma solução que realmente fizesse diferença na vida dos 
                    microempreendedores brasileiros. Vimos como pequenos comerciantes enfrentam dificuldades para competir 
                    com grandes redes e como a falta de visibilidade impacta negativamente seus negócios.
                  </p>
                  <p>
                    Nossa plataforma foi desenvolvida para ser uma ponte entre comerciantes locais e seus clientes, 
                    facilitando a divulgação de produtos e serviços, mantendo o contato mesmo quando há mudanças de 
                    localização, e proporcionando igualdade de oportunidades no mercado.
                  </p>
                  <p>
                    Acreditamos que ao apoiar os pequenos negócios, estamos contribuindo para a geração de empregos, 
                    aumento de renda e redução da desigualdade social. Cada comerciante cadastrado representa uma 
                    família que terá melhores oportunidades e uma comunidade mais forte.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <Card 
                  key={index}
                  className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-dark flex items-center justify-center">
                      <value.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Impact Section */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  Nosso <span className="text-gradient">Impacto</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary">500+</div>
                    <div className="text-lg font-medium">Negócios Apoiados</div>
                    <p className="text-muted-foreground">Microempreendedores prosperando</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary">2k+</div>
                    <div className="text-lg font-medium">Empregos Gerados</div>
                    <p className="text-muted-foreground">Oportunidades criadas</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary">50k+</div>
                    <div className="text-lg font-medium">Conexões Realizadas</div>
                    <p className="text-muted-foreground">Entre comerciantes e clientes</p>
                  </div>
                </div>

                <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
                  Esses números representam vidas transformadas, famílias fortalecidas e comunidades mais prósperas. 
                  E isso é apenas o começo!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
