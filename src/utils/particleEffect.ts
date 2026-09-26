// Smooth, lightweight 60fps Canvas Particle Celebration Effect

export function triggerConfetti(originX?: number, originY?: number) {
  if (typeof window === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  const context = ctx;

  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.scale(dpr, dpr);

  const startX = originX !== undefined ? originX : width / 2;
  const startY = originY !== undefined ? originY : height / 2;

  const colors = [
    '#38bdf8', // sky
    '#00668a', // deep sky
    '#22c990', // mint
    '#fbbf24', // gold
    '#a855f7', // purple
    '#f43f5e', // rose
    '#60a5fa', // blue
  ];

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    alpha: number;
    rotation: number;
    vRotation: number;
    shape: 'rect' | 'circle' | 'star';
  }

  const particles: Particle[] = [];
  const count = 70;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      vRotation: (Math.random() - 0.5) * 0.2,
      shape: Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star',
    });
  }

  let animationFrameId: number;
  const gravity = 0.22;
  const friction = 0.98;

  function render() {
    context.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (const p of particles) {
      if (p.alpha <= 0.01) continue;
      activeCount++;

      p.vx *= friction;
      p.vy = p.vy * friction + gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRotation;
      p.alpha -= 0.012;

      context.save();
      context.globalAlpha = Math.max(0, p.alpha);
      context.translate(p.x, p.y);
      context.rotate(p.rotation);
      context.fillStyle = p.color;

      if (p.shape === 'rect') {
        context.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'circle') {
        context.beginPath();
        context.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        context.fill();
      } else {
        // Draw 4-point sparkle star
        context.beginPath();
        for (let j = 0; j < 4; j++) {
          context.lineTo(Math.cos((j * Math.PI) / 2) * p.size, Math.sin((j * Math.PI) / 2) * p.size);
          context.lineTo(
            Math.cos((j * Math.PI) / 2 + Math.PI / 4) * (p.size / 3),
            Math.sin((j * Math.PI) / 2 + Math.PI / 4) * (p.size / 3)
          );
        }
        context.closePath();
        context.fill();
      }

      context.restore();
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
    }
  }

  animationFrameId = requestAnimationFrame(render);
}
