// Reel props (the JSON file passed with --props). Times are in SECONDS, relative to the scene start.
// Any "at" left out is spread automatically across the scene, so after fit.mjs changes a scene's
// duration the reveals still land inside it.

export type Sticker = {
  illus: string; // name from illus.json (shop, hall, plate, truck, …)
  x: number; // centre x in px (0–1080)
  y: number; // centre y in px (0–1920)
  size?: number; // px, default 260
  at?: number;
  anim?: "pop" | "drop" | "drive" | "float" | "wiggle";
  rot?: number;
};

type Base = {
  dur: number; // seconds (fit.mjs rewrites this from the voice)
  vo?: string; // the line spoken over this scene (documentation + voice prompt)
  kicker?: string; // small mono label, e.g. "// CATERERS"
  head?: string; // headline; wrap words in *stars* for cyan
  sub?: string; // supporting line
  stickers?: Sticker[];
  ghost?: string; // huge outline word behind the scene (noir style), e.g. "WALK"
  cap?: string; // karaoke caption at the bottom (Roman Hinglish), current word highlighted
  meterStep?: number; // top progress meter fills to this step when the scene starts
};

export type Scene =
  | (Base & { type: "hook"; pill?: string })
  | (Base & { type: "search"; prefix?: string; words: string[]; suffix?: string })
  | (Base & {
      type: "compare";
      good: { title: string; url: string; badge: string };
      bad: { title: string; url: string; badge: string };
      badAt?: number;
    })
  | (Base & { type: "list"; items: { illus: string; title: string; sub?: string; at?: number }[] })
  | (Base & {
      type: "phone";
      site: { name: string; tagline: string; buttons?: [string, string]; form?: string; label?: string };
    })
  | (Base & { type: "chat"; title?: string; messages: { from: "customer" | "shop"; text: string; at?: number }[] })
  | (Base & { type: "stat"; value: number; prefix?: string; suffix?: string; decimals?: number; label: string; source: string })
  | (Base & {
      type: "versus";
      left: { title: string; items: string[] };
      right: { title: string; items: string[] };
    })
  | (Base & { type: "flow"; steps: { illus: string; label: string; at?: number }[] })
  | (Base & {
      type: "illus";
      items: { illus: string; label?: string; at?: number; cross?: number; bad?: boolean }[];
    })
  | (Base & { type: "offer"; title: string; ribbon?: string; illus?: string })
  | (Base & { type: "plan"; name: string; price: string; note?: string; badge?: string; items: string[] })
  | (Base & { type: "cta"; line?: string })
  | (Base & {
      type: "feature";
      num?: string; // "01" … shown before the headline
      screen?: { badge?: string; illus?: string; title?: string; button?: string };
      cards?: { label: string; text: string; illus?: string; side?: "left" | "right"; at?: number }[];
    });

export type ReelProps = {
  theme?: "navy" | "light" | "noir"; // rotate across days for variety
  meter?: { label: string; total: number }; // top bar progress meter (e.g. "WEBSITE CHECKLIST", 5)
  handle?: string; // top-left label in the top bar, default "barkati.in"
  voice?: string; // file in public/, e.g. "vo1.wav"; omit for SFX-only
  scenes: Scene[];
};
