import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Zap, Globe, BarChart, Users, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Beneficios = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Plataforma Confiável",
      description: "Sistema seguro e verificado para proteger tanto comerciantes quanto clientes. Seus dados estão sempre protegidos.",
    },
    {
      icon: Zap,
      title: "Rápido e Fácil",
      description: "Cadastro simples em minutos. Interface intuitiva que qualquer pessoa pode usar sem dificuldades.",
    },
    {
      icon: Globe,
      title: "Alcance Ampliado",
      description: "Seu negócio visível para milhares de pessoas da sua região. Aumente significativamente sua base de clientes.",
    },
    {
      icon: BarChart,
      title: "Aumento de Vendas",
      description: "Comerciantes relatam aumento médio de 40% nas vendas após ingressar na plataforma. Resultados reais e mensuráveis.",
    },
    {
      icon: Users,
      title: "Fidelização de Clientes",
      description: "Mantenha contato direto com seus clientes através da plataforma. Construa relacionamentos duradouros.",
    },
    {
      icon: Heart,
      title: "Sem Custos",
      description: "100% gratuito para microempreendedores. Sem taxas ocultas, sem mensalidades. Nosso compromisso com você.",
    },
  ];

  const testimonials = [
    {
      name: "João Silva",
      business: "Padaria do João",
      text: "Em 3 meses na plataforma, minhas vendas aumentaram 50%. Muitos clientes novos me encontraram aqui!",
    },
    {
      name: "Maria Santos",
      business: "Boutique da Maria",
      text: "Consegui manter contato com minhas clientes mesmo depois de mudar de endereço. Isso salvou meu negócio!",
    },
    {
      name: "Carlos Oliveira",
      business: "Oficina do Carlos",
      text: "A MapFood me deu visibilidade que eu nunca teria sozinho. Recomendo para todos os comerciantes!",
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
                Benefícios para seu <span className="text-gradient">Negócio</span>
              </h1>
                <p className="text-lg text-muted-foreground">
                Descubra como a MapFood pode transformar seu empreendimento
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index}
                  className="card-elevated hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-dark flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats Section */}
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12">
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  Resultados <span className="text-gradient">Comprovados</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-primary">+40%</div>
                    <div className="text-lg font-medium">Aumento nas Vendas</div>
                    <p className="text-muted-foreground text-sm">Média dos comerciantes cadastrados</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-primary">3x</div>
                    <div className="text-lg font-medium">Mais Visibilidade</div>
                    <p className="text-muted-foreground text-sm">Alcance ampliado na região</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-5xl font-bold text-primary">95%</div>
                    <div className="text-lg font-medium">Satisfação</div>
                    <p className="text-muted-foreground text-sm">Dos comerciantes recomendam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                O que dizem nossos <span className="text-gradient">Parceiros</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={index}
                    className="card-elevated animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.business}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">
                Experimente os <span className="text-gradient">Benefícios</span>
              </h2>
                <p className="text-lg text-muted-foreground">
                Junte-se aos centenas de empreendedores que já estão crescendo com a MapFood
              </p>
              <Link to="/cadastro">
                <Button size="lg" className="btn-glow text-lg px-8">
                  Cadastrar Meu Negócio
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

export default Beneficios;
