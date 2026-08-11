import { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RED, DARK, MUTED, FONT_TITLE, FONT_BODY, SPRING } from "../styles/tokens";

const FONT_MONO = `ui-monospace, "SF Mono", Menlo, monospace`;

export type CaseShowcaseCardProps = {
  to?: string;
  onClick?: () => void;
  coverSrc: string;
  coverAlt: string;
  badge?: ReactNode;
  tag: ReactNode;
  title: ReactNode;
  desc: ReactNode;
  meta?: ReactNode;
  ctaLabel: ReactNode;
  ariaLabel?: string;
};

export default function CaseShowcaseCard({
  to, onClick, coverSrc, coverAlt, badge, tag, title, desc, meta, ctaLabel, ariaLabel,
}: CaseShowcaseCardProps) {
  const content = (
    <>
      <CardCover>
        <CardImg src={coverSrc} alt={coverAlt} loading="lazy" />
        <CardOverlay />
        {badge && <CardBadge>{badge}</CardBadge>}
        <CardArrow aria-hidden="true">→</CardArrow>
      </CardCover>

      <CardBody>
        <CardTag>{tag}</CardTag>
        <CardTitle>{title}</CardTitle>
        <CardDesc>{desc}</CardDesc>
        <CardFooter>
          {meta ? <CardMeta>{meta}</CardMeta> : <span />}
          <CardCta>{ctaLabel}</CardCta>
        </CardFooter>
      </CardBody>
    </>
  );

  if (to) {
    return <CardLink to={to} aria-label={ariaLabel}>{content}</CardLink>;
  }

  return (
    <CardButton
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick?.()}
      aria-label={ariaLabel}
    >
      {content}
    </CardButton>
  );
}

/* ── Estilo compartilhado (origem: processosCase.tsx) ────────────────────── */

const cardBase = `
  background: #fff;
  border: 1px solid rgba(26,26,24,.1);
  border-radius: 6px; overflow: hidden; cursor: pointer;
  display: block; width: 100%; text-decoration: none;
  transition: box-shadow .28s ease, transform .28s ${SPRING};
  &:hover, &:focus-visible {
    box-shadow: 0 14px 36px -10px rgba(26,26,24,.16);
    transform: translateY(-3px);
  }
  &:focus-visible { outline: 2px solid ${RED}; outline-offset: 2px; }
`;

const CardLink = styled(Link)`${cardBase}`;
const CardButton = styled.div`${cardBase}`;

const CardCover = styled.div`
  position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden;
`;

const CardImg = styled.img`
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform .45s ${SPRING};
  ${CardLink}:hover &, ${CardButton}:hover & { transform: scale(1.04); }
`;

const CardOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 35%, rgba(14,4,4,.55) 100%);
`;

const CardBadge = styled.span`
  position: absolute; top: 12px; left: 12px;
  font-family: ${FONT_MONO}; font-size: 9.5px; font-weight: 700;
  letter-spacing: .14em; text-transform: uppercase;
  color: #fff; background: ${RED}; padding: 3px 8px; border-radius: 2px;
`;

const CardArrow = styled.span`
  position: absolute; bottom: 14px; right: 16px;
  font-size: 17px; color: #fff; opacity: 0; transform: translateX(-6px);
  transition: opacity .22s, transform .22s ${SPRING};
  ${CardLink}:hover &, ${CardButton}:hover & { opacity: 1; transform: translateX(0); }
`;

const CardBody = styled.div`
  padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 7px;
`;

const CardTag = styled.span`
  font-family: ${FONT_MONO}; font-size: 9.5px; font-weight: 600;
  letter-spacing: .1em; text-transform: uppercase; color: ${RED};
`;

const CardTitle = styled.h3`
  font-family: ${FONT_TITLE}; font-size: 20px; font-weight: 700;
  letter-spacing: -.02em; color: ${DARK}; margin: 0;
  i { font-style: italic; font-weight: 400; color: ${RED}; }
`;

const CardDesc = styled.p`
  font-family: ${FONT_BODY}; font-size: 13px; line-height: 1.62;
  color: ${MUTED}; margin: 0;
`;

const CardFooter = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 4px; padding-top: 11px;
  border-top: 1px solid rgba(26,26,24,.08);
`;

const CardMeta = styled.span`
  font-family: ${FONT_MONO}; font-size: 10px;
  color: rgba(26,26,24,.35); letter-spacing: .06em;
`;

const CardCta = styled.span`
  font-family: ${FONT_BODY}; font-size: 12.5px; font-weight: 600; color: ${RED};
`;
