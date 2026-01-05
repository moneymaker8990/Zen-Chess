# Chess Pattern Content Template

This document provides a canonical template for creating high-quality, complete pattern entries in `enhancedPatterns.ts`.

## Required Fields

### 1. Introduction (min 50 characters)
A welcoming, contextual opener that hooks the reader and explains **why** this pattern matters.

**Example:**
```
In chess, controlling the center is like owning the high ground in battle. The central files (e and d) are highways for your pieces, and the player who dominates them often dictates the game's flow.
```

### 2. Key Ideas (at least 2)
Concrete, actionable principles that define the pattern. Each should be a specific tactical or strategic concept.

**Example:**
```typescript
keyIdeas: [
  "Central pawns (e4, d4, e5, d5) give your pieces maximum scope and mobility",
  "Knights and bishops posted in the center attack squares in all directions",
  "Central control often leads to space advantage and easier piece coordination",
],
```

### 3. Summary (min 30 characters)
A single sentence that captures the essence of the pattern. Think "if you remember nothing else, remember this."

**Example:**
```
Control the center with pawns and pieces, and you control the game.
```

### 4. Key Takeaways (at least 2)
High-level insights that translate into practical play. These are "what you should do" or "what to watch for."

**Example:**
```typescript
keyTakeaways: [
  "Fight for central squares early—don't cede them without a plan",
  "Pieces are more active when centralized; rooks on open central files are especially powerful",
],
```

### 5. Memory Tip (recommended)
A vivid, memorable image or phrase that helps the pattern stick.

**Example:**
```
"Center = King of the Hill. Whoever sits on the hill sees—and controls—everything."
```

## Optional but Encouraged

### Practice Positions
If the pattern has specific training exercises or famous examples, include them.

```typescript
practicePositions: [
  {
    fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1",
    description: "After 1.d4, how does Black contest the center?"
  }
]
```

## Tone Guidelines

- **Instructional but friendly**: You're a coach, not a textbook
- **Concrete over abstract**: "Control central squares" beats "achieve spatial superiority"
- **Encouraging**: Assume the reader wants to improve and is excited to learn
- **Narrative when possible**: Weave in chess history, grandmaster games, or tactical stories

## Examples of Excellent Pattern Entries

### Complete Example

```typescript
{
  id: 'center-control',
  name: 'Center Control',
  introduction: `In chess, controlling the center is like owning the high ground in battle. 
The central files (e and d) are highways for your pieces, and the player who dominates them 
often dictates the game's flow. Every great game starts with a fight for these squares.`,
  keyIdeas: [
    "Central pawns (e4, d4, e5, d5) give your pieces maximum scope",
    "Knights and bishops posted in the center attack squares in all directions",
    "Central control often leads to space advantage and easier coordination",
  ],
  summary: "Control the center with pawns and pieces, and you control the game.",
  keyTakeaways: [
    "Fight for central squares early—don't cede them without a plan",
    "Pieces are more active when centralized; open central files are ideal for rooks",
  ],
  memoryTip: "Center = King of the Hill. Whoever sits on the hill sees—and controls—everything.",
}
```

## Common Pitfalls to Avoid

❌ **Too abstract**: "The pattern involves optimal piece placement for strategic objectives"
✅ **Concrete**: "Place your knights on central squares like e5 or d5 for maximum attacking range"

❌ **Too brief**: "Good opening" (not actionable)
✅ **Specific**: "In the Italian Game, develop Bc4 to pressure f7 and prepare castling"

❌ **Jargon-heavy**: "Hypermodern fianchetto structures facilitate central undermining"
✅ **Plain language**: "Develop your bishop to g7, attack the center from the side, then strike with pawns"

## Completeness Score

A pattern is **90%+ complete** if it has:
- ✅ Meaningful introduction (50+ chars)
- ✅ At least 2 key ideas
- ✅ Clear summary (30+ chars)
- ✅ At least 2 key takeaways
- ✅ A memory tip
- ✅ Consistent, encouraging tone throughout

Use this checklist when writing new patterns or auditing existing ones.

