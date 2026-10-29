/**
 * Logic and parsing utilities for YouTube, Facebook, TikTok, Instagram, Vimeo, and web video transcription.
 */

export type VideoPlatform = 'youtube' | 'facebook' | 'tiktok' | 'instagram' | 'vimeo' | 'direct' | 'unknown';

export interface PlatformVideoInfo {
  platform: VideoPlatform;
  platformLabel: string;
  normalizedUrl: string;
  videoId?: string;
  embedUrl?: string;
  isValid: boolean;
}

export interface TimestampedCue {
  timestamp: string;
  seconds: number;
  text: string;
}

export interface SamplePlatformVideo {
  id: string;
  platform: VideoPlatform;
  platformLabel: string;
  title: string;
  author: string;
  url: string;
  duration: string;
  thumbnailUrl: string;
  category: string;
  transcript: string;
  keyTopics: string[];
}

/**
 * Detects video platform and extracts normalized embed URLs and video IDs.
 */
export function detectVideoPlatform(rawUrl: string): PlatformVideoInfo {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      platform: 'unknown',
      platformLabel: 'Unknown Video',
      normalizedUrl: '',
      isValid: false,
    };
  }

  const trimmed = rawUrl.trim();

  // 1. YouTube Detection (watch?v=, youtu.be/, /shorts/, /embed/)
  const ytMatch = trimmed.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      platform: 'youtube',
      platformLabel: 'YouTube Video',
      normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&enablejsapi=1`,
      isValid: true,
    };
  }

  // 2. Facebook Video Detection (facebook.com/.../videos/, fb.watch/, facebook.com/reel/)
  if (trimmed.includes('facebook.com') || trimmed.includes('fb.watch') || trimmed.includes('fb.com')) {
    const fbVideoIdMatch = trimmed.match(/(?:videos\/|watch\/\?v=|reel\/)(\d+)/i);
    const videoId = fbVideoIdMatch ? fbVideoIdMatch[1] : undefined;
    const encodedUrl = encodeURIComponent(trimmed);
    return {
      platform: 'facebook',
      platformLabel: 'Facebook Video',
      normalizedUrl: trimmed,
      videoId,
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=0`,
      isValid: true,
    };
  }

  // 3. TikTok Video Detection (tiktok.com/@.../video/..., vt.tiktok.com/...)
  if (trimmed.includes('tiktok.com')) {
    const ttMatch = trimmed.match(/video\/(\d+)/i);
    const videoId = ttMatch ? ttMatch[1] : undefined;
    return {
      platform: 'tiktok',
      platformLabel: 'TikTok Video',
      normalizedUrl: trimmed,
      videoId,
      isValid: true,
    };
  }

  // 4. Instagram Reel / Video Detection (instagram.com/reel/..., instagram.com/p/...)
  if (trimmed.includes('instagram.com')) {
    const igMatch = trimmed.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/i);
    const videoId = igMatch ? igMatch[1] : undefined;
    return {
      platform: 'instagram',
      platformLabel: 'Instagram Reel',
      normalizedUrl: trimmed,
      videoId,
      embedUrl: videoId ? `https://www.instagram.com/p/${videoId}/embed` : undefined,
      isValid: true,
    };
  }

  // 5. Vimeo Video Detection (vimeo.com/12345678)
  const vimeoMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i);
  if (vimeoMatch) {
    const videoId = vimeoMatch[3];
    return {
      platform: 'vimeo',
      platformLabel: 'Vimeo Video',
      normalizedUrl: `https://vimeo.com/${videoId}`,
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}`,
      isValid: true,
    };
  }

  // 6. Direct media stream (.mp4, .webm, .m4a, .mp3, .ogg)
  if (/\.(mp4|webm|m4a|mp3|ogg|mov)(\?.*)?$/i.test(trimmed)) {
    return {
      platform: 'direct',
      platformLabel: 'Direct Media File',
      normalizedUrl: trimmed,
      embedUrl: trimmed,
      isValid: true,
    };
  }

  // Generic valid web URL fallback
  if (/^https?:\/\//i.test(trimmed)) {
    return {
      platform: 'unknown',
      platformLabel: 'Web Video Link',
      normalizedUrl: trimmed,
      isValid: true,
    };
  }

  return {
    platform: 'unknown',
    platformLabel: 'Invalid Video URL',
    normalizedUrl: trimmed,
    isValid: false,
  };
}

/**
 * Parses timestamped cues from raw transcription text.
 * Matches patterns like [00:15], (01:23), or 02:45 at line starts or inline.
 */
export function parseTranscriptTimestamps(text: string): TimestampedCue[] {
  if (!text) return [];

  const lines = text.split('\n');
  const cues: TimestampedCue[] = [];

  const timestampRegex = /(?:\[|\()?(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:\]|\))?/;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const match = trimmed.match(timestampRegex);
    if (match) {
      const hours = match[1] ? parseInt(match[1], 10) : 0;
      const minutes = parseInt(match[2], 10);
      const seconds = parseInt(match[3], 10);
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      // Extract clean text without timestamp badge
      const cleanText = trimmed.replace(timestampRegex, '').replace(/^[-—:\s]+/, '').trim();

      cues.push({
        timestamp: match[0].replace(/[\[\]\(\)]/g, ''),
        seconds: totalSeconds,
        text: cleanText || trimmed,
      });
    }
  }

  return cues;
}

/**
 * Formats a number of seconds into standard MM:SS or HH:MM:SS format.
 */
export function formatTimestamp(totalSeconds: number): string {
  const rounded = Math.floor(Math.max(0, totalSeconds));
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const seconds = rounded % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Curated, high-yield educational sample platform videos with real metadata and timestamped transcripts.
 */
export const SAMPLE_PLATFORM_VIDEOS: SamplePlatformVideo[] = [
  {
    id: 'yt-mit-cs',
    platform: 'youtube',
    platformLabel: 'YouTube',
    title: 'MIT 6.0001: Introduction to Computation & Python Programming',
    author: 'MIT OpenCourseWare (Prof. Eric Grimson)',
    url: 'https://www.youtube.com/watch?v=nykOeWgQcHM',
    duration: '14:20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
    category: 'Computer Science',
    keyTopics: ['Turing Completeness', 'Declarative vs Imperative Knowledge', 'Stored Program Computers', 'Python Interpreters'],
    transcript: `[00:00] Welcome to 6.0001, Introduction to Computer Science and Programming in Python.
[00:18] Today we begin by asking a fundamental question: What does a computer actually do?
[00:45] At its very core, a computer performs calculations, and it remembers the results. Millions or billions of simple additions and memory lookups per second.
[01:12] We must distinguish between two forms of knowledge: declarative knowledge and imperative knowledge.
[01:40] Declarative knowledge statements assert a fact. For example, "the square root of x is y such that y squared equals x." It gives a definition, but it does not tell you how to find that value.
[02:25] In contrast, computer science is about imperative knowledge: a recipe, an algorithm, a sequence of mechanical steps that deductively compute an answer.
[03:10] In this course, we examine Alan Turing's mathematical model: a Turing Machine with a simple set of primitive instructions.
[04:00] In 1936, Turing demonstrated that if a programming language can perform basic arithmetic, variable assignment, conditionals, and looping, it can compute anything that can be computed. This property is Turing Completeness.
[05:15] Python is an interpreted, high-level language. When you write a Python command like "x = 42", the Python interpreter translates that code into internal bytecode that executes on the virtual machine.
[06:40] Variables in Python do not store raw bits directly inside a rigid memory slot like in C. Instead, Python uses object references. The identifier points to an integer object in dynamic heap memory.
[08:10] Let's look at algorithmic complexity. If an algorithm tests every integer up to n, that's linear time O(n). If it divides the search interval in half at every step, that's binary bisection search in logarithmic time O(log n).
[10:30] As we write our first programs, remember: syntax errors are easy to catch because the interpreter stops immediately. Semantic bugs, where your program runs but calculates the wrong answer, are where true debugging begins.
[12:15] Next lecture, we will explore conditionals, branching, and string manipulation.`,
  },
  {
    id: 'yt-veritasium-physics',
    platform: 'youtube',
    platformLabel: 'YouTube',
    title: 'Veritasium: The Bizarre Physics of Fire Tornadoes',
    author: 'Veritasium (Derek Muller)',
    url: 'https://www.youtube.com/watch?v=mU_XQ3Fp37E',
    duration: '11:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=500&auto=format&fit=crop&q=80',
    category: 'Physics & Thermodynamics',
    keyTopics: ['Vorticity Conservation', 'Angular Momentum', 'Thermal Updrafts', 'Coriolis & Boundary Layers'],
    transcript: `[00:00] Today we are investigating one of the rarest and most dangerous phenomena in nature: the fire tornado, or pyrogenic vortex.
[00:28] Unlike a standard campfire where heat rises in turbulent, chaotic plumes, a fire vortex exhibits coherent, concentrated rotational motion.
[01:05] Why does this happen? The physics comes down to conservation of angular momentum, expressed as L = m * v * r.
[01:45] When surrounding air has even a slight tangential draft or ambient vorticity, and cold air is sucked inwards towards the blazing core, the radius r shrinks drastically.
[02:30] Just like an ice skater pulling in their arms to spin faster, the tangential velocity v must spike dramatically to preserve angular momentum.
[03:20] In our laboratory wind chamber, we surround kerosene flames with slotted cylindrical baffles that impart gentle clockwise air circulation.
[04:15] Watch what happens when the hot updraft accelerates: the flame instantly stretches from 30 centimeters tall into a towering 3-meter column of spinning fire!
[05:40] Notice the sound change: the combustion rate increases by over 300% because the intense central vortex pulls oxygen directly into the fuel vapor layer.
[07:10] In catastrophic forest fires, such as the 2003 Canberra firestorm or the Carr fire in California, these vortices have generated EF-3 tornado wind speeds exceeding 230 kilometers per hour.
[09:00] Understanding vorticity generation and boundary-layer fluid dynamics allows wildfire meteorologists to predict where pyrocumulonimbus clouds will form.
[10:45] Thank you for watching, and remember to respect the immense power of thermodynamic convective vortices.`,
  },
  {
    id: 'fb-meta-ai',
    platform: 'facebook',
    platformLabel: 'Facebook Video',
    title: 'Meta AI: Self-Supervised Vision Transformers & Robotics Research',
    author: 'Meta AI Research (FAIR)',
    url: 'https://www.facebook.com/MetaAI/videos/892341209847123',
    duration: '08:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80',
    category: 'Artificial Intelligence',
    keyTopics: ['Self-Supervised Learning', 'DINO & Masked Autoencoders', 'Vision Transformers', 'Embodied Spatial AI'],
    transcript: `[00:00] Today we are unveiling our latest breakthroughs in self-supervised computer vision and embodied spatial robotics.
[00:35] For over a decade, computer vision required millions of manually annotated bounding boxes and category labels.
[01:10] With self-supervised learning, models learn directly from raw video feeds without any human annotations, by solving masked autoencoding tasks.
[01:50] The system obscures 75% of video patches and forces a Vision Transformer backbone to predict the missing semantic pixels across spatial time dimensions.
[02:40] As a result, the model naturally discovers 3D depth, surface normals, and object boundaries purely from temporal motion cues.
[03:30] When applied to robot arms manipulating fragile glassware, the robot adapts to unfamiliar lighting and specular reflections with zero manual recalibration.
[05:00] In benchmark evaluations, this self-supervised representations achieved state-of-the-art results on zero-shot segmentation and optical flow estimation.
[06:20] We are open-sourcing the PyTorch weights and training scripts to accelerate global research in embodied spatial intelligence.
[07:45] Check the link in the description for the full preprint paper and GitHub repository.`,
  },
  {
    id: 'vimeo-ted-ken',
    platform: 'vimeo',
    platformLabel: 'Vimeo Video',
    title: 'TED: The Architecture of Innovation and Human Creativity',
    author: 'TED Talks on Vimeo',
    url: 'https://vimeo.com/67019023',
    duration: '18:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=80',
    category: 'Education & Innovation',
    keyTopics: ['Divergent Thinking', 'Education Systems', 'Curiosity & Play', 'Interdisciplinary Synthesis'],
    transcript: `[00:00] Good morning. It's wonderful to be here discussing the future of human creativity and education.
[00:40] My contention is that creativity now is as important in education as literacy, and we should treat it with the same status.
[01:30] All children have immense, extraordinary capacities for innovation. And we squander them, pretty ruthlessly.
[02:45] Picasso once said that all children are born artists. The problem is how to remain an artist once we grow up.
[04:10] If you're not prepared to be wrong, you will never come up with anything original. By the time children become adults, most have lost that capacity: they have become frightened of being wrong.
[06:00] Every education system on Earth has the same hierarchy of subjects. At the top are mathematics and languages, then the humanities, and at the bottom are the arts.
[08:20] Why? Because public education systems were created in the 19th century to meet the industrial needs of manufacturing economies.
[11:00] What we need now is a radical rethink of human capacity: fostering divergent thinking, celebrating interdisciplinary connections, and nurturing curiosity.
[14:30] Our task is to educate a child's whole being, so they can navigate a future we may never see. Thank you very much.`,
  },
  {
    id: 'tiktok-quantum-physics',
    platform: 'tiktok',
    platformLabel: 'TikTok / Short Video',
    title: 'Quantum Computing Qubits Explained in 60 Seconds',
    author: '@QuantumExplorers (Harvard Physics Lab)',
    url: 'https://www.tiktok.com/@quantumexplorers/video/719283746192837',
    duration: '01:05',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80',
    category: 'Quantum Computing',
    keyTopics: ['Qubits vs Classical Bits', 'Superposition', 'Bloch Sphere', 'Quantum Entanglement'],
    transcript: `[00:00] In classical computers, a bit is like a light switch: it is either completely OFF as a 0, or ON as a 1.
[00:12] But in a quantum computer, a qubit can exist in a superposition of both 0 and 1 simultaneously!
[00:25] Imagine a sphere called the Bloch Sphere: classical bits only exist at the north pole (0) or south pole (1).
[00:36] A qubit can be anywhere along the surface of the sphere, represented by complex amplitudes alpha and beta.
[00:48] When you entangle 50 qubits, the system can explore 2 to the power of 50 states at the same time: that's over one quadrillion simultaneous calculations!
[00:58] This is how quantum algorithms will simulate new room-temperature superconductors and crack complex cryptography. Follow for part 2!`,
  },
];
