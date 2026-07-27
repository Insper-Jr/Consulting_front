import React from "react";
import styled, { keyframes, css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useInView } from "@/hooks/useInView";
import { RED, DARK, MUTED, BG_CREAM as BG, FONT_TITLE, FONT_BODY, SPRING } from "@/styles/tokens";

/* ─── Tokens locais (sem equivalente exato no central) ── */
const BORDER = "rgba(26,26,24,0.10)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Layout: faixa única, fina, sutil ───────────────── */
const Strip = styled.section<{ $visible: boolean }>`
  background: ${BG};
  border-top: 1px solid ${BORDER};
  border-bottom: 1px solid ${BORDER};
  padding: 22px max(40px, calc((100vw - 1200px) / 2));
  opacity: 0;
  ${p => p.$visible && css`animation: ${fadeUp} 0.8s ${SPRING} 0.05s forwards;`}
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 28px;
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Eyebrow = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${RED};
  white-space: nowrap;
`;

const Body = styled.p`
  font-family: ${FONT_BODY};
  font-size: 13px;
  color: ${MUTED};
  line-height: 1.55;
  margin: 0;

  strong {
    color: ${DARK};
    font-weight: 600;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  @media (max-width: 760px) { flex-wrap: wrap; }
`;

const Tag = styled.span`
  font-family: ${FONT_TITLE};
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${MUTED};
  border: 1px solid ${BORDER};
  padding: 5px 8px;
  white-space: nowrap;
  border-radius: 2px;
`;

/* ══════════════════════════════════════════════════════ */
export default function AboutJuniorMovement() {
  const { t } = useTranslation();
  const { ref, visible } = useInView();

  return (
    <Strip ref={ref} $visible={visible}>
      <Inner>
        <Eyebrow>{t("about.juniorMovement.eyebrow")}</Eyebrow>
        <Body>
          <strong>{t("about.juniorMovement.strong1")}</strong>
          {t("about.juniorMovement.bodyMiddle")}
          <strong>{t("about.juniorMovement.strong2")}</strong>.
        </Body>
        <Tags>
          <Tag>{t("about.juniorMovement.tag1")}</Tag>
          <Tag>{t("about.juniorMovement.tag2")}</Tag>
          <Tag>{t("about.juniorMovement.tag3")}</Tag>
        </Tags>
      </Inner>
    </Strip>
  );
}
