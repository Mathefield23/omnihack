import { Code2, Calendar, Users, Trophy, ArrowRight, Zap, Target, Rocket, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from './components/LoginModal';
import { Button } from './catalyst/button';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-omnihack-primary" />
            <span className="text-2xl font-bold text-omnihack-primary">OmniHack</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#eventos" className="text-gray-600 hover:text-omnihack-primary transition-colors">Eventos</a>
            <a href="#como-funciona" className="text-gray-600 hover:text-omnihack-primary transition-colors">Como Funciona</a>
            <a href="#sobre" className="text-gray-600 hover:text-omnihack-primary transition-colors">Sobre</a>
          </div>
          <div className="flex items-center gap-4">
            <Button plain onClick={() => setIsLoginOpen(true)} color="dark">
              Entrar
            </Button>
            <Button href="/cadastro" color="omnihack-primary">
              Cadastrar
            </Button>
          </div>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-omnihack-light text-omnihack-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Plataforma #1 de Hackathons</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Conecte talentos e empresas através de hackathons
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Participe de desafios incríveis, desenvolva soluções inovadoras e mostre seu talento para as melhores empresas do mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button color="omnihack-primary" className="px-8 py-4 text-lg">
                Explorar Eventos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button outline color="omnihack-primary" className="px-8 py-4 text-lg">
                Cadastrar Hackathon
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-omnihack-primary to-omnihack-secondary rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-omnihack-light rounded-lg flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-omnihack-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Hackathon FinTech 2024</h3>
                    <p className="text-sm text-gray-500">R$ 50.000 em prêmios</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>15-17 Dez</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>234 inscritos</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-omnihack-light rounded-lg flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-omnihack-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Challenge</h3>
                    <p className="text-sm text-gray-500">R$ 30.000 em prêmios</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>20-22 Dez</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>189 inscritos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-omnihack-light bg-opacity-30 py-20" id="como-funciona">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-600">Simples, rápido e eficiente</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-omnihack-primary via-omnihack-accent to-omnihack-primary opacity-90"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                  radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 0%, transparent 40%)`
              }}></div>
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">1. Encontre um Hackathon</h3>
                  <p className="text-white text-opacity-90 leading-relaxed">
                    Navegue pelos eventos disponíveis e encontre o hackathon perfeito para você. Filtre por tema, prêmio e data.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-omnihack-accent via-omnihack-light to-white"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, rgba(93,161,196,0.3) 0%, transparent 50%),
                                  radial-gradient(circle at 70% 70%, rgba(93,161,196,0.2) 0%, transparent 60%),
                                  radial-gradient(circle at 50% 50%, rgba(93,161,196,0.15) 0%, transparent 70%),
                                  radial-gradient(circle at 20% 80%, rgba(255,255,255,0.8) 10%, transparent 30%),
                                  radial-gradient(circle at 80% 40%, rgba(255,255,255,0.6) 15%, transparent 35%)`
              }}></div>
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-omnihack-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-omnihack-primary mb-4">2. Inscreva-se</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Faça sua inscrição em poucos cliques. Monte seu time ou participe individualmente dos desafios.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-omnihack-gold via-omnihack-light to-amber-50"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, rgba(192,172,113,0.4) 0%, transparent 50%),
                                  radial-gradient(circle at 30% 70%, rgba(255,215,0,0.2) 0%, transparent 60%),
                                  radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.7) 20%, transparent 50%),
                                  linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 100%)`
              }}></div>
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Trophy className="w-8 h-8 text-omnihack-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-omnihack-primary mb-4">3. Participe e Ganhe</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Desenvolva soluções incríveis, aprenda com a comunidade e concorra a prêmios e oportunidades.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-omnihack-secondary via-rose-200 to-omnihack-light"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 40% 60%, rgba(199,123,106,0.3) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 80%, rgba(255,255,255,0.8) 15%, transparent 40%),
                                  radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.6) 20%, transparent 50%),
                                  linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 100%)`
              }}></div>
              <div className="relative h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                    <Briefcase className="w-8 h-8 text-omnihack-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-omnihack-primary mb-4">4. Visibilidade e Empregabilidade</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Destaque-se no mercado e seja visto por recrutadores. Construa seu portfólio e abra portas para novas oportunidades.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" id="eventos">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Próximos Hackathons</h2>
            <p className="text-xl text-gray-600">Escolha o desafio perfeito para você</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Hackathon FinTech 2024',
                company: 'Banco Digital',
                prize: 'R$ 50.000',
                date: '15-17 Dez',
                participants: '234',
                color: 'primary'
              },
              {
                title: 'AI Challenge',
                company: 'TechCorp',
                prize: 'R$ 30.000',
                date: '20-22 Dez',
                participants: '189',
                color: 'accent'
              },
              {
                title: 'Sustentabilidade Tech',
                company: 'EcoStart',
                prize: 'R$ 25.000',
                date: '10-12 Jan',
                participants: '156',
                color: 'gold'
              }
            ].map((event, index) => {
              const colorMap = {
                primary: { from: 'from-omnihack-primary', to: 'to-omnihack-secondary', bg: 'bg-omnihack-light', text: 'text-omnihack-primary', button: 'group-hover:bg-omnihack-primary' },
                accent: { from: 'from-omnihack-accent', to: 'to-omnihack-primary', bg: 'bg-omnihack-light', text: 'text-omnihack-accent', button: 'group-hover:bg-omnihack-accent' },
                gold: { from: 'from-omnihack-gold', to: 'to-omnihack-secondary', bg: 'bg-omnihack-light', text: 'text-omnihack-gold', button: 'group-hover:bg-omnihack-gold' }
              };
              const colors = colorMap[event.color];
              return (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${colors.from} ${colors.to}`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.company}</p>
                    </div>
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                      <Trophy className={`w-6 h-6 ${colors.text}`} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{event.prize}</div>
                    <p className="text-sm text-gray-500">em prêmios</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{event.participants} inscritos</span>
                    </div>
                  </div>
                  <Button color="omnihack-primary" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-omnihack-primary to-omnihack-secondary py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para o desafio?
          </h2>
          <p className="text-xl text-omnihack-light mb-8">
            Junte-se a milhares de desenvolvedores e empresas inovadoras
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button color="light" className="px-8 py-4 text-lg">
              Começar Agora
            </Button>
            <Button outline color="light" className="px-8 py-4 text-lg">
              Sou uma Empresa
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-omnihack-primary text-omnihack-light text-opacity-70 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-omnihack-gold" />
                <span className="text-xl font-bold text-omnihack-light">OmniHack</span>
              </div>
              <p className="text-sm">
                Conectando talentos e empresas através de hackathons.
              </p>
            </div>
            <div>
              <h4 className="text-omnihack-light font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Eventos</a></li>
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Sobre Nós</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-omnihack-light font-semibold mb-4">Para Empresas</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Criar Hackathon</a></li>
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Casos de Sucesso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-omnihack-light font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Suporte</a></li>
                <li><a href="#" className="hover:text-omnihack-light transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-omnihack-light transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-omnihack-secondary border-opacity-30 pt-8 text-sm text-center">
            <p>&copy; 2024 OmniHack. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

export default App;
