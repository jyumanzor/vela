#!/bin/bash
# extract-portable-skills.sh
# Copies Tier 1 skills, strips Jenn-specific content
SKILLS_SRC="$HOME/Desktop/~Working/skills"
DEST="$1"

if [ -z "$DEST" ]; then
  echo "Usage: bash scripts/extract-portable-skills.sh <destination>"
  exit 1
fi

mkdir -p "$DEST"

TIER1=(
  "methodology/operating-loop.md"
  "methodology/build-log-protocol.md"
  "methodology/workspace-hygiene.md"
  "methodology/testifying-expert.md"
  "interlocutor/cross-model-review.md"
  "failure-modes/plausible-but-wrong-numbers.md"
  "failure-modes/silent-data-drop.md"
  "failure-modes/ai-data-smoothing.md"
)

for skill in "${TIER1[@]}"; do
  basename=$(basename "$skill")
  cp "$SKILLS_SRC/$skill" "$DEST/$basename"
done

echo "Extracted ${#TIER1[@]} skills to $DEST"
echo "Manual review needed: strip Jenn-specific references from each file"
