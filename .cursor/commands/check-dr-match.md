# Check-to-DR exact matching

**Not used in this portfolio repository.** This was a finance helper for another app (subset-sum matching of checks vs DRs).

If you need the algorithm for an unrelated task, implement it in a **throwaway script** under **`scripts/`** with **your** data structures — do not assume Vibram or DR domain models exist here.

---

## Minimal subset-sum reference (generic)

```js
function subsets(arr) {
  const out = [];
  for (let mask = 1; mask < 1 << arr.length; mask++)
    out.push(arr.filter((_, i) => mask & (1 << i)));
  return out;
}
```

Use only when the user supplies explicit amounts and asks for combinations.
