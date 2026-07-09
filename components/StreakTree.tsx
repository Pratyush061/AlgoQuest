import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { TreeType } from '../types';

interface StreakTreeProps {
  realStreak: number;
  visualGrowth: number;
  type?: TreeType;
}

/**
 * Ultra-Detailed 180-Day Tree Evolution with 12 Major Stages:
 * 
 * Stage 1 (0-5): The Seed - Dormant potential with subtle pulse
 * Stage 2 (6-10): Germination - Root emergence below soil
 * Stage 3 (11-20): Sprout - First shoot breaks through with cotyledons
 * Stage 4 (21-35): Seedling - Primary stem with true leaves forming
 * Stage 5 (36-50): Young Sapling - Trunk thickens, first branch buds
 * Stage 6 (51-70): Branching - Major branch network establishes
 * Stage 7 (71-90): Canopy Formation - Dense foliage begins to merge
 * Stage 8 (91-110): Mature Foliage - Full canopy with layered depth
 * Stage 9 (111-130): Pre-Bloom - Flower buds appear throughout
 * Stage 10 (131-150): Full Bloom - Spectacular flowering display
 * Stage 11 (151-170): Fruit Development - Fruits grow and ripen
 * Stage 12 (171-180): Peak Maturity - Abundant harvest ready
 * Stage 13 (180+): Ancient Legend - Mythical glowing arbiter
 */

