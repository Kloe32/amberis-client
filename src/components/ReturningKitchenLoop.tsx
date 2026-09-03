const reducedMotion = 'motion-reduce:[animation:none]'
const inkLine =
  'fill-none stroke-[var(--scene-ink-soft)] [stroke-linecap:round] [stroke-linejoin:round]'
const sceneStroke = 'stroke-[var(--scene-ink)]'

function ReturningKitchenLoop() {
  return (
    <section
      className="grid min-h-svh place-items-center bg-[linear-gradient(180deg,rgba(207,218,224,0.52),rgba(239,225,204,0.92)),var(--bg)] p-[clamp(16px,3vw,40px)] max-[720px]:items-start max-[720px]:p-3.5"
      aria-label="A seamless dawn kitchen animation"
    >
      <div
        className="aspect-video w-[min(100%,1180px)] overflow-hidden rounded-lg border border-[var(--border-metal)] bg-[var(--surface)] shadow-[rgba(70,39,28,0.16)_0_34px_86px_-36px,rgba(138,30,24,0.08)_0_12px_28px_-18px] [--scene-amber:#d89a4a] [--scene-cup:#fff3df] [--scene-dawn-low:#d7c5ae] [--scene-dawn-top:#6f91ad] [--scene-ink-soft:rgba(63,42,37,0.62)] [--scene-ink:#3f2a25] [--scene-paper-low:#ddc6aa] [--scene-paper:#f4e6ce] [--scene-shadow-blue:rgba(57,75,92,0.22)] [--scene-tea:#b76538] [--scene-wall-low:#efe1cc] [--scene-wall-mid:#d9c5ad] [--scene-wall-top:#93aabb] [--scene-wood-low:#5f352c] [--scene-wood:#8a4f3a] max-[720px]:mt-[clamp(28px,10svh,72px)] max-[720px]:w-full"
        role="img"
        aria-label="A small kitchen table before sunrise with tea, a folded newspaper, and a chair slightly pulled out. Steam, dawn light, and one newspaper corner move in a slow seamless loop."
      >
        <svg className="block size-full [filter:url(#paperGrain)]" viewBox="0 0 1280 720" aria-hidden="true">
          <defs>
            <filter id="paperGrain" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="14" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.14" />
              </feComponentTransfer>
              <feBlend mode="multiply" in2="SourceGraphic" />
            </filter>
            <filter id="inkSoftness" x="-8%" y="-8%" width="116%" height="116%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="8" />
              <feDisplacementMap in="SourceGraphic" scale="1.6" />
            </filter>
            <linearGradient id="wallWash" x1="0" x2="1" y1="0" y2="1">
              <stop className="[stop-color:var(--scene-wall-top)]" offset="0" />
              <stop className="[stop-color:var(--scene-wall-mid)]" offset="0.55" />
              <stop className="[stop-color:var(--scene-wall-low)]" offset="1" />
            </linearGradient>
            <linearGradient id="dawnWindow" x1="0" x2="0" y1="0" y2="1">
              <stop className="[stop-color:var(--scene-dawn-top)]" offset="0" />
              <stop className="[stop-color:var(--scene-dawn-low)]" offset="1" />
            </linearGradient>
            <radialGradient id="stoveAmber" cx="50%" cy="54%" r="64%">
              <stop className="[stop-color:#ffd48a]" offset="0" />
              <stop className="[stop-color:rgba(216,154,74,0.62)]" offset="0.56" />
              <stop className="[stop-color:rgba(216,154,74,0)]" offset="1" />
            </radialGradient>
          </defs>

          <rect width="1280" height="720" fill="url(#wallWash)" />
          <path className="fill-[rgba(255,248,236,0.24)]" d="M0 0h392c-44 106-76 214-92 326-16 112-4 234 36 394H0Z" />
          <path className="fill-[rgba(83,102,119,0.11)]" d="M914 0h366v720H776c92-138 138-268 138-390S898 104 914 0Z" />

          <g filter="url(#inkSoftness)">
            <rect className="translate-x-3.5 translate-y-3 fill-[rgba(61,41,36,0.16)]" x="782" y="68" width="366" height="276" rx="4" />
            <rect className={`fill-[#f0dcc0] ${sceneStroke} [stroke-linejoin:round] [stroke-width:4]`} x="768" y="54" width="366" height="276" rx="4" />
            <rect className={`[animation:dawnBreath_8s_ease-in-out_infinite] ${reducedMotion}`} x="794" y="80" width="314" height="224" fill="url(#dawnWindow)" />
            <path className="fill-[rgba(255,248,236,0.2)]" d="M808 230c58-22 126-28 196-10 38 10 72 10 104-2v86H808Z" />
            <path className="fill-[rgba(255,248,236,0.14)]" d="M802 146c46-20 96-22 150-6 60 18 110 12 156-18v54c-46 24-98 30-156 12-58-18-108-14-150 12Z" />
            <path className={`${inkLine} [stroke-width:3]`} d="M925 80v224" />
            <path className={`${inkLine} [stroke-width:3]`} d="M794 190h314" />
            <path className={`fill-[#f0dcc0] ${sceneStroke} [stroke-linejoin:round] [stroke-width:4]`} d="M746 324h410l26 28H720Z" />
          </g>

          <path className={`pointer-events-none origin-[75%_12%] fill-[rgba(135,166,190,0.22)] [animation:dawnBeam_8s_ease-in-out_infinite] [transform-box:fill-box] ${reducedMotion}`} d="M800 252 1132 344 980 632 424 620Z" />
          <path className={`pointer-events-none origin-[75%_12%] fill-[rgba(255,248,236,0.14)] [animation:dawnBeam_8s_ease-in-out_infinite] [animation-delay:-2s] [transform-box:fill-box] ${reducedMotion}`} d="M978 136 1108 176 1220 612 742 636Z" />

          <g filter="url(#inkSoftness)">
            <path className={`[animation:stoveBreath_8s_ease-in-out_infinite] ${reducedMotion}`} d="M132 372c34-44 104-62 174-40 70 20 108 70 96 126-16 74-106 110-192 82-76-26-124-102-78-168Z" fill="url(#stoveAmber)" />
            <rect className={`fill-[#6c4034] ${sceneStroke} [stroke-width:4]`} x="122" y="338" width="274" height="200" rx="8" />
            <rect className={`fill-[rgba(232,158,78,0.58)] stroke-[rgba(90,21,18,0.5)] [animation:stoveWindow_8s_ease-in-out_infinite] [stroke-width:3] ${reducedMotion}`} x="170" y="388" width="176" height="76" rx="8" />
            <path className={`${inkLine} [stroke-width:4]`} d="M154 374h210M164 504h190" />
            <circle className={`fill-[#c6a15b] ${sceneStroke} [stroke-width:3]`} cx="178" cy="362" r="10" />
            <circle className={`fill-[#c6a15b] ${sceneStroke} [stroke-width:3]`} cx="224" cy="362" r="10" />
            <circle className={`fill-[#c6a15b] ${sceneStroke} [stroke-width:3]`} cx="270" cy="362" r="10" />
          </g>

          <g filter="url(#inkSoftness)">
            <path className={`fill-[rgba(111,63,46,0.78)] ${sceneStroke} [stroke-linejoin:round] [stroke-width:5]`} d="M860 412c20-100 88-122 142-72 26 24 42 70 44 140l-32 2c-4-82-28-130-74-134-34-2-54 26-68 72Z" />
            <path className={`fill-[rgba(111,63,46,0.78)] ${sceneStroke} [stroke-linejoin:round] [stroke-width:5]`} d="M800 484c78-18 164-16 254 8l-34 52c-72-14-142-16-210-6Z" />
            <path className={`fill-none opacity-75 ${sceneStroke} [stroke-linecap:round] [stroke-width:10]`} d="M834 526 786 678" />
            <path className={`fill-none opacity-75 ${sceneStroke} [stroke-linecap:round] [stroke-width:10]`} d="M1010 530l68 148" />
          </g>

          <g filter="url(#inkSoftness)">
            <path className="fill-[rgba(61,41,36,0.18)]" d="M240 626c216-42 494-42 714 0 86 16 146 44 146 64H116c0-22 48-46 124-64Z" />
            <path className={`fill-[var(--scene-wood)] ${sceneStroke} [stroke-linejoin:round] [stroke-width:5]`} d="M188 438c214-34 546-34 760 0 40 8 58 28 44 48-22 34-138 62-336 70-238 10-438-8-510-44-42-20-30-64 42-74Z" />
            <path className="fill-none stroke-[rgba(58,31,25,0.82)] [stroke-linecap:round] [stroke-width:5]" d="M160 476c92 52 320 76 564 60 136-8 244-28 300-60" />
            <path className={`fill-none ${sceneStroke} [stroke-linecap:round] [stroke-width:10]`} d="M344 512 296 684" />
            <path className={`fill-none ${sceneStroke} [stroke-linecap:round] [stroke-width:10]`} d="M622 536 616 690" />
            <path className={`fill-none ${sceneStroke} [stroke-linecap:round] [stroke-width:10]`} d="M884 510l70 174" />
          </g>

          <g filter="url(#inkSoftness)">
            <ellipse className="fill-[rgba(255,248,236,0.88)] stroke-[var(--scene-ink-soft)] [stroke-width:3]" cx="496" cy="444" rx="94" ry="18" />
            <path className={`fill-[var(--scene-cup)] ${sceneStroke} [stroke-linejoin:round] [stroke-width:4]`} d="M422 348c44-16 104-16 148 0l-16 94c-36 18-84 18-118 0Z" />
            <ellipse className={`fill-[var(--scene-cup)] ${sceneStroke} [stroke-linejoin:round] [stroke-width:4]`} cx="496" cy="350" rx="76" ry="20" />
            <ellipse className="fill-[var(--scene-tea)] opacity-[0.78]" cx="496" cy="350" rx="55" ry="12" />
            <path className={`fill-none ${sceneStroke} [stroke-linecap:round] [stroke-width:9]`} d="M558 376c48-10 64 56 4 58" />
            <path className={`origin-bottom fill-none stroke-[rgba(255,248,236,0.78)] opacity-0 [animation:steamRise_8s_ease-in-out_infinite] [stroke-linecap:round] [stroke-width:5] [transform-box:fill-box] ${reducedMotion}`} d="M462 318c-22-30 24-42 4-76-10-18-30-22-14-52" />
            <path className={`origin-bottom fill-none stroke-[rgba(255,248,236,0.78)] opacity-0 [animation:steamRise_8s_ease-in-out_infinite] [animation-delay:-2.6s] [stroke-linecap:round] [stroke-width:4] [transform-box:fill-box] ${reducedMotion}`} d="M500 320c24-34-20-48 10-82 16-18 32-30 18-60" />
            <path className={`origin-bottom fill-none stroke-[rgba(255,248,236,0.78)] opacity-0 [animation:steamRise_8s_ease-in-out_infinite] [animation-delay:-5.2s] [stroke-linecap:round] [stroke-width:3.5] [transform-box:fill-box] ${reducedMotion}`} d="M536 316c-12-28 30-42 16-72-8-18-18-28-4-54" />
          </g>

          <g filter="url(#inkSoftness)">
            <path className={`fill-[var(--scene-paper)] ${sceneStroke} [stroke-linejoin:round] [stroke-width:3.5]`} d="M626 384c88-20 174-18 258 8l44 82c-100 18-194 20-284 4Z" />
            <path className="fill-none stroke-[rgba(61,41,36,0.36)] [stroke-width:3]" d="M626 384c44 30 60 60 64 94" />
            <path className={`${inkLine} opacity-70 [stroke-width:3]`} d="M698 408c42-10 86-8 132 4M710 430c48-8 92-6 132 4M724 454c38-4 76-2 114 4M804 394l44 84" />
            <path className="translate-x-[7px] translate-y-[7px] fill-[rgba(61,41,36,0.16)]" d="M842 392c28 8 56 18 86 32l-28 50c-26-22-46-48-58-82Z" />
            <path className={`origin-[6%_94%] fill-[var(--scene-paper)] ${sceneStroke} [animation:paperCornerLift_8s_ease-in-out_infinite] [stroke-linejoin:round] [stroke-width:3.5] [transform-box:fill-box] ${reducedMotion}`} d="M842 392c30 8 58 18 86 32l-28 50c-26-22-46-48-58-82Z" />
          </g>

          <path className={`${inkLine} opacity-45 [stroke-width:3]`} d="M214 456c172-30 382-36 612-16 58 6 108 16 152 30" />
          <path className={`${inkLine} opacity-30 [stroke-width:2.5]`} d="M0 654c170-22 342-32 516-30 282 4 536 24 764 60" />
        </svg>
      </div>
    </section>
  )
}

export default ReturningKitchenLoop
