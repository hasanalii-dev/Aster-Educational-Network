import os
import glob
import re

TARGET_DIR = "src/pages/admin/sections"

REPLACEMENTS = {
    # Backgrounds
    r'\bbg-white\b': 'bg-[#111111]',
    r'\bbg-\[\#F8F9FA\]\b': 'bg-[#0a0a0a]',
    r'\bbg-\[\#F4F6F8\]\b': 'bg-white/5',
    r'\bhover:bg-\[\#F4F6F8\]\b': 'hover:bg-white/10',
    r'\bbg-gray-50\b': 'bg-white/5',
    r'\bhover:bg-gray-50\b': 'hover:bg-white/10',
    
    # Borders
    r'\bborder-\[\#E5E7EB\]\b': 'border-white/5',
    r'\bborder-gray-200\b': 'border-white/5',
    r'\bborder-b-\[\#E5E7EB\]\b': 'border-b-white/5',
    r'\bdivide-\[\#E5E7EB\]\b': 'divide-white/5',
    r'\bdivide-gray-200\b': 'divide-white/5',

    # Text Colors
    r'\btext-\[\#15283D\]\b': 'text-white',
    r'\btext-gray-900\b': 'text-white',
    r'\btext-\[\#5C5C61\]\b': 'text-white/60',
    r'\btext-gray-500\b': 'text-white/60',
    r'\btext-\[\#A0AEC0\]\b': 'text-white/40',
    r'\btext-gray-400\b': 'text-white/40',
    
    # Shadows
    r'\bshadow-sm\b': 'shadow-none',
    r'\bshadow-md\b': 'shadow-none',
    r'\bhover:shadow-md\b': 'hover:shadow-none',
    r'\bshadow-lg\b': 'shadow-2xl shadow-black/50',
}

def migrate_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for pattern, replacement in REPLACEMENTS.items():
        content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")
    else:
        print(f"No changes: {filepath}")

def main():
    files = glob.glob(os.path.join(TARGET_DIR, "*.tsx"))
    for file in files:
        migrate_file(file)

if __name__ == "__main__":
    main()
