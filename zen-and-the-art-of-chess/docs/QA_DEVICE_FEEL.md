# QA Device Feel Checklist

This checklist is the gate for input consistency, navigation determinism, and interaction stability.

## 1) D-pad/Input Spam Test (SYN equivalent nav stress)

- Run 50 rapid directional inputs in a dense interactive screen.
- Verify every input produces a visible state change or explicit boundary feedback.
- Verify no skipped focus transitions.
- Verify no duplicate action firing from a single key press.

Pass criteria:
- 0 dropped inputs.
- 0 double-triggered inputs.

## 2) Hold Repeat Test

- Hold directional input for 3 seconds on list/grid style navigation.
- Verify repeat cadence stays steady across pages and modals.
- Verify behavior remains consistent after switching pages and returning.

Pass criteria:
- Repeat cadence is stable and does not accelerate/decelerate unexpectedly.
- No input stalls while held.

## 3) Overlay Stack Test

- Open primary picker overlay.
- Open nested confirm overlay.
- Back out one level at a time.
- Verify focus returns to previous focus target at each pop.

Pass criteria:
- Focus restoration is deterministic at each close step.
- No null focus state after overlay close.

## 4) Page Switch State Restore Test

- Navigate PAT -> SYN -> PAT -> SYN equivalent routes.
- Preserve focus target and local selection state for each page.
- Validate persistence after soft reload.

Pass criteria:
- Focus and selection restore exactly to prior values.
- No default-reset unless intentionally requested.

## 5) Latency and Frame Budget Test

- Capture average and peak frame timing while interacting continuously.
- Verify interaction response remains visually immediate under load.

Targets:
- Average frame time < 16.7ms.
- Max frame time < 33ms.

## Regression Cases

1. Timeout winner logic:
- White timeout => black wins.
- Black timeout => white wins.

2. Voice auto-speak behavior:
- With `autoSpeak=false`, no speech should trigger for success or error responses.

3. Accuracy chart rendering:
- Single data point must render centered and without divide-by-zero artifacts.
