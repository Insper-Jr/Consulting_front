// ── Tech page translations ───────────────────────────────────────────────
// Consumed by: src/pages/tech/tech.tsx, src/pages/tech/components/techCTA.tsx,
// src/pages/tech/cases/caseLayout.tsx, src/pages/tech/components/gamifCase.tsx,
// src/pages/tech/components/medCase.tsx, src/pages/tech/components/walleCase.tsx

export const techTranslations = {
  pt: {
    tech: {
      hero: {
        eyebrow: "Frente de Engenharia & Tecnologia",
        words: [
          { text: "Tecnologia" },
          { text: "que" },
          { text: "resolve", accent: true },
          { text: "problemas", accent: true },
          { text: "reais", accent: true },
          { text: "de" },
          { text: "negócio." },
        ],
        subtitle:
          "Unimos engenharia, dados, automação e desenvolvimento de software para criar soluções digitais sob medida, desde a estruturação de bancos de dados até agentes inteligentes integrados ao seu ecossistema.",
      },

      scopesOpening: {
        eyebrow: "Frentes de atuação",
        title: "Nossos Escopos",
        subtitle:
          "Três frentes que operam de forma integrada, e podem ser combinadas para entregar soluções tecnológicas completas dentro de um mesmo ecossistema.",
        badge: "ESCOPO {{num}}",
        explore: "Explorar",
        howWeWorkLabel: "Como atuamos",
        mainApplicationsLabel: "Principais aplicações",
      },

      scopes: {
        web: {
          tab: "Desenvolvimento Web",
          title: "Plataformas <i>completas</i>.",
          lede: "Focado na <strong>criação de plataformas digitais completas (fullstack)</strong>, de componentes isolados a sistemas inteiros. Arquitetura modular e escalável, com integração nativa a dados, automações e agentes de IA.",
          sideEyebrow: "Ficha do escopo",
          rows: {
            produtoChave: { label: "Produto-chave", value: "<strong>Plataformas digitais completas</strong> (fullstack)" },
            stack: { label: "Stack", value: "· React no front<br />· Python no back" },
            versionamento: { label: "Versionamento", value: "GitHub: controle de branches e documentação completa" },
            aplicacoes: { label: "Aplicações", value: "Sistemas web personalizados, plataformas institucionais e operacionais, soluções interativas" },
            sinergia: { label: "Sinergia", value: "Comunicação direta com Dados, Automação e agentes de IA" },
          },
          quote: "Do componente isolado ao sistema completo: arquitetura modular e escalável.",
          detail: "Trabalhamos com <strong>desenvolvimento fullstack</strong> (frontend + backend), priorizando arquitetura modular e escalável. Integramos com banco de dados e soluções analíticas, conversamos diretamente com automações e agentes de IA, e organizamos os projetos em <strong>repositórios bem documentados</strong>. A flexibilidade do escopo permite entregar desde um dashboard isolado até uma plataforma completa, passando por soluções híbridas.",
          bullets: [
            "Sistemas web personalizados",
            "Plataformas institucionais e operacionais",
            "Aplicações com integração de dados",
            "Soluções interativas",
          ],
          tags: ["React", "Python", "GitHub"],
        },
        data: {
          tab: "Dados",
          title: "Dados que viram <i>decisão</i>.",
          lede: "Responsável por <strong>transformar dados em inteligência estratégica</strong>, da estruturação e modelagem dos bancos ao desenvolvimento de <strong>dashboards interativos</strong> e modelos de machine learning para apoio à tomada de decisão.",
          sideEyebrow: "Ficha do escopo",
          rows: {
            produtoChave: { label: "Produto-chave", value: "<strong>Dashboards interativos</strong> (React + Python)" },
            bancosDeDados: { label: "Bancos de dados", value: "· SQL (PostgreSQL, Supabase, SQL Workbench)<br />· NoSQL" },
            aplicacoes: { label: "Aplicações", value: "Visualização estratégica, análise exploratória e diagnóstica, Machine Learning (previsão, classificação, clusterização)" },
            sinergia: { label: "Sinergia", value: "Forte integração com Desenvolvimento Web: dashboards embarcados em plataformas" },
          },
          quote: "Desenvolvimento orientado ao problema, não à ferramenta.",
          detail: "Nossa abordagem é <strong>orientada ao problema</strong> e não restrita a ferramentas específicas. Estruturamos e modelamos os dados conforme a necessidade do cliente, integramos com outras frentes (ex: dashboards dentro de plataformas web) e entregamos <strong>documentação técnica detalhada</strong> de todos os métodos utilizados. O produto-chave são os dashboards: front-end em React e back-end em Python, conectados ao banco em tempo real.",
          bullets: [
            "Dashboards interativos",
            "Visualização de dados estratégicos",
            "Análise exploratória e diagnóstica",
            "Modelos de Machine Learning: previsão, classificação e clusterização",
            "Apoio à tomada de decisão baseada em dados",
          ],
          tags: ["Python", "React", "SQL", "PostgreSQL", "Supabase", "SQL Workbench", "NoSQL", "Machine Learning"],
        },
        automation: {
          tab: "Inteligência Artificial",
          title: "Agentes que <i>executam</i> e conversam.",
          lede: "Desenvolvimento de <strong>automações inteligentes</strong> e de <strong>agentes e chatbots</strong> capazes de executar tarefas e conversar com usuários, integrando sistemas e reduzindo tempo e custo de processos internos e de atendimento.",
          sideEyebrow: "Ficha do escopo",
          rows: {
            produtoChave: { label: "Produto-chave", value: "<strong>Automações inteligentes</strong> e <strong>agentes conversacionais</strong> (chatbots)" },
            frentes: { label: "Frentes", value: "· Automação e agentes<br />· Chatbots e assistentes conversacionais" },
            integracoes: { label: "Integrações", value: "APIs entre plataformas · canais WhatsApp e site · bases de conhecimento próprias (RAG)" },
            aplicacoes: { label: "Aplicações", value: "Rotinas repetitivas, triagem de documentos, e-mails e planilhas, atendimento ao cliente final e suporte interno" },
          },
          quote: "Da rotina repetitiva ao atendimento: execução autônoma de ponta a ponta.",
          detail: "A atuação se divide em duas frentes. Em <strong>automação e agentes</strong>, integramos plataformas via <strong>APIs</strong>, executamos rotinas repetitivas de forma autônoma e fazemos a triagem de documentos, e-mails e planilhas com <strong>processamento de linguagem natural</strong>. Em <strong>chatbots e assistentes conversacionais</strong>, atendemos o cliente final e o suporte interno com consulta a <strong>bases de conhecimento próprias da empresa (RAG)</strong>, em canais como WhatsApp e site.",
          bullets: [
            "Integração entre plataformas via APIs",
            "Execução autônoma de rotinas repetitivas",
            "Triagem de documentos, e-mails e planilhas",
            "Chatbots de atendimento e suporte interno",
            "Consulta a bases de conhecimento (RAG)",
            "Operação em canais como WhatsApp e site",
          ],
          tags: ["Agentes de IA", "Chatbots", "RAG", "NLP", "APIs", "n8n", "WhatsApp"],
        },
      },

      highlightCases: {
        eyebrow: "Projetos em destaque",
        title: "Cases de Destaque",
        subtitle: "Conheça três projetos que exemplificam a forma como entregamos soluções tecnológicas, do desenvolvimento web a automações inteligentes.",
        badge: "Tech",
        viewCta: "Ver case completo",
        gamificacao: {
          ariaLabel: "Ver case Gamificação",
          title: "Gamificação",
          imgAlt: "Aumento da Produtividade Através de Gamificação",
          subtitle: "Escopo · Desenvolvimento Web",
          desc: "Plataforma fullstack que centraliza a operação de uma empresa de construção civil e engaja a equipe de campo com pontos, ranking e KPIs de segurança.",
        },
        medicina: {
          ariaLabel: "Ver case Medicina",
          title: "Medicina",
          imgAlt: "Contexto do Projeto Medicina",
          subtitle: "Escopo · Desenvolvimento Web",
          desc: "Plataforma fullstack de gestão documental e notificação de ocorrências, com versionamento em nuvem e fluxo digital padronizado.",
        },
        walle: {
          ariaLabel: "Ver case Wall-E",
          title: "Wall-E",
          placeholderAriaLabel: "Imagem a ser definida",
          placeholderText: "Imagem em breve",
          imgAlt: "Contexto do Projeto Wall-E",
          subtitle: "Escopo · Inteligência Artificial",
          desc: "Ecossistema multi-agente com quatro IAs especialistas, coordenadas por um classificador inteligente, cobrindo todo o atendimento de um cliente de saúde.",
        },
      },

      integration: {
        kicker: "Sinergia entre Escopos",
        title: "Soluções que <span>conversam entre si</span> em um mesmo ecossistema",
        lede: "Não existe pacote padrão. Cada solução combina dashboards, bancos de dados, automações e agentes inteligentes nas proporções certas para o desafio do cliente, sempre construída sob medida.",
      },

      about: {
        eyebrow: "Quem somos",
        title: "Sobre a frente",
        lede: "Desde 2017, desenvolvemos soluções digitais e tecnológicas que unem engenharia, dados, automação e desenvolvimento de software para gerar impacto real em empresas e organizações. Nossa atuação evolui constantemente em tecnologias, metodologias e materiais internos, sempre buscando a melhor solução para cada projeto, sem se limitar a ferramentas ou padrões específicos.",
        pillars: {
          multidisciplinar: {
            num: "01: Multidisciplinar",
            title: "Cinco cursos, uma frente",
            text: "Reunimos alunos de <strong>Engenharia da Computação, Mecânica, Mecatrônica, Produção e Ciência da Computação</strong>, garantindo visão multidisciplinar e acesso a diferentes áreas do universo tech.",
          },
          integrada: {
            num: "02: Integrada",
            title: "Três escopos que conversam",
            text: "A atuação se divide em <strong>Dados, Desenvolvimento Web e Inteligência Artificial</strong>. A divisão é apenas organizacional: os escopos funcionam de forma integrada dentro de uma mesma solução.",
          },
          sobMedida: {
            num: "03: Sob medida",
            title: "Soluções completas",
            text: "Combinamos dashboards analíticos, bancos de dados, automações e agentes inteligentes em uma única plataforma, <strong>adaptada ao contexto e às necessidades de cada cliente</strong>.",
          },
        },
        stats: {
          escopos: { value: "3+", label: "Escopos integrados" },
          cursos: { value: "5", label: "Cursos de Engenharia" },
          anosAtuacao: { value: "8+", label: "Anos de Atuação" },
          anosInsper: { value: "24+", label: "Anos de Insper Jr." },
        },
      },

      diferenciais: {
        eyebrow: "O que nos diferencia",
        title: "Diferenciais",
        subtitle: "O que faz a frente de Tecnologia da Insper Jr. se destacar no mercado.",
        cards: {
          multidisciplinaridade: {
            num: "01",
            title: "Multidisciplinaridade",
            text: "Reunimos alunos de cinco cursos de Engenharia e Ciência da Computação, garantindo visão multidisciplinar e acesso a diferentes áreas do universo tech.",
          },
          adaptacao: {
            num: "02",
            title: "Adaptação tecnológica",
            text: "Não nos limitamos a uma única stack ou metodologia. Cada solução é desenvolvida considerando o contexto, objetivo e necessidade do cliente, com flexibilidade e assertividade técnica.",
          },
          integracao: {
            num: "03",
            title: "Integração entre escopos",
            text: "Dados, Desenvolvimento Web e Inteligência Artificial atuam em conjunto, possibilitando entregas completas em que diferentes soluções conversam dentro de um mesmo ecossistema.",
          },
        },
      },

      cta: {
        eyebrow: "Próximo passo",
        title: "Pronto para construir sua<br />próxima solução tecnológica?",
        subtitle: "Entre em contato com a Insper Jr. e descubra como podemos unir dados, desenvolvimento web e automação em uma solução sob medida para o seu negócio.",
        button: "Fazer diagnóstico gratuito",
      },

      caseLayout: {
        backLabel: "Voltar",
        backAriaLabel: "Voltar para a página de Tecnologia",
      },

      cases: {
        common: {
          badge: "CASE EM DESTAQUE",
          prev: "Anterior",
          next: "Próximo",
          project: "O projeto",
          howMade: "Como foi feito",
          strategy: "Estratégia",
          screenAriaLabel: "Tela {{n}}",
        },

        gamificacao: {
          name: "Gamificação",
          sub: "Para mostrar como entregamos <strong>plataformas digitais completas</strong> dentro do escopo de <strong>Desenvolvimento Web</strong>: o projeto <strong>Gamificação</strong>, uma plataforma fullstack que centraliza toda a operação de uma empresa de construção civil em um único lugar e, no mesmo sistema, engaja a equipe de campo com pontos, ranking e KPIs de segurança.",
          deckAriaLabel: "Apresentação do projeto Gamificação",
          why: "Por que Gamificação?",
          p1: "O cliente, do setor de <strong>construção civil</strong>, tinha sua operação espalhada (obras, validações, cargos e usuários em planilhas e sistemas paralelos) e dificuldade em <strong>engajar a equipe de campo</strong> (pedreiros, eletricistas, bombeiros e carpinteiros) no dia a dia da obra.",
          p2: "Construímos uma <strong>plataforma fullstack</strong> com dois lados conectados: um <strong>painel corporativo</strong> para a gestão (visão geral, obras, validações, dashboards) e um <strong>painel gamificado</strong> em estética 8-bit para o operário, com ranking de equipes, top funcionários e quadro de pontos.",
          p3: "Stack <strong>React + Vite</strong> no front, <strong>FastAPI</strong> no back com migrações <strong>Alembic</strong>, e <strong>Supabase</strong> como base: Postgres com <strong>triggers</strong> e funções internas para automatizar pontuação, validações e cálculo de progresso em tempo real.",
          list: [
            "<strong>Operação centralizada</strong>: obras, pacotes, blocos e atividades em um único lugar, com progresso real por obra.",
            "<strong>Engajamento por gamificação</strong>: pontos por atividade concluída, ranking de equipes e top de funcionários atualizado em tempo real.",
            "<strong>Triggers no banco</strong>: atribuição de pontos, cálculo de progresso e validações disparadas direto pelo Postgres.",
            "<strong>Dois mundos, uma base</strong>: gestão e campo enxergam a mesma fonte de verdade, em UIs desenhadas para cada contexto.",
          ],
          final: "Uma plataforma · dois públicos · operação e engajamento no mesmo lugar.",
          slides: {
            problema: { alt: "Baixa Produtividade e Falta de Engajamento em Obras", cap: "01 · Problema" },
            solucao: { alt: "Aumento da Produtividade Através de Gamificação", cap: "02 · Solução" },
            plataforma: { alt: "Nossa Solução: Plataforma de Gamificação Para Obras", cap: "03 · Plataforma" },
          },
          shotsHeading: "Como aparece <em>no canteiro.</em>",
          shotsAriaLabel: "Telas reais da plataforma Gamificação",
          shots: {
            visao: { label: "Visão", bar: "painel-do-gestor · visao-geral", alt: "Painel do Gestor: Visão Consolidada", capH: "Visão consolidada", capT: "todas as obras em um só lugar" },
            acomp: { label: "Acomp.", bar: "painel-do-gestor · acompanhamento", alt: "Painel do Gestor: Acompanhamento de Obras", capH: "Acompanhamento", capT: "status, progresso e alertas" },
            gestao: { label: "Obras", bar: "painel-do-gestor · gestao-obras", alt: "Painel do Gestor: Gestão de Obras", capH: "Gestão de obras", capT: "crie, organize e monitore" },
            equipes: { label: "Equipes", bar: "painel-do-gestor · gestao-equipes", alt: "Painel do Gestor: Gestão de Equipes", capH: "Gestão de equipes", capT: "monte e gerencia times" },
            funcionarios: { label: "Func.", bar: "painel-do-gestor · gestao-funcionarios", alt: "Painel do Gestor: Gestão de Funcionários", capH: "Gestão de funcionários", capT: "lista por cargo e matrícula" },
            validacoes: { label: "Validações", bar: "painel-do-gestor · validacoes", alt: "Painel do Gestor: Validação de Tarefas", capH: "Validação de tarefas", capT: "aprovações antes de pontuar" },
            cargos: { label: "Cargos", bar: "painel-do-gestor · gestao-cargos", alt: "Painel do Gestor: Gestão de Cargos", capH: "Gestão de cargos", capT: "funcionários por categoria" },
            dash1: { label: "Dashboard", bar: "painel-do-gestor · dashboard-obra", alt: "Painel do Gestor: Dashboard de Desempenho", capH: "Dashboard de desempenho", capT: "avanço, presença, pontuação" },
            dash2: { label: "Ranking", bar: "painel-do-gestor · dashboard-ranking", alt: "Painel do Gestor: Ranking e Alertas", capH: "Ranking e alertas", capT: "equipes, pontuação e atrasos" },
            operario: { label: "Operário", bar: "painel-gamificado · selecione-obra", alt: "Visão do Operário: Seleção de Obra (8-bit)", capH: "Visão do operário", capT: "interface gamificada 8-bit" },
            ranking_op: { label: "Ranking", bar: "painel-gamificado · ranking-equipes", alt: "Visão do Operário: Ranking de Equipes (8-bit)", capH: "Ranking de equipes", capT: "competição em tempo real" },
            top20: { label: "Top 20", bar: "painel-gamificado · top-20-funcionarios", alt: "Visão do Operário: Top 20 Funcionários (8-bit)", capH: "Top 20 funcionários", capT: "pódio e ranking individual" },
          },
        },

        medicina: {
          name: "Medicina",
          sub: "Outro projeto que reforça nossa atuação em <strong>Desenvolvimento Web</strong>: o <strong>Medicina I</strong>, uma plataforma fullstack de <strong>gestão documental e notificação de ocorrências</strong> que centraliza documentos, prazos e responsáveis em um único sistema, com versionamento em nuvem e fluxo digital padronizado para registrar e acompanhar ocorrências.",
          deckAriaLabel: "Apresentação do projeto Medicina I",
          why: "Por que Medicina I?",
          p1: "O cliente, da área de <strong>saúde</strong>, tinha sua operação documental espalhada em <strong>planilhas extensas</strong> (sem padronização, rastreabilidade ou controle de versões) e dependia de processos manuais para registrar e acompanhar <strong>ocorrências</strong> do dia a dia.",
          p2: "Construímos uma <strong>plataforma fullstack</strong> que centraliza documentos, prazos e responsáveis em um único sistema. O mesmo ambiente unifica a <strong>gestão documental</strong> e a <strong>notificação de ocorrências</strong>, com versionamento, controle de acesso e rastreabilidade ponta a ponta.",
          p3: "Para o versionamento, integramos um <strong>bucket na AWS</strong> garantindo armazenamento seguro e controle adequado de cada versão dos documentos. A base de dados foi modelada para suportar <strong>múltiplas entidades e relações complexas</strong> sem comprometer performance.",
          list: [
            "<strong>Operação documental unificada</strong>: documentos, prazos e responsáveis em um só lugar, com padronização e rastreabilidade.",
            "<strong>Versionamento em nuvem</strong>: bucket AWS com histórico, integridade e recuperação de cada versão.",
            "<strong>Notificação de ocorrências</strong>: fluxo digital padronizado para registrar, acompanhar e resolver eventos com agilidade.",
            "<strong>UX clara e intuitiva</strong>: interface desenhada para uso diário sem necessidade de treinamento extenso.",
          ],
          final: "Documentos · ocorrências · versionamento: a operação inteira em uma só plataforma.",
          slides: {
            contexto: { alt: "Contexto do projeto: gestão documental e notificação de ocorrências", cap: "01 · Contexto" },
            desafios: { alt: "Trajetória de desafios: base de dados, versionamento e UX", cap: "02 · Desafios" },
          },
          slidePlaceholderHint: "imagem em breve",
          shotsHeading: "Como aparece <em>no dia a dia.</em>",
          shotsAriaLabel: "Telas reais da plataforma Medicina I",
          shots: {
            home: { label: "Home", bar: "plataforma · pagina-inicial", alt: "Plataforma: Página inicial", capH: "Página inicial", capT: "dashboard de documentos e logs" },
            listagem: { label: "Listagem", bar: "plataforma · listagem-documentos", alt: "Plataforma: Listagem de documentos", capH: "Listagem de documentos", capT: "visualizar, baixar e pré-visualizar" },
            elaboracao: { label: "Cadastro", bar: "plataforma · elaboracao-documento", alt: "Plataforma: Elaboração de documento", capH: "Elaboração", capT: "cadastrar um novo documento" },
            admin: { label: "Admin", bar: "plataforma · administracao", alt: "Plataforma: Administração", capH: "Administração", capT: "usuários, áreas, unidades e tipos" },
          },
        },

        walle: {
          name: "Wall-E",
          sub: "O <strong>Wall-E</strong> nasceu de uma <strong>atuação integrada entre frentes</strong>: antes da camada tecnológica, conduzimos um <strong>estudo operacional dos fluxos de venda e SAC</strong> do cliente para assegurar a experiência ponta a ponta. Só com a jornada mapeada e refinada, o escopo de <strong>Inteligência Artificial</strong> construiu o <strong>ecossistema multi-agente</strong>: quatro IAs especialistas, coordenadas por um classificador inteligente, que cobrem todo o atendimento de um cliente do setor de saúde.",
          deckAriaLabel: "Apresentação do projeto walle",
          why: "Por que Wall-E?",
          p1: "O cliente, do setor de saúde B2B, atendia em um único canal de WhatsApp três públicos completamente diferentes: <strong>leads em prospecção</strong>, <strong>clientes ativos com dúvidas operacionais</strong> e <strong>clientes aguardando entrega</strong>. Com um time enxuto, o atendimento era reativo, leads esfriavam e dúvidas simples consumiam horas.",
          p2: "A solução foi um <strong>ecossistema de quatro IAs especialistas</strong>, cada uma com prompt, base de conhecimento e escopo próprios, coordenadas por um classificador interno que observa cada mensagem, identifica a intenção e direciona para o agente certo, em tempo real.",
          p3: "Construído inteiramente sobre <strong>n8n</strong>, integrando <strong>LLMs</strong> e APIs internas do cliente, sem dependência de plataformas SaaS de chatbot. Cada agente atua só dentro da própria especialidade. Fora dela, transfere para humano.",
          list: [
            "<strong>Especialização por agente</strong>: separar prompt, base e escopo reduz alucinação e mantém cada conversa coerente.",
            "<strong>Roteamento contínuo</strong>: a IA de Classificação re-avalia a cada turno, inclusive quando o assunto muda.",
            "<strong>Humano no momento certo</strong>, premissa: em dúvida, transfere. Sem suposição.",
            "<strong>Quatro camadas de barreira</strong>: anti-prompt injection, escopo estrito, controle de alucinação e compliance do setor saúde.",
          ],
          final: "Quatro IAs · três jornadas cobertas · 24/7 · um canal único.",
          slides: {
            cover: {
              corner: "Live · 2025",
              pill: "Case · Inteligência Artificial",
              tag: "Ecossistema multi-agente sobre <strong>WhatsApp Business</strong>: quatro IAs especialistas, um único canal.",
              meta: {
                setor: { label: "Setor", value: "Saúde · B2B" },
                canal: { label: "Canal", value: "WhatsApp" },
                stack: { label: "Stack", value: "n8n · LLMs" },
                agentes: { label: "Agentes", value: "4 IAs" },
              },
            },
            arch: {
              corner: "Hub & Spoke",
              eye: "Arquitetura",
              title: "Um <em>orquestrador,</em> três especialistas.",
              orchPill: "Orquestrador",
              orchName: "IA de Classificação",
              orchTag: "Roteia · Observa · Transfere",
              spokes: [
                { num: "01", name: "IA de Vendas", tag: "funil & qualificação" },
                { num: "02", name: "IA de SAC", tag: "suporte operacional" },
                { num: "03", name: "IA de Rastreio", tag: "status & logística" },
              ],
            },
            specs: {
              corner: "Especialização",
              eye: "Especialistas",
              title: "Cada agente, <em>uma especialidade.</em>",
              cards: [
                {
                  num: "01", eye: "Vendas", name: "Conduz o lead.",
                  desc: "Qualifica, responde sobre produtos e prepara o handoff humano no momento certo.",
                  tags: ["Funil ToFu → BoFu", "Catálogo & preço", "Agendamento humano"],
                },
                {
                  num: "02", eye: "SAC", name: "Resolve dúvidas.",
                  desc: "Suporte operacional sobre uso, integrações e plataforma. Em dúvida, transfere.",
                  tags: ["Base de conhecimento", "Triagem inicial", "Fallback humano"],
                },
                {
                  num: "03", eye: "Rastreio", name: "Devolve status.",
                  desc: "Consulta sistemas internos e retorna o estado consolidado do pedido em tempo real.",
                  tags: ["Integração via API", "5 fases logísticas", "ETA & nota fiscal"],
                },
              ],
            },
            prat: {
              corner: "Demo · 04",
              eye: "Na prática",
              title: "Resposta certa, <em>no agente certo.</em>",
              chats: [
                { msg: "Quanto custa esse produto?", route: "Vendas" },
                { msg: "Como integro com meu ERP?", route: "SAC" },
                { msg: "Cadê meu pedido?", route: "Rastreio" },
              ],
              routePrefix: "IA de",
              routeArrow: "ROTEIA",
              foot: "premissa <strong>·</strong> em dúvida, transfere para humano <strong>·</strong> sem alucinação",
            },
            barr: {
              corner: "Defense-in-depth · 4 camadas",
              eye: "Barreiras",
              title: "Quatro camadas, <em>em todos os agentes.</em>",
              core: "Wall-E",
              layers: [
                { n: "01", h: "Anti-prompt injection", t: "Sanitiza entrada e isola instruções do usuário do prompt-sistema." },
                { n: "02", h: "Escopo estrito", t: "Cada agente só responde dentro da sua especialidade declarada." },
                { n: "03", h: "Anti-alucinação", t: "Sem informação na base, escala para humano em vez de inventar." },
                { n: "04", h: "Compliance", t: "Tratamento adequado de dados sensíveis no contexto da saúde." },
              ],
            },
            res: {
              corner: "Resultado · 06",
              eye: "Resultado",
              title: "Uma solução completa, <em>em um único canal.</em>",
              heroNum: "24<sup>/7</sup>",
              heroLabel: "disponibilidade contínua,<br />sem fila de espera.",
              stats: [
                { value: "4", label: "agentes especialistas operando em paralelo" },
                { value: "3", label: "jornadas cobertas <br />(vendas · suporte · pós)" },
                { value: "1", label: "canal único, sem mudança no comportamento do cliente" },
              ],
            },
            shots: {
              shot01: { alt: "Contexto do projeto — escopo, problema do cliente e objetivo" },
              shot02: { alt: "Desenvolvimento da solução — organização dos caminhos de atendimento" },
              shot03: { alt: "Desenvolvimento da solução — IA central com base de conhecimento (RAG)" },
              shot04: { alt: "Desenvolvimento da solução — modelagem dos fluxos de IA no n8n" },
              shot05: { alt: "Desenvolvimento da solução — fluxo de ingestão de SAC" },
              shot06: { alt: "Desenvolvimento da solução — fluxo de ingestão de Vendas" },
              shot07: { alt: "Desenvolvimento da solução — Agente de Atendimento integrado ao WhatsApp" },
              shot08: { alt: "Resultados do projeto — processo manual transformado em fluxo automatizado" },
              shot09: { alt: "Resultados do projeto — atendimento por IA no WhatsApp" },
            },
          },
        },
      },
    },
  },

  en: {
    tech: {
      hero: {
        eyebrow: "Engineering & Technology Practice",
        words: [
          { text: "Technology" },
          { text: "that" },
          { text: "solves", accent: true },
          { text: "real", accent: true },
          { text: "business", accent: true },
          { text: "problems." },
        ],
        subtitle:
          "We bring together engineering, data, automation, and software development to build digital solutions tailored to your needs, from structuring databases to intelligent agents integrated into your ecosystem.",
      },

      scopesOpening: {
        eyebrow: "Areas of expertise",
        title: "Our Scopes",
        subtitle:
          "Three areas that operate in an integrated way, and can be combined to deliver complete technology solutions within a single ecosystem.",
        badge: "SCOPE {{num}}",
        explore: "Explore",
        howWeWorkLabel: "How we work",
        mainApplicationsLabel: "Key applications",
      },

      scopes: {
        web: {
          tab: "Web Development",
          title: "Complete <i>platforms</i>.",
          lede: "Focused on <strong>building complete digital platforms (full-stack)</strong>, from standalone components to entire systems. Modular, scalable architecture, with native integration to data, automation, and AI agents.",
          sideEyebrow: "Scope profile",
          rows: {
            produtoChave: { label: "Key product", value: "<strong>Complete digital platforms</strong> (full-stack)" },
            stack: { label: "Stack", value: "· React on the front end<br />· Python on the back end" },
            versionamento: { label: "Version control", value: "GitHub: branch management and full documentation" },
            aplicacoes: { label: "Applications", value: "Custom web systems, institutional and operational platforms, interactive solutions" },
            sinergia: { label: "Synergy", value: "Direct communication with Data, Automation, and AI agents" },
          },
          quote: "From the standalone component to the complete system: modular, scalable architecture.",
          detail: "We work with <strong>full-stack development</strong> (front end + back end), prioritizing modular, scalable architecture. We integrate with databases and analytics solutions, connect directly with automations and AI agents, and organize projects into <strong>well-documented repositories</strong>. The flexibility of this scope allows us to deliver anything from a standalone dashboard to a complete platform, including hybrid solutions.",
          bullets: [
            "Custom web systems",
            "Institutional and operational platforms",
            "Applications with data integration",
            "Interactive solutions",
          ],
          tags: ["React", "Python", "GitHub"],
        },
        data: {
          tab: "Data",
          title: "Data that becomes <i>decisions</i>.",
          lede: "Responsible for <strong>turning data into strategic intelligence</strong>, from structuring and modeling databases to building <strong>interactive dashboards</strong> and machine learning models that support decision-making.",
          sideEyebrow: "Scope profile",
          rows: {
            produtoChave: { label: "Key product", value: "<strong>Interactive dashboards</strong> (React + Python)" },
            bancosDeDados: { label: "Databases", value: "· SQL (PostgreSQL, Supabase, SQL Workbench)<br />· NoSQL" },
            aplicacoes: { label: "Applications", value: "Strategic visualization, exploratory and diagnostic analysis, machine learning (forecasting, classification, clustering)" },
            sinergia: { label: "Synergy", value: "Strong integration with Web Development: dashboards embedded in platforms" },
          },
          quote: "Development driven by the problem, not by the tool.",
          detail: "Our approach is <strong>problem-driven</strong> rather than restricted to specific tools. We structure and model data according to the client's needs, integrate with other scopes (e.g., dashboards inside web platforms), and deliver <strong>detailed technical documentation</strong> of every method used. The key product is the dashboards: front end in React and back end in Python, connected to the database in real time.",
          bullets: [
            "Interactive dashboards",
            "Strategic data visualization",
            "Exploratory and diagnostic analysis",
            "Machine learning models: forecasting, classification, and clustering",
            "Support for data-driven decision-making",
          ],
          tags: ["Python", "React", "SQL", "PostgreSQL", "Supabase", "SQL Workbench", "NoSQL", "Machine Learning"],
        },
        automation: {
          tab: "Artificial Intelligence",
          title: "Agents that <i>execute</i> and converse.",
          lede: "Development of <strong>intelligent automations</strong> and <strong>agents and chatbots</strong> capable of executing tasks and conversing with users, integrating systems and reducing the time and cost of internal and customer-service processes.",
          sideEyebrow: "Scope profile",
          rows: {
            produtoChave: { label: "Key product", value: "<strong>Intelligent automations</strong> and <strong>conversational agents</strong> (chatbots)" },
            frentes: { label: "Focus areas", value: "· Automation and agents<br />· Chatbots and conversational assistants" },
            integracoes: { label: "Integrations", value: "APIs between platforms · WhatsApp and website channels · proprietary knowledge bases (RAG)" },
            aplicacoes: { label: "Applications", value: "Repetitive routines, triage of documents, emails and spreadsheets, end-customer service and internal support" },
          },
          quote: "From the repetitive routine to service: end-to-end autonomous execution.",
          detail: "This work is divided into two areas. In <strong>automation and agents</strong>, we integrate platforms via <strong>APIs</strong>, autonomously execute repetitive routines, and triage documents, emails, and spreadsheets using <strong>natural language processing</strong>. In <strong>chatbots and conversational assistants</strong>, we serve end customers and internal support through queries to <strong>the company's own knowledge bases (RAG)</strong>, on channels such as WhatsApp and the website.",
          bullets: [
            "Integration between platforms via APIs",
            "Autonomous execution of repetitive routines",
            "Triage of documents, emails, and spreadsheets",
            "Customer-service and internal-support chatbots",
            "Knowledge base queries (RAG)",
            "Operation on channels such as WhatsApp and the website",
          ],
          tags: ["AI Agents", "Chatbots", "RAG", "NLP", "APIs", "n8n", "WhatsApp"],
        },
      },

      highlightCases: {
        eyebrow: "Featured projects",
        title: "Featured Cases",
        subtitle: "Explore three projects that showcase how we deliver technology solutions, from web development to intelligent automation.",
        badge: "Tech",
        viewCta: "View full case",
        gamificacao: {
          ariaLabel: "View the Gamification case",
          title: "Gamification",
          imgAlt: "Increasing Productivity Through Gamification",
          subtitle: "Scope · Web Development",
          desc: "Full-stack platform that centralizes a construction company's operation and engages the field team with points, rankings, and safety KPIs.",
        },
        medicina: {
          ariaLabel: "View the Medicine case",
          title: "Medicine",
          imgAlt: "Medicine Project Context",
          subtitle: "Scope · Web Development",
          desc: "Full-stack platform for document management and incident reporting, with cloud version control and a standardized digital flow.",
        },
        walle: {
          ariaLabel: "View the Wall-E case",
          title: "Wall-E",
          placeholderAriaLabel: "Image to be added",
          placeholderText: "Image coming soon",
          imgAlt: "Wall-E Project Context",
          subtitle: "Scope · Artificial Intelligence",
          desc: "Multi-agent ecosystem with four specialist AIs, coordinated by an intelligent classifier, covering the entire customer service operation for a healthcare client.",
        },
      },

      integration: {
        kicker: "Synergy Between Scopes",
        title: "Solutions that <span>talk to each other</span> within a single ecosystem",
        lede: "There's no standard package. Each solution combines dashboards, databases, automations, and intelligent agents in the right proportions for the client's challenge, always built custom.",
      },

      about: {
        eyebrow: "Who we are",
        title: "About the Practice",
        lede: "Since 2017, we've developed digital and technology solutions that bring together engineering, data, automation, and software development to generate real impact for companies and organizations. Our work constantly evolves in technologies, methodologies, and internal resources, always seeking the best solution for each project, without limiting ourselves to specific tools or standards.",
        pillars: {
          multidisciplinar: {
            num: "01: Multidisciplinary",
            title: "Five majors, one practice",
            text: "We bring together students from <strong>Computer Engineering, Mechanical Engineering, Mechatronics Engineering, Production Engineering, and Computer Science</strong>, ensuring a multidisciplinary view and access to different areas of the tech world.",
          },
          integrada: {
            num: "02: Integrated",
            title: "Three scopes that talk to each other",
            text: "Our work is divided into <strong>Data, Web Development, and Artificial Intelligence</strong>. The division is purely organizational: the scopes function in an integrated way within a single solution.",
          },
          sobMedida: {
            num: "03: Custom-built",
            title: "Complete solutions",
            text: "We combine analytical dashboards, databases, automations, and intelligent agents into a single platform, <strong>adapted to the context and needs of each client</strong>.",
          },
        },
        stats: {
          escopos: { value: "3+", label: "Integrated scopes" },
          cursos: { value: "5", label: "Engineering majors" },
          anosAtuacao: { value: "8+", label: "Years of activity" },
          anosInsper: { value: "24+", label: "Years of Insper Jr." },
        },
      },

      diferenciais: {
        eyebrow: "What sets us apart",
        title: "Differentiators",
        subtitle: "What makes Insper Jr.'s Technology practice stand out in the market.",
        cards: {
          multidisciplinaridade: {
            num: "01",
            title: "Multidisciplinarity",
            text: "We bring together students from five Engineering and Computer Science majors, ensuring a multidisciplinary view and access to different areas of the tech world.",
          },
          adaptacao: {
            num: "02",
            title: "Technological adaptation",
            text: "We're not limited to a single stack or methodology. Each solution is developed considering the client's context, goals, and needs, with flexibility and technical precision.",
          },
          integracao: {
            num: "03",
            title: "Integration across scopes",
            text: "Data, Web Development, and Artificial Intelligence work together, enabling complete deliveries where different solutions communicate within a single ecosystem.",
          },
        },
      },

      cta: {
        eyebrow: "Next step",
        title: "Ready to build your<br />next technology solution?",
        subtitle: "Get in touch with Insper Jr. and discover how we can combine data, web development, and automation into a custom solution for your business.",
        button: "Get a free assessment",
      },

      caseLayout: {
        backLabel: "Back",
        backAriaLabel: "Back to the Technology page",
      },

      cases: {
        common: {
          badge: "FEATURED CASE",
          prev: "Previous",
          next: "Next",
          project: "The project",
          howMade: "How it was built",
          strategy: "Strategy",
          screenAriaLabel: "Screen {{n}}",
        },

        gamificacao: {
          name: "Gamification",
          sub: "To show how we deliver <strong>complete digital platforms</strong> within the <strong>Web Development</strong> scope: the <strong>Gamification</strong> project, a full-stack platform that centralizes an entire construction company's operation in one place and, within the same system, engages the field team with points, rankings, and safety KPIs.",
          deckAriaLabel: "Gamification project presentation",
          why: "Why Gamification?",
          p1: "The client, from the <strong>construction</strong> industry, had an operation scattered across spreadsheets and parallel systems (sites, validations, roles, and users) and struggled to <strong>engage the field team</strong> (masons, electricians, firefighters, and carpenters) in day-to-day site work.",
          p2: "We built a <strong>full-stack platform</strong> with two connected sides: a <strong>corporate dashboard</strong> for management (overview, sites, validations, dashboards) and a <strong>gamified panel</strong> with an 8-bit aesthetic for workers, with team rankings, top employees, and a points board.",
          p3: "Stack: <strong>React + Vite</strong> on the front end, <strong>FastAPI</strong> on the back end with <strong>Alembic</strong> migrations, and <strong>Supabase</strong> as the database: Postgres with <strong>triggers</strong> and internal functions to automate scoring, validations, and real-time progress calculations.",
          list: [
            "<strong>Centralized operation</strong>: sites, packages, blocks, and tasks in one place, with real progress per site.",
            "<strong>Gamified engagement</strong>: points for completed tasks, team rankings, and a top-employees list updated in real time.",
            "<strong>Database triggers</strong>: point assignment, progress calculation, and validations fired directly from Postgres.",
            "<strong>Two worlds, one foundation</strong>: management and field teams see the same source of truth, in UIs designed for each context.",
          ],
          final: "One platform · two audiences · operations and engagement in the same place.",
          slides: {
            problema: { alt: "Low Productivity and Lack of Engagement on Construction Sites", cap: "01 · Problem" },
            solucao: { alt: "Increasing Productivity Through Gamification", cap: "02 · Solution" },
            plataforma: { alt: "Our Solution: A Gamification Platform for Construction Sites", cap: "03 · Platform" },
          },
          shotsHeading: "How it looks <em>on the job site.</em>",
          shotsAriaLabel: "Real screens from the Gamification platform",
          shots: {
            visao: { label: "Overview", bar: "manager-panel · overview", alt: "Manager Panel: Consolidated Overview", capH: "Consolidated overview", capT: "every site in one place" },
            acomp: { label: "Tracking", bar: "manager-panel · tracking", alt: "Manager Panel: Site Tracking", capH: "Tracking", capT: "status, progress, and alerts" },
            gestao: { label: "Sites", bar: "manager-panel · site-management", alt: "Manager Panel: Site Management", capH: "Site management", capT: "create, organize, and monitor" },
            equipes: { label: "Teams", bar: "manager-panel · team-management", alt: "Manager Panel: Team Management", capH: "Team management", capT: "build and manage teams" },
            funcionarios: { label: "Staff", bar: "manager-panel · staff-management", alt: "Manager Panel: Staff Management", capH: "Staff management", capT: "listed by role and ID" },
            validacoes: { label: "Approvals", bar: "manager-panel · approvals", alt: "Manager Panel: Task Approval", capH: "Task approval", capT: "sign-off before points are awarded" },
            cargos: { label: "Roles", bar: "manager-panel · role-management", alt: "Manager Panel: Role Management", capH: "Role management", capT: "staff by category" },
            dash1: { label: "Dashboard", bar: "manager-panel · site-dashboard", alt: "Manager Panel: Performance Dashboard", capH: "Performance dashboard", capT: "progress, attendance, scoring" },
            dash2: { label: "Ranking", bar: "manager-panel · ranking-dashboard", alt: "Manager Panel: Ranking and Alerts", capH: "Ranking and alerts", capT: "teams, scores, and delays" },
            operario: { label: "Worker", bar: "gamified-panel · select-site", alt: "Worker View: Site Selection (8-bit)", capH: "Worker view", capT: "8-bit gamified interface" },
            ranking_op: { label: "Ranking", bar: "gamified-panel · team-ranking", alt: "Worker View: Team Ranking (8-bit)", capH: "Team ranking", capT: "real-time competition" },
            top20: { label: "Top 20", bar: "gamified-panel · top-20-staff", alt: "Worker View: Top 20 Employees (8-bit)", capH: "Top 20 employees", capT: "podium and individual ranking" },
          },
        },

        medicina: {
          name: "Medicine",
          sub: "Another project that reinforces our work in <strong>Web Development</strong>: <strong>Medicina I</strong>, a full-stack platform for <strong>document management and incident reporting</strong> that centralizes documents, deadlines, and owners in a single system, with cloud version control and a standardized digital flow for logging and tracking incidents.",
          deckAriaLabel: "Medicine project presentation",
          why: "Why Medicina I?",
          p1: "The client, from the <strong>healthcare</strong> field, had document operations scattered across <strong>large spreadsheets</strong> (with no standardization, traceability, or version control) and relied on manual processes to log and track day-to-day <strong>incidents</strong>.",
          p2: "We built a <strong>full-stack platform</strong> that centralizes documents, deadlines, and owners in a single system. The same environment unifies <strong>document management</strong> and <strong>incident reporting</strong>, with versioning, access control, and end-to-end traceability.",
          p3: "For version control, we integrated an <strong>AWS bucket</strong>, ensuring secure storage and proper control of every document version. The database was modeled to support <strong>multiple entities and complex relationships</strong> without compromising performance.",
          list: [
            "<strong>Unified document operation</strong>: documents, deadlines, and owners in one place, with standardization and traceability.",
            "<strong>Cloud version control</strong>: AWS bucket with history, integrity, and recovery for every version.",
            "<strong>Incident reporting</strong>: standardized digital flow to log, track, and resolve events quickly.",
            "<strong>Clear, intuitive UX</strong>: interface designed for daily use without extensive training.",
          ],
          final: "Documents · incidents · version control: the entire operation on a single platform.",
          slides: {
            contexto: { alt: "Project context: document management and incident reporting", cap: "01 · Context" },
            desafios: { alt: "Path of challenges: database, version control, and UX", cap: "02 · Challenges" },
          },
          slidePlaceholderHint: "image coming soon",
          shotsHeading: "How it looks <em>day to day.</em>",
          shotsAriaLabel: "Real screens from the Medicina I platform",
          shots: {
            home: { label: "Home", bar: "platform · home-page", alt: "Platform: Home page", capH: "Home page", capT: "document and log dashboard" },
            listagem: { label: "List", bar: "platform · document-list", alt: "Platform: Document list", capH: "Document list", capT: "view, download, and preview" },
            elaboracao: { label: "New doc", bar: "platform · document-creation", alt: "Platform: Document creation", capH: "Creation", capT: "register a new document" },
            admin: { label: "Admin", bar: "platform · administration", alt: "Platform: Administration", capH: "Administration", capT: "users, areas, units, and types" },
          },
        },

        walle: {
          name: "Wall-E",
          sub: "<strong>Wall-E</strong> was born from <strong>integrated work across practices</strong>: before building the technology layer, we conducted an <strong>operational study of the client's sales and support flows</strong> to ensure a solid end-to-end experience. Only once the journey was mapped and refined did the <strong>Artificial Intelligence</strong> scope build the <strong>multi-agent ecosystem</strong>: four specialist AIs, coordinated by an intelligent classifier, covering the entire customer service operation for a healthcare client.",
          deckAriaLabel: "Wall-E project presentation",
          why: "Why Wall-E?",
          p1: "The client, from the B2B healthcare sector, served three completely different audiences through a single WhatsApp channel: <strong>leads in prospecting</strong>, <strong>active customers with operational questions</strong>, and <strong>customers awaiting delivery</strong>. With a lean team, service was reactive, leads went cold, and simple questions consumed hours.",
          p2: "The solution was an <strong>ecosystem of four specialist AIs</strong>, each with its own prompt, knowledge base, and scope, coordinated by an internal classifier that reads every message, identifies intent, and routes it to the right agent in real time.",
          p3: "Built entirely on <strong>n8n</strong>, integrating <strong>LLMs</strong> and the client's internal APIs, with no dependency on SaaS chatbot platforms. Each agent only acts within its own specialty. Outside of it, it hands off to a human.",
          list: [
            "<strong>Specialization by agent</strong>: separating prompt, knowledge base, and scope reduces hallucination and keeps each conversation coherent.",
            "<strong>Continuous routing</strong>: the Classification AI re-evaluates on every turn, even when the topic changes.",
            "<strong>Human at the right moment</strong>, the premise: when in doubt, hand off. No guessing.",
            "<strong>Four layers of defense</strong>: anti-prompt injection, strict scope, hallucination control, and healthcare-sector compliance.",
          ],
          final: "Four AIs · three journeys covered · 24/7 · a single channel.",
          slides: {
            cover: {
              corner: "Live · 2025",
              pill: "Case · Artificial Intelligence",
              tag: "A multi-agent ecosystem on <strong>WhatsApp Business</strong>: four specialist AIs, a single channel.",
              meta: {
                setor: { label: "Sector", value: "Healthcare · B2B" },
                canal: { label: "Channel", value: "WhatsApp" },
                stack: { label: "Stack", value: "n8n · LLMs" },
                agentes: { label: "Agents", value: "4 AIs" },
              },
            },
            arch: {
              corner: "Hub & Spoke",
              eye: "Architecture",
              title: "One <em>orchestrator,</em> three specialists.",
              orchPill: "Orchestrator",
              orchName: "Classification AI",
              orchTag: "Routes · Observes · Hands off",
              spokes: [
                { num: "01", name: "Sales AI", tag: "funnel & qualification" },
                { num: "02", name: "Support AI", tag: "operational support" },
                { num: "03", name: "Tracking AI", tag: "status & logistics" },
              ],
            },
            specs: {
              corner: "Specialization",
              eye: "Specialists",
              title: "Each agent, <em>one specialty.</em>",
              cards: [
                {
                  num: "01", eye: "Sales", name: "Guides the lead.",
                  desc: "Qualifies, answers product questions, and prepares the human handoff at the right moment.",
                  tags: ["ToFu → BoFu funnel", "Catalog & pricing", "Human scheduling"],
                },
                {
                  num: "02", eye: "Support", name: "Resolves questions.",
                  desc: "Operational support on usage, integrations, and the platform. When in doubt, hands off.",
                  tags: ["Knowledge base", "Initial triage", "Human fallback"],
                },
                {
                  num: "03", eye: "Tracking", name: "Returns status.",
                  desc: "Queries internal systems and returns the consolidated order status in real time.",
                  tags: ["API integration", "5 logistics stages", "ETA & invoice"],
                },
              ],
            },
            prat: {
              corner: "Demo · 04",
              eye: "In practice",
              title: "The right answer, <em>from the right agent.</em>",
              chats: [
                { msg: "How much does this product cost?", route: "Sales" },
                { msg: "How do I integrate with my ERP?", route: "Support" },
                { msg: "Where's my order?", route: "Tracking" },
              ],
              routePrefix: "AI:",
              routeArrow: "ROUTES",
              foot: "premise <strong>·</strong> when in doubt, hand off to a human <strong>·</strong> no hallucination",
            },
            barr: {
              corner: "Defense-in-depth · 4 layers",
              eye: "Safeguards",
              title: "Four layers, <em>across every agent.</em>",
              core: "Wall-E",
              layers: [
                { n: "01", h: "Anti-prompt injection", t: "Sanitizes input and isolates user instructions from the system prompt." },
                { n: "02", h: "Strict scope", t: "Each agent only responds within its declared specialty." },
                { n: "03", h: "Anti-hallucination", t: "When information isn't in the knowledge base, it escalates to a human instead of making it up." },
                { n: "04", h: "Compliance", t: "Proper handling of sensitive data in the healthcare context." },
              ],
            },
            res: {
              corner: "Results · 06",
              eye: "Results",
              title: "A complete solution, <em>on a single channel.</em>",
              heroNum: "24<sup>/7</sup>",
              heroLabel: "continuous availability,<br />no waiting queue.",
              stats: [
                { value: "4", label: "specialist agents operating in parallel" },
                { value: "3", label: "journeys covered <br />(sales · support · post-sale)" },
                { value: "1", label: "single channel, no change to customer behavior" },
              ],
            },
            shots: {
              shot01: { alt: "Project context — scope, client's problem and objective" },
              shot02: { alt: "Solution development — organizing the support pathways" },
              shot03: { alt: "Solution development — central AI with a knowledge base (RAG)" },
              shot04: { alt: "Solution development — modeling the AI flows in n8n" },
              shot05: { alt: "Solution development — customer support (SAC) ingestion flow" },
              shot06: { alt: "Solution development — sales ingestion flow" },
              shot07: { alt: "Solution development — Support Agent integrated with WhatsApp" },
              shot08: { alt: "Project results — manual process turned into an automated flow" },
              shot09: { alt: "Project results — AI-powered support on WhatsApp" },
            },
          },
        },
      },
    },
  },
};
