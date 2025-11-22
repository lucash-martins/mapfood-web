import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, Store, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ComoFunciona = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Cadastre-se",
      description: "Preencha um formulário simples com as informações do seu negócio. É rápido e gratuito!",
    },
    {
      icon: Store,
      title: "2. Configure sua Loja",
      description: "Adicione fotos, descrições dos seus produtos e serviços. Personalize seu perfil.",
    },
    {
      icon: Users,
      title: "3. Conecte-se com Clientes",
      description: "Clientes da sua região poderão encontrar você facilmente através da plataforma.",
    },
    {
      icon: TrendingUp,
      title: "4. Cresça seu Negócio",
      description: "Acompanhe seu desempenho, receba avaliações e expanda sua base de clientes.",
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
                Como <span className="text-gradient">Funciona</span>?
              </h1>
              <p className="text-lg text-muted-foreground">
                Em apenas 4 passos simples, você pode começar a divulgar seu negócio e alcançar mais clientes
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-dark flex items-center justify-center">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Por que usar a <span className="text-gradient">MapFood</span>?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 text-center">
                  <div className="text-4xl font-bold text-primary">100%</div>
                  <div className="text-lg font-medium">Gratuito</div>
                  <p className="text-muted-foreground">Sem taxas ou mensalidades</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="text-4xl font-bold text-primary">24/7</div>
                  <div className="text-lg font-medium">Sempre Disponível</div>
                  <p className="text-muted-foreground">Clientes encontram você a qualquer hora</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="text-4xl font-bold text-primary">∞</div>
                  <div className="text-lg font-medium">Alcance Ilimitado</div>
                  <p className="text-muted-foreground">Divulgue quantos produtos quiser</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">
                Pronto para <span className="text-gradient">Começar</span>?
              </h2>
              <p className="text-lg text-muted-foreground">
                Cadastre seu negócio agora e comece a atrair mais clientes hoje mesmo
              </p>
              <Link to="/cadastro">
                <Button size="lg" className="btn-glow text-lg px-8">
                  Criar Minha Conta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComoFunciona;
