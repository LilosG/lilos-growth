#!/bin/bash
# Color Migration Script for Lilos Growth
# Replaces hard-coded hex colors with Tailwind design tokens
# Run from project root: bash scripts/migrate-colors.sh

set -e

echo "=== Lilos Growth Color Migration ==="
echo ""

# Create backup
BACKUP_DIR=".backups/color-migration-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Creating backup in $BACKUP_DIR..."
cp -r src "$BACKUP_DIR/"
echo "Backup complete."
echo ""

# Define replacements
# Format: "old_pattern|new_pattern"
declare -a REPLACEMENTS=(
  # Primary color variations
  'bg-\[#f56b2a\]|bg-primary'
  'text-\[#f56b2a\]|text-primary'
  'border-\[#f56b2a\]|border-primary'
  'ring-\[#f56b2a\]|ring-primary'
  'shadow-\[#f56b2a\]|shadow-primary'
  
  # Primary hover (darker orange)
  'hover:bg-\[#f34e00\]|hover:bg-primary-dark'
  'hover:bg-\[#e65c1e\]|hover:bg-primary-hover'
  
  # Secondary color (dark blue)
  'bg-\[#253242\]|bg-secondary'
  'text-\[#253242\]|text-secondary'
  'bg-\[#1f2d3d\]|bg-secondary'
  'text-\[#1f2d3d\]|text-heading'
  
  # Secondary hover
  'hover:bg-\[#27394b\]|hover:bg-secondary-hover'
  
  # Secondary light (gradient end)
  'to-\[#2e4159\]|to-secondary-light'
  'from-\[#253242\]|from-secondary'
  
  # Focus ring colors
  'focus:ring-\[#f56b2a\]|focus:ring-primary'
  'focus-visible:ring-\[#f56b2a\]|focus-visible:ring-primary'
  
  # Border accent on dropdowns
  'before:bg-\[#f56b2a\]|before:bg-primary'
  'group-hover/sub:bg-\[#f56b2a\]|group-hover/sub:bg-primary'
)

echo "Applying color replacements to src/**/*.astro files..."
echo ""

for pair in "${REPLACEMENTS[@]}"; do
  OLD=$(echo "$pair" | cut -d'|' -f1)
  NEW=$(echo "$pair" | cut -d'|' -f2)
  
  # Count occurrences before
  COUNT=$(grep -r "$OLD" src/ --include="*.astro" 2>/dev/null | wc -l | tr -d ' ')
  
  if [ "$COUNT" -gt 0 ]; then
    echo "  Replacing: $OLD → $NEW ($COUNT occurrences)"
    
    # Use find + sed for cross-platform compatibility
    find src -name "*.astro" -type f -exec sed -i.bak "s/$OLD/$NEW/g" {} \;
    
    # Clean up .bak files
    find src -name "*.bak" -type f -delete
  fi
done

echo ""
echo "=== Migration Complete ==="
echo ""
echo "Next steps:"
echo "1. Review changes: git diff src/"
echo "2. Test the dev server: npm run dev"
echo "3. If everything works, apply the new config files:"
echo "   mv tailwind.config.js.new tailwind.config.js"
echo "   mv src/assets/styles/tailwind.css.new src/assets/styles/tailwind.css"
echo "4. Commit changes: git add -A && git commit -m 'refactor: migrate to design system tokens'"
echo ""
echo "Backup location: $BACKUP_DIR"
