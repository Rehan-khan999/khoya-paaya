

# Plan: Restore Scrollbar Design & Adjust Panel Position

## What You Want

1. **Restore the previous scrollbar design** - The nice styled Radix UI scrollbar instead of the basic native scrollbar
2. **Move chat panel 40px to the right** - Closer to the genie, but only if scrolling still works

## Why This Will Work

The scrolling issue was caused by the Three.js canvas (z-index 60) being **above** the chat panel (z-index 50), blocking scroll events. Since we fixed this by raising the chat panel to z-index 70, the panel is now **on top of the canvas** and will receive scroll events regardless of position.

Moving 40px right is safe because the panel's z-index is higher than the canvas.

## Changes

### File: `src/components/GenieChatPanel.tsx`

**1. Restore Radix UI ScrollArea import:**
```typescript
import { ScrollArea } from '@/components/ui/scroll-area';
```

**2. Update position calculation (line 95):**
```typescript
// Change genieAreaWidth from 418 to 378 (40px closer to genie)
const genieAreaWidth = 378;
```

**3. Replace native div scroll with Radix ScrollArea:**

Replace the current native scrollable div:
```typescript
<div 
  key={scrollMountKey}
  ref={scrollAreaRef}
  className="h-[280px] p-2.5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
>
```

With the styled Radix ScrollArea:
```typescript
<ScrollArea 
  key={scrollMountKey}
  className="h-[280px] p-2.5"
  ref={scrollAreaRef}
>
```

**4. Keep the layout reflow logic** to ensure the ScrollArea initializes properly when the panel becomes visible.

## Summary

| Change | Before | After |
|--------|--------|-------|
| Scrollbar style | Native CSS thin scrollbar | Radix UI styled scrollbar |
| Panel distance from genie | 418px gap | 378px gap (40px closer) |
| Scrolling | Works (z-index 70) | Will still work (z-index 70) |

