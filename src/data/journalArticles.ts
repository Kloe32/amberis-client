export interface StoryChapter {
  title: string
  paragraphs: string[]
  quote?: string
  labNote?: {
    title: string
    content: string
  }
}

export interface JournalArticle {
  id: number
  slug: string
  category: 'Botanical Science' | 'Architecture & Spaces' | 'Daily Rituals' | 'Formulation Craft' | 'Olfactory Landscapes' | 'Circular Philosophy'
  title: string
  subtitle: string
  author: {
    name: string
    role: string
    location: string
  }
  date: string
  readTime: string
  excerpt: string
  sensoryNotes: string[]
  keyTakeaways: string[]
  pullQuote: string
  featured?: boolean
  relatedProductSlugs?: string[]
  chapters: StoryChapter[]
}

export const journalArticles: JournalArticle[] = [
  {
    id: 1,
    slug: 'cold-pressed-plant-lipid-extractions',
    category: 'Botanical Science',
    featured: true,
    title: 'The Art and Precision of Cold-Pressed Plant Lipid Extractions',
    subtitle: 'How thermal thresholds preserve volatile bio-active flavonoids and essential fatty acids.',
    author: {
      name: 'Dr. Elena Vance',
      role: 'Head of Botanical Phytochemistry',
      location: 'Melbourne Laboratory',
    },
    date: 'August 18, 2026',
    readTime: '6 min read',
    excerpt:
      'How thermal thresholds affect active flavonoids, polyphenols, and antioxidant stability during our delicate multi-phase extraction process in our Melbourne laboratory.',
    sensoryNotes: ['Freshly crushed camellia seed', 'Green tea tannin', 'Subtle herbaceous earth', 'Cedarwood undertone'],
    pullQuote: 'Heat is the great simplifier of chemistry, but botanical vitality thrives only in nuanced, cool restraint.',
    keyTakeaways: [
      'Sub-34°C extraction preserves double bonds in polyunsaturated omega fatty acids without oxidation.',
      'Gentle mechanical pressing protects thermosensitive bioflavonoids from denaturing.',
      'Amberis utilizes slow nitrogen-blanketed decanting to prevent ambient oxygen degradation.',
      'Unrefined botanical lipids mirror the stratum corneum intercellular matrix for superior bioavailability.',
    ],
    relatedProductSlugs: ['parsley-seed-serum', 'damascan-rose-oil', 'camellia-nut-cream'],
    chapters: [
      {
        title: 'I. The Vulnerability of Living Chemistry',
        paragraphs: [
          'Plants are master synthesizers of protective molecules. Over millions of years of evolutionary pressure, flora developed sophisticated phytochemical defenses—flavonoids that shield tender leaves from ultraviolet radiation, tocopherols that prevent lipid peroxidation during drought, and fragrant terpenes that deter pests while attracting pollinators.',
          'When these botanicals are harvested for therapeutic skincare, our primary laboratory challenge is preservation. Traditional industrial extraction relies on high heat and chemical solvents like hexane to maximize yield quickly. While efficient for mass production, this thermal violence dismantles the delicate molecular architecture of the plant.',
          'At temperatures exceeding 42°C, the fragile double-bonds of essential fatty acids (Omega-3, 6, and 9) begin to oxidize, creating free radicals rather than neutralizing them. The vibrant polyphenols lose their antioxidant potency, and the natural aroma is stripped of its complex overtones.',
        ],
        quote: 'When botanical oils are subjected to excessive heat, you do not extract their vitality—you merely collect their residue.',
      },
      {
        title: 'II. The Physics of Ambient Pressure and Controlled Cooling',
        paragraphs: [
          'In our Melbourne laboratory, we engineered a dedicated closed-loop cold press system that operates strictly between 28°C and 34°C. By applying high hydraulic pressure through food-grade surgical steel expellers at a rotational speed of fewer than 35 revolutions per minute, friction-induced heat is virtually eliminated.',
          'The botanical seeds—whether Australian Macadamia, cold-climate Camellia, or organic Rosehip—are crushed deliberately and without haste. The expelled oil droplets run through a water-chilled cooling jacket, maintaining optimal molecular equilibrium.',
          'Furthermore, to eliminate oxidative degradation before the oil ever touches a bottle, the entire pressing chamber is blanketed in inert food-grade nitrogen gas, preventing atmospheric oxygen from interacting with the freshly liberated lipids.',
        ],
        labNote: {
          title: 'Phytochemical Lab Observation #412',
          content:
            'Comparative chromatography demonstrates that nitrogen-blanketed cold expelling yields a 44.8% higher retention of alpha-linolenic acid (ALA) and 3.2x greater polyphenol absorbance spectrum compared to standard hydraulic extraction.',
        },
      },
      {
        title: 'III. The Golden Spectrum of Unfiltered Fractionation',
        paragraphs: [
          'The result of this slow, patient craft is an oil that looks, smells, and performs distinctly. Standard commercial cosmetic oils are bleached and deodorized into clear, odorless liquids to ensure uniform batches. At Amberis, we reject this cosmetic homogenization.',
          'Our cold-pressed extractions retain their authentic golden-amber or deep viridian hues. They carry the subtle aroma of the soil, the rainfall, and the botanical harvest. Most importantly, their molecular profile mirrors the lipid bilayer of human skin.',
          'When applied to the epidermis, these intact lipids do not sit as an occlusive, heavy film. Instead, they integrate seamlessly with the intercellular ceramides, reinforcing the skin barrier against environmental stressors and trans-epidermal moisture loss.',
        ],
      },
      {
        title: 'IV. From Laboratory Bench to Daily Ritual',
        paragraphs: [
          'Translating this scientific rigor into your daily regimen is simple: quality requires no complexity. A single pump of an uncompromised lipid formulation provides tens of billions of active antioxidant molecules ready to scavenge free radicals and replenish lost hydration.',
          'As you warm two to three drops between your palms and inhale the authentic herbaceous aroma, you are participating in a quiet dialogue with living phytochemistry—distilled with patience, protected by amber glass, and created to endure.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'textures-of-stone-light-wood',
    category: 'Architecture & Spaces',
    title: 'Designing Boutiques That Speak in Textures of Stone, Light, and Wood',
    subtitle: 'Crafting tactile sanctuaries that slow the pulse and invite deliberate sensory connection.',
    author: {
      name: 'Kaelen Thorne',
      role: 'Principal Spatial Architect',
      location: 'Kyoto Studio',
    },
    date: 'August 02, 2026',
    readTime: '5 min read',
    excerpt:
      'An interview with our principal interior architect on crafting tactile sanctuaries that slow the pulse, diffuse natural light, and invite deliberate sensory connection.',
    sensoryNotes: ['Travertine stone', 'Aged Tasmanian blackwood', 'Running water acoustic', 'Warm 2700K illumination'],
    pullQuote: 'A retail space should not demand attention; it should offer a quiet clearing where senses recalibrate.',
    keyTakeaways: [
      'Each Amberis boutique is designed uniquely around local geological and architectural vernacular.',
      'Acoustic geometry and running water basins lower visitor cortisol and heart rates.',
      'Tactile raw materials—unfinished timber, unhoned granite—stimulate mindful haptic perception.',
      'Spatial lighting transitions deliberately from bustling street lumens to calm domestic warmth.',
    ],
    relatedProductSlugs: ['resurrection-hand-wash', 'geranium-leaf-body-cleanser'],
    chapters: [
      {
        title: 'I. The Architecture of De-acceleration',
        paragraphs: [
          'Modern cities are engines of sensory saturation. Billboards flicker, glass surfaces reflect harsh sunlight, and footsteps bounce against polished linoleum. Entering a boutique should not feel like an extension of that commerce—it should feel like stepping into a monastery or a secluded coastal pavilion.',
          'When we begin the design of a new Amberis space—whether in Melbourne’s laneways, Kyoto’s historic districts, or London’s quiet residential streets—our first question is never "where do we display the bottles?" Our first question is: "How do we decelerate the breathing of the person crossing this threshold?"',
          'The answer lies in material resonance. We choose substances that possess mass, warmth, and acoustic absorption: rough-hewn limestone, reclaimed timber with visible grain, patinated brass that darkens with the touch of human hands.',
        ],
        quote: 'We do not build retail shops; we construct acoustic and tactile shelters.',
      },
      {
        title: 'II. The Centerpiece Basin as a Ritual Anchor',
        paragraphs: [
          'At the heart of every Amberis boutique sits a monolithic demonstration sink. It is never tucked into a corner like an afterthought; it is the civic fountain around which the entire room revolves.',
          'Carved from local volcanic rock or hand-cast pigmented concrete, the basin invites water to flow in a gentle, laminar sheet rather than a noisy spray. The acoustics of running water immediately mask the low-frequency rumble of urban traffic.',
          'Here, a visitor is invited to wash their hands—not as a transactional product test, but as a deliberate reset. Cold water on wrists, the release of eucalyptus and mandarin vapors, the plush texture of unbleached waffle cotton towels: within ninety seconds, the nervous system shifts from sympathetic alertness to parasympathetic repose.',
        ],
        labNote: {
          title: 'Spatial Design Principle #18',
          content:
            'Acoustic reverberation time in Amberis spaces is engineered to 0.45 seconds (comparable to a classical library), achieved via micro-perforated acoustic timber paneling and felt sound dampeners hidden behind lime-wash plaster walls.',
        },
      },
      {
        title: 'III. Light as an Invisible Material',
        paragraphs: [
          'Lighting is often treated as illumination, but we treat it as atmosphere. We avoid high-output overhead spotlights that create harsh glare on amber glass bottles. Instead, our lighting is diffuse, indirect, and calibrated strictly to 2700 Kelvin—reminiscent of late afternoon sun slanting through paper shoji screens or forest canopies.',
          'Shadows are welcomed rather than eradicated. A room with subtle gradations of shadow feels deeper, more intimate, and more protective. It invites you to linger, to touch a surface, to inhale deeply without feeling watched or rushed.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'physiological-impact-aromatic-cleansing',
    category: 'Daily Rituals',
    title: 'Morning Resets: The Physiological Impact of Aromatic Cleansing',
    subtitle: 'Exploring how herbaceous vapors and focused skin massage modulate the autonomic nervous system.',
    author: {
      name: 'Maya Lin-Davies',
      role: 'Sensory Anthropologist & Biologist',
      location: 'Zurich Research Center',
    },
    date: 'July 24, 2026',
    readTime: '7 min read',
    excerpt:
      'Exploring how herbaceous vapors, thermal water contrasts, and focused skin massage can influence the parasympathetic nervous system at the dawn of the day.',
    sensoryNotes: ['Bergamot rind', 'Rosemary stem', 'Steamy bathroom vapor', 'Cool morning air'],
    pullQuote: 'Cleansing is not merely hygiene; it is the physiological threshold between sleep and conscious presence.',
    keyTakeaways: [
      'Volatile terpene molecules cross the blood-brain barrier via olfactory neurons in under 200 milliseconds.',
      'Lymphatic massage with botanical cleansers reduces morning facial fluid retention by up to 28%.',
      'The transition from warm water cleanse to cool rinse stimulates vagal nerve tone and alertness.',
      'A deliberate three-minute cleansing ritual establishes neurological grounding for the entire working day.',
    ],
    relatedProductSlugs: ['parsley-seed-facial-cleanser', 'in-two-minds-facial-toner'],
    chapters: [
      {
        title: 'I. The Olfactory Pathway to the Limbic Center',
        paragraphs: [
          'Of all the human senses, olfaction is uniquely direct. While visual and auditory signals pass through the analytical thalamus before reaching emotional centers, olfactory receptor neurons in the nasal mucosa connect directly with the olfactory bulb, the amygdala, and the hippocampus.',
          'When you dispense a formulation containing botanical essential oils—such as cold-pressed Bergamot rind, crushed Rosemary, or French Lavender—hundreds of aromatic terpene molecules vaporize into the warm steam of your morning basin.',
          'Within 150 milliseconds of inhalation, these compounds stimulate neurochemical cascades. Linalool and 1,8-cineole have been clinically documented to modulate GABA receptors, gently lowering morning cortisol spikes while sharpening mental focus.',
        ],
        quote: 'A fragrance is the fastest road to emotional equilibrium; it bypasses the intellect and speaks directly to memory.',
      },
      {
        title: 'II. The Biomechanics of Morning Facial Lymph Drainage',
        paragraphs: [
          'During sleep, horizontal posture and slowed muscle movement cause interstitial fluid to pool in facial tissues, particularly around the periorbital region and jawline. Morning cleansing is the ideal opportunity to stimulate lymphatic drainage.',
          'By applying a gel or oil cleanser using the pads of your fingers in gentle, sweeping motions—starting at the bridge of the nose and moving outward toward the preauricular lymph nodes, then downward along the sternocleidomastoid muscle—you accelerate fluid return.',
          'This requires no aggressive scrubbing. In fact, excessive friction stresses the delicate elastic fibers of the skin. Gentle, rhythmic contact combined with nutrient-rich plant emollients provides slip while awakening microcirculation.',
        ],
        labNote: {
          title: 'Vascular Response Data',
          content:
            'Cutaneous thermography reveals that a 90-second warm botanical cleanse followed by a 10-second cool water compress increases microvascular capillary flow by 34% without causing erythema or barrier compromise.',
        },
      },
      {
        title: 'III. Crafting Your 3-Minute Protocol',
        paragraphs: [
          'Begin by wetting the face with lukewarm water (never scalding). Dispense a coin-sized amount of cleanser into damp palms and work into a rich micro-lather.',
          'Close your eyes and bring your hands to your face. Inhale deeply three times, allowing the aromatic vapors to fill your lungs. Gently massage the forehead in circular upward spirals, sweep across the cheeks, and contour the jawline.',
          'Rinse thoroughly with warm water, finish with three splashes of cool water, and pat (never rub) dry with a clean cotton towel. Notice the clarity in your eyes, the calm in your pulse, and the supple resilience of your skin.',
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'why-we-bottle-in-amber-glass',
    category: 'Formulation Craft',
    title: 'Why We Bottle Exclusively in UV-Protective Amber Glass',
    subtitle: 'Photochemical degradation in botanical extracts and our circular bottle refill initiative.',
    author: {
      name: 'Marcello Rossi',
      role: 'Master Glassblower & Materials Director',
      location: 'Murano & Melbourne',
    },
    date: 'July 15, 2026',
    readTime: '4 min read',
    excerpt:
      'Exploring photochemical degradation in delicate botanicals and our ongoing circular refill initiative across our global boutiques.',
    sensoryNotes: ['Sunlit amber glass', 'Mineral silica sand', 'Fresh botanical extract', 'Clean glass ring'],
    pullQuote: 'Amber glass is our silent guardian—shielding volatile plant molecules from the erosive wavelength of sunlight.',
    keyTakeaways: [
      'Amber glass blocks 99% of damaging UV-A, UV-B, and blue light spectrum up to 450 nanometers.',
      'Unlike plastic polymers, pharmaceutical glass is 100% inert and never leaches endocrine disruptors or microplastics.',
      'Amber glass is endlessly recyclable with zero degradation of structural purity.',
      'The Amberis Bottle Return Loop allows vessels to be returned, thermally sanitized at 85°C, and refilled for up to 30 cycles.',
    ],
    relatedProductSlugs: ['parsley-seed-serum', 'b-tea-balancing-toner', 'resurrection-hand-balm'],
    chapters: [
      {
        title: 'I. The Solar Threat to Active Botanicals',
        paragraphs: [
          'Light is the creator of plant life, but once a botanical essence is extracted, light becomes its greatest adversary. Ultraviolet light (UV-A and UV-B) carries sufficient photonic energy to sever covalent bonds in organic molecules.',
          'When natural antioxidants such as tocopherol (Vitamin E), ascorbic acid derivatives, and carotenoids are exposed to sunlight through clear or transparent plastic bottles, photo-oxidation occurs rapidly. Within weeks, the active efficacy degrades, colors fade, and rancidity begins.',
          'Clear plastic bottles also present another hazard: phthalates and bisphenols that can slowly leach into lipid-rich serums under temperature shifts.',
        ],
        quote: 'We refuse to compromise an eight-month formulation harvest by housing it in a disposable plastic vessel.',
      },
      {
        title: 'II. The Physics of the 450nm Amber Cut-Off',
        paragraphs: [
          'Amber glass achieves its iconic warm brown tint through the precise addition of iron and sulfur compounds during the high-temperature silica melt. This composition creates a physical optical barrier.',
          'Spectrophotometer testing demonstrates that our amber glassware absorbs virtually 100% of wavelengths between 290nm and 450nm. This covers the entire destructive ultraviolet band as well as high-energy visible (HEV) blue light.',
          'By insulating our formulations within this optical fortress, we are able to minimize the use of synthetic chemical stabilizers and preservatives, allowing the pure botanicals to remain shelf-stable and biochemically potent naturally.',
        ],
        labNote: {
          title: 'Optical Transmission Test #089',
          content:
            'Amberis Type III pharmaceutical amber glass demonstrated < 1.2% light transmission across the 200–400nm spectrum, compared to 88.4% transmission for standard clear PET plastic containers.',
        },
      },
      {
        title: 'III. Circularity: The Return and Refill Philosophy',
        paragraphs: [
          'Glass is not only protective—it is eternal. Unlike plastic, which degrades and downcycles into toxic microfibers, glass can be melted down or sanitized infinitely without losing an atom of its strength or clarity.',
          'Through the Amberis Returning Loop, our patrons return empty amber glass bottles to any of our boutiques. Each bottle is inspected, subjected to an 85°C hospital-grade thermal sanitization cycle, and refilled with fresh formulation.',
          'Holding a heavy amber glass bottle in your hand is a tangible reminder of permanence in a world too often built on the disposable.',
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'scent-of-memory-raw-botanicals',
    category: 'Olfactory Landscapes',
    title: 'The Scent of Memory: Composing Fragrance from Raw Botanicals',
    subtitle: 'How natural absolutes evoke geography, emotional resonance, and the passage of seasons.',
    author: {
      name: 'Sophie Vane',
      role: 'Senior Perfumer & Botanical Distiller',
      location: 'Grasse & Blue Mountains',
    },
    date: 'June 28, 2026',
    readTime: '6 min read',
    excerpt:
      'How raw natural resinoids, steam-distilled woods, and wild floral absolutes evoke vivid geography, emotional resonance, and personal memory.',
    sensoryNotes: ['Frankincense resin', 'Haitian vetiver root', 'Green cardamom pod', 'Petrichor after summer rain'],
    pullQuote: 'A natural fragrance is never static; it dialogues with your unique skin temperature and the quiet passing of hours.',
    keyTakeaways: [
      'Natural fragrance extracts contain hundreds of minor olfactory components that synthetics cannot duplicate.',
      'Scent evokes memory via the direct neural pathway between the piriform cortex and the amygdala.',
      'Amberis perfumes are aged in dark oak casks for six weeks before bottling to harmonize the accords.',
      'Natural botanical perfumes wear close to the skin, creating an intimate aura rather than an invasive projection.',
    ],
    relatedProductSlugs: ['tacit-eau-de-parfum', 'marrakech-intense'],
    chapters: [
      {
        title: 'I. The Monotony of Synthetic Uniformity',
        paragraphs: [
          'Much of modern commercial perfumery has abandoned the soil. Synthetic aroma chemicals, while consistent and inexpensive, possess a flat, mathematical symmetry. A synthetic rose molecule will smell identical on ten thousand people, unchanging from morning to night.',
          'In contrast, a genuine Damask rose harvest in Bulgaria carries the imprint of that specific spring: the humidity of the May mornings, the mineral content of the valley soil, the exact hour the petals were plucked before the sun evaporated their volatile dew.',
          'When we distill botanical extracts, we capture not a flat caricature of a flower, but its living complexity—a chord composed of over 300 distinct volatile compounds working in concert.',
        ],
        quote: 'Perfume should not mask who you are; it should become a subtle atmospheric extension of your thoughts.',
      },
      {
        title: 'II. The Architecture of Resins and Damp Earth',
        paragraphs: [
          'Our olfactory palette favors ancient, grounding materials. We work with Somalian Frankincense harvested from the rugged Boswellia sacra trees, Haitian Vetiver whose deep fibrous roots anchor the soil against erosion, and Australian Sandalwood grown sustainably in the red deserts of Western Australia.',
          'These materials do not shout. They whisper of old stone libraries, cool forest floors after downpours, and sun-warmed resinous pine needles underfoot.',
          'On the skin, these botanical absolutes unfold slowly. The crisp top notes of green citrus and cardamom give way to rich balsamic resins, finally resting in an intimate skin-scent that lingers like an unspoken memory.',
        ],
        labNote: {
          title: 'Distillation Note #55',
          content:
            'Hydro-distillation of wild frankincense tears at low vapor velocities preserves the subtle alpha-pinene top notes, preventing the burnt undertones common in high-pressure industrial autoclaves.',
        },
      },
      {
        title: 'III. An Intimate Scent Silhouette',
        paragraphs: [
          'We believe fragrance should be an intimate discovery, not an imposition on those around you. It should be smelled only by those invited into your personal space—when you lean in for a greeting, or when a breeze catches your scarf on an evening walk.',
          'To wear a botanical fragrance is to carry an invisible landscape with you throughout your day, grounding your spirit whenever the world feels fractured.',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'philosophy-of-circular-living-return-cycle',
    category: 'Circular Philosophy',
    title: 'The Philosophy of Circular Living: The Amberis Return Cycle',
    subtitle: 'From boutique rinse stations to industrial thermal sterilisation—redefining luxury through permanence.',
    author: {
      name: 'Clara Jensen',
      role: 'Environmental Systems Coordinator',
      location: 'Copenhagen & Sydney',
    },
    date: 'June 10, 2026',
    readTime: '5 min read',
    excerpt:
      'From boutique rinse stations to hospital-grade thermal sterilisation—how we are redefining luxury through cyclical stewardship and waste elimination.',
    sensoryNotes: ['Clean steam vapor', 'Polished amber glass', 'Warm linen drying rack', 'Fresh rainwater'],
    pullQuote: 'True luxury creates no residue. It honors materials by stewarding them through infinite cycles.',
    keyTakeaways: [
      'Over 64% of Amberis vessels sold in 2025 were returned to our boutiques for circular reuse.',
      'The multi-stage sanitization process consumes 78% less energy than manufacturing new virgin glass.',
      'Our aluminum tubes and caps are converted into building insulation and architectural fixtures.',
      'Patrons who participate receive complimentary routine formulation refills and journal monographs.',
    ],
    relatedProductSlugs: ['resurrection-hand-wash', 'geranium-leaf-body-cleanser', 'parsley-seed-serum'],
    chapters: [
      {
        title: 'I. The Myth of Disposable Convenience',
        paragraphs: [
          'For the past seven decades, consumer culture has operated on a linear delusion: extract, manufacture, consume, discard. Luxury was mistakenly equated with single-use abundance—thick laminated boxes that serve no purpose beyond unboxing, gilded caps destined for landfills within hours.',
          'At Amberis, we believe this represents an impoverishment of imagination. True elegance lies in endurance. An object designed with purpose, crafted from noble materials, should participate in a lifelong cycle of renewal.',
        ],
        quote: 'Elegance is not the generation of waste; elegance is the thoughtful closing of the loop.',
      },
      {
        title: 'II. The Anatomy of the 85°C Sanitization Loop',
        paragraphs: [
          'When an empty Amberis amber glass vessel is returned to our boutique counter, its journey is just beginning. It is scanned, batched, and delivered to our regional circular hub.',
          'Here, bottles undergo a multi-phase reclamation: label dissolution using biodegradable citrus enzymes, high-pressure triple water rinse, and an 85°C steam sterilisation chamber that exceeds European Pharmacopoeia standards for medical containers.',
          'Each bottle is laser-scanned for microscopic fissures before being refilled with fresh botanical formulation and resealed. A single bottle can effortlessly complete thirty life cycles, saving kilograms of raw silica and energy.',
        ],
        labNote: {
          title: 'Life Cycle Assessment (LCA)',
          content:
            'Third-party carbon accounting verifies that reusing an Amberis 500mL amber glass bottle 5 times reduces its life-cycle greenhouse gas emissions by 67.2% relative to a virgin glass container.',
        },
      },
      {
        title: 'III. Community as Stewards of Change',
        paragraphs: [
          'Circularity cannot be achieved in isolation by a manufacturer; it requires an active, willing pact with our community. When our patrons bring their empties back into our spaces, it transforms a commercial relationship into a shared cultural commitment.',
          'We invite you to participate in this rhythm. Return your empty vessels, take a moment to wash your hands at our basin, and know that you are helping cultivate an aesthetic world that leaves no scar upon the earth.',
        ],
      },
    ],
  },
]

export const journalCategories = [
  'All Articles',
  'Botanical Science',
  'Architecture & Spaces',
  'Daily Rituals',
  'Formulation Craft',
  'Olfactory Landscapes',
  'Circular Philosophy',
] as const
