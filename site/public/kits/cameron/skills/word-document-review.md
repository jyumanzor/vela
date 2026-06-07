# Word Document Review

Use this skill when reviewing or revising a `.docx` or Word-targeted draft.

## Core Rule

Do not treat visible body text as the whole document. Word files often carry important content in comments, tracked changes, headers, footers, tables, text boxes, footnotes, captions, and styles.

## Review Passes

1. **Structure**
   - Confirm the document has the expected sections.
   - Check heading hierarchy and numbering.
   - Look for orphan sections or repeated headings.

2. **Comments And Track Changes**
   - Read every unresolved comment.
   - Check whether tracked changes are still present.
   - Do not resolve a comment unless the underlying issue is actually addressed.

3. **Tables And Figures**
   - Verify table titles, source notes, and row/column labels.
   - Check that figure captions match the figure.
   - Confirm numbers are traceable.

4. **Headers, Footers, And Front Matter**
   - Check page numbers.
   - Check confidentiality labels, dates, author names, and version labels.
   - Confirm front matter and body agree.

5. **Final Reading**
   - Read like a skeptical external reviewer.
   - Flag vague claims, unsupported statistics, and undefined acronyms.
   - Check that the document still answers the original prompt.

## Editing Rules

- Preserve existing styles unless the user asks for a restyle.
- Keep reviewer intent visible in the build log.
- Separate factual fixes from judgment calls.
- Never silently invent citations, sources, or reviewer preferences.

## Closeout Checklist

- [ ] All comments reviewed
- [ ] Track changes state checked
- [ ] Tables and figures checked
- [ ] Headers and footers checked
- [ ] Citations and provenance checked
- [ ] `_BUILD_LOG.md` updated with what changed and what remains open
