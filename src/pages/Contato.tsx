import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold">
                Entre em <span className="text-gradient">Contato</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tem dúvidas ou sugestões? Estamos aqui para ajudar!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário e responderemos o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" placeholder="Seu nome" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" type="tel" placeholder="(11) 98765-4321" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assunto">Assunto</Label>
                      <Input id="assunto" placeholder="Sobre o que você quer falar?" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem</Label>
                      <Textarea 
                        id="mensagem" 
                        placeholder="Escreva sua mensagem aqui..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full btn-glow" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="card-elevated">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">E-mail</div>
                            <div className="text-muted-foreground">contato@mapfood.com.br</div>
                            <div className="text-muted-foreground">suporte@mapfood.com.br</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Telefone</div>
                            <div className="text-muted-foreground">(11) 1234-5678</div>
                            <div className="text-muted-foreground">Segunda a Sexta, 9h às 18h</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Endereço</div>
                            <div className="text-muted-foreground">
                              Av. Paulista, 1000<br />
                              São Paulo - SP<br />
                              CEP: 01310-100
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated bg-gradient-to-br from-primary/10 to-accent/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">Horário de Atendimento</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Segunda a Sexta</span>
                        <span className="font-medium">9h às 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado</span>
                        <span className="font-medium">9h às 13h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo</span>
                        <span className="font-medium">Fechado</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;
