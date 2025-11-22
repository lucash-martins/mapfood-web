import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Store, Users, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import statsData from "@/data/stats.json";

const Index = () => {
  const iconMap = {
    0: Store,
    1: Users,
    2: TrendingUp,
    3: MapPin,
  };

  const features = statsData.features.map((feature, index) => ({
    icon: iconMap[index as keyof typeof iconMap],
    title: feature.title,
    description: feature.description,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Fortaleça a <span className="text-gradient">Economia Local</span> com Tecnologia
            </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conectamos microempreendedores com clientes, gerando empregos, renda e oportunidades para todos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cadastro">
                <Button size="lg" className="btn-glow text-lg px-8">
                  Cadastre seu Negócio
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/comerciantes">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Explorar Comerciantes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-accent/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              Por que <span className="text-gradient">MapFood</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma completa para impulsionar seu negócio e conectar sua comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-elevated border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-gradient">{statsData.totalComercio}+</h3>
              <p className="text-lg text-muted-foreground">Microempreendedores</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-gradient">{(statsData.totalProdutos / 1000).toFixed(0)}k+</h3>
              <p className="text-lg text-muted-foreground">Produtos Cadastrados</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl md:text-5xl font-bold text-gradient">{(statsData.totalClientes / 1000).toFixed(0)}k+</h3>
              <p className="text-lg text-muted-foreground">Clientes Conectados</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              Pronto para <span className="text-gradient">Crescer</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Junte-se a centenas de empreendedores que já estão transformando seus negócios com a MapFood
            </p>
            <Link to="/cadastro">
              <Button size="lg" className="btn-glow text-lg px-8">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
