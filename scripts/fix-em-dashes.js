#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixEmDashes() {
  const markdownDir = path.join(__dirname, '..', 'data', 'content', 'markdown');
  
  function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace em dashes (—) with regular hyphens (-)
    // Only replace in text content, not in code blocks
    const lines = content.split('\n');
    let inCodeBlock = false;
    
    const fixedLines = lines.map((line) => {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      
      // Don't replace in code blocks
      if (inCodeBlock) {
        return line;
      }
      
      // Replace em dashes in regular text
      return line.replace(/—/g, '-');
    });
    
    content = fixedLines.join('\n');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      const count = (originalContent.match(/—/g) || []).length;
      return count;
    }
    return 0;
  }
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    let totalFixed = 0;
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        totalFixed += walkDir(filePath);
      } else if (file.endsWith('.mdx')) {
        const fixed = processFile(filePath);
        if (fixed > 0) {
          console.log(`Fixed ${fixed} em dash(es) in ${path.relative(process.cwd(), filePath)}`);
        }
        totalFixed += fixed;
      }
    }
    
    return totalFixed;
  }
  
  const totalFixed = walkDir(markdownDir);
  console.log(`\n✅ Total: Fixed ${totalFixed} em dash(es)`);
}

fixEmDashes();

