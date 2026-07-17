const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'src/pages/admin/sections');

const REPLACEMENTS = [
    // Backgrounds
    [/\bbg-white\b/g, 'bg-[#111111]'],
    [/\bbg-\[\#F8F9FA\]\b/g, 'bg-[#0a0a0a]'],
    [/\bbg-\[\#F4F6F8\]\b/g, 'bg-white/5'],
    [/\bhover:bg-\[\#F4F6F8\]\b/g, 'hover:bg-white/10'],
    [/\bbg-gray-50\b/g, 'bg-white/5'],
    [/\bhover:bg-gray-50\b/g, 'hover:bg-white/10'],
    
    // Borders
    [/\bborder-\[\#E5E7EB\]\b/g, 'border-white/5'],
    [/\bborder-gray-200\b/g, 'border-white/5'],
    [/\bborder-b-\[\#E5E7EB\]\b/g, 'border-b-white/5'],
    [/\bdivide-\[\#E5E7EB\]\b/g, 'divide-white/5'],
    [/\bdivide-gray-200\b/g, 'divide-white/5'],

    // Text Colors
    [/\btext-\[\#15283D\]\b/g, 'text-white'],
    [/\btext-gray-900\b/g, 'text-white'],
    [/\btext-\[\#5C5C61\]\b/g, 'text-white/60'],
    [/\btext-gray-500\b/g, 'text-white/60'],
    [/\btext-\[\#A0AEC0\]\b/g, 'text-white/40'],
    [/\btext-gray-400\b/g, 'text-white/40'],
    
    // Shadows
    [/\bshadow-sm\b/g, 'shadow-none'],
    [/\bshadow-md\b/g, 'shadow-none'],
    [/\bhover:shadow-md\b/g, 'hover:shadow-none'],
    [/\bshadow-lg\b/g, 'shadow-2xl shadow-black/50']
];

function migrateFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    const originalContent = content;

    for (const [pattern, replacement] of REPLACEMENTS) {
        content = content.replace(pattern, replacement);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated: ${filepath}`);
    } else {
        console.log(`No changes: ${filepath}`);
    }
}

function main() {
    const files = fs.readdirSync(TARGET_DIR).filter(file => file.endsWith('.tsx'));
    for (const file of files) {
        migrateFile(path.join(TARGET_DIR, file));
    }
}

main();
