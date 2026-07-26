import { Trans, useTranslation } from "react-i18next";

/* Os textos da /business têm <strong> e <em> no meio da frase, coisa que o
   resto do site não tem. Para a marcação continuar dentro do pt.ts / en.ts
   (e não picada em várias chaves), usamos o <Trans> do react-i18next: a chave
   é resolvida igual ao t(), só que as tags viram elementos React. */
const TAGS = { strong: <strong />, em: <em /> };

export default function Rich({ k }: { k: string }) {
  return <Trans i18nKey={k} components={TAGS} />;
}

/* Listas do pt.ts / en.ts são arrays de string. Devolve um nó por item,
   cada um resolvido pelo caminho com índice (ex.: "...list.0"). */
export function useRichList() {
  const { t } = useTranslation();
  return (key: string) => {
    const items = t(key, { returnObjects: true }) as unknown as string[];
    return items.map((_, i) => <Rich key={i} k={`${key}.${i}`} />);
  };
}
