/*
  Lista estática de ex-membros — o FALLBACK da seção /alumni.

  O conteúdo oficial vem do ATLAS (aba Institucional → Ex-membros em destaque,
  rota pública /publico/ex-membros). Esta lista só aparece quando a chamada ao
  ATLAS falha ou devolve vazio, para a seção nunca ficar em branco.

  Os mesmos 13 ex-membros estão disponíveis no ATLAS pelo botão "Importar os
  ex-membros atuais do site" (ATLAS_back/src/institucional/ex_membros_iniciais).
  Depois da importação, esta lista não precisa mais ser editada.
*/

import type { Member, Lang } from "./types";
import { initialsOf } from "./types";
import i18n from "../../i18n";

import GiovannaFava from "../../assets/alumni/GiovannaFava.png";
import FernandoMauad from "../../assets/alumni/FernandoMauad.png";
import MateusMarinheiro from "../../assets/alumni/MateusMarinheiro.png";
import GuilhermeKaidei from "../../assets/alumni/GuilhermeKaidei.png";
import GabrielDebiagi from "../../assets/alumni/GabrielDebiagi.png";
import LeonardoElias from "../../assets/alumni/LeonardoElias.png";
import MariaFernandaMelo from "../../assets/alumni/MariaFernandaMelo.png";
import TomasMiele from "../../assets/alumni/TomasMiele.png";
import JoaoFaraco from "../../assets/alumni/JoaoFaraco.png";
import HenriqueManequini from "../../assets/alumni/HenriqueManequini.png";
import FernandoThome from "../../assets/alumni/FernandoThome.png";
import GuilhermeLMazer from "../../assets/alumni/GuilhermeLMazer.png";
import ViniciusGrecco from "../../assets/alumni/ViniciusGrecco.jpeg";

export interface FallbackMember {
  slug:     string;
  name:     string;
  company:  string;
  /** Quando true, `company` também tem tradução em alumni.carousel.members.<slug>.company */
  translatedCompany?: boolean;
  photo?:   string;
  linkedin?: string;
}

/* Ordem = ordem de exibição. Os 8 primeiros aparecem no carrossel. */
export const FALLBACK_MEMBERS: FallbackMember[] = [
  { slug: "giovannaFava",      name: "Giovanna Fava Steinberg",         company: "PROTS Snacks",                   photo: GiovannaFava,      linkedin: "https://www.linkedin.com/in/giovanna-fava-steinberg" },
  { slug: "fernandoMauad",     name: "Fernando Mauad",                  company: "UBS",                            photo: FernandoMauad,     linkedin: "https://www.linkedin.com/in/fernando-saad-mauad-8a4479164/" },
  { slug: "gabrielDebiagi",    name: "Gabriel Debiagi",                 company: "Empreendedorismo", translatedCompany: true, photo: GabrielDebiagi, linkedin: "https://www.linkedin.com/in/gabriel-debiagi-698321153/" },
  { slug: "mariaFernandaMelo", name: "Maria Fernanda Melo",             company: "Bain & Company",                 photo: MariaFernandaMelo, linkedin: "https://www.linkedin.com/in/maria-fernanda-melo-8b6bba248/" },
  { slug: "guilhermeMazer",    name: "Guilherme Mazer",                 company: "EY-Parthenon",                   photo: GuilhermeLMazer,   linkedin: "https://www.linkedin.com/in/guilherme-l-mazer-2b6843250/" },
  { slug: "leonardoElias",     name: "Leonardo Fernandes Farah Elias",  company: "XP Inc.",                        photo: LeonardoElias,     linkedin: "https://www.linkedin.com/in/leonardo-fernandes-farah-elias-24a5041aa/" },
  { slug: "fernandoThome",     name: "Fernando Thomé",                  company: "McKinsey & Company",             photo: FernandoThome,     linkedin: "https://www.linkedin.com/in/fernando-ferreira-thome/" },
  { slug: "henriqueManequini", name: "Henrique Manequini",              company: "G5 Partners",                    photo: HenriqueManequini, linkedin: "https://www.linkedin.com/in/henrique-manequini-rocha-pinto-7a16b223a/" },
  { slug: "guilhermeKaidei",   name: "Guilherme Katayama Kaidei",       company: "McKinsey & Company",             photo: GuilhermeKaidei,   linkedin: "https://www.linkedin.com/in/guilherme-kaidei/" },
  { slug: "viniciusGrecco",    name: "Vinicius Grecco",                 company: "BCGX (Boston Consulting Group)", photo: ViniciusGrecco },
  { slug: "joaoFaraco",        name: "João Gabriel Faraco",             company: "Galapagos Capital",              photo: JoaoFaraco,        linkedin: "https://www.linkedin.com/in/jo%C3%A3o-gabriel-faraco-871a8628a/" },
  { slug: "mateusMarinheiro",  name: "Mateus Marinheiro",               company: "Galápagos Capital",              photo: MateusMarinheiro,  linkedin: "https://www.linkedin.com/in/mateus-marinheiro-4a19b0324/" },
  { slug: "tomasMiele",        name: "Tomas Miele",                     company: "LTS Investments",                photo: TomasMiele,        linkedin: "https://www.linkedin.com/in/tomas-miele/" },
];

/** Lê um campo traduzido do i18n em um idioma específico; "" se não existir. */
export function fallbackText(slug: string, field: "role" | "quote" | "area" | "company", lang: Lang): string {
  const key = `alumni.carousel.members.${slug}.${field}`;
  const value = i18n.getFixedT(lang)(key, { defaultValue: "" });
  return typeof value === "string" ? value : "";
}

/** Lista de fallback já resolvida no idioma pedido. */
export function fallbackMembers(lang: Lang): Member[] {
  return FALLBACK_MEMBERS.map((m) => ({
    id:       m.slug,
    name:     m.name,
    role:     fallbackText(m.slug, "role", lang),
    area:     fallbackText(m.slug, "area", lang) || undefined,
    company:  m.translatedCompany ? (fallbackText(m.slug, "company", lang) || m.company) : m.company,
    photo:    m.photo,
    initials: initialsOf(m.name),
    quote:    fallbackText(m.slug, "quote", lang),
    linkedin: m.linkedin,
  }));
}
