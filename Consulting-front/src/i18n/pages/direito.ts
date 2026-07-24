// Translations for the Direito (Law) section: main page (src/pages/direito/direito.tsx),
// its CTA component, the shared LawCase/CaseLayout components, and the three dedicated
// case-study pages (Pé Direito I, Society I, Print I).
export const direitoTranslations = {
  pt: {
    direito: {
      hero: {
        eyebrow: "Frente de Direito",
        words: {
          word1: "Direito",
          word2: "que",
          word3: "traduz",
          word4: "negócio",
          word5: "em",
          word6: "segurança",
          word7: "jurídica.",
        },
        sub: "Atuação consultiva e contratual conduzida por alunos de Direito do Insper, com supervisão técnica de professores e escritórios parceiros — entregando pareceres fundamentados, contratos sob medida e análises estratégicas para empresas e organizações.",
      },

      scopesOpening: {
        eyebrow: "Frentes de atuação",
        title: "Nossos Escopos",
        subtitle:
          "Quatro escopos jurídicos delimitados — consultivos e contratuais — que se combinam à atuação das frentes de Business e Engenharia dentro da Insper Jr.",
        explore: "Explorar",
      },

      scopes: {
        badgeLabel: "ESCOPO",
        fichaLabel: "Ficha do escopo",
        themesLabel: "Temas",
        howWeWork: "Como atuamos",
        mainApplications: "Principais aplicações",
        items: [
          {
            tab: "Elaboração e/ou Revisão Contratual",
            title: "Contratos <i>sob medida</i>.",
            lede:
              "Escopo voltado à <strong>elaboração do zero</strong> ou à <strong>revisão estratégica de contratos já existentes</strong>. Na revisão, partimos de um instrumento que o cliente já utiliza e propomos <strong>mudanças e adequações</strong> que enderecem a dor do cliente sem perder de vista a lei aplicável — entregando, ao fim, um material juridicamente consistente e alinhado às necessidades do negócio.",
            detail:
              "Trabalhamos com <strong>elaboração de contratos do zero</strong> e <strong>revisão estratégica</strong> de instrumentos existentes. Em casos de revisão, entregamos um <strong>memorando explicativo</strong> que justifica cada alteração realizada e uma <strong>apresentação executiva</strong> que sintetiza os pontos críticos da revisão para a tomada de decisão. A atuação combina análise técnica das necessidades do cliente, parâmetros legais aplicáveis e revisão por bancas com professores e escritórios parceiros.",
            rows: [
              { key: "Entregáveis", val: "<strong>Contrato finalizado</strong> + memorando explicativo (em revisões) + apresentação executiva" },
              { key: "Aplicações", val: "Contratos personalizados conforme a necessidade do cliente, envolvendo diferentes áreas do Direito" },
              { key: "Abordagem", val: "Elaboração do zero <strong>ou</strong> revisão de material existente do cliente — sempre mirando a dor do negócio + a lei aplicável" },
              { key: "Sinergia", val: "Apoio direto a Business e Engenharia em demandas contratuais" },
              { key: "Supervisão", val: "Banca técnica com professores e escritórios parceiros" },
            ],
            quote: "Cada contrato é desenhado para o cliente — não modelo de prateleira.",
            bullets: [
              "Contratos personalizados conforme a necessidade do cliente",
              "Cobertura ampla — diferentes áreas e ramos do Direito",
              "Elaboração do zero ou revisão estratégica de instrumentos",
              "Memorando + apresentação executiva (em revisões)",
            ],
            tags: ["Direito Civil", "Direito Empresarial", "Contratos"],
          },
          {
            tab: "Planejamento Consultivo Societário",
            title: "Estrutura <i>societária</i> sob análise.",
            lede:
              "Serviço de <strong>análise estratégica da estrutura societária</strong> do cliente, com identificação de riscos, oportunidades de melhoria e alternativas possíveis. Escopo consultivo, <strong>sem envolver emissão de documentos em cartório</strong> — entrega de <strong>parecer fundamentado</strong> e <strong>apresentação executiva</strong> com os caminhos recomendados.",
            detail:
              "Dois cenários: análise da <strong>estrutura societária atual</strong> do cliente ou avaliação de <strong>uma ideia ainda no papel</strong> — neste segundo, na maioria das vezes a análise vem <strong>embarcada em outro escopo</strong> (uma viabilidade societária dentro de uma análise mercadológica, por exemplo). Em ambos, identificamos riscos e apresentamos <strong>alternativas viáveis</strong>, sem induzir a decisão do cliente.",
            rows: [
              { key: "Entregáveis", val: "<strong>Parecer consultivo</strong> + apresentação executiva com caminhos e recomendações" },
              { key: "Natureza", val: "Consultivo — <strong>não envolve emissão de documentos em cartório</strong>; apresenta alternativas sem induzir decisões" },
              { key: "Aplicações", val: "Análise societária, identificação de riscos, modelos jurídicos comparados" },
              { key: "Limites", val: "Sem execução direta de procedimentos cartorários ou registrais" },
              { key: "Supervisão", val: "Banca com professores especialistas em societário" },
            ],
            quote: "Recomendações fundamentadas — a decisão final é do cliente.",
            bullets: [
              "Análise da estrutura societária atual",
              "Identificação de riscos e gargalos jurídicos",
              "Comparativo entre modelos societários",
              "Parecer fundamentado + apresentação executiva",
            ],
            tags: ["Direito Societário", "Parecer", "LTDA", "S.A."],
          },
          {
            tab: "Planejamento Consultivo de Propriedade Industrial",
            title: "<i>Pesquisa estratégica</i> de marcas, patentes e desenhos industriais.",
            lede:
              "Análise técnica e estratégica relacionada a <strong>registros de marca, patente ou desenho industrial</strong>, com foco na avaliação de viabilidade, alternativas e melhores caminhos perante o <strong>INPI</strong>.",
            detail:
              "O escopo orienta o cliente sobre <strong>viabilidade de registro</strong>, <strong>requisitos legais</strong> e <strong>implicações estratégicas</strong> perante o INPI. Além de <strong>mapear os caminhos possíveis</strong> (registro, oposição, manutenção, alternativas defensivas), fazemos <strong>análise de viabilidade, estratégia e custos</strong> de cada alternativa — entregando um parecer que orienta a decisão. Conta com supervisão técnica de bancas com professores especialistas em propriedade industrial.",
            rows: [
              { key: "Entregável", val: "<strong>Parecer consultivo</strong> sobre viabilidade e caminhos no INPI" },
              { key: "Objetos", val: "Marca, patente, desenho industrial" },
              { key: "Aplicações", val: "Análise de <strong>viabilidade, estratégia e custos</strong> das alternativas perante o INPI" },
              { key: "Supervisão", val: "Banca técnica com professores especialistas em propriedade industrial" },
              { key: "Limites", val: "Não inclui execução direta de procedimentos no INPI" },
            ],
            quote: "Análise técnica antes do registro — caminho certo, menos retrabalho.",
            bullets: [
              "Análise de viabilidade de registro de marca",
              "Estudo de patenteabilidade",
              "Avaliação de desenho industrial",
              "Parecer estratégico sobre caminhos no INPI",
            ],
            tags: ["INPI", "Marca", "Patente", "Desenho Industrial", "Propriedade Intelectual"],
          },
          {
            tab: "Planejamento e Análise Tributária",
            title: "Tributos com <i>simulação</i> e parecer.",
            lede:
              "Estudo da <strong>situação tributária atual</strong> do cliente, com foco na <strong>comparação de regimes</strong>, impactos financeiros e possibilidades de adequação dentro da legislação vigente.",
            detail:
              "O escopo combina <strong>simulações em planilha</strong>, <strong>memorando jurídico</strong> e, quando pertinente, <strong>apresentação executiva</strong>. Analisamos a situação tributária atual, comparamos cenários alternativos dentro da legislação vigente e apoiamos o cliente em decisões que envolvam adequação fiscal, escolha de regime ou reestruturação — sempre considerando os <strong>impactos da reforma tributária em curso</strong>.",
            rows: [
              { key: "Entregáveis", val: "<strong>Simulações</strong> em planilha + memorando jurídico + apresentação executiva" },
              { key: "Foco", val: "Comparativo de regimes tributários e impactos financeiros" },
              { key: "Aplicações", val: "Adequação tributária dentro da legislação e reestruturações" },
              { key: "Cenário legal", val: "Análise sob a legislação vigente + impactos da <strong>reforma tributária</strong> em curso" },
              { key: "Supervisão", val: "Banca técnica com professores especialistas em tributário" },
            ],
            quote: "Decisões mais eficientes e juridicamente seguras.",
            bullets: [
              "Comparativo entre regimes tributários (Simples, Presumido, Real)",
              "Simulações de impacto financeiro",
              "Memorando jurídico fundamentado",
              "Apresentação executiva para decisão",
            ],
            tags: ["Direito Tributário", "Simples Nacional", "Lucro Presumido", "Lucro Real", "Planejamento Fiscal"],
          },
        ],
      },

      cases: {
        eyebrow: "Projetos em destaque",
        title: "Cases de Destaque",
        subtitle:
          "Três projetos que exemplificam a forma como a frente de Direito atua — do primeiro contrato firmado à assessoria continuada e à atuação multi-escopo.",
        imagePlaceholderAria: "Imagem a ser definida",
        imagePlaceholderText: "Imagem em breve",
        peDireito: {
          title: "Pé Direito I",
          ariaLabel: "Ver case Pé Direito I",
          subtitle: "Escopo · Contratos",
        },
        society: {
          title: "Society I",
          ariaLabel: "Ver case Society I",
          subtitle: "Escopo · Societário",
        },
        print: {
          title: "Print I",
          ariaLabel: "Ver case Print I",
          subtitle: "Escopo · Contratos · Tributário · PI",
        },
      },

      integration: {
        kicker: "Direito no contexto da Insper Jr.",
        title: "Atuação jurídica <span>integrada às demais frentes</span> da empresa",
        lede:
          "A frente de Direito não opera isolada: trabalha em conjunto com Business e Engenharia, vende seus serviços pelo mesmo núcleo comercial e atua transversalmente em demandas institucionais — sempre com supervisão de professores e bancas técnicas especializadas em cada um dos escopos.",
      },

      about: {
        eyebrow: "Quem somos",
        title: "Sobre a frente",
        lede:
          "A frente de Direito da Insper Jr. nasceu da <strong>46ª gestão</strong>, com o objetivo de ampliar o papel da empresa como centro de desenvolvimento para todos os alunos do Insper. Estruturada ao longo de um ciclo de diagnóstico, mapeamento e estruturação, hoje atua de forma integrada com Business e Engenharia, oferecendo serviços jurídicos delimitados, supervisionados por professores e escritórios parceiros.",
        pillars: [
          {
            num: "01 — Estruturada",
            title: "Escopos delimitados",
            text: "Quatro escopos consultivos e contratuais — <strong>Contratos, Societário, Propriedade Industrial e Tributário</strong> — desenhados para respeitar os limites regulatórios da OAB e maximizar o valor entregue.",
          },
          {
            num: "02 — Supervisionada",
            title: "Professores e escritórios parceiros",
            text: "Atuação validada por <strong>bancas técnicas</strong> com professores especialistas em cada um dos escopos jurídicos.",
          },
          {
            num: "03 — Integrada",
            title: "Conversa com Business e Engenharia",
            text: "A venda dos serviços jurídicos é <strong>integrada ao núcleo comercial</strong> da Insper Jr., permitindo combinar Direito com projetos de outras frentes em um mesmo ecossistema de soluções.",
          },
        ],
        stats: [
          { value: "4", label: "Escopos jurídicos" },
          { value: "2+", label: "Escritórios parceiros" },
          { value: "49ª", label: "Gestão atual" },
          { value: "24+", label: "Anos de Insper Jr." },
        ],
      },

      differentiators: {
        eyebrow: "O que nos diferencia",
        title: "Diferenciais",
        subtitle:
          "O que faz a frente de Direito da Insper Jr. se destacar no ecossistema de empresas juniores jurídicas.",
        cards: [
          {
            num: "01",
            title: "Escopos pensados para o cliente",
            text: "Diferente de outras EJs jurídicas, organizamos os escopos a partir do objetivo do cliente — não da categoria jurídica. Cada serviço entrega clareza sobre o que será produzido e o porquê.",
          },
          {
            num: "02",
            title: "Supervisão técnica robusta",
            text: "Trilhas de conhecimento estruturadas e bancas técnicas com professores especialistas garantem qualidade jurídica em cada entregável.",
          },
          {
            num: "03",
            title: "Integração com Business e Engenharia",
            text: "O Direito conversa diretamente com as outras frentes da Insper Jr., permitindo entregas combinadas — de um contrato vinculado a um projeto de software a uma análise tributária dentro de uma reestruturação.",
          },
        ],
      },

      cta: {
        eyebrow: "Próximo passo",
        title: "Pronto para resolver sua<br />próxima demanda jurídica?",
        sub:
          "Entre em contato com a Insper Jr. e descubra como podemos apoiar o seu negócio com contratos sob medida, pareceres consultivos e análises tributárias supervisionadas por professores e escritórios parceiros.",
        button: "Fazer diagnóstico gratuito",
      },

      caseCommon: {
        back: "Voltar",
        backAria: "Voltar para a página de Direito",
        prevAria: "Anterior",
        nextAria: "Próximo",
        deckAriaLabel: "Apresentação do projeto {{id}}",
        projectLabel: "O projeto",
        strategyLabel: "Estratégia",
      },

      caseStudies: {
        peDireito: {
          badge: "CASE EM DESTAQUE",
          bigName: "Pé Direito I",
          sub:
            "O <strong>Pé Direito I</strong> foi o <strong>primeiro projeto executado pela frente de Direito</strong> da Insper Jr., conduzido para uma ONG cliente. Mais do que uma entrega, o projeto serviu como <strong>teste de viabilidade do escopo de Contratos</strong> recém-estruturado — e validou o modelo de atuação consultiva da frente.",
          headline: "Por que Pé Direito?",
          paragraphs: [
            "A cliente, uma <strong>ONG do terceiro setor</strong>, mantinha relações comerciais com empresas parceiras que, formalmente, eram tratadas como <strong>doações</strong> — mas envolviam <strong>contrapartida financeira</strong>, o que descaracterizava juridicamente a operação como doação pura e gerava riscos tributários e reputacionais.",
            "O objetivo do projeto foi <strong>identificar corretamente a natureza jurídica</strong> dessas relações e estruturar contratos adequados às necessidades da ONG — preservando o vínculo com os parceiros e reduzindo a exposição fiscal.",
          ],
          list: [
            "<strong>Diagnóstico jurídico</strong> — identificar o tipo de contrato que melhor representava a relação real entre ONG e empresas.",
            "<strong>Análise tributária integrada</strong> — avaliar o impacto fiscal de cada modelo contratual possível.",
            "<strong>Modelagem flexível</strong> — optar por contrato atípico, com maior margem de redação personalizada.",
            "<strong>Documentos complementares</strong> — completar o ecossistema jurídico com termos de voluntariado e uso de imagem.",
          ],
          meta: [
            { label: "Setor", value: "Terceiro Setor · ONG" },
            { label: "Contexto", value: "Doações com contrapartida" },
            { label: "Escopo", value: "Contratos" },
          ],
          steps: [
            { alt: "Pé Direito I — escopo: contratos", cap: "01 · Capa" },
            { alt: "Contexto: ONG com contrato de doação inadequado", cap: "02 · Contexto" },
            { alt: "Desafios do projeto Pé Direito I", cap: "03 · Desafios" },
            { alt: "Entregáveis do projeto Pé Direito I", cap: "04 · Entregáveis" },
          ],
        },
        society: {
          badge: "CASE EM DESTAQUE",
          bigName: "Society I",
          sub:
            "O <strong>Society I</strong> foi o <strong>primeiro projeto da frente de Direito no escopo de Societário</strong>, conduzido com o objetivo explícito de <strong>testar o escopo dentro da operação</strong> da Insper Jr. Mais do que uma entrega ao cliente, o projeto se tornou um <strong>aprendizado institucional</strong> sobre os limites do que a empresa júnior pode executar diretamente.",
          headline: "Por que Society?",
          paragraphs: [
            "O projeto chegou por <strong>indicação de um conhecido de uma professora</strong>, com objetivo claro de testar a viabilidade do escopo de <strong>Societário</strong> dentro da frente de Direito. O cliente era constituído como <strong>Sociedade Limitada (LTDA)</strong> e a demanda envolvia a <strong>alteração do quadro societário</strong>, em razão da saída de um dos sócios.",
            "Ao longo da execução, ficou claro que parte das etapas necessárias <strong>fugia da autonomia institucional da Insper Jr.</strong> — exigindo comparecimento presencial em cartório e atos que só o próprio cliente pode praticar. O projeto não se concluiu na entrega tradicional, mas <strong>delimitou o escopo</strong> do que a frente passa a oferecer daí em diante.",
          ],
          list: [
            "<strong>Análise da demanda real</strong> — entender exatamente o que a alteração societária exigia.",
            "<strong>Mapeamento das etapas externas</strong> — identificar passos dependentes de cartório, assinaturas e registros.",
            "<strong>Avaliação de autonomia</strong> — diagnosticar quais etapas a Insper Jr. poderia conduzir diretamente.",
            "<strong>Aprendizado institucional</strong> — converter o projeto em delimitação formal do escopo de Societário.",
          ],
          meta: [
            { label: "Cliente", value: "Sociedade Limitada (LTDA)" },
            { label: "Origem", value: "Indicação acadêmica" },
            { label: "Escopo", value: "Societário" },
          ],
          steps: [
            { alt: "Society I — escopo: societário", cap: "01 · Capa" },
            { alt: "Contexto: cliente LTDA com saída de sócio", cap: "02 · Contexto" },
            { alt: "Desafios do projeto Society I", cap: "03 · Desafios" },
            { alt: "Entregáveis do projeto Society I", cap: "04 · Entregáveis" },
          ],
        },
        print: {
          badge: "CASE EM ANDAMENTO",
          bigName: "Print I",
          sub:
            "O <strong>Print I</strong> é um projeto <strong>multi-escopo em andamento</strong> que combina <strong>três frentes de atuação</strong> da área de Direito — <strong>Contratos, Tributário e Propriedade Industrial</strong> — para um cliente com <strong>dois CNPJs</strong> que prestam o mesmo serviço sob regimes tributários distintos. Demonstra a capacidade da frente em entregar valor combinado, não escopo isolado.",
          headline: "Por que Print?",
          paragraphs: [
            "O cliente possui <strong>dois CNPJs</strong> que prestam o mesmo tipo de serviço, porém com <strong>regimes tributários diferentes</strong>. A configuração gera uma operação fragmentada — com impactos sobre contratos, fiscalização e estrutura societária — que exige análise jurídica articulada sobre as três frentes simultaneamente.",
            "O projeto está em <strong>execução com três frentes paralelas</strong> de atuação, sendo um marco interno da Insper Jr.: a primeira entrega que combina <strong>Contratos + Tributário + Propriedade Industrial</strong> em um mesmo cliente.",
          ],
          list: [
            "<strong>Análise tributária integrada</strong> — comparar a operação sob os dois regimes e mapear caminhos de adequação.",
            "<strong>Revisão contratual coordenada</strong> — assegurar que os instrumentos refletem a divisão entre os CNPJs.",
            "<strong>Frente de propriedade industrial</strong> — apoiar o cliente em registros que protegem a operação.",
            "<strong>Coordenação multi-escopo</strong> — uma única banca técnica acompanha as três frentes para garantir coerência.",
          ],
          meta: [
            { label: "Cliente", value: "2 CNPJs · mesmo serviço" },
            { label: "Frentes", value: "3 paralelas" },
            { label: "Escopos", value: "Contratos · Tributário · PI" },
          ],
          steps: [
            { alt: "Print I — escopos: contratos, tributário e propriedade industrial", cap: "01 · Capa" },
            { alt: "Contexto: cliente com dois CNPJs e regimes distintos", cap: "02 · Contexto" },
            { alt: "Desafios do projeto Print I", cap: "03 · Desafios" },
            { alt: "Status / entregáveis do projeto Print I", cap: "04 · Status" },
          ],
        },
      },
    },
  },

  en: {
    direito: {
      hero: {
        eyebrow: "Law Practice Group",
        words: {
          word1: "Law",
          word2: "that",
          word3: "turns",
          word4: "business",
          word5: "into",
          word6: "legal",
          word7: "certainty.",
        },
        sub: "Consultative and contract-focused work carried out by Insper Law students, with technical supervision from professors and partner law firms — delivering well-founded legal opinions, tailor-made contracts, and strategic analyses for companies and organizations.",
      },

      scopesOpening: {
        eyebrow: "Areas of Practice",
        title: "Our Practice Areas",
        subtitle:
          "Four clearly defined legal practice areas — consultative and contractual — that combine with the work of the Business and Engineering fronts within Insper Jr.",
        explore: "Explore",
      },

      scopes: {
        badgeLabel: "SCOPE",
        fichaLabel: "Scope Overview",
        themesLabel: "Topics",
        howWeWork: "How We Work",
        mainApplications: "Key Applications",
        items: [
          {
            tab: "Contract Drafting and/or Review",
            title: "Tailor-made <i>contracts</i>.",
            lede:
              "A practice area focused on <strong>drafting contracts from scratch</strong> or the <strong>strategic review of existing contracts</strong>. In a review, we start from an instrument the client already uses and propose <strong>changes and adjustments</strong> that address the client's pain points without losing sight of applicable law — ultimately delivering legally consistent material aligned with the business's needs.",
            detail:
              "We handle <strong>drafting contracts from the ground up</strong> and the <strong>strategic review</strong> of existing instruments. In review cases, we deliver an <strong>explanatory memorandum</strong> justifying each change made and an <strong>executive presentation</strong> summarizing the critical points for decision-making. Our work combines a technical analysis of the client's needs, applicable legal parameters, and review by panels of professors and partner law firms.",
            rows: [
              { key: "Deliverables", val: "<strong>Finalized contract</strong> + explanatory memorandum (for reviews) + executive presentation" },
              { key: "Applications", val: "Customized contracts based on the client's needs, spanning different areas of law" },
              { key: "Approach", val: "Drafting from scratch <strong>or</strong> reviewing the client's existing material — always targeting the business's pain point + applicable law" },
              { key: "Synergy", val: "Direct support to Business and Engineering on contractual matters" },
              { key: "Supervision", val: "Technical panel with professors and partner law firms" },
            ],
            quote: "Every contract is designed for the client — never an off-the-shelf template.",
            bullets: [
              "Contracts customized to the client's needs",
              "Broad coverage — different areas and branches of law",
              "Drafting from scratch or strategic review of instruments",
              "Memorandum + executive presentation (for reviews)",
            ],
            tags: ["Civil Law", "Business Law", "Contracts"],
          },
          {
            tab: "Corporate Advisory Planning",
            title: "<i>Corporate</i> structure under review.",
            lede:
              "A service focused on the <strong>strategic analysis of the client's corporate structure</strong>, identifying risks, opportunities for improvement, and possible alternatives. A consultative practice area, <strong>not involving the issuance of notarized documents</strong> — delivering a <strong>well-founded legal opinion</strong> and an <strong>executive presentation</strong> with recommended paths forward.",
            detail:
              "Two scenarios: analyzing the client's <strong>current corporate structure</strong> or evaluating <strong>an idea that's still on paper</strong> — in the latter case, the analysis is usually <strong>embedded within another scope</strong> (a corporate feasibility study within a market analysis, for example). In both cases, we identify risks and present <strong>viable alternatives</strong> without steering the client's decision.",
            rows: [
              { key: "Deliverables", val: "<strong>Advisory legal opinion</strong> + executive presentation with recommended paths" },
              { key: "Nature", val: "Consultative — <strong>does not involve issuing notarized documents</strong>; presents alternatives without steering decisions" },
              { key: "Applications", val: "Corporate structure analysis, risk identification, comparative legal models" },
              { key: "Limits", val: "No direct execution of notarial or registry procedures" },
              { key: "Supervision", val: "Panel with professors specializing in corporate law" },
            ],
            quote: "Well-founded recommendations — the final decision is the client's.",
            bullets: [
              "Analysis of the current corporate structure",
              "Identification of legal risks and bottlenecks",
              "Comparison between corporate structure models",
              "Well-founded legal opinion + executive presentation",
            ],
            tags: ["Corporate Law", "Legal Opinion", "LTDA", "S.A."],
          },
          {
            tab: "Industrial Property Advisory Planning",
            title: "<i>Strategic research</i> for trademarks, patents, and industrial designs.",
            lede:
              "Technical and strategic analysis related to <strong>trademark, patent, or industrial design registrations</strong>, focused on assessing feasibility, alternatives, and the best paths forward with <strong>INPI</strong> (Brazil's National Institute of Industrial Property).",
            detail:
              "This practice area guides the client on <strong>registration feasibility</strong>, <strong>legal requirements</strong>, and <strong>strategic implications</strong> before INPI. Besides <strong>mapping out the possible paths</strong> (filing, opposition, maintenance, defensive alternatives), we perform a <strong>feasibility, strategy, and cost analysis</strong> for each alternative — delivering a legal opinion that guides the decision. Backed by technical supervision from panels of professors specializing in industrial property.",
            rows: [
              { key: "Deliverable", val: "<strong>Advisory legal opinion</strong> on feasibility and paths forward with INPI" },
              { key: "Subject Matter", val: "Trademark, patent, industrial design" },
              { key: "Applications", val: "Analysis of the <strong>feasibility, strategy, and costs</strong> of alternatives before INPI" },
              { key: "Supervision", val: "Technical panel with professors specializing in industrial property" },
              { key: "Limits", val: "Does not include direct execution of procedures with INPI" },
            ],
            quote: "Technical analysis before filing — the right path, less rework.",
            bullets: [
              "Trademark registration feasibility analysis",
              "Patentability study",
              "Industrial design assessment",
              "Strategic opinion on paths forward with INPI",
            ],
            tags: ["INPI", "Trademark", "Patent", "Industrial Design", "Intellectual Property"],
          },
          {
            tab: "Tax Planning and Analysis",
            title: "Taxes with <i>simulation</i> and legal opinion.",
            lede:
              "A study of the client's <strong>current tax situation</strong>, focused on <strong>comparing tax regimes</strong>, financial impacts, and options for compliance within current legislation.",
            detail:
              "This practice area combines <strong>spreadsheet simulations</strong>, a <strong>legal memorandum</strong> and, when relevant, an <strong>executive presentation</strong>. We analyze the current tax situation, compare alternative scenarios within current legislation, and support the client in decisions involving tax compliance, regime selection, or restructuring — always factoring in the <strong>impacts of the ongoing tax reform</strong>.",
            rows: [
              { key: "Deliverables", val: "<strong>Spreadsheet simulations</strong> + legal memorandum + executive presentation" },
              { key: "Focus", val: "Comparison of tax regimes and financial impacts" },
              { key: "Applications", val: "Tax compliance within the law and restructuring" },
              { key: "Legal Landscape", val: "Analysis under current legislation + impacts of the ongoing <strong>tax reform</strong>" },
              { key: "Supervision", val: "Technical panel with professors specializing in tax law" },
            ],
            quote: "More efficient, legally sound decisions.",
            bullets: [
              "Comparison between tax regimes (Simples, Presumido, Real)",
              "Financial impact simulations",
              "Well-founded legal memorandum",
              "Executive presentation for decision-making",
            ],
            tags: ["Tax Law", "Simples Nacional", "Lucro Presumido", "Lucro Real", "Tax Planning"],
          },
        ],
      },

      cases: {
        eyebrow: "Featured Projects",
        title: "Featured Cases",
        subtitle:
          "Three projects that showcase how the Law practice area operates — from the first contract signed to ongoing advisory work and multi-scope engagements.",
        imagePlaceholderAria: "Image to be defined",
        imagePlaceholderText: "Image coming soon",
        peDireito: {
          title: "Pé Direito I",
          ariaLabel: "View the Pé Direito I case study",
          subtitle: "Scope · Contracts",
        },
        society: {
          title: "Society I",
          ariaLabel: "View the Society I case study",
          subtitle: "Scope · Corporate",
        },
        print: {
          title: "Print I",
          ariaLabel: "View the Print I case study",
          subtitle: "Scope · Contracts · Tax · IP",
        },
      },

      integration: {
        kicker: "Law within Insper Jr.",
        title: "Legal work <span>integrated with the company's other practice areas</span>",
        lede:
          "The Law practice area doesn't operate in isolation: it works together with Business and Engineering, sells its services through the same commercial hub, and operates across institutional demands — always with supervision from professors and technical panels specialized in each practice area.",
      },

      about: {
        eyebrow: "Who We Are",
        title: "About the Practice Area",
        lede:
          "Insper Jr.'s Law practice area was born out of the <strong>46th management term</strong>, with the goal of expanding the company's role as a development hub for all Insper students. Built through a cycle of diagnosis, mapping, and structuring, it now operates in full integration with Business and Engineering, offering clearly defined legal services supervised by professors and partner law firms.",
        pillars: [
          {
            num: "01 — Structured",
            title: "Clearly Defined Practice Areas",
            text: "Four consultative and contractual practice areas — <strong>Contracts, Corporate, Industrial Property, and Tax</strong> — designed to respect OAB (Brazilian Bar Association) regulatory limits while maximizing delivered value.",
          },
          {
            num: "02 — Supervised",
            title: "Professors and Partner Law Firms",
            text: "Work validated by <strong>technical panels</strong> of professors specializing in each legal practice area.",
          },
          {
            num: "03 — Integrated",
            title: "Works Hand-in-Hand with Business and Engineering",
            text: "The sale of legal services is <strong>integrated into Insper Jr.'s commercial hub</strong>, making it possible to combine Law with projects from other practice areas within the same solutions ecosystem.",
          },
        ],
        stats: [
          { value: "4", label: "Legal Practice Areas" },
          { value: "2+", label: "Partner Law Firms" },
          { value: "49ª", label: "Current Management Term" },
          { value: "24+", label: "Years of Insper Jr." },
        ],
      },

      differentiators: {
        eyebrow: "What Sets Us Apart",
        title: "Differentiators",
        subtitle:
          "What makes Insper Jr.'s Law practice area stand out in the legal junior enterprise ecosystem.",
        cards: [
          {
            num: "01",
            title: "Practice Areas Designed for the Client",
            text: "Unlike other legal junior enterprises, we organize our practice areas around the client's goal — not the legal category. Every service delivers clarity on what will be produced and why.",
          },
          {
            num: "02",
            title: "Robust Technical Supervision",
            text: "Structured knowledge tracks and technical panels of specialist professors ensure legal quality in every deliverable.",
          },
          {
            num: "03",
            title: "Integration with Business and Engineering",
            text: "Law connects directly with Insper Jr.'s other practice areas, enabling combined deliverables — from a contract tied to a software project to a tax analysis within a restructuring.",
          },
        ],
      },

      cta: {
        eyebrow: "Next Step",
        title: "Ready to resolve your<br />next legal matter?",
        sub:
          "Get in touch with Insper Jr. and find out how we can support your business with tailor-made contracts, advisory legal opinions, and tax analyses supervised by professors and partner law firms.",
        button: "Get a Free Diagnosis",
      },

      caseCommon: {
        back: "Back",
        backAria: "Back to the Law page",
        prevAria: "Previous",
        nextAria: "Next",
        deckAriaLabel: "{{id}} project showcase",
        projectLabel: "The Project",
        strategyLabel: "Strategy",
      },

      caseStudies: {
        peDireito: {
          badge: "FEATURED CASE",
          bigName: "Pé Direito I",
          sub:
            "<strong>Pé Direito I</strong> was the <strong>first project carried out by the Law practice area</strong> at Insper Jr., conducted for a nonprofit client. More than a deliverable, the project served as a <strong>feasibility test for the newly structured Contracts scope</strong> — and validated the practice area's consultative approach.",
          headline: "Why Pé Direito?",
          paragraphs: [
            "The client, a <strong>third-sector nonprofit</strong>, maintained commercial relationships with partner companies that, formally, were treated as <strong>donations</strong> — but involved <strong>financial consideration</strong>, which legally mischaracterized the arrangement as a pure donation and created tax and reputational risks.",
            "The project's goal was to <strong>correctly identify the legal nature</strong> of these relationships and structure contracts suited to the nonprofit's needs — preserving the relationship with partners while reducing tax exposure.",
          ],
          list: [
            "<strong>Legal diagnosis</strong> — identifying the type of contract that best represented the real relationship between the nonprofit and the companies.",
            "<strong>Integrated tax analysis</strong> — assessing the tax impact of each possible contractual model.",
            "<strong>Flexible modeling</strong> — opting for an atypical contract, with greater room for customized drafting.",
            "<strong>Complementary documents</strong> — rounding out the legal ecosystem with volunteer agreements and image-use terms.",
          ],
          meta: [
            { label: "Sector", value: "Third Sector · Nonprofit" },
            { label: "Context", value: "Donations with consideration" },
            { label: "Scope", value: "Contracts" },
          ],
          steps: [
            { alt: "Pé Direito I — scope: contracts", cap: "01 · Cover" },
            { alt: "Context: nonprofit with an inadequate donation agreement", cap: "02 · Context" },
            { alt: "Challenges of the Pé Direito I project", cap: "03 · Challenges" },
            { alt: "Deliverables of the Pé Direito I project", cap: "04 · Deliverables" },
          ],
        },
        society: {
          badge: "FEATURED CASE",
          bigName: "Society I",
          sub:
            "<strong>Society I</strong> was the <strong>Law practice area's first project in the Corporate scope</strong>, carried out with the explicit goal of <strong>testing the scope within Insper Jr.'s operations</strong>. More than a deliverable for the client, the project became an <strong>institutional learning experience</strong> about the limits of what the junior enterprise can execute directly.",
          headline: "Why Society?",
          paragraphs: [
            "The project came through a <strong>referral from an acquaintance of a professor</strong>, with the clear goal of testing the feasibility of the <strong>Corporate</strong> scope within the Law practice area. The client was structured as a <strong>Limited Liability Company (LTDA)</strong>, and the request involved <strong>changing the ownership structure</strong> due to a partner's exit.",
            "As the project progressed, it became clear that part of the necessary steps <strong>fell outside Insper Jr.'s institutional autonomy</strong> — requiring in-person attendance at a notary's office and acts that only the client itself can perform. The project didn't conclude with a traditional deliverable, but it <strong>defined the scope</strong> of what the practice area would go on to offer from then on.",
          ],
          list: [
            "<strong>Analysis of the actual request</strong> — understanding exactly what the ownership change required.",
            "<strong>Mapping of external steps</strong> — identifying steps dependent on notary offices, signatures, and registrations.",
            "<strong>Autonomy assessment</strong> — diagnosing which steps Insper Jr. could carry out directly.",
            "<strong>Institutional learning</strong> — turning the project into a formal definition of the Corporate scope.",
          ],
          meta: [
            { label: "Client", value: "Limited Liability Company (LTDA)" },
            { label: "Origin", value: "Academic referral" },
            { label: "Scope", value: "Corporate" },
          ],
          steps: [
            { alt: "Society I — scope: corporate", cap: "01 · Cover" },
            { alt: "Context: LTDA client with a partner's exit", cap: "02 · Context" },
            { alt: "Challenges of the Society I project", cap: "03 · Challenges" },
            { alt: "Deliverables of the Society I project", cap: "04 · Deliverables" },
          ],
        },
        print: {
          badge: "ONGOING CASE",
          bigName: "Print I",
          sub:
            "<strong>Print I</strong> is an <strong>ongoing multi-scope project</strong> that combines <strong>three practice areas</strong> within Law — <strong>Contracts, Tax, and Industrial Property</strong> — for a client with <strong>two CNPJs (company registration numbers)</strong> that provide the same service under different tax regimes. It demonstrates the practice area's ability to deliver combined value, not an isolated scope.",
          headline: "Why Print?",
          paragraphs: [
            "The client has <strong>two CNPJs</strong> that provide the same type of service, but under <strong>different tax regimes</strong>. This setup creates a fragmented operation — with impacts on contracts, oversight, and corporate structure — that requires a coordinated legal analysis across all three practice areas at once.",
            "The project is <strong>underway with three parallel practice areas</strong> working simultaneously, marking an internal milestone for Insper Jr.: the first deliverable that combines <strong>Contracts + Tax + Industrial Property</strong> for a single client.",
          ],
          list: [
            "<strong>Integrated tax analysis</strong> — comparing the operation under both regimes and mapping paths to compliance.",
            "<strong>Coordinated contract review</strong> — ensuring the instruments reflect the split between the two CNPJs.",
            "<strong>Industrial property practice</strong> — supporting the client with registrations that protect the operation.",
            "<strong>Multi-scope coordination</strong> — a single technical panel oversees all three practice areas to ensure consistency.",
          ],
          meta: [
            { label: "Client", value: "2 CNPJs · same service" },
            { label: "Practice Areas", value: "3 parallel" },
            { label: "Scopes", value: "Contracts · Tax · IP" },
          ],
          steps: [
            { alt: "Print I — scopes: contracts, tax, and industrial property", cap: "01 · Cover" },
            { alt: "Context: client with two CNPJs and different tax regimes", cap: "02 · Context" },
            { alt: "Challenges of the Print I project", cap: "03 · Challenges" },
            { alt: "Status / deliverables of the Print I project", cap: "04 · Status" },
          ],
        },
      },
    },
  },
};
