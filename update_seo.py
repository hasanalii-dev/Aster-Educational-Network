import os
import re
import glob

pages_dir = r'c:\Users\hasan\.gemini\antigravity-ide\scratch\aster-pakistan\src\pages'
files = glob.glob(os.path.join(pages_dir, '*.tsx'))

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # check if useDocumentTitle is used
    if 'useDocumentTitle' in content:
        # extract title
        m = re.search(r'useDocumentTitle\(([\'\"`])(.*?)\1\)', content)
        if m:
            title = m.group(2)
            
            # replace import
            content = re.sub(r'import \{.*?useDocumentTitle.*?\} from [\'\"]@/hooks[\'\"]\n?', 'import { SEO } from \'@/components/seo/SEO\'\n', content)
            
            # remove hook call
            content = re.sub(r'\s*useDocumentTitle\([^\)]+\)', '', content)
            
            # find first return ( and inject <SEO>
            # this is a bit brittle but for standard page components it works
            def replace_return(match):
                return match.group(1) + '\n            <SEO title=\"' + title + '\" />'
            
            content = re.sub(r'(return\s*\(\s*<[^>]+>)', replace_return, content, count=1)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {os.path.basename(filepath)}')
