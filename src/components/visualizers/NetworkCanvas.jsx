import React, { useRef, useEffect, memo } from 'react';

// Color profiles for DaisyUI Cambridge Green themes
const THEME_PALETTES = {
  'cambridge-green': {
    nodes: ['#059669', '#10b981', '#0f766e', '#047857'],
    lines: 'rgba(5, 150, 105, 0.35)',
    mouseLine: 'rgba(5, 150, 105, 0.55)',
    packet: '#059669',
    glow: 'rgba(5, 150, 105, 0.12)',
  },
  'cambridge-dark': {
    nodes: ['#34d399', '#a7f3d0', '#2dd4bf', '#10b981'],
    lines: 'rgba(52, 211, 153, 0.4)',
    mouseLine: 'rgba(52, 211, 153, 0.6)',
    packet: '#34d399',
    glow: 'rgba(52, 211, 153, 0.15)',
  }
};

const NetworkCanvas = memo(function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const getActivePalette = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'cambridge-green';
      return THEME_PALETTES[currentTheme] || THEME_PALETTES['cambridge-green'];
    };

    let palette = getActivePalette();

    const observer = new MutationObserver(() => {
      palette = getActivePalette();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Smooth mouse tracking
    const rawMouse = { x: -1000, y: -1000, active: false };
    const smoothMouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      rawMouse.x = e.clientX - rect.left;
      rawMouse.y = e.clientY - rect.top;
      rawMouse.active = true;
    };

    const handleMouseLeave = () => {
      rawMouse.x = -1000;
      rawMouse.y = -1000;
      rawMouse.active = false;
    };

    if (canvas.parentElement) {
      canvas.parentElement.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    const initNodes = () => {
      const count = Math.floor(Math.min(width, height) / 13);
      const list = [];

      for (let i = 0; i < count; i++) {
        const baseRadius = 5 + (i % 3) * 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.15 + Math.random() * 0.25;

        list.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius,
          radius: baseRadius,
          colorIndex: i % 4,
          pulseOffset: Math.random() * Math.PI * 2,
          wanderAngle: angle,
        });
      }
      return list;
    };

    let nodes = initNodes();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      nodes = initNodes();
    };
    window.addEventListener('resize', handleResize);

    const packets = [];
    const maxLinkDistance = 190;

    const createPacket = (n1, n2) => {
      if (Math.random() < 0.003) {
        packets.push({
          n1,
          n2,
          progress: 0,
          speed: 0.006 + Math.random() * 0.008,
          colorIndex: n1.colorIndex,
        });
      }
    };

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      if (rawMouse.active) {
        if (!smoothMouse.active || smoothMouse.x < 0) {
          smoothMouse.x = rawMouse.x;
          smoothMouse.y = rawMouse.y;
          smoothMouse.active = true;
        } else {
          smoothMouse.x += (rawMouse.x - smoothMouse.x) * 0.05;
          smoothMouse.y += (rawMouse.y - smoothMouse.y) * 0.05;
        }
      } else {
        smoothMouse.active = false;
      }

      const mouseAttractRadius = 200;
      const minRepulsionDist = 65;

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // 1. Mouse Attraction
        let isAttracted = false;
        if (smoothMouse.active) {
          const dxMouse = smoothMouse.x - n1.x;
          const dyMouse = smoothMouse.y - n1.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouseAttractRadius && distMouse > 15) {
            isAttracted = true;
            const force = (mouseAttractRadius - distMouse) / mouseAttractRadius;
            const accel = force * 0.04;
            n1.vx += (dxMouse / distMouse) * accel;
            n1.vy += (dyMouse / distMouse) * accel;

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(smoothMouse.x, smoothMouse.y);
            ctx.strokeStyle = palette.mouseLine;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
        }

        // 2. Slow Organic Random Wander
        n1.wanderAngle += (Math.random() - 0.5) * 0.04;
        const wanderX = Math.cos(n1.wanderAngle) * 0.02;
        const wanderY = Math.sin(n1.wanderAngle) * 0.02;
        n1.vx += wanderX;
        n1.vy += wanderY;

        // 3. Inter-Node Repulsion & Link Connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < minRepulsionDist && dist > 0.1) {
            const repulseForce = ((minRepulsionDist - dist) / minRepulsionDist) * 0.05;
            const pushX = (dx / dist) * repulseForce;
            const pushY = (dy / dist) * repulseForce;

            n1.vx -= pushX;
            n1.vy -= pushY;
            n2.vx += pushX;
            n2.vy += pushY;
          }

          if (dist < maxLinkDistance) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = palette.lines;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            createPacket(n1, n2);
          }
        }

        // Friction
        n1.vx *= 0.96;
        n1.vy *= 0.96;

        // Speed bounds
        const speed = Math.sqrt(n1.vx * n1.vx + n1.vy * n1.vy);
        if (speed < 0.15 && !isAttracted) {
          n1.vx += (Math.random() - 0.5) * 0.08;
          n1.vy += (Math.random() - 0.5) * 0.08;
        } else if (speed > 0.75) {
          n1.vx = (n1.vx / speed) * 0.75;
          n1.vy = (n1.vy / speed) * 0.75;
        }

        n1.x += n1.vx;
        n1.y += n1.vy;

        // Edge Bounce
        if (n1.x < 10) { n1.x = 10; n1.vx = Math.abs(n1.vx); n1.wanderAngle = Math.PI - n1.wanderAngle; }
        if (n1.x > width - 10) { n1.x = width - 10; n1.vx = -Math.abs(n1.vx); n1.wanderAngle = Math.PI - n1.wanderAngle; }
        if (n1.y < 10) { n1.y = 10; n1.vy = Math.abs(n1.vy); n1.wanderAngle = -n1.wanderAngle; }
        if (n1.y > height - 10) { n1.y = height - 10; n1.vy = -Math.abs(n1.vy); n1.wanderAngle = -n1.wanderAngle; }
      }

      // Draw Packets
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        const dx = pkt.n2.x - pkt.n1.x;
        const dy = pkt.n2.y - pkt.n1.y;
        const currentDist = Math.sqrt(dx * dx + dy * dy);

        if (currentDist >= maxLinkDistance) {
          packets.splice(p, 1);
          continue;
        }

        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const px = pkt.n1.x + dx * pkt.progress;
        const py = pkt.n1.y + dy * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = palette.nodes[pkt.colorIndex] || palette.packet;
        ctx.fill();
      }

      // Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time + n.pulseOffset) * 0.8;
        const r = Math.max(2, n.baseRadius + pulse);
        const nodeColor = palette.nodes[n.colorIndex] || palette.nodes[0];

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.globalAlpha = 0.15;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }

      // Draw Mouse Indicator
      if (smoothMouse.active) {
        ctx.beginPath();
        ctx.arc(smoothMouse.x, smoothMouse.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = palette.nodes[0];
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30 transition-opacity duration-300"
    />
  );
});

export default NetworkCanvas;
