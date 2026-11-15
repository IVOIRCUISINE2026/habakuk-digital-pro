import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Eye,
  ShoppingCart,
  Film,
  CheckCircle2,
} from 'lucide-react';
import { ApplicationItem, AppVideoOverview, VideoScene } from '../types';

interface AppVideoModalProps {
  app: ApplicationItem | null;
  onClose: () => void;
  onOpenDemo: (app: ApplicationItem) => void;
  onOrder: (app: ApplicationItem) => void;
}

function formatSeconds(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

function buildFallbackVideoOverview(app: ApplicationItem): AppVideoOverview {
  const feats = app.features || [];
  return {
    durationSec: 40,
    headline: app.name,
    narrationScript: `${app.name} : ${app.description}`,
    scenes: [
      {
        badge: '01 · PRÉSENTATION',
        title: app.name,
        caption: app.description,
        highlight: app.category,
        startSec: 0,
        endSec: 10,
      },
      {
        badge: '02 · FONCTIONNALITÉS',
        title: 'Points clés inclus',
        caption: feats.slice(0, 2).join(' · ') || app.description,
        highlight: feats[0] || 'Solution prête à l’emploi',
        startSec: 10,
        endSec: 20,
      },
      {
        badge: '03 · VALEUR AJOUTÉE',
        title: 'Conçu pour votre performance',
        caption: feats.slice(2).join(' · ') || 'Interface claire, rapide et adaptée au marché ivoirien.',
        highlight: 'Ergonomie mobile & ordinateur',
        startSec: 20,
        endSec: 30,
      },
      {
        badge: '04 · DÉPLOIEMENT',
        title: 'Disponible sur commande',
        caption: 'Commandez ou personnalisez cette solution avec Univers Habakuk Digital Pro.',
        highlight: 'Accompagnement par Ahoret Jean Cyrille',
        startSec: 30,
        endSec: 40,
      },
    ],
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export const AppVideoModal: React.FC<AppVideoModalProps> = ({
  app,
  onClose,
  onOpenDemo,
  onOrder,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageReady, setImageReady] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const lastSpokenSceneIndexRef = useRef<number>(-1);
  const currentTimeRef = useRef<number>(0);

  const overview = useMemo<AppVideoOverview | null>(() => {
    if (!app) return null;
    return app.videoOverview || buildFallbackVideoOverview(app);
  }, [app]);

  const activeSceneIndex = useMemo(() => {
    if (!overview) return 0;
    const idx = overview.scenes.findIndex(
      (s) => currentTime >= s.startSec && currentTime < s.endSec
    );
    if (idx !== -1) return idx;
    return currentTime >= overview.durationSec ? overview.scenes.length - 1 : 0;
  }, [overview, currentTime]);

  const activeScene: VideoScene | null = overview
    ? overview.scenes[activeSceneIndex] || overview.scenes[0]
    : null;

  // Stop speech synthesis helper
  const stopSpeech = () => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Ignore speech errors
    }
  };

  // Speak a given scene in French when audio is active
  const speakScene = (scene: VideoScene, isFirstScene: boolean) => {
    if (!voiceEnabled || !app) return;
    try {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const prefix = isFirstScene ? `${app.name}. ` : '';
      const utterance = new SpeechSynthesisUtterance(
        `${prefix}${scene.title}. ${scene.caption}`
      );
      utterance.lang = 'fr-FR';
      utterance.rate = 1.04;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const frVoice = voices.find((v) => v.lang.toLowerCase().startsWith('fr'));
      if (frVoice) {
        utterance.voice = frVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis availability issues
    }
  };

  // Reset state & preload app image whenever app changes
  useEffect(() => {
    stopSpeech();
    lastSpokenSceneIndexRef.current = -1;
    currentTimeRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(Boolean(app));
    setImageReady(false);
    imageRef.current = null;

    if (!app?.image_url) return;

    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      setImageReady(true);
    };
    img.onerror = () => {
      imageRef.current = null;
      setImageReady(false);
    };
    img.src = app.image_url;

    return () => {
      stopSpeech();
    };
  }, [app]);

  // Trigger voiceover when scene changes while playing
  useEffect(() => {
    if (!app || !activeScene) return;
    if (!isPlaying || !voiceEnabled) {
      stopSpeech();
      return;
    }

    if (lastSpokenSceneIndexRef.current !== activeSceneIndex) {
      lastSpokenSceneIndexRef.current = activeSceneIndex;
      speakScene(activeScene, activeSceneIndex === 0);
    }
  }, [app, activeSceneIndex, activeScene, isPlaying, voiceEnabled]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Animation playback timer
  useEffect(() => {
    if (!app || !overview || !isPlaying) return;

    let rafId = 0;
    let lastTs = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastTs) / 1000);
      lastTs = now;

      const next = currentTimeRef.current + dt;
      if (next >= overview.durationSec) {
        currentTimeRef.current = overview.durationSec;
        setCurrentTime(overview.durationSec);
        setIsPlaying(false);
        return;
      }

      currentTimeRef.current = next;
      setCurrentTime(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [app, overview, isPlaying]);

  // Render canvas video frame whenever currentTime or imageReady updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !app || !overview || !activeScene) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 960;
    const H = 540;
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }

    const totalProgress = Math.min(1, Math.max(0, currentTime / overview.durationSec));
    const sceneDuration = Math.max(0.5, activeScene.endSec - activeScene.startSec);
    const sceneProgress = Math.min(
      1,
      Math.max(0, (currentTime - activeScene.startSec) / sceneDuration)
    );
    const enterEase = Math.min(1, Math.max(0, (currentTime - activeScene.startSec) / 0.65));
    const easedEnter = 1 - Math.pow(1 - enterEase, 3);

    // 1. Studio dark emerald gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#091E14');
    bgGrad.addColorStop(0.55, '#103021');
    bgGrad.addColorStop(1, '#0A2217');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Subtle animated ambient radial glow
    const glowX = 680 + Math.sin(totalProgress * Math.PI * 2) * 30;
    const glowY = 270 + Math.cos(totalProgress * Math.PI * 2) * 20;
    const glow = ctx.createRadialGradient(glowX, glowY, 30, glowX, glowY, 320);
    glow.addColorStop(0, 'rgba(22, 132, 71, 0.34)');
    glow.addColorStop(1, 'rgba(22, 132, 71, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // 3. Subtle architectural grid pattern
    ctx.strokeStyle = 'rgba(201, 240, 213, 0.05)';
    ctx.lineWidth = 1;
    for (let gx = 48; gx < W; gx += 48) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, H);
      ctx.stroke();
    }
    for (let gy = 48; gy < H; gy += 48) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(W, gy);
      ctx.stroke();
    }

    // 4. Top header bar inside video frame
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    drawRoundedRect(ctx, 36, 26, 270, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#4ADE80';
    ctx.beginPath();
    ctx.arc(54, 42, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E8F5EC';
    ctx.font = '700 12px Inter, system-ui, sans-serif';
    ctx.fillText('UNIVERS HABAKUK · VIDÉO EXPLICATIVE', 67, 46);

    // App ID + Timer pill top right
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    drawRoundedRect(ctx, W - 208, 26, 172, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#C9F0D5';
    ctx.font = '700 12px monospace';
    ctx.fillText(
      `${app.id} · ${formatSeconds(currentTime)}/${formatSeconds(overview.durationSec)}`,
      W - 194,
      46
    );

    // 5. Right Showcase Card (Official App Image with Ken Burns zoom)
    const cardX = 556;
    const cardY = 86;
    const cardW = 368;
    const cardH = 382;

    ctx.save();
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 22);
    ctx.fillStyle = '#133625';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.35)';
    ctx.stroke();
    ctx.clip();

    const img = imageRef.current;
    if (imageReady && img && img.naturalWidth > 0) {
      const zoom = 1.0 + 0.08 * ((sceneProgress + activeSceneIndex * 0.25) % 1);
      const panY = Math.sin(totalProgress * Math.PI * 2) * 8;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const boxRatio = cardW / cardH;

      let drawW = cardW;
      let drawH = cardH;
      if (imgRatio > boxRatio) {
        drawH = cardH * zoom;
        drawW = drawH * imgRatio;
      } else {
        drawW = cardW * zoom;
        drawH = drawW / imgRatio;
      }

      const drawX = cardX + (cardW - drawW) / 2;
      const drawY = cardY + (cardH - drawH) / 2 + panY;
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Subtle bottom dark gradient overlay for legibility
      const imgOverlay = ctx.createLinearGradient(0, cardY + cardH - 110, 0, cardY + cardH);
      imgOverlay.addColorStop(0, 'rgba(9, 30, 20, 0)');
      imgOverlay.addColorStop(1, 'rgba(9, 30, 20, 0.88)');
      ctx.fillStyle = imgOverlay;
      ctx.fillRect(cardX, cardY + cardH - 110, cardW, 110);
    } else {
      // Clean fallback poster
      ctx.fillStyle = '#168447';
      ctx.font = '800 32px Inter, system-ui, sans-serif';
      ctx.fillText(app.id, cardX + 28, cardY + 180);
    }

    // Caption bar inside bottom of right showcase card
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 15px Inter, system-ui, sans-serif';
    ctx.fillText(app.name, cardX + 18, cardY + cardH - 36);
    ctx.fillStyle = '#86EFAC';
    ctx.font = '600 12px Inter, system-ui, sans-serif';
    ctx.fillText(app.category, cardX + 18, cardY + cardH - 16);
    ctx.restore();

    // 6. Left Animated Kinetic Content
    ctx.save();
    const slideOffset = (1 - easedEnter) * 18;
    ctx.globalAlpha = Math.max(0.1, easedEnter);

    const contentX = 40;
    const contentMaxW = 480;

    // Scene step badge
    ctx.fillStyle = '#168447';
    drawRoundedRect(ctx, contentX, 94 + slideOffset, 210, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 12px Inter, system-ui, sans-serif';
    ctx.fillText(activeScene.badge, contentX + 14, 112 + slideOffset);

    // App Name small subtitle
    ctx.fillStyle = '#86EFAC';
    ctx.font = '600 13px Inter, system-ui, sans-serif';
    ctx.fillText(overview.headline, contentX, 148 + slideOffset);

    // Scene Title (wrapped)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 30px Inter, system-ui, sans-serif';
    const titleLines = wrapTextLines(ctx, activeScene.title, contentMaxW).slice(0, 3);
    let cursorY = 188 + slideOffset;
    for (const line of titleLines) {
      ctx.fillText(line, contentX, cursorY);
      cursorY += 36;
    }

    // Scene Caption (wrapped)
    cursorY += 10;
    ctx.fillStyle = '#DCE9E0';
    ctx.font = '400 18px Inter, system-ui, sans-serif';
    const captionLines = wrapTextLines(ctx, activeScene.caption, contentMaxW).slice(0, 4);
    for (const line of captionLines) {
      ctx.fillText(line, contentX, cursorY);
      cursorY += 27;
    }

    // Highlight Box
    const boxY = Math.max(cursorY + 18, 396 + slideOffset);
    ctx.fillStyle = 'rgba(22, 132, 71, 0.25)';
    drawRoundedRect(ctx, contentX, boxY, contentMaxW, 46, 12);
    ctx.fill();
    ctx.fillStyle = '#4ADE80';
    drawRoundedRect(ctx, contentX, boxY, 6, 46, 3);
    ctx.fill();
    ctx.fillStyle = '#ECFDF5';
    ctx.font = '600 14px Inter, system-ui, sans-serif';
    ctx.fillText(`✓  ${activeScene.highlight}`, contentX + 20, boxY + 28);

    ctx.restore();

    // 7. Bottom Scene Progress Dots & Video Progress Bar
    const barY = H - 24;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    drawRoundedRect(ctx, 36, barY, W - 72, 6, 3);
    ctx.fill();

    ctx.fillStyle = '#4ADE80';
    drawRoundedRect(
      ctx,
      36,
      barY,
      Math.max(8, (W - 72) * totalProgress),
      6,
      3
    );
    ctx.fill();
  }, [app, overview, activeScene, activeSceneIndex, currentTime, imageReady]);

  if (!app || !overview || !activeScene) return null;

  const handleTogglePlay = () => {
    if (currentTime >= overview.durationSec) {
      currentTimeRef.current = 0;
      setCurrentTime(0);
      lastSpokenSceneIndexRef.current = -1;
      setIsPlaying(true);
      return;
    }
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      lastSpokenSceneIndexRef.current = -1;
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    stopSpeech();
    lastSpokenSceneIndexRef.current = -1;
    currentTimeRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (newSec: number) => {
    const clamped = Math.max(0, Math.min(overview.durationSec, newSec));
    stopSpeech();
    lastSpokenSceneIndexRef.current = -1;
    currentTimeRef.current = clamped;
    setCurrentTime(clamped);
  };

  const handleToggleVoice = () => {
    if (voiceEnabled) {
      stopSpeech();
      setVoiceEnabled(false);
    } else {
      lastSpokenSceneIndexRef.current = -1;
      setVoiceEnabled(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#173528]/80 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#DCE9E0] overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#F7FBF8] border-b border-[#DCE9E0]">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-[#E8F5EC] text-[#0B5D32]">
                <Film className="w-3 h-3 text-[#168447]" />
                <span>Aperçu vidéo · {app.id}</span>
              </span>
              <span className="hidden sm:inline text-xs text-[#64756B]">
                {app.category}
              </span>
            </div>
            <h3 className="font-heading text-base sm:text-xl font-bold text-[#173528] mt-1 truncate">
              {app.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => {
              stopSpeech();
              onClose();
            }}
            className="p-2 rounded-xl text-[#64756B] hover:text-[#173528] hover:bg-[#E8F5EC] transition-colors cursor-pointer shrink-0"
            aria-label="Fermer la vidéo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Video & Controls Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* 16:9 Canvas Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-[#091E14] border border-[#173528] shadow-lg">
            <canvas
              ref={canvasRef}
              onClick={handleTogglePlay}
              className="w-full aspect-video block cursor-pointer"
            />

            {/* Center Replay/Play overlay when paused or ended */}
            {!isPlaying && (
              <button
                type="button"
                onClick={handleTogglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors cursor-pointer"
                aria-label={currentTime >= overview.durationSec ? 'Revoir la vidéo' : 'Lire la vidéo'}
              >
                <div className="w-16 h-16 rounded-full bg-[#168447] hover:bg-[#0B5D32] text-white flex items-center justify-center shadow-xl border-2 border-white/80 transition-transform hover:scale-105">
                  {currentTime >= overview.durationSec ? (
                    <RotateCcw className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 ml-0.5" />
                  )}
                </div>
              </button>
            )}
          </div>

          {/* Interactive Video Control Bar */}
          <div className="p-3.5 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="px-3.5 py-2 rounded-lg bg-[#168447] hover:bg-[#0B5D32] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>{currentTime >= overview.durationSec ? 'Revoir' : 'Lire'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-3 py-2 rounded-lg bg-white hover:bg-[#E8F5EC] border border-[#DCE9E0] text-[#173528] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reprendre depuis le début"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#168447]" />
                  <span className="hidden sm:inline">Recommencer</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-code font-bold text-[#0B5D32] tabular-nums">
                  {formatSeconds(currentTime)} / {formatSeconds(overview.durationSec)}
                </span>

                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    voiceEnabled
                      ? 'bg-[#E8F5EC] border-[#C9F0D5] text-[#0B5D32]'
                      : 'bg-white border-[#DCE9E0] text-[#64756B]'
                  }`}
                  title="Activer ou couper la narration vocale en français"
                >
                  {voiceEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#168447]" />
                      <span>Voix FR</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Muet</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Seek Timeline Slider */}
            <input
              type="range"
              min={0}
              max={overview.durationSec}
              step={0.1}
              value={currentTime}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              aria-label="Progression de la vidéo"
              className="w-full accent-[#168447] cursor-pointer"
            />

            {/* Clickable 4-Chapter Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {overview.scenes.map((scene, idx) => {
                const isCurrent = idx === activeSceneIndex;
                return (
                  <button
                    key={scene.badge}
                    type="button"
                    onClick={() => {
                      handleSeek(scene.startSec + 0.05);
                      setIsPlaying(true);
                    }}
                    className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#E8F5EC] border-[#168447] shadow-2xs'
                        : 'bg-white border-[#DCE9E0] hover:border-[#168447]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={`text-[10px] font-bold uppercase tracking-wide truncate ${
                          isCurrent ? 'text-[#0B5D32]' : 'text-[#64756B]'
                        }`}
                      >
                        {scene.badge}
                      </p>
                      <span className="text-[10px] font-mono-code text-[#64756B] shrink-0">
                        {Math.round(scene.endSec - scene.startSec)}s
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#173528] truncate mt-0.5">
                      {scene.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Synchronized Subtitle / Explanation Summary */}
          <div className="p-4 rounded-xl bg-white border border-[#DCE9E0] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#168447] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#173528] leading-relaxed">
              <span className="font-bold text-[#0B5D32]">{activeScene.title} : </span>
              <span className="text-[#64756B]">{activeScene.caption}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 bg-[#F7FBF8] border-t border-[#DCE9E0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              onOpenDemo(app);
            }}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#173528] bg-white hover:bg-[#E8F5EC] border border-[#DCE9E0] hover:border-[#168447] rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#168447]" />
            <span>Passer à l’aperçu démo interactif</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopSpeech();
              onClose();
              onOrder(app);
            }}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Commander cette application</span>
          </button>
        </div>
      </div>
    </div>
  );
};
