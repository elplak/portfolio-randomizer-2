type Theme = {
    bg: string;
    text: string;
    primary: string;
    secondary: string;
    font: string;
    radius: string;
    shadow: string;
};

export const themes: Theme[] = [
    {
        bg: "#ffffff",
        text: "#111827",
        primary: "#2563eb",
        secondary: "#1e40af",
        font: "'Inter', sans-serif",
        radius: "12px",
        shadow: "0 4px 16px rgba(0,0,0,0.06)"
    },
    {
        bg: "#f8f9fa",
        text: "#1f2937",
        primary: "#0d9488",
        secondary: "#115e59",
        font: "'Poppins', sans-serif",
        radius: "16px",
        shadow: "0 6px 20px rgba(0,0,0,0.08)"
    },
    {
        bg: "#fafafa",
        text: "#1a1a1a",
        primary: "#f59e0b",
        secondary: "#b45309",
        font: "'Outfit', sans-serif",
        radius: "20px",
        shadow: "0 8px 24px rgba(0,0,0,0.1)"
    },
    {
        bg: "#1a1a1a",
        text: "#f3f4f6",
        primary: "#e11d48",
        secondary: "#9f1239",
        font: "'Roboto Slab', serif",
        radius: "10px",
        shadow: "0 8px 20px rgba(0,0,0,0.4)"
    },
    {
        bg: "#fef3c7",
        text: "#78350f",
        primary: "#d97706",
        secondary: "#92400e",
        font: "'Merriweather', serif",
        radius: "14px",
        shadow: "0 6px 18px rgba(0,0,0,0.15)"
    },
    {
        bg: "#0f172a",
        text: "#e2e8f0",
        primary: "#38bdf8",
        secondary: "#0284c7",
        font: "'Fira Sans', sans-serif",
        radius: "18px",
        shadow: "0 10px 28px rgba(0,0,0,0.6)"
    }
];

function hslToHex(hue: number, saturationPercent: number, lightnessPercent: number): string {
    saturationPercent /= 100;
    lightnessPercent /= 100;
    const hueOffset = (n: number) => (n + hue / 30) % 12;
    const chroma = saturationPercent * Math.min(lightnessPercent, 1 - lightnessPercent);
    const channel = (n: number) =>
        lightnessPercent - chroma * Math.max(-1, Math.min(hueOffset(n) - 3, Math.min(9 - hueOffset(n), 1)));
    return (
        "#" +
        [channel(0), channel(8), channel(4)]
            .map((x) =>
                Math.round(x * 255)
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("")
    );
}

function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function luminance([r, g, b]: [number, number, number]): number {
    const linearRgb = [r, g, b].map((value) => {
        let v = value / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * linearRgb[0] + 0.7152 * linearRgb[1] + 0.0722 * linearRgb[2];
}

function contrastRatio(hex1: string, hex2: string): number {
    const l1 = luminance(hexToRgb(hex1));
    const l2 = luminance(hexToRgb(hex2));
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function pickTextColor(bgHex: string): string {
    const black = "#000000";
    const white = "#ffffff";
    const ratioBlack = contrastRatio(bgHex, black);
    const ratioWhite = contrastRatio(bgHex, white);
    return ratioBlack >= ratioWhite ? black : white;
}

export function generateRandomTheme(): Theme {
    let theme: Theme;
    let tries = 0;

    do {
        const hue = Math.floor(Math.random() * 360);
        const isDark = Math.random() < 0.5;
        const bgL = isDark ? 12 + Math.random() * 10 : 92 + Math.random() * 5;
        const bgHex = hslToHex(hue, 25, bgL);
        const primaryHex = hslToHex(hue, 70, isDark ? 55 : 45);
        const secondaryHex = hslToHex((hue + 30) % 360, 70, isDark ? 60 : 40);
        const textColor = pickTextColor(bgHex);

        theme = {
            bg: bgHex,
            text: textColor,
            primary: primaryHex,
            secondary: secondaryHex,
            font: [
                "'Inter'",
                "'Poppins'",
                "'Outfit'",
                "'Fira Sans'",
                "'Merriweather'"
            ][Math.floor(Math.random() * 5)] + ", sans-serif",
            radius: `${10 + Math.floor(Math.random() * 12)}px`,
            shadow: `0 ${4 + Math.random() * 10}px ${16 + Math.random() * 20}px rgba(0,0,0,${isDark ? 0.5 : 0.1})`
        };

        tries++;
    } while (!isThemeAccessible(theme) && tries < 20);

    return theme;
}

export function applyRandomDesign(): void {
    let theme: Theme;
    if (Math.random() < 0.5) {
        theme = themes[Math.floor(Math.random() * themes.length)];
        if (!isThemeAccessible(theme)) {
            console.warn("theme was not accessible:", theme);
            theme = generateRandomTheme();
        }
    } else {
        theme = generateRandomTheme();
    }

    document.body.style.setProperty("--primary", theme.primary);
    document.body.style.setProperty("--secondary", theme.secondary);
    document.body.style.setProperty("--bg", theme.bg);
    document.body.style.setProperty("--text", theme.text);
    document.body.style.fontFamily = theme.font;
    document.body.style.setProperty("--radius", theme.radius);
    document.body.style.setProperty("--shadow", theme.shadow);
    document.body.style.setProperty("--section-bg", theme.bg);
    document.body.style.setProperty("--section-text", theme.text);
    document.body.style.setProperty("--card-bg", theme.bg);
    document.body.style.setProperty("--card-text", theme.text);
}

function isThemeAccessible(theme: Theme): boolean {
    const minContrast = 4.5;
    return (
        contrastRatio(theme.bg, theme.text) >= minContrast &&
        contrastRatio(theme.bg, theme.primary) >= minContrast &&
        contrastRatio(theme.bg, theme.secondary) >= minContrast &&
        contrastRatio(theme.text, theme.primary) >= minContrast
    );
}
