# virtual POS - Requirements Document

## Iteration 3

## Project Description
Virtual POS simulating payment POS terminals

## User Feedback Incorporated
it shows empty screen. need to fix

## Refined Requirements
# Technical Specification: Virtual POS Simulator (vPOS) - Iteration 3

## 1. Executive Summary
Iteration 3 focuses on **System Resilience and Terminal Readiness**. Following feedback regarding "empty screen" states, this iteration pivots from pure visual fidelity to **Functional Availability**. We are introducing a robust bootstrapping process, state persistence, and "Smart Defaults" to ensure the simulator is never in an uninitialized state. We continue to build on the **Physicality** and **Observability** goals from Iteration 2.

---

## 2. Addressing User Feedback: "The Empty Screen"
To resolve the reported "empty screen" issue, Iteration 3 implements:
*   **Default Terminal State:** If no configuration is found, the vPOS will auto-initialize with a "Generic Retail" profile.
*   **Loading States:** High-fidelity "Booting" sequences that provide visual feedback during initialization.
*   **Error Boundaries:** Graceful degradation with actionable "Reset Terminal" buttons if the state becomes corrupted.

---

## 3. UI/UX Design Tokens (Realism Update)
We are moving from a generic web UI to a "Hardware-First" design system.

| Category | Token Name | Value | Description |
| :--- | :--- | :--- | :--- |
| **Color** | `pos-chassis-charcoal` | `#2D2D2D` | The matte plastic body of the terminal. |
| **Color** | `lcd-backlight-green` | `#91B33B` | Traditional monochrome LCD screen glow. |
| **Color** | `lcd-text-dark` | `#1A2408` | High-contrast text on LCD screen. |
| **Typography** | `font-family-lcd` | `'VT323', monospace` | Dot-matrix style font for terminal screen. |
| **Spacing** | `keypad-gap` | `12px` | Physical spacing between tactile buttons. |
| **Shadow** | `inset-tactile` | `inset 2px 2px 4px rgba(0,0,0,0.5)` | Creates the "pressed button" effect. |

---

## 4. Component Breakdown

### 4.1. The Terminal Chassis (`TerminalBody`)
*   **Function:** Acts as the wrapper for the hardware simulation.
*   **Logic:** Handles the "Physical Power" state.
*   **Update:** Includes a hardware "Reset" pinhole button to fix stuck states.

### 4.2. The Smart Screen (`LCDDisplay`)
*   **Function:** Renders the current vPOS state.
*   **States:** `BOOTING`, `IDLE/WELCOME`, `PROCESSING`, `TRANSACTION_RESULT`.
*   **Fix:** Implementation of an `EmptyStateView` that triggers if the terminal logic fails to load.

### 4.3. Tactical Keypad (`InputMatrix`)
*   **Function:** Maps physical keyboard events (0-9, Enter, Clear) to vPOS actions.
*   **Visuals:** Buttons flash/depress on keydown.

### 4.4. Observability Side-Car (`DevConsole`)
*   **Function:** Real-time stream of API requests/responses.
*   **Feature:** "Copy as Curl" button for every simulated transaction.

---

## 5. Refined Requirements & Features

### 5.1. Bootstrapping & Persistence (Priority: High)
*   **Requirement:** The app must utilize `localStorage` to remember the terminal's last state (e.g., Merchant ID, Currency).
*   **Fix for "Empty Screen":** If `localStorage` is empty, the app must fetch a `default-config.json` rather than rendering `null`.

### 5.2. Physicality: Network Latency Simulation
*   **Requirement:** Developers can toggle "3G/Slow Connection" to see how their integration handles timeouts and long-polling UI states.
*   **Visual Cue:** An LED indicator on the chassis that blinks amber during network activity.

### 5.3. Observability: State Inspector
*   **Requirement:** A collapsible panel showing the current internal state machine (e.g., `currentState: "AWAITING_PIN"`).

---

## 6. Acceptance Criteria (AC)

*   **AC 1 (Initialization):** On a fresh browser (incognito), the user must see a "Welcome / Insert Card" screen within 2 seconds. No white/empty screens.
*   **AC 2 (Persistence):** If a user enters a custom Merchant ID and refreshes the page, the Merchant ID must remain populated.
*   **AC 3 (Physical Feedback):** Clicking a button on the UI keypad must trigger a CSS `:active` state change and a 10ms audio "click" (optional toggle).
*   **AC 4 (Error Handling):** If an API call to the backend fails, the LCD screen must show "COMMUNICATION ERROR" rather than a JavaScript console error.

---

## 7. Feature Prioritization (Iteration 3)

| Priority | Feature | Impact |
| :--- | :--- | :--- |
| **P0** | **Bootstrap Guard** | Eliminates the "Empty Screen" bug by providing fallback configs. |
| **P0** | **Persistence Engine** | Saves terminal settings across sessions. |
| **P1** | **LCD Visual Overhaul** | Applies Design Tokens for high-fidelity LCD look. |
| **P1** | **API Event Stream** | Shows raw JSON payloads next to the terminal. |
| **P2** | **Keypad Mapping** | Maps physical PC NumPad to the vPOS keypad. |

---

## 8. Technical Constraints
*   **Framework:** React 18 / Tailwind CSS.
*   **State Management:** Context API (to avoid overhead of Redux for this scale).
*   **Asset Management:** All "LCD" fonts must be pre-loaded in the `<head>` to prevent Flash of Unstyled Text (FOUT).

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 3 - 2025-12-28T18:48:33.078Z*