const StreakTree: React.FC<StreakTreeProps> = ({ realStreak, visualGrowth, type = 'Apple' }) => {
  const isBanana = type === 'Banana';
  const progress = Math.min(1, visualGrowth / 180);

  // Enhanced wind physics with multiple movement layers
  const windSway = useSpring({
    from: { transform: 'rotate(-2.5deg) skewX(-1deg)' },
    to: { transform: 'rotate(2.5deg) skewX(1deg)' },
    config: { duration: 6000, tension: 6, friction: 22 },
    loop: { reverse: true },
  });

  // Gentle breathing for living feel
  const breathe = useSpring({
    from: { scale: 0.97 },
    to: { scale: 1.03 },
    config: { duration: 4000, tension: 8, friction: 25 },
    loop: { reverse: true },
  });

  // Subtle rotation for organic movement
  const leafSway = useSpring({
    from: { rotate: -3 },
    to: { rotate: 3 },
    config: { duration: 3000, tension: 10, friction: 20 },
    loop: { reverse: true },
  });

  // Master growth animation with ultra-smooth curves
  const growth = useSpring({
    // Trunk height - 12 stage progression
    trunkH: 
      visualGrowth < 6 ? 0 :
      visualGrowth < 11 ? 2 + (visualGrowth - 6) * 0.6 : // Germination
      visualGrowth < 21 ? 5 + (visualGrowth - 11) * 1.5 : // Sprout
      visualGrowth < 36 ? 20 + (visualGrowth - 21) * 2.0 : // Seedling
      visualGrowth < 51 ? 50 + (visualGrowth - 36) * 2.0 : // Young sapling
      visualGrowth < 71 ? 80 + (visualGrowth - 51) * 1.5 : // Branching
      visualGrowth < 91 ? 110 + (visualGrowth - 71) * 1.0 : // Canopy formation
      visualGrowth < 111 ? 130 + (visualGrowth - 91) * 0.75 : // Mature foliage
      145,
    
    // Trunk width - progressive thickening
    trunkW: 
      visualGrowth < 6 ? 0 :
      visualGrowth < 11 ? 1.5 :
      visualGrowth < 21 ? 2 + (visualGrowth - 11) * 0.1 :
      visualGrowth < 36 ? 3 + (visualGrowth - 21) * 0.2 :
      visualGrowth < 51 ? 6 + (visualGrowth - 36) * 0.27 :
      visualGrowth < 71 ? 10 + (visualGrowth - 51) * 0.4 :
      visualGrowth < 91 ? 18 + (visualGrowth - 71) * 0.5 :
      visualGrowth < 111 ? 28 + (visualGrowth - 91) * 0.2 :
      32,
    
    // Root system (visible at early stages)
    rootOpacity: 
      visualGrowth < 6 ? 0 :
      visualGrowth < 11 ? (visualGrowth - 6) / 5 :
      visualGrowth < 21 ? 1 - ((visualGrowth - 11) / 10) * 0.7 :
      0.3,
    
    rootScale:
      visualGrowth < 11 ? 0.5 + (visualGrowth - 6) * 0.1 :
      1,
    
    // Foliage development - multi-stage
    foliageScale: 
      visualGrowth < 36 ? 0 :
      visualGrowth < 51 ? (visualGrowth - 36) * 0.01 : // Tiny leaf buds
      visualGrowth < 71 ? 0.15 + (visualGrowth - 51) * 0.025 : // Small clusters
      visualGrowth < 91 ? 0.65 + (visualGrowth - 71) * 0.015 : // Dense growth
      visualGrowth < 111 ? 0.95 + (visualGrowth - 91) * 0.0125 : // Full canopy
      1.2,
    
    foliageOpacity: 
      visualGrowth < 36 ? 0 :
      visualGrowth < 51 ? (visualGrowth - 36) / 15 :
      1,
    
    // Layer-specific foliage for depth
    foliageLayer1Opacity: visualGrowth < 51 ? 0 : Math.min(1, (visualGrowth - 51) / 10),
    foliageLayer2Opacity: visualGrowth < 61 ? 0 : Math.min(1, (visualGrowth - 61) / 10),
    foliageLayer3Opacity: visualGrowth < 71 ? 0 : Math.min(1, (visualGrowth - 71) / 10),
    foliageLayer4Opacity: visualGrowth < 81 ? 0 : Math.min(1, (visualGrowth - 81) / 10),
    foliageLayer5Opacity: visualGrowth < 91 ? 0 : Math.min(1, (visualGrowth - 91) / 10),
    
    // Progressive branching system
    branchOpacity1: visualGrowth < 36 ? 0 : Math.min(1, (visualGrowth - 36) / 8),
    branchOpacity2: visualGrowth < 44 ? 0 : Math.min(1, (visualGrowth - 44) / 8),
    branchOpacity3: visualGrowth < 51 ? 0 : Math.min(1, (visualGrowth - 51) / 8),
    branchOpacity4: visualGrowth < 58 ? 0 : Math.min(1, (visualGrowth - 58) / 8),
    branchOpacity5: visualGrowth < 65 ? 0 : Math.min(1, (visualGrowth - 65) / 8),
    branchOpacity6: visualGrowth < 71 ? 0 : Math.min(1, (visualGrowth - 71) / 8),
    
    // Flower buds (pre-bloom stage)
    budOpacity: visualGrowth < 111 ? 0 : Math.min(1, (visualGrowth - 111) / 10),
    budScale: visualGrowth < 111 ? 0 : Math.min(1, (visualGrowth - 111) / 10),
    
    // Full blossoms
    bloomScale: visualGrowth < 131 ? 0 : visualGrowth < 145 ? (visualGrowth - 131) / 14 : 1,
    bloomOpacity: visualGrowth < 131 ? 0 : visualGrowth < 145 ? (visualGrowth - 131) / 14 : 1,
    
    // Fruit development stages
    fruitBudOpacity: visualGrowth < 145 ? 0 : Math.min(1, (visualGrowth - 145) / 6), // Tiny fruits
    fruitGrowthScale: visualGrowth < 151 ? 0 : Math.min(1, (visualGrowth - 151) / 10), // Growing
    fruitMatureScale: visualGrowth < 161 ? 0 : Math.min(1, (visualGrowth - 161) / 10), // Mature
    fruitOpacity: visualGrowth < 151 ? 0 : Math.min(1, (visualGrowth - 151) / 10),
    
    // Legendary effects
    glow: visualGrowth >= 180 ? 1 : visualGrowth >= 171 ? (visualGrowth - 171) / 9 : 0,
    particleOpacity: visualGrowth >= 180 ? 1 : 0,
    
    // Seed stage
    seedScale: visualGrowth < 6 ? 1 : visualGrowth < 11 ? 1 - ((visualGrowth - 6) / 5) * 0.7 : 0.3,
    seedOpacity: visualGrowth < 11 ? 1 : 0,
    
    config: config.molasses,
  });

  // Species-specific metadata
  const meta = {
    Apple: { 
      leaf: '#22c55e', 
      leafLight: '#86efac',
      dark: '#15803d', 
      darkest: '#14532d',
      fruit: '#ef4444',
      fruitHighlight: '#fca5a5',
      blossom: '#fecdd3', 
      blossomCenter: '#fda4af',
      budColor: '#fb7185'
    },
    Orange: { 
      leaf: '#4ade80', 
      leafLight: '#bbf7d0',
      dark: '#166534', 
      darkest: '#14532d',
      fruit: '#f97316',
      fruitHighlight: '#fdba74',
      blossom: '#ffffff', 
      blossomCenter: '#fed7aa',
      budColor: '#fde68a'
    },
    Mango: { 
      leaf: '#16a34a', 
      leafLight: '#86efac',
      dark: '#064e3b', 
      darkest: '#022c22',
      fruit: '#facc15',
      fruitHighlight: '#fef08a',
      blossom: '#fef3c7', 
      blossomCenter: '#fde68a',
      budColor: '#fde047'
    },
    Banana: { 
      leaf: '#a3e635', 
      leafLight: '#d9f99d',
      dark: '#3f6212', 
      darkest: '#1a2e05',
      fruit: '#fbbf24',
      fruitHighlight: '#fde68a',
      blossom: '#fef9c3', 
      blossomCenter: '#fef08a',
      budColor: '#fde047'
    },
  }[type] || { 
    leaf: '#22c55e', 
    leafLight: '#86efac',
    dark: '#15803d', 
    darkest: '#14532d',
    fruit: '#ef4444',
    fruitHighlight: '#fca5a5',
    blossom: '#fecdd3', 
    blossomCenter: '#fda4af',
    budColor: '#fb7185'
  };

  const getDetailedStatus = () => {
    if (visualGrowth <= 5) return "Dormant seed awaiting germination";
    if (visualGrowth <= 10) return "Roots awakening beneath the soil";
    if (visualGrowth <= 20) return "First sprout breaking through";
    if (visualGrowth <= 35) return "Seedling establishing foundation";
    if (visualGrowth <= 50) return "Young sapling gaining strength";
    if (visualGrowth <= 70) return "Branches reaching toward the sky";
    if (visualGrowth <= 90) return "Canopy forming a green crown";
    if (visualGrowth <= 110) return "Mature foliage in full glory";
    if (visualGrowth <= 130) return "Flower buds preparing to bloom";
    if (visualGrowth <= 150) return "Blossoms painting the branches";
    if (visualGrowth <= 170) return "Fruits ripening with wisdom";
    if (visualGrowth <= 179) return "Abundant harvest awaiting";
    return "Transcended into eternal legend";
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl transition-all hover:shadow-indigo-500/10 h-full group relative overflow-hidden">
      {/* Enhanced background ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50/40 dark:bg-emerald-950/10 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none"></div>
      
      <div className="relative w-full aspect-square max-w-[340px] flex items-end justify-center">
        {/* Legendary aura */}
        {visualGrowth >= 180 && (
          <>
            <div className="absolute inset-0 bg-amber-400/10 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-orange-400/5 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </>
        )}

        {/* Glow effect for mature trees */}
        {visualGrowth >= 150 && (
          <animated.div 
            className="absolute inset-0 bg-green-400/5 blur-[80px] rounded-full"
            style={{ opacity: growth.glow.to(g => g * 0.3) }}
          ></animated.div>
        )}

        <animated.svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 280 320" 
          className="drop-shadow-2xl overflow-visible"
          style={windSway}
        >
          <defs>
            {/* Enhanced gradients */}
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="25%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="75%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#3f1a01" />
            </linearGradient>
            
            <linearGradient id="trunkHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="40%" stopColor="#b45309" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <radialGradient id="leafGrad1">
              <stop offset="0%" stopColor={meta.leafLight} stopOpacity="0.9" />
              <stop offset="50%" stopColor={meta.leaf} />
              <stop offset="100%" stopColor={meta.dark} />
            </radialGradient>

            <radialGradient id="leafGrad2">
              <stop offset="0%" stopColor={meta.leaf} stopOpacity="0.95" />
              <stop offset="60%" stopColor={meta.leaf} />
              <stop offset="100%" stopColor={meta.dark} />
            </radialGradient>

            <radialGradient id="leafGradDark">
              <stop offset="0%" stopColor={meta.dark} stopOpacity="0.5" />
              <stop offset="100%" stopColor={meta.darkest} stopOpacity="0.95" />
            </radialGradient>

            <radialGradient id="fruitGrad">
              <stop offset="0%" stopColor={meta.fruitHighlight} />
              <stop offset="60%" stopColor={meta.fruit} />
              <stop offset="100%" stopColor={meta.fruit} stopOpacity="0.9" />
            </radialGradient>

            {/* Banana-specific gradients */}
            <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="bananaLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d9f99d" />
              <stop offset="50%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#65a30d" />
            </linearGradient>

            {/* Filters */}
            <filter id="organic-growth">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            
            <filter id="soft-glow">
              <feGaussianBlur stdDeviation="3.5" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="fruit-shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
              <feOffset dx="0" dy="2" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.4"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="leaf-detail">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          {/* Enhanced soil base */}
          <g transform="translate(140, 290)">
            <ellipse cx="0" cy="10" rx="100" ry="20" fill="#e2e8f0" className="dark:fill-slate-800" opacity="0.25" />
            <ellipse cx="0" cy="8" rx="95" ry="18" fill="#cbd5e1" className="dark:fill-slate-700" opacity="0.35" />
            <ellipse cx="0" cy="6" rx="90" ry="16" fill="#94a3b8" className="dark:fill-slate-600" opacity="0.4" />
            <path d="M-75,0 Q0,14 75,0 L65,22 Q0,36 -65,22 Z" fill="#78350f" className="dark:fill-amber-950" opacity="0.95" />
            <path d="M-70,4 Q0,16 70,4 L60,20 Q0,32 -60,20 Z" fill="#92400e" className="dark:fill-amber-900" opacity="0.7" />
          </g>
          
          {/* Root system (visible early stages) */}
          <animated.g 
            transform="translate(140, 285)"
            opacity={growth.rootOpacity}
          >
            <animated.g transform={growth.rootScale.to(s => `scale(${s})`)}>
              <path d="M0,0 Q-15,10 -25,25 Q-30,35 -40,45" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M0,0 Q15,10 25,25 Q30,35 40,45" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
              <path d="M0,0 Q-8,12 -12,30" stroke="#92400e" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M0,0 Q8,12 12,30" stroke="#92400e" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
              
              {/* Fine root hairs */}
              <g opacity="0.3" stroke="#a16207" strokeWidth="0.8" fill="none">
                <path d="M-40,45 Q-45,50 -48,58" />
                <path d="M-40,45 Q-42,52 -38,60" />
                <path d="M40,45 Q45,50 48,58" />
                <path d="M40,45 Q42,52 38,60" />
              </g>
            </animated.g>
          </animated.g>
          
          {/* Seed stage with pulse */}
          <animated.g 
            transform="translate(140, 285)"
            opacity={growth.seedOpacity}
          >
            <animated.ellipse 
              cx="0" 
              cy="0" 
              rx={growth.seedScale.to(s => 5 * s)} 
              ry={growth.seedScale.to(s => 7 * s)} 
              fill="#92400e"
              opacity="0.9"
            />
            <animated.ellipse 
              cx="0" 
              cy="0" 
              rx={growth.seedScale.to(s => 3 * s)} 
              ry={growth.seedScale.to(s => 5 * s)} 
              fill="#78350f"
              opacity="0.7"
            />
            {visualGrowth > 0 && visualGrowth <= 5 && (
              <circle
                cx="0"
                cy="0"
                r="10"
                fill="none"
                stroke="#22c55e"
                strokeWidth="1.5"
                opacity="0.5"
                className="animate-ping"
              />
            )}
          </animated.g>

          {/* Germination stage (6-10 days) - root breaking through */}
          {visualGrowth >= 6 && visualGrowth < 11 && (
            <g transform="translate(140, 285)">
              <animated.path
                d="M0,0 L0,-5"
                stroke="#86efac"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity={Math.min(1, (visualGrowth - 6) / 4)}
              />
            </g>
          )}

          {/* Early sprout (11-20 days) */}
          {visualGrowth >= 11 && visualGrowth < 21 && (
            <g transform="translate(140, 285)">
              <animated.path
                d="M0,0 Q-1.5,-8 -2,-15 Q-1,-18 0,-20 Q1,-18 2,-15 Q1.5,-8 0,0"
                fill="#15803d"
                opacity={Math.min(1, (visualGrowth - 11) / 5)}
              />
              <animated.ellipse
                cx="-4"
                cy="-18"
                rx="3.5"
                ry="6"
                fill="#22c55e"
                opacity={Math.min(1, (visualGrowth - 13) / 5)}
              />
              <animated.ellipse
                cx="4"
                cy="-18"
                rx="3.5"
                ry="6"
                fill="#22c55e"
                opacity={Math.min(1, (visualGrowth - 13) / 5)}
              />
            </g>
          )}
          
          {/* Main trunk - ultra smooth organic shape */}
          {visualGrowth >= 21 && (
            <animated.g>
              {/* Main trunk body */}
              <animated.path
                d={growth.trunkH.to(h => {
                  const w = growth.trunkW.get();
                  const base = 290;
                  const top = base - h;
                  const baseCurve = w * 0.3;
                  const midCurve = w * 0.18;
                  const topCurve = w * 0.12;
                  
                  return `M${140 - w/2},${base} 
                          C${140 - baseCurve},${base - h * 0.2} ${140 - baseCurve * 0.8},${base - h * 0.4} ${140 - midCurve},${base - h * 0.6}
                          C${140 - topCurve},${base - h * 0.8} ${140 - w/4},${top + 5} ${140 - w/4},${top}
                          L${140 + w/4},${top}
                          C${140 + w/4},${top + 5} ${140 + topCurve},${base - h * 0.8} ${140 + midCurve},${base - h * 0.6}
                          C${140 + baseCurve * 0.8},${base - h * 0.4} ${140 + baseCurve},${base - h * 0.2} ${140 + w/2},${base}
                          Z`;
                })}
                fill="url(#trunkGrad)"
              />
              
              {/* Trunk highlight for 3D effect */}
              <animated.path
                d={growth.trunkH.to(h => {
                  const w = growth.trunkW.get();
                  const base = 290;
                  const top = base - h;
                  return `M${140 - w/3},${base} Q${140 - w/4},${base - h/2} ${140 - w/5},${top}`;
                })}
                stroke="url(#trunkHighlight)"
                strokeWidth={growth.trunkW.to(w => w * 0.4)}
                fill="none"
                opacity="0.6"
              />
              
              {/* Bark texture details */}
              {visualGrowth >= 35 && (
                <g opacity="0.25" stroke="#3f1a01" strokeWidth="0.6" fill="none" strokeLinecap="round">
                  <animated.path d={growth.trunkH.to(h => `M${136},${290 - h * 0.25} Q${138},${290 - h * 0.28} ${137},${290 - h * 0.32}`)} />
                  <animated.path d={growth.trunkH.to(h => `M${143},${290 - h * 0.4} Q${141},${290 - h * 0.43} ${142},${290 - h * 0.47}`)} />
                  <animated.path d={growth.trunkH.to(h => `M${138},${290 - h * 0.55} Q${140},${290 - h * 0.58} ${139},${290 - h * 0.62}`)} />
                  <animated.path d={growth.trunkH.to(h => `M${144},${290 - h * 0.68} Q${142},${290 - h * 0.71} ${143},${290 - h * 0.75}`)} />
                  <animated.path d={growth.trunkH.to(h => `M${137},${290 - h * 0.82} Q${139},${290 - h * 0.85} ${138},${290 - h * 0.89}`)} />
                </g>
              )}
              
              {/* Knots and imperfections */}
              {visualGrowth >= 50 && (
                <g fill="#451a03" opacity="0.4">
                  <animated.ellipse cx="136" cy={growth.trunkH.to(h => 290 - h * 0.35)} rx="2" ry="3" />
                  <animated.ellipse cx="145" cy={growth.trunkH.to(h => 290 - h * 0.62)} rx="1.5" ry="2.5" />
                </g>
              )}
            </animated.g>
          )}

          {/* Comprehensive branch network - Only for non-banana trees */}
          {!isBanana && visualGrowth >= 36 && (
            <g stroke="#5d2e14" strokeLinecap="round" fill="none">
              {/* Primary branches - left and right major */}
              <animated.g opacity={growth.branchOpacity1}>
                <animated.path 
                  d="M140 220 Q 105 200 75 175" 
                  strokeWidth={growth.trunkW.to(w => w * 0.38)}
                />
                <animated.path 
                  d="M140 205 Q 175 185 210 160" 
                  strokeWidth={growth.trunkW.to(w => w * 0.38)}
                />
              </animated.g>
              
              {/* Secondary branches - mid-level spread */}
              <animated.g opacity={growth.branchOpacity2}>
                <animated.path 
                  d="M140 190 Q 110 175 85 155" 
                  strokeWidth={growth.trunkW.to(w => w * 0.3)}
                />
                <animated.path 
                  d="M140 180 Q 170 165 200 145" 
                  strokeWidth={growth.trunkW.to(w => w * 0.3)}
                />
              </animated.g>
              
              {/* Tertiary branches - upper canopy */}
              <animated.g opacity={growth.branchOpacity3}>
                <animated.path 
                  d="M140 165 Q 115 155 95 135" 
                  strokeWidth={growth.trunkW.to(w => w * 0.26)}
                />
                <animated.path 
                  d="M140 155 Q 165 145 190 125" 
                  strokeWidth={growth.trunkW.to(w => w * 0.26)}
                />
                <animated.path 
                  d="M140 145 L 140 100" 
                  strokeWidth={growth.trunkW.to(w => w * 0.32)}
                />
              </animated.g>
              
              {/* Fine branches - outer reach */}
              <animated.g opacity={growth.branchOpacity4}>
                <animated.path d="M75 175 Q 55 160 40 140" strokeWidth={growth.trunkW.to(w => w * 0.2)} />
                <animated.path d="M210 160 Q 230 145 245 125" strokeWidth={growth.trunkW.to(w => w * 0.2)} />
                <animated.path d="M85 155 Q 65 140 50 120" strokeWidth={growth.trunkW.to(w => w * 0.18)} />
                <animated.path d="M200 145 Q 220 130 235 110" strokeWidth={growth.trunkW.to(w => w * 0.18)} />
              </animated.g>
              
              {/* Tiny twigs - detail layer */}
              <animated.g opacity={growth.branchOpacity5}>
                <animated.path d="M95 135 Q 80 125 70 110" strokeWidth={growth.trunkW.to(w => w * 0.15)} />
                <animated.path d="M190 125 Q 205 115 215 100" strokeWidth={growth.trunkW.to(w => w * 0.15)} />
                <animated.path d="M40 140 Q 30 130 25 115" strokeWidth={growth.trunkW.to(w => w * 0.12)} />
                <animated.path d="M245 125 Q 255 115 260 100" strokeWidth={growth.trunkW.to(w => w * 0.12)} />
              </animated.g>
              
              {/* Upper crown branches */}
              <animated.g opacity={growth.branchOpacity6}>
                <animated.path d="M140 100 Q 120 85 105 70" strokeWidth={growth.trunkW.to(w => w * 0.22)} />
                <animated.path d="M140 100 Q 160 85 175 70" strokeWidth={growth.trunkW.to(w => w * 0.22)} />
                <animated.path d="M140 110 Q 125 100 115 85" strokeWidth={growth.trunkW.to(w => w * 0.18)} />
                <animated.path d="M140 110 Q 155 100 165 85" strokeWidth={growth.trunkW.to(w => w * 0.18)} />
              </animated.g>
            </g>
          )}

          {/* Multi-layered canopy system with organic blending */}
          <animated.g 
            filter="url(#organic-growth)"
            opacity={growth.foliageOpacity}
          >
            {isBanana ? (
              // Banana palm-style leaves - Beautiful large fronds
              <animated.g transform={growth.foliageScale.to(s => `translate(140, ${150 - Math.min(s * 15, 20)}) scale(${Math.min(s * 1.3, 1.3)})`)}>
                {[
                  { rot: 0, layer: 4, length: 1.1 },
                  { rot: 45, layer: 3, length: 1.0 },
                  { rot: 90, layer: 2, length: 0.95 },
                  { rot: 135, layer: 1, length: 0.9 },
                  { rot: 180, layer: 1, length: 0.85 },
                  { rot: 225, layer: 2, length: 0.9 },
                  { rot: 270, layer: 3, length: 0.95 },
                  { rot: 315, layer: 4, length: 1.0 },
                ].map((leaf, i) => (
                  <animated.g 
                    key={i} 
                    opacity={growth[`foliageLayer${leaf.layer}Opacity`]}
                  >
                    <g transform={`rotate(${leaf.rot})`}>
                      {/* Main leaf blade - much larger and more realistic */}
                      <path 
                        d={`M0,0 Q-12,-35 -20,-70 Q-25,-95 -28,-115 Q-24,-120 -18,-115 Q-16,-95 -11,-70 Q-6,-35 0,0`}
                        fill="url(#bananaLeafGrad)" 
                        filter="url(#leaf-detail)"
                        transform={`scale(${leaf.length})`}
                      />
                      {/* Second half of leaf (other side) */}
                      <path 
                        d={`M0,0 Q12,-35 20,-70 Q25,-95 28,-115 Q24,-120 18,-115 Q16,-95 11,-70 Q6,-35 0,0`}
                        fill="url(#bananaLeafGrad)" 
                        filter="url(#leaf-detail)"
                        transform={`scale(${leaf.length})`}
                        opacity="0.95"
                      />
                      {/* Central vein - stronger */}
                      <path
                        d={`M0,0 Q0,-35 0,-70 Q0,-95 0,-115`}
                        stroke={meta.dark}
                        strokeWidth="2.5"
                        fill="none"
                        opacity="0.5"
                        transform={`scale(${leaf.length})`}
                      />
                      {/* Side veins - more detailed */}
                      <g stroke={meta.dark} strokeWidth="0.8" fill="none" opacity="0.3" transform={`scale(${leaf.length})`}>
                        <path d="M-6,-35 L-15,-35" />
                        <path d="M6,-35 L15,-35" />
                        <path d="M-11,-70 L-22,-70" />
                        <path d="M11,-70 L22,-70" />
                        <path d="M-16,-95 L-27,-95" />
                        <path d="M16,-95 L27,-95" />
                      </g>
                      {/* Leaf highlights */}
                      <path
                        d={`M-2,0 Q-10,-35 -15,-70 Q-18,-95 -20,-110`}
                        stroke={meta.leafLight}
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.4"
                        transform={`scale(${leaf.length})`}
                      />
                    </g>
                  </animated.g>
                ))}
              </animated.g>
            ) : (
              // Rounded canopy with extreme depth
              <animated.g transform={growth.foliageScale.to(s => `translate(140, 125) scale(${s})`)}>
                {/* Back-most layer (darkest depth) */}
                <animated.g opacity={growth.foliageLayer1Opacity}>
                  <circle cx="-50" cy="25" r="45" fill="url(#leafGradDark)" />
                  <circle cx="55" cy="10" r="48" fill="url(#leafGradDark)" />
                  <circle cx="-10" cy="-60" r="50" fill="url(#leafGradDark)" />
                </animated.g>
                
                {/* Mid-back layer */}
                <animated.g opacity={growth.foliageLayer2Opacity}>
                  <circle cx="-60" cy="18" r="50" fill="url(#leafGrad2)" />
                  <circle cx="62" cy="-8" r="53" fill="url(#leafGrad2)" />
                  <circle cx="5" cy="-70" r="58" fill="url(#leafGrad2)" />
                  <circle cx="-35" cy="-35" r="42" fill="url(#leafGrad2)" />
                </animated.g>
                
                {/* Middle layer */}
                <animated.g opacity={growth.foliageLayer3Opacity}>
                  <circle cx="-65" cy="12" r="54" fill="url(#leafGrad1)" />
                  <circle cx="68" cy="-15" r="57" fill="url(#leafGrad1)" />
                  <circle cx="0" cy="-75" r="64" fill="url(#leafGrad1)" />
                  <circle cx="25" cy="35" r="48" fill="url(#leafGrad1)" />
                </animated.g>
                
                {/* Front-mid layer with breathing */}
                <animated.g 
                  opacity={growth.foliageLayer4Opacity}
                  style={{ transform: breathe.scale.to(s => `scale(${s})`) }}
                >
                  <circle cx="-30" cy="-45" r="52" fill="url(#leafGrad1)" />
                  <circle cx="35" cy="-30" r="50" fill="url(#leafGrad1)" />
                  <circle cx="-40" cy="5" r="46" fill="url(#leafGrad1)" />
                  <circle cx="45" cy="20" r="44" fill="url(#leafGrad1)" />
                </animated.g>
                
                {/* Front-most highlights */}
                <animated.g 
                  opacity={growth.foliageLayer5Opacity}
                  style={{ transform: breathe.scale.to(s => `scale(${s * 1.03})`) }}
                >
                  <circle cx="12" cy="-35" r="40" fill={meta.leaf} opacity="0.5" />
                  <circle cx="-18" cy="-20" r="36" fill={meta.leafLight} opacity="0.35" />
                  <circle cx="20" cy="10" r="38" fill={meta.leaf} opacity="0.4" />
                </animated.g>
              </animated.g>
            )}
          </animated.g>

          {/* Flower buds (pre-bloom) - Not for bananas */}
          {!isBanana && visualGrowth >= 111 && visualGrowth < 131 && (
            <animated.g 
              transform={growth.budScale.to(s => `translate(140, 125) scale(${s})`)}
              opacity={growth.budOpacity}
            >
              {[
                { cx: -62, cy: 20, r: 3 },
                { cx: 70, cy: -16, r: 3.5 },
                { cx: 15, cy: -76, r: 3 },
                { cx: -40, cy: -38, r: 2.5 },
                { cx: 44, cy: 26, r: 3 },
                { cx: -20, cy: -52, r: 2.5 },
                { cx: 38, cy: -8, r: 3 },
              ].map((bud, i) => (
                <circle 
                  key={i}
                  cx={bud.cx} 
                  cy={bud.cy} 
                  r={bud.r} 
                  fill={meta.budColor}
                  opacity={0.8}
                />
              ))}
            </animated.g>
          )}

          {/* Full bloom flowers with petals - Not for bananas */}
          {!isBanana && visualGrowth >= 131 && (
            <animated.g 
              transform={growth.bloomScale.to(s => `translate(140, 125) scale(${s})`)}
              opacity={growth.bloomOpacity}
              filter="url(#soft-glow)"
            >
              {[
                { cx: -62, cy: 20, r: 7, delay: 0 },
                { cx: 70, cy: -16, r: 8, delay: 2 },
                { cx: 15, cy: -76, r: 7, delay: 4 },
                { cx: -40, cy: -38, r: 6, delay: 6 },
                { cx: 44, cy: 26, r: 7, delay: 8 },
                { cx: -20, cy: -52, r: 6, delay: 5 },
                { cx: 38, cy: -8, r: 6, delay: 3 },
                { cx: -48, cy: -10, r: 5.5, delay: 7 },
                { cx: 55, cy: 8, r: 6, delay: 9 },
                { cx: 0, cy: -30, r: 5, delay: 10 },
              ].map((blossom, i) => (
                <g key={i} opacity={Math.min(1, Math.max(0, (visualGrowth - 131 - blossom.delay) / 5))}>
                  {/* Petals */}
                  {[0, 72, 144, 216, 288].map((angle, pi) => (
                    <ellipse
                      key={pi}
                      cx={blossom.cx}
                      cy={blossom.cy}
                      rx={blossom.r * 0.5}
                      ry={blossom.r * 0.7}
                      fill={meta.blossom}
                      transform={`rotate(${angle} ${blossom.cx} ${blossom.cy})`}
                    />
                  ))}
                  {/* Center */}
                  <circle 
                    cx={blossom.cx} 
                    cy={blossom.cy} 
                    r={blossom.r * 0.35} 
                    fill={meta.blossomCenter} 
                  />
                </g>
              ))}
            </animated.g>
          )}

          {/* Fruit development - progressive growth stages */}
          {visualGrowth >= 151 && (
            <animated.g 
              transform="translate(140, 125)"
              filter="url(#fruit-shadow)"
            >
              {isBanana ? (
                // Banana bunch - Beautiful realistic cluster
                <animated.g 
                  transform={growth.fruitMatureScale.to(s => `scale(${s})`)}
                  opacity={growth.fruitOpacity}
                >
                  <g transform="translate(0, -25)">
                    {/* Main stem connecting to tree - thicker and more visible */}
                    <path 
                      d="M0,-15 Q3,-10 2,-5 Q0,0 0,5" 
                      stroke="#15803d" 
                      strokeWidth="8" 
                      fill="none" 
                      strokeLinecap="round" 
                    />
                    
                    {/* Cluster center point - the crown where bananas meet */}
                    <ellipse cx="0" cy="5" rx="12" ry="14" fill="#15803d" opacity="0.8" />
                    
                    {/* Individual bananas arranged in beautiful hanging cluster */}
                    {[
                      // Top row (inner bananas)
                      { x: -8, y: 8, curve: -4, len: 30, delay: 0, width: 8 },
                      { x: 0, y: 6, curve: 0, len: 32, delay: 2, width: 9 },
                      { x: 8, y: 8, curve: 4, len: 30, delay: 4, width: 8 },
                      
                      // Middle row
                      { x: -16, y: 10, curve: -7, len: 34, delay: 1, width: 9 },
                      { x: -4, y: 8, curve: -2, len: 33, delay: 3, width: 8.5 },
                      { x: 4, y: 8, curve: 2, len: 33, delay: 5, width: 8.5 },
                      { x: 16, y: 10, curve: 7, len: 34, delay: 7, width: 9 },
                      
                      // Outer row (longer bananas)
                      { x: -24, y: 12, curve: -10, len: 36, delay: 2, width: 9 },
                      { x: -12, y: 10, curve: -5, len: 35, delay: 4, width: 8.5 },
                      { x: 12, y: 10, curve: 5, len: 35, delay: 6, width: 8.5 },
                      { x: 24, y: 12, curve: 10, len: 36, delay: 8, width: 9 },
                    ].map((banana, i) => (
                      <g key={i} opacity={Math.min(1, (visualGrowth - 151 - banana.delay) / 10)}>
                        {/* Banana body - curved and realistic */}
                        <path 
                          d={`M${banana.x},${banana.y} Q${banana.x + banana.curve * 0.8},${banana.y + banana.len * 0.4} ${banana.x + banana.curve * 1.5},${banana.y + banana.len}`}
                          stroke="url(#bananaGrad)" 
                          strokeWidth={banana.width}
                          fill="none" 
                          strokeLinecap="round"
                        />
                        {/* Banana tip (brown end) */}
                        <circle 
                          cx={banana.x + banana.curve * 1.5} 
                          cy={banana.y + banana.len} 
                          r="3" 
                          fill="#78350f" 
                          opacity="0.9" 
                        />
                        {/* Highlight on banana for 3D effect */}
                        <path 
                          d={`M${banana.x - banana.width * 0.15},${banana.y + 4} Q${banana.x + banana.curve * 0.8 - banana.width * 0.15},${banana.y + banana.len * 0.4} ${banana.x + banana.curve * 1.5 - banana.width * 0.15},${banana.y + banana.len - 4}`}
                          stroke="#fef3c7" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeLinecap="round"
                          opacity="0.5"
                        />
                        {/* Shadow side for depth */}
                        <path 
                          d={`M${banana.x + banana.width * 0.2},${banana.y + 6} Q${banana.x + banana.curve * 0.8 + banana.width * 0.2},${banana.y + banana.len * 0.4 + 2} ${banana.x + banana.curve * 1.5 + banana.width * 0.2},${banana.y + banana.len - 3}`}
                          stroke="#f59e0b" 
                          strokeWidth="1.5" 
                          fill="none" 
                          strokeLinecap="round"
                          opacity="0.4"
                        />
                      </g>
                    ))}
                  </g>
                </animated.g>
              ) : type === 'Mango' ? (
                // Hanging mangoes
                <>
                  {[
                    { cx: -66, cy: 34, rx: 14, ry: 20, rot: -15, delay: 0 },
                    { cx: 74, cy: 20, rx: 14, ry: 20, rot: 20, delay: 3 },
                    { cx: 20, cy: -36, rx: 12, ry: 17, rot: 0, delay: 6 },
                    { cx: -22, cy: -14, rx: 11, ry: 16, rot: -10, delay: 9 },
                    { cx: 48, cy: 28, rx: 10, ry: 15, rot: 15, delay: 12 },
                    { cx: -42, cy: -8, rx: 11, ry: 16, rot: -12, delay: 15 },
                  ].map((fruit, i) => (
                    <g key={i}>
                      {/* Stem */}
                      <animated.path
                        d={`M${fruit.cx},${fruit.cy - fruit.ry - 2} Q${fruit.cx - 3},${fruit.cy - fruit.ry - 8} ${fruit.cx - 2},${fruit.cy - fruit.ry - 12}`}
                        stroke="#064e3b"
                        strokeWidth="1.5"
                        fill="none"
                        opacity={Math.min(1, (visualGrowth - 151 - fruit.delay) / 8)}
                      />
                      {/* Fruit body */}
                      <animated.ellipse 
                        cx={fruit.cx} 
                        cy={fruit.cy} 
                        rx={fruit.rx} 
                        ry={fruit.ry} 
                        fill="url(#fruitGrad)"
                        transform={`rotate(${fruit.rot} ${fruit.cx} ${fruit.cy})`}
                        opacity={Math.min(1, (visualGrowth - 151 - fruit.delay) / 8)}
                      />
                      {/* Highlight */}
                      <animated.ellipse
                        cx={fruit.cx - fruit.rx * 0.25}
                        cy={fruit.cy - fruit.ry * 0.3}
                        rx={fruit.rx * 0.35}
                        ry={fruit.ry * 0.25}
                        fill={meta.fruitHighlight}
                        opacity={Math.min(0.6, (visualGrowth - 151 - fruit.delay) / 8)}
                        transform={`rotate(${fruit.rot} ${fruit.cx} ${fruit.cy})`}
                      />
                    </g>
                  ))}
                </>
              ) : (
                // Apples/Oranges
                <>
                  {[
                    { cx: -72, cy: 24, r: 12, delay: 0 },
                    { cx: 80, cy: -6, r: 13, delay: 3 },
                    { cx: 24, cy: -56, r: 11, delay: 6 },
                    { cx: -20, cy: -16, r: 12, delay: 9 },
                    { cx: 48, cy: 30, r: 10, delay: 12 },
                    { cx: -46, cy: -36, r: 11, delay: 15 },
                    { cx: 58, cy: 12, r: 9, delay: 18 },
                  ].map((fruit, i) => (
                    <g key={i}>
                      {/* Stem */}
                      <animated.path
                        d={`M${fruit.cx},${fruit.cy - fruit.r - 1} L${fruit.cx - 1},${fruit.cy - fruit.r - 6}`}
                        stroke="#064e3b"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        opacity={Math.min(1, (visualGrowth - 151 - fruit.delay) / 8)}
                      />
                      {/* Fruit */}
                      <animated.circle 
                        cx={fruit.cx} 
                        cy={fruit.cy} 
                        r={fruit.r} 
                        fill="url(#fruitGrad)"
                        opacity={Math.min(1, (visualGrowth - 151 - fruit.delay) / 8)}
                      />
                      {/* Highlight */}
                      <animated.ellipse
                        cx={fruit.cx - fruit.r * 0.3}
                        cy={fruit.cy - fruit.r * 0.3}
                        rx={fruit.r * 0.35}
                        ry={fruit.r * 0.25}
                        fill="white"
                        opacity={Math.min(0.5, (visualGrowth - 151 - fruit.delay) / 8)}
                      />
                    </g>
                  ))}
                </>
              )}
            </animated.g>
          )}

          {/* Legendary particle system */}
          {visualGrowth >= 180 && (
             <animated.g filter="url(#soft-glow)" opacity={growth.particleOpacity}>
                {/* Large floating orbs */}
                <circle cx="50" cy="80" r="3.5" fill="#fde047" className="animate-pulse" />
                <circle cx="230" cy="120" r="3" fill="white" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                <circle cx="140" cy="40" r="4" fill="#fef08a" className="animate-pulse" style={{ animationDelay: '1.4s' }} />
                
                {/* Medium sparkles */}
                <circle cx="90" cy="240" r="2" fill="white" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                <circle cx="200" cy="180" r="2.5" fill="#fde047" className="animate-pulse" style={{ animationDelay: '1s' }} />
                <circle cx="65" cy="150" r="2" fill="white" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Tiny glimmers */}
                <circle cx="110" cy="100" r="1.5" fill="#fef08a" className="animate-pulse" style={{ animationDelay: '0.9s' }} />
                <circle cx="180" cy="70" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
                <circle cx="70" cy="200" r="1" fill="#fde047" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                <circle cx="210" cy="230" r="1.5" fill="white" className="animate-pulse" style={{ animationDelay: '1.6s' }} />
             </animated.g>
          )}
        </animated.svg>

        {/* Enhanced level badges */}
        <div className="absolute top-0 right-0 -translate-y-4 translate-x-4">
           {visualGrowth >= 180 ? (
             <div className="relative">
               <div className="absolute inset-0 bg-amber-400/30 blur-xl rounded-full animate-pulse"></div>
               <div className="relative flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 text-white shadow-2xl border-4 border-white dark:border-slate-800 animate-bounce text-4xl">
                 ⛩️
               </div>
             </div>
           ) : visualGrowth >= 131 ? (
             <div className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-gradient-to-br from-pink-400 to-rose-600 text-white shadow-xl border-3 border-pink-200 dark:border-pink-900 text-2xl animate-pulse">
               🌸
             </div>
           ) : visualGrowth >= 91 ? (
             <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl border-2 border-indigo-200 dark:border-indigo-900 text-xl animate-pulse">
               🎋
             </div>
           ) : visualGrowth >= 51 ? (
             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg border-2 border-green-200 dark:border-green-900 text-lg">
               🌿
             </div>
           ) : visualGrowth >= 21 ? (
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-white shadow-md border-2 border-emerald-100 dark:border-emerald-900 text-base">
               🌱
             </div>
           ) : null}
        </div>
      </div>
      
      <div className="mt-10 text-center w-full z-10">
        <div className="inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/30 rounded-[2.5rem] mb-6 border border-indigo-200/60 dark:border-indigo-700/50 shadow-lg shadow-indigo-100/50 dark:shadow-none">
          <span className="text-orange-500 animate-bounce text-2xl drop-shadow-lg">🔥</span>
          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 uppercase tracking-widest">
            {realStreak} DAY STREAK
          </span>
        </div>
        
        {/* Enhanced progress bar */}
        <div className="relative h-4 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-full mb-7 mx-10 overflow-hidden shadow-inner border-2 border-slate-200/70 dark:border-slate-600/50">
          <animated.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-amber-500 shadow-[0_0_20px_rgba(99,102,241,0.7)]" 
            style={{ 
              width: `${Math.min(100, (visualGrowth / 180) * 100)}%`,
              transition: 'width 3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
          </animated.div>
          
          {/* Progress percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 drop-shadow">
              {Math.round((visualGrowth / 180) * 100)}%
            </span>
          </div>
        </div>

        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 mb-3 leading-none">
          {visualGrowth >= 180 ? `Legendary ${type} Sage` : 
           visualGrowth >= 131 ? `Blooming ${type} Master` :
           visualGrowth >= 91 ? `Flourishing ${type} Tree` :
           visualGrowth >= 51 ? `Growing ${type} Tree` :
           `Young ${type} Tree`}
        </h3>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-[0.35em] font-black italic opacity-75 mb-1">
          {getDetailedStatus()}
        </p>
        
        {/* Stage indicator */}
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mb-6">
          Stage {Math.min(13, Math.floor(visualGrowth / 14) + 1)} of 13
        </div>
        
        {visualGrowth < 180 && (
          <div className="mt-6 flex justify-center items-center gap-3 text-xs font-black text-indigo-600 dark:text-indigo-400 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 dark:from-indigo-900/30 dark:to-purple-900/20 py-2.5 px-7 rounded-full w-fit mx-auto border border-indigo-200/60 dark:border-indigo-700/40 shadow-sm">
             <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
             <span>{180 - Math.floor(visualGrowth)} DAYS TO LEGEND</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakTree;