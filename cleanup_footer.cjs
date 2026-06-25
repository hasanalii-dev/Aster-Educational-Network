const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'layout', 'Footer.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove marqueeRef
content = content.replace(/const marqueeRef = useRef<HTMLDivElement>\(null\)\r?\n/g, '');

// 2. Remove marquee from GSAP checks
content = content.replace(/const marquee = marqueeRef\.current\r?\n/g, '');
content = content.replace(/if \(!footer \|\| !content \|\| !marquee\) return/g, 'if (!footer || !content) return');

// 3. Remove textTl animation block
content = content.replace(/\s*\/\/ 2\. Marquee Parallax[\s\S]*?textTl = gsap\.fromTo\(marquee,[\s\S]*?\}\s*\)\r?\n/g, '\n');

// 4. Remove textTl.kill()
content = content.replace(/\s*textTl\.kill\(\)\r?\n/g, '\n');

// 5. Remove marqueeItems array
content = content.replace(/\s*\/\/ Create an array to loop the marquee text seamlessly\r?\n\s*const marqueeItems = Array\(4\)\.fill\(null\)\r?\n/g, '\n');

// 6. Remove HTML block
content = content.replace(/\s*\{\/\* === MASSIVE MARQUEE SLOGAN \(Light Source Effect\) === \*\/\}[\s\S]*?\{\/\* Infinite Marquee Track \*\/\}[\s\S]*?<\/div>\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n/g, '\n');

// 7. Remove CSS block
content = content.replace(/\/\* =========================================\r?\n \* MARQUEE & LIGHTING EFFECT\r?\n \* ========================================= \*\/[\s\S]*?@keyframes scrollMarqueeFooter \{\r?\n  0% \{ transform: translateX\(0\); \}\r?\n  100% \{ transform: translateX\(-100%\); \}\r?\n\}\r?\n/g, '');

// 8. Remove responsive marquee styles
content = content.replace(/\s*\.footer-marquee-text \{ font-size: 18vw; \}\r?\n\s*\.footer-marquee-separator \{ font-size: 6vw; margin: 0 6vw; \}\r?\n/g, '\n');


fs.writeFileSync(filePath, content, 'utf8');
console.log('Footer.tsx cleaned up.');
