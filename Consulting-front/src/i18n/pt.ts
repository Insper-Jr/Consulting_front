const pt = {
  // ── Header ──
  nav: {
    solutions: "Nossas Soluções",
    about:     "A Insper Jr",
    alumni:    "Alumni",
    join:      "Faça Parte",
    contact:   "Contato",
    cta:       "Fale Conosco",
    tagline:   "Consultoria universitária de alto impacto",
  },

  // ── Frentes (dropdown de Soluções) ──
  frentes: {
    business:   "Business",
    direito:    "Direito",
    engenharia: "Engenharia",
    tech:       "Tecnologia",
    processos:  "Processos",
  },

  dropdown: {
    business: {
      title:       "Business",
      marketing:   "Plano Estratégico de Marketing",
      market:      "Análise Mercadológica",
      operational: "Plano Operacional",
      financial:   "Viabilidade Financeira",
    },
    tech: {
      title:    "Engenharia Tech", // ← atualizado
      data:     "Análise de Dados",
      products: "Desenvolvimento de Produtos",
      devweb:   "Desenvolvimento Web",
    },
    law: {
      title: "Direito",
      creation: {
        title:    "Criação e Estruturação",
        planning: "Planejamento Societário",
        cnpj:     "Emissão de CNPJ",
        docs:     "Documentos Constitutivos",
      },
      strategy: {
        title:    "Operação e Estratégia",
        contract: "Contratos",
        tax:      "Planejamento Tributário",
      },
      protection: {
        title: "Proteção e Regularização",
        ip:    "Propriedade Intelectual",
        lgpd:  "LGPD",
      },
    },
  },


  // ── Hero ──
  hero: {
    business: {
      label:    "Business",
      title:    "Estratégia que transforma negócios.",
      subtitle: "Diagnóstico, planejamento e execução para empresas que querem crescer com solidez.",
      cta:      "Conheça nossas soluções",
    },
    tech: {
      label:    "Engenharia Tech",
      title:    "Tecnologia aplicada a resultados reais.",
      subtitle: "Dados, produtos digitais e desenvolvimento web com foco em impacto para o seu negócio.",
      cta:      "Conheça nossas soluções",
    },
    law: {
      label:    "Direito",
      title:    "Segurança jurídica para crescer com confiança.",
      subtitle: "Estruturação societária, contratos e proteção intelectual para a sua empresa.",
      cta:      "Conheça nossas soluções",
    },
    processes: {
      label:    "Engenharia de Processos",
      title:    "Eficiência que libera o potencial da sua equipe.",
      subtitle: "Mapeamento, redesenho e otimização de processos para empresas.",
      cta:      "Conheça nossas soluções",
    },
  },

  // ── IntroSection ──
  intro: {
    eyebrow:  "Quem somos",
    title:    "A Insper Jr.",
    body:     "Somos a empresa júnior do Insper, uma das instituições de ensino mais reconhecidas do Brasil. Desde 2001, conectamos empresas reais a soluções de alto impacto nas áreas de Business, Engenharia e Tecnologia e Direito, com rigor acadêmico e olhar prático de quem está imerso no mercado.",
    cta:      "Saiba mais",
    mapLabel: "Clientes e projetos em todo o Brasil",
    awards:   "Reconhecimentos",
    stats: {
      projects: "Projetos Realizados pelo Brasil",
      years:    "Anos de Atuação",
      members:  "Membros",
      nps:      "Índice NPS",
    },
  },

  // ── InteractiveSelector ──
  interactiveSelector: {
    titleLine1:        "Como podemos",
    titleLine2:        "te ajudar?",
    subtitle:          "Nosso trabalho é organizado em quatro frentes, cada uma com escopos bem definidos. Escolha a frente que conversa com o seu desafio ou vá direto ao escopo, e veja exatamente o que entregamos.",
    frentesLabel:      "Frentes",
    escoposLabel:      "Escopos",
    learnMore:         "Saiba mais →",
    frentes: {
      business:  "Business",
      tech:      "Tech",
      direito:   "Direito",
      processos: "Processos",
    },
    escopos: {
      // Business
      market:       "Análise Mercadológica",
      marketing:    "Estratégia de Marketing",
      financial:    "Planejamento Financeiro",
      operational:  "Plano Operacional",
      // Tech
      web:          "Desenvolvimento Web",
      data:         "Dados",
      ai:           "Inteligência Artificial",
      // Direito
      contracts:    "Elaboração e Revisão Contratual",
      corporate:    "Planejamento Consultivo Societário",
      ip:           "Propriedade Industrial",
      tax:          "Planejamento e Análise Tributária",
      // Processos
      mapping:      "Mapeamento e Diagnóstico de Processos",
      simulation:   "Simulação de Processos",
      optimization: "Otimização de Processos e Operações",
    },
    descriptions: {
      // Frentes
      business:     "Consultoria empresarial de ponta a ponta em mercado, marketing, finanças e operação, do diagnóstico ao plano que o gestor consegue executar.",
      tech:         "Plataformas digitais, dados e inteligência artificial construídos sob medida, com arquitetura modular e integração entre as frentes.",
      direito:      "Atuação jurídica consultiva em contratos, societário, propriedade industrial e tributário, com supervisão de professores e escritórios parceiros.",
      processos:    "Engenharia de processos aplicada à sua operação: mapeamos, simulamos cenários e otimizamos fluxos para ganhar eficiência com base em dados.",
      // Business
      market:       "Mapeamos mercado, concorrentes e consumidor para dimensionar a oportunidade e embasar a decisão de entrada com precisão.",
      marketing:    "Definimos posicionamento e proposta de valor e estruturamos o go-to-market, da precificação ao funil de aquisição.",
      financial:    "Modelamos receita, custos e investimento para mostrar se o projeto se paga, em quanto tempo e sob qual estrutura.",
      operational:  "Diagnosticamos a operação de ponta a ponta, separamos sintoma de causa-raiz e entregamos um plano de ação com dono e prazo.",
      // Tech
      web:          "Plataformas digitais completas em React e Python, do componente isolado ao sistema inteiro, com arquitetura modular e escalável.",
      data:         "Estruturamos bancos de dados e entregamos dashboards interativos e modelos de machine learning para apoiar a decisão.",
      ai:           "Automações inteligentes, agentes e chatbots que integram sistemas via API e reduzem o tempo de processos internos e de atendimento.",
      // Direito
      contracts:    "Elaboramos contratos do zero ou revisamos os existentes, entregando memorando explicativo e apresentação executiva.",
      corporate:    "Analisamos a estrutura societária, mapeamos riscos e comparamos os modelos possíveis, entregando parecer fundamentado e apresentação executiva com os caminhos recomendados.",
      ip:           "Avaliamos viabilidade, estratégia e custos do registro de marca, patente e desenho industrial, mapeando os caminhos possíveis perante o INPI antes de qualquer depósito.",
      tax:          "Comparamos regimes tributários com simulações e memorando jurídico, considerando os impactos da reforma em curso.",
      // Processos
      mapping:      "Levantamos e mapeamos os fluxos da sua operação em fluxogramas, identificando gargalos, retrabalhos e desperdícios.",
      simulation:   "Construímos modelos computacionais da operação para testar cenários e prever impactos antes de qualquer mudança real.",
      optimization: "Transformamos análise em plano: redistribuição de recursos, ajuste de fluxo e melhorias priorizadas e validadas por simulação.",
    },
  },

  // ── SectionContact ──
  sectionContact: {
    title:  "Entre em contato com a nossa equipe",
    button: "Contato",
  },

  // ── SectionMap ──
  sectionMap: {
    eyebrow:    "Onde estamos",
    title:      "Nosso escritório",
    officeName: "São Paulo",
    mapsLink:   "Abrir no Google Maps",
  },

  // ── Página Business ──
  business: {
    hero: {
      eyebrow:      "Frente de Business",
      titleWord1:   "Estratégia",
      titleWord2:   "que",
      titleWord3:   "gera resultado",
      sub:          "Combinamos análise de mercado, planejamento financeiro e execução operacional para transformar a visão da sua empresa em crescimento real.",
      ctaPrimary:   "Solicitar Diagnóstico",
      ctaSecondary: "Ver nossos cases",
    },

    opening: {
      eyebrow:        "O que fazemos, na prática",
      headlineLight:  "Cada empresa",
      headlineBold:   "chega diferente.",
      headlineAccent: "Nós respondemos.",
      body:           "Não trabalhamos com pacotes prontos. Entendemos o problema, montamos a equipe certa e definimos a abordagem. O resultado é uma solução construída para o contexto específico do seu negócio sem fórmula, sem atalho.",
      principles: {
        diagnosis: {
          title: "Diagnóstico antes de solução",
          text:  "Mergulhamos no contexto do cliente antes de propor qualquer coisa. Mercado, finanças e operação entendemos tudo antes de recomendar.",
        },
        approach: {
          title: "Abordagem adaptada ao problema",
          text:  "Usamos as ferramentas que o projeto exige em qualquer combinação. Nenhum projeto tem formato pré-definido.",
        },
        delivery: {
          title: "Entrega acionável",
          text:  "Não entregamos slides bonitos. Entregamos o que o gestor consegue usar para decidir e executar com clareza no dia seguinte.",
        },
      },
      transition: "04 projetos abaixo",
    },

    // ── Escopos e cards de case (BusinessCases) ──
    scopes: {
      badge:       "Business",
      titlePrefix: "Projeto",
      howLabel:    "Como atuamos",
      deliverLabel: "O que entregamos",
      scopeLabel:  "Escopo",
      seeCase:     "Ver case completo",
      clickHint:   "Clique aqui",
      market: {
        tab:  "Análise Mercadológica",
        lede: "Uma plataforma internacional de vinhos premium queria entrar no Brasil, em um mercado pequeno, disperso e quase sem estatística confiável. Não dava para dimensionar a demanda pelos caminhos convencionais.",
        detail: "Construímos a leitura de mercado por <strong>cruzamento de fontes</strong>: bases públicas, pesquisa autoral com o público-alvo, abordagem de cliente oculto junto a players e networking para chegar a benchmarks fechados. Avaliamos a operação internacional existente, o cenário concorrencial brasileiro e as barreiras alfandegárias e cambiais, e entregamos as <strong>recomendações de tropicalização</strong> que redirecionaram o produto.",
        bullets: [
          "Dimensionamento de TAM / SAM / SOM",
          "Benchmarking de concorrentes e posicionamento",
          "Pesquisa com consumidores (qualitativa + quantitativa)",
          "Relatório de viabilidade com cenários de entrada",
          "Identificação de oportunidades e riscos estratégicos",
        ],
        capaAlt: "Contexto do projeto de análise mercadológica",
      },
      marketing: {
        tab:  "Estratégia de Marketing",
        lede: "Uma startup de saúde emocional digital entrava em um mercado dominado por players globais, sem clareza sobre onde ainda havia espaço nem sobre como chegar ao usuário final e às empresas contratantes.",
        detail: "Comparamos os concorrentes atributo por atributo até encontrar a lacuna que ninguém ocupava, e transformamos isso em <strong>posicionamento e proposta de valor</strong>. Em cima dele estruturamos o go-to-market das duas frentes: precificação B2C e B2B ancorada em benchmark, <strong>funil de conteúdo founder-led</strong> para aquisição orgânica e prospecção B2B com análise de keywords, CPC e intenção de busca.",
        bullets: [
          "Definição de personas e ICP (Ideal Customer Profile)",
          "Posicionamento e proposta de valor",
          "Plano de canais e alocação de verba",
          "Calendário editorial dos primeiros 90 dias",
          "Projeção de métricas de aquisição (CPL, CAC)",
        ],
        capaAlt: "Mapa de posicionamento competitivo do projeto",
      },
      financial: {
        tab:  "Planejamento Financeiro",
        lede: "Uma confeitaria artesanal operava de casa, com entrega própria e pouca visibilidade de marca. Crescer significava abrir uma loja física, uma decisão de investimento que ninguém tinha modelado.",
        detail: "Lemos primeiro o <strong>comportamento de consumo por canal</strong>: o aplicativo de entrega como porta de entrada e a loja física como consolidação de marca. Definida a estratégia, dimensionamos o <strong>CapEx inicial item a item</strong> e rodamos a projeção completa: receita por canal, estrutura de custos, comparativo entre regimes tributários e geração de caixa ao longo do horizonte do projeto.",
        bullets: [
          "Estruturação de DRE e balanço patrimonial",
          "Projeção de fluxo de caixa (18 meses)",
          "Modelagem financeira para captação",
          "Cálculo de unit economics (LTV, CAC, Payback)",
          "Análise de burn rate e runway",
        ],
        capaAlt: "Dimensionamento do investimento inicial do projeto",
      },
      operational: {
        tab:  "Plano Operacional",
        lede: "Em uma distribuidora industrial B2B, o pedido passava por cinco áreas e três sistemas que não conversavam entre si. O resultado aparecia no fim da linha: retrabalho, atraso e promessa não cumprida.",
        detail: "Diagnosticamos a operação por <strong>triangulação de três fontes</strong>: entrevistas em profundidade, formulário com os operadores e a base de não conformidades. Mapeamos a jornada do pedido em cinco macroetapas, rodamos <strong>diagrama de Ishikawa</strong> em cada uma para separar sintoma de causa-raiz e entregamos um <strong>plano de ação em três horizontes</strong>, com ferramenta e dono por ação.",
        bullets: [
          "Mapeamento de processos internos (AS-IS)",
          "Identificação e priorização de gargalos",
          "Proposta de melhoria (TO-BE) com quick wins",
          "Playbooks e SOPs para o time",
          "Plano de implementação com KPIs de acompanhamento",
        ],
        capaAlt: "Mapeamento da operação em macroetapas",
      },
    },

    integration: {
      kicker:     "Sinergia entre frentes",
      titleMain:  "Estratégia, tecnologia e direito",
      titleAccent: "no mesmo projeto",
      lede:       "Business não atua sozinho. Quando o projeto exige, trabalhamos lado a lado com as frentes de Tech e Direito combinando análise estratégica, desenvolvimento tecnológico e suporte jurídico para entregar uma solução completa ao cliente.",
    },

    about: {
      eyebrow: "Quem somos",
      title:   "Sobre a frente",
      lede:    "Desde 2001, a frente de Business da Insper Jr. desenvolve soluções estratégicas que geram crescimento, estruturam operações e abrem novos mercados. Nossa atuação evolui constantemente em metodologias e práticas sempre buscando a solução mais adequada para cada desafio.",
      pillars: {
        multi: {
          label: "Multidisciplinar",
          title: "Alunos de diversas graduações",
          text:  "Reunimos estudantes de Administração, Economia e Engenharia, garantindo visão ampla sobre cada projeto.",
        },
        result: {
          label: "Orientada para resultado",
          title: "Entregáveis que gestores usam",
          text:  "Cada projeto termina com recomendações claras e acionáveis, não com relatórios que ficam na gaveta.",
        },
        tailored: {
          label: "Sob medida",
          title: "Nenhum projeto é igual ao anterior",
          text:  "Não temos modelo padrão. Entendemos o problema e definimos a abordagem certa para aquele contexto específico.",
        },
      },
      stats: {
        years:    "Anos de atuação",
        projects: "Projetos entregues",
        areas:    "Áreas parceiras",
      },
    },

    why: {
      eyebrow:     "Por que a Insper Jr. ?",
      titleMain:   "Estratégia com",
      titleAccent: "rigor e respaldo acadêmico",
      lead:        "Contrate uma consultoria com metodologia sólida, dados reais e o respaldo do Insper. Projetos conduzidos por quem está dentro da instituição e do mercado ao mesmo tempo.",
      items: {
        market: {
          title: "Visão de mercado fundamentada",
          body:  "Análises construídas sobre dados reais e metodologias reconhecidas pelo mercado e pela academia. Nada de intuição sem embasamento.",
        },
        faculty: {
          title: "Supervisão acadêmica do Insper",
          body:  "Equipes treinadas e orientadas por professores com sólida experiência de mercado. Rigor técnico com olhar prático.",
        },
        deliverables: {
          title: "Entregáveis acionáveis",
          body:  "Relatórios feitos para gestores, não para consultores. Conclusões claras, linguagem objetiva e recomendações prontas para executar.",
        },
        value: {
          title: "Custo-benefício sem precedentes",
          body:  "Qualidade de consultoria estratégica a um investimento acessível. O melhor momento para estruturar o negócio sem comprometer o caixa.",
        },
      },
    },

    cta: {
      eyebrow:    "Próximo passo",
      titleLine1: "Pronto para transformar",
      titleLine2: "sua estratégia de negócio?",
      sub:        "Entre em contato com a Insper Jr. e descubra como podemos ajudar sua empresa a crescer com clareza, dados e planejamento sólido.",
      button:     "Fazer diagnóstico gratuito",
    },

    // ── Interface das páginas de case (CaseLayout + CaseView) ──
    caseUi: {
      badge:       "CASE EM DESTAQUE",
      back:        "Voltar",
      backAria:    "Voltar para a página de Business",
      prev:        "Anterior",
      next:        "Próximo",
      deckAria:    "Apresentação do case {{name}}",
      shotsAria:   "Análises do case {{name}}",
      analysisAria: "Análise {{index}}",
    },

    // ── Páginas de case ──
    cases: {
      confidential: "O nome do projeto é fictício, para preservar a confidencialidade do cliente.",

      wine: {
        name:    "Projeto Wine",
        sub:     "Para mostrar como funciona o escopo de <strong>Análise Mercadológica</strong>: o projeto de entrada no Brasil de uma <strong>plataforma internacional de vinhos premium</strong>. A tarefa era dimensionar um mercado sem estatística confiável, entender o consumidor de luxo e apontar quais adaptações o modelo precisava para funcionar aqui.",
        eyebrow: "O projeto",
        headline: "Entrar em um mercado que quase não tem dado público",
        intro: [
          "O cliente queria <strong>estruturar do zero a operação brasileira</strong> de uma plataforma que acompanha o vinho da vinícola até a mesa. A dúvida não era se havia demanda, e sim <strong>qual era o tamanho real dela</strong> e o que precisava mudar para o modelo funcionar no Brasil.",
        ],
        challenge: {
          title: "O desafio",
          body: [
            "O mercado de vinhos de luxo é <strong>pequeno, disperso e pouco documentado</strong>: as estatísticas brasileiras tratam o setor de forma agregada, a tributação é complexa e muda com frequência, o mercado ilegal distorce o volume e o público consumidor é discreto, <strong>difícil de trazer para uma pesquisa</strong>.",
          ],
        },
        method: {
          title: "Como foi feito",
          body: [
            "Em vez de depender de uma fonte só, montamos a leitura de mercado por <strong>cruzamento</strong>: bases públicas, pesquisa autoral com o público-alvo, abordagem de <strong>cliente oculto</strong> junto a players do setor e networking para chegar a benchmarks que não estão disponíveis publicamente.",
            "Com o mercado dimensionado, avaliamos a <strong>operação internacional existente</strong>, o cenário concorrencial brasileiro e as barreiras alfandegárias e cambiais que afetam a viabilidade da tropicalização.",
          ],
        },
        deliverables: {
          title: "Entregas",
          list: [
            "<strong>Dimensionamento do mercado consumidor</strong> brasileiro do segmento premium.",
            "<strong>Pesquisa autoral</strong> com consumidores, somada a bases públicas e benchmarks.",
            "<strong>Análise concorrencial</strong>: quem concorre de forma direta e indireta, e por quê.",
            "<strong>Recomendações de tropicalização</strong>: ticket médio, objetivos de desempenho e foco em experiência.",
            "<strong>Mapeamento de parcerias estratégicas</strong> com hotéis, vinícolas e restaurantes, com contatos.",
          ],
        },
        impact: {
          title: "O que mudou",
          body: [
            "A análise <strong>redirecionou o produto</strong>: o app deixou de ser apenas o acompanhamento do vinho da vinícola até a taça e passou a incluir vinhos brasileiros exclusivos, marketplace de importadoras e gestão de confrarias. A decisão saiu dos insights da mercadológica.",
          ],
        },
        closing: "Mercado dimensionado · produto redirecionado · parcerias mapeadas.",
        shotsHeadlineMain: "Como a análise",
        shotsHeadlineAccent: "foi construída.",
        slides: {
          contexto:   { alt: "Contexto do projeto: plataforma para o consumidor de vinho premium", cap: "01 · Contexto" },
          problemas:  { alt: "Principais desafios da análise mercadológica",                      cap: "02 · Desafios" },
          resultados: { alt: "Resultados encontrados e plano de ação",                            cap: "03 · Resultados" },
        },
        shots: {
          dados:  { label: "Dados",  alt: "Como contornamos a falta de dados do segmento", capH: "Cruzamento de fontes", capT: "dados públicos + pesquisa autoral" },
          benchs: { label: "Benchs", alt: "Como contornamos o acesso a benchmarks",        capH: "Acesso a benchmarks",  capT: "cliente oculto e networking" },
          valor:  { label: "Valor",  alt: "Cadeia de geração de valor da análise",         capH: "Geração de valor",     capT: "da operação atual às parcerias" },
        },
      },

      community: {
        name:    "Projeto Community",
        sub:     "Para mostrar como funciona o escopo de <strong>Estratégia de Marketing</strong>: o plano estratégico de marketing e operações de uma <strong>startup de saúde emocional digital</strong>, de onde ela compete até como conquista os primeiros usuários e as primeiras empresas contratantes.",
        eyebrow: "O projeto",
        headline: "Um posicionamento que ninguém no mercado ocupava",
        intro: [
          "O cliente entrava em um mercado <strong>disputado por players globais</strong> e precisava de duas coisas ao mesmo tempo: descobrir onde ainda havia espaço e definir como chegar ao usuário final (B2C) e às empresas contratantes (B2B) sem verba para errar.",
        ],
        method: {
          title: "Como foi feito",
          body: [
            "Começamos pelo mercado: crescimento global do setor, onde a receita se concentra e quais casos internacionais funcionaram em países de renda e cultura parecidas com a brasileira, para separar <strong>o que dá para tropicalizar do que não dá</strong>.",
            "Em seguida comparamos os concorrentes atributo por atributo (comunidade, moderação, preço, idioma, personalização, uso de IA) e encontramos a lacuna: <strong>nenhum player reunia comunidade anônima com protocolo de segurança e cuidado contínuo</strong>. Esse virou o posicionamento.",
          ],
        },
        plan: {
          title: "Do posicionamento ao plano",
          body: [
            "Com o território definido, estruturamos o go-to-market das duas frentes: precificação B2C e B2B ancorada em benchmark dos concorrentes, <strong>funil de conteúdo founder-led</strong> para aquisição orgânica e prospecção B2B ativa e passiva com análise de keywords, CPC e intenção de busca.",
          ],
        },
        deliverables: {
          title: "Entregas",
          list: [
            "<strong>Estudo de mercado</strong> global e brasileiro, com benchmarks internacionais.",
            "<strong>Matriz competitiva</strong> e mapa de posicionamento por eixo de valor.",
            "<strong>Segmentação B2B e B2C</strong>: quem contrata, quem usa e o que cada um prioriza.",
            "<strong>Estratégia de precificação</strong> para as duas frentes, ancorada em benchmark.",
            "<strong>Plano de comunicação e promoção</strong>: canais, funil de conteúdo e mídia paga.",
            "<strong>Estrutura organizacional</strong> em três horizontes: curto, médio e longo prazo.",
          ],
        },
        closing: "Lacuna identificada · posicionamento definido · plano de aquisição pronto.",
        shotsHeadlineMain: "Do posicionamento",
        shotsHeadlineAccent: "à execução.",
        slides: {
          mercado:        { alt: "Mercado global de saúde emocional em crescimento acelerado", cap: "01 · Mercado" },
          benchmarks:     { alt: "Comparativo de players e lacunas do mercado",                cap: "02 · Benchmarks" },
          posicionamento: { alt: "Mapa de posicionamento competitivo",                         cap: "03 · Posicionamento" },
        },
        shots: {
          preco:    { label: "Preço",    alt: "Estratégia de precificação para o B2B",         capH: "Precificação B2B",   capT: "benchmark de preço dos concorrentes" },
          funil:    { label: "Funil",    alt: "Funil de conteúdo e perfil do founder",         capH: "Funil de conteúdo",  capT: "topo, meio e fundo por canal" },
          roi:      { label: "ROI",      alt: "O que o B2B compra de verdade: análise de ROI",  capH: "O que o B2B compra", capT: "retorno por tipo de intervenção" },
          keywords: { label: "Keywords", alt: "Análise de keywords para mídia paga B2B",        capH: "Mídia paga",         capT: "CPC, volume e intenção de busca" },
        },
      },

      caramelo: {
        name:    "Projeto Caramelo",
        sub:     "Para mostrar como funciona o escopo de <strong>Planejamento Financeiro</strong>: a análise de viabilidade de uma <strong>confeitaria artesanal</strong> que operava em casa, no delivery próprio, e queria saber se valia a pena abrir uma loja física e com qual estrutura.",
        eyebrow: "O projeto",
        headline: "A pergunta não era quanto vender, era se valia abrir",
        intro: [
          "A operação era pequena e autônoma: <strong>modelo home office, entrega própria e baixa visibilidade de marca</strong>. Crescer exigia decisão de investimento, e não havia modelagem que sustentasse essa decisão.",
        ],
        method: {
          title: "Como foi feito",
          body: [
            "Antes do número veio o mercado: mapeamos o <strong>comportamento de consumo</strong> nos dois canais possíveis. No digital, a consolidação dos aplicativos de entrega como porta de entrada de novos comércios. No presencial, o peso da loja física como canal de divulgação e consolidação de marca.",
            "Com a estratégia de canal definida, dimensionamos o <strong>CapEx inicial</strong> item a item (obra civil, marcenaria, fachada, equipamentos, área de cliente) em um modelo <em>grab & go</em>, escolhido por reduzir investimento por metro quadrado sem perder impacto visual.",
            "Em cima disso rodamos a <strong>projeção financeira completa</strong>: receita por canal, estrutura de custos, comparativo entre regimes tributários, geração de caixa e retorno do investimento ao longo do horizonte projetado.",
          ],
        },
        deliverables: {
          title: "Entregas",
          list: [
            "<strong>Análise de mercado por canal</strong>: delivery por aplicativo e loja física.",
            "<strong>Dimensionamento do CapEx inicial</strong>, aberto por item de investimento.",
            "<strong>Projeção de receita, custos e margem</strong> para o horizonte do projeto.",
            "<strong>Comparativo de regimes tributários</strong> e recomendação de enquadramento.",
            "<strong>Projeção de geração de caixa</strong> e conversão de operação em caixa disponível.",
            "<strong>Modelagem econométrica</strong> testando o efeito do investimento em marketing sobre a receita.",
          ],
        },
        numbers: {
          title: "Sobre os números",
          body: [
            "Os valores de investimento, receita e tributos deste projeto são <strong>dados do cliente</strong> e por isso aparecem ocultos nos slides. O que está visível é o método: como o mercado foi lido, como o investimento foi aberto e como a decisão foi sustentada.",
          ],
        },
        closing: "Canal definido · investimento dimensionado · decisão sustentada em número.",
        shotsHeadlineMain: "O que sustenta",
        shotsHeadlineAccent: "a projeção.",
        slides: {
          delivery:   { alt: "Transição de delivery próprio para aplicativos de entrega",          cap: "01 · Canal digital" },
          presencial: { alt: "Inserção em modelo presencial como impulsionamento de vendas",       cap: "02 · Canal presencial" },
          capex:      { alt: "CapEx inicial e estrutura operacional do modelo grab & go",          cap: "03 · CapEx" },
        },
        shots: {
          ecommerce: { label: "E-commerce", alt: "Relevância dos doces em plataformas de e-commerce", capH: "Demanda digital", capT: "o que sustenta a projeção de receita" },
        },
      },

      quimica: {
        name:    "Projeto Química",
        sub:     "Para mostrar como funciona o escopo de <strong>Plano Operacional</strong>: o diagnóstico da jornada do cliente em uma <strong>distribuidora industrial B2B</strong>, do primeiro contato comercial ao pós-venda, achando onde o pedido trava e o retrabalho nasce.",
        eyebrow: "O projeto",
        headline: "O pedido passava por cinco áreas e três sistemas que não conversavam",
        intro: [
          "A operação era fragmentada: vendedor sem visão do estoque comprometido, pricing feito à mão em planilha, particularidades do cliente registradas de forma inconsistente e informação duplicada entre sistemas. O resultado aparecia no fim da linha: <strong>pedido incorreto, retrabalho e promessa não cumprida</strong>.",
        ],
        method: {
          title: "Como foi feito",
          body: [
            "O diagnóstico foi construído por <strong>triangulação de três fontes</strong>: entrevistas presenciais em profundidade com as áreas, formulário próprio aplicado aos operadores do dia a dia e a base de não conformidades da própria operação. Só entrou no relatório o ponto de fricção validado por <strong>pelo menos duas fontes</strong>.",
            "Com o material em mãos, mapeamos a jornada do pedido em <strong>cinco macroetapas</strong> (contato inicial, cotação, administrativo de vendas, logística e melhoria contínua) e rodamos <strong>diagrama de Ishikawa</strong> em cada uma para separar sintoma de causa-raiz.",
          ],
        },
        solutions: {
          title: "Das causas às soluções",
          body: [
            "Cada gargalo recebeu uma solução dimensionada: formulário estruturado de particularidades como <em>gate</em> obrigatório, automação do fluxo de pricing com integração ao ERP, auditoria e SLA por transportadora e agente de IA para classificar e direcionar não conformidades.",
          ],
        },
        deliverables: {
          title: "Entregas",
          list: [
            "<strong>Mapeamento AS-IS</strong> da jornada do pedido em cinco macroetapas.",
            "<strong>Diagramas de Ishikawa</strong> por área, separando sintoma de causa-raiz.",
            "<strong>Gargalos priorizados</strong> com impacto operacional descrito e evidência.",
            "<strong>Soluções dimensionadas</strong> por gargalo, com ferramenta e responsável.",
            "<strong>Plano de ação em três horizontes</strong>: 0 a 3, 3 a 6 e 6 a 12 meses.",
            "<strong>Blueprint da operação</strong> como base para a plataforma integrada futura.",
          ],
        },
        closing: "Operação mapeada · causa-raiz isolada · plano de ação com horizonte e dono.",
        shotsHeadlineMain: "Da causa-raiz",
        shotsHeadlineAccent: "à solução.",
        slides: {
          diagnostico: { alt: "Diagnóstico da jornada do cliente por triangulação de fontes", cap: "01 · Diagnóstico" },
          macroetapas: { alt: "Mapeamento da operação em macroetapas",                        cap: "02 · Jornada" },
          plano:       { alt: "Plano de ação final em três horizontes",                       cap: "03 · Plano de ação" },
        },
        shots: {
          ishikawaCom: { label: "Comercial", alt: "Diagrama de Ishikawa da área comercial",              capH: "Causa-raiz comercial", capT: "por que a promessa não se cumpre" },
          leads:       { label: "Leads",     alt: "Gargalo de ausência de filtro estruturado de leads",  capH: "Filtro de leads",      capT: "entrada sem qualificação" },
          pricing:     { label: "Pricing",   alt: "Solução de automação do fluxo de pricing",            capH: "Automação de pricing", capT: "integração e fim do Excel paralelo" },
          ishikawaLog: { label: "Logística", alt: "Diagrama de Ishikawa da logística",                   capH: "Causa-raiz logística", capT: "atrasos, avarias e transportadoras" },
        },
      },
    },
  },
};

export default pt;