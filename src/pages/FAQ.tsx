import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "Como faço para cadastrar meu negócio?",
      answer: "É muito simples! Clique no botão 'Cadastre-se' no menu superior, preencha o formulário com as informações do seu negócio e pronto. O processo leva apenas alguns minutos e é 100% gratuito.",
    },
    {
      question: "A plataforma é realmente gratuita?",
      answer: "Sim! A MapFood é totalmente gratuita para microempreendedores. Não cobramos nenhuma taxa de cadastro, mensalidade ou comissão sobre vendas. Nosso objetivo é apoiar o comércio local.",
    },
    {
      question: "Como os clientes vão me encontrar?",
      answer: "Clientes podem encontrar seu negócio através da busca por nome, categoria, localização ou produtos. Quanto mais completo for seu perfil, mais fácil será para os clientes te encontrarem.",
    },
    {
      question: "Posso adicionar fotos dos meus produtos?",
      answer: "Sim! Você pode adicionar fotos, descrições, preços e todas as informações relevantes sobre seus produtos e serviços. Perfis com fotos recebem até 3x mais visualizações.",
    },
    {
      question: "E se eu mudar meu endereço?",
      answer: "Uma das grandes vantagens da MapFood é que você mantém o contato com seus clientes mesmo mudando de endereço. Basta atualizar seu perfil com a nova localização.",
    },
    {
      question: "Como funciona o sistema de avaliações?",
      answer: "Clientes podem avaliar seu negócio e deixar comentários após realizarem uma compra ou serviço. Essas avaliações ajudam outros clientes na escolha e aumentam sua credibilidade.",
    },
    {
      question: "Posso ter mais de um negócio cadastrado?",
      answer: "Sim! Você pode cadastrar quantos negócios quiser, cada um com seu próprio perfil e informações específicas.",
    },
    {
      question: "Como entro em contato com o suporte?",
      answer: "Você pode entrar em contato conosco através da página de Contato, por e-mail (suporte@mapfood.com.br) ou telefone (11) 1234-5678. Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.",
    },
    {
      question: "Há limite de produtos que posso cadastrar?",
      answer: "Não! Você pode cadastrar quantos produtos e serviços quiser, sem nenhum limite. Quanto mais completo seu catálogo, melhores seus resultados.",
    },
    {
      question: "Como faço para editar as informações do meu negócio?",
      answer: "Após fazer login, você terá acesso ao painel do comerciante onde pode editar todas as informações do seu perfil, adicionar ou remover produtos, responder avaliações e muito mais.",
    },
    {
      question: "A plataforma funciona em dispositivos móveis?",
      answer: "Sim! A MapFood é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Você pode gerenciar seu negócio de qualquer lugar.",
    },
    {
      question: "Vocês oferecem algum tipo de treinamento?",
      answer: "Sim! Oferecemos materiais de apoio, tutoriais em vídeo e suporte personalizado para ajudar você a aproveitar ao máximo a plataforma. Entre em contato conosco para mais informações.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-dark flex items-center justify-center">
                  <HelpCircle className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Perguntas <span className="text-gradient">Frequentes</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Encontre respostas para as dúvidas mais comuns sobre a MapFood
              </p>
            </div>

            <Card className="card-elevated">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Still have questions */}
            <Card className="card-elevated bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold">Ainda tem dúvidas?</h2>
                <p className="text-muted-foreground">
                  Nossa equipe está pronta para ajudar você a começar ou esclarecer qualquer questão
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contato">
                    <Button size="lg" className="btn-glow">
                      Entrar em Contato
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/cadastro">
                    <Button size="lg" variant="outline">
                      Cadastrar Agora
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
