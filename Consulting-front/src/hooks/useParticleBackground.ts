import { useEffect, RefObject } from "react";

export function useParticles(
  containerRef: RefObject<HTMLDivElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const canvasEl = canvas as HTMLCanvasElement;
    const containerEl = container as HTMLDivElement;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const mouse = { x: -9999, y: -9999 };

    interface P { x: number; y: number; vx: number; vy: number; r: number }
    let particles: P[] = [];
    let W = 0, H = 0;

    const dpr = window.devicePixelRatio || 1; // <-- corrige o erro

    function resize() {
      const rect = containerEl.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvasEl.width  = W * dpr;
      canvasEl.height = H * dpr;
    }

    function makeParticle(): P {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: 70 }, makeParticle);
    }

    function update(p: P) {
      p.vx += (Math.random() - 0.5) * 0.06;
      p.vy += (Math.random() - 0.5) * 0.06;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const maxSpeed = 0.8;
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repel = 90;
      if (dist < repel && dist > 0) {
        const force = ((repel - dist) / repel) * 1.2;
        p.vx += (dx / dist) * force * 0.3;
        p.vy += (dy / dist) * force * 0.3;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    }

    function applyWaveClip() {
      // replica o path do SVG: M0,90 L1000,90 C1100,90 1150,40 1250,40 L1440,40
      // escalado para as dimensões reais do container
      const waveH = 55;   // altura do SVG da wave
      const svgW  = 1440;

      const scaleX = W / svgW;
      const scaleY = (H / (H - waveH)) * (waveH / svgW); // proporcional

      // pontos chave convertidos para coordenadas reais
      const x0    = 0;
      const x1    = 1000 * scaleX;
      const cx1   = 1100 * scaleX;
      const cx2   = 1150 * scaleX;
      const x2    = 1250 * scaleX;
      const x3    = W;

      // Y da parte plana (topo da wave) em coordenadas do canvas
      const flatY = H - waveH;
      // Y do fundo (base do SVG = 90) em coordenadas do canvas  
      const baseY = H;

      ctx.beginPath();
      ctx.moveTo(x0, 0);           // topo esquerdo
      ctx.lineTo(x3, 0);           // topo direito
      ctx.lineTo(x3, flatY);       // desce até a altura da wave (direita)
      ctx.lineTo(x2, flatY);       // vai até o ponto onde a curva termina
      ctx.bezierCurveTo(cx2, flatY, cx1, baseY, x1, baseY); // curva
      ctx.lineTo(x0, baseY);       // base esquerda
      ctx.closePath();
      ctx.clip();
    }

    function draw() {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      applyWaveClip(); // <-- aplica o clip antes de desenhar

      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        update(particles[i]);

        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(105,18,18,0.35)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(105,18,18,${0.12 * (1 - d / maxDist)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.restore();
      animId = requestAnimationFrame(draw);
    }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, containerRef]);
}