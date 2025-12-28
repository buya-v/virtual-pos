# virtual POS - Requirements Document

## Iteration 2

## Project Description
Virtual POS simulating payment POS terminals

## User Feedback Incorporated
Initial iteration - no previous feedback

## Refined Requirements
# Technical Specification: Virtual POS Simulator (vPOS) - Iteration 2

## 1. Executive Summary
Iteration 2 transitions the vPOS from a functional prototype to a high-fidelity simulator. The focus is on **Physicality**—ensuring the digital interface mimics the constraints, delays, and visual cues of hardware—and **Observability**—ensuring developers can see exactly how the internal logic maps to external API calls.

---

## 2. UI/UX Design Tokens
To achieve "UI Realism," we will move away from standard flat design toward a "Semi-Skeuomorphic" aesthetic.

| Token Category | Token Name | Value | Description |
| :--- | :--- | :--- | :--- |
| **Colors** | `color-terminal-body` | `#2D2D2D` | Deep matte charcoal (plastic texture). |
| | `color-lcd-bg` | `#A3B18A` | Classic "Calculator Green" for the display. |
| | `color-lcd-text` | `#1B1B1B` | High-contrast black for LCD characters. |
| | `color-status-success`| `#4CAF50` | LED Green for successful transactions. |
| | `color-status-error` | `#F44336` | LED Red for declines/errors. |
| **Typography** | `font-display` | `'Dot Matrix', monospace` | Used for the LCD screen simulation. |
| | `font-receipt` | `'Courier New', monospace` | Used for the digital receipt pop-up. |
| **Shadows** | `shadow-button-up` | `2px 2px 0px #1A1A1A` | Hard shadow for tactile button look. |
| | `shadow-button-dn` | `inset 2px 2px 0px #000` | Pressed state for buttons. |
| **Animation** | `anim-processing` | `pulse 1.5s infinite` | For the "Processing" state blinking cursor. |

---

## 3. Component Breakdown

### 3.1 The Terminal Chassis (`TerminalContainer`)
*   **Description:** The outer frame of the device.
*   **Tactile Feature:** Beveled edges and a simulated "Card Slot" glow.
*   **Logic:** Responsive wrapper that scales the device while maintaining a fixed aspect ratio (approx. 3:5).

### 3.2 Dynamic LCD Display (`LCDScreen`)
*   **Description:** A 4-line text display simulation.
*   **Functionality:** 
    *   Displays multi-step prompts (e.g., "INSERT CARD" -> "ENTER PIN").
    *   Simulated "Backlight" that dims when the terminal is idle.
    *   Character limit: 20 characters per line.

### 3.3 Haptic Keypad (`PhysicalKeypad`)
*   **Description:** 0-9 keys plus `Cancel` (Red), `Clear` (Yellow), and `Enter` (Green).
*   **Tactile Feature:** 50ms visual "press" state.
*   **Sound (Optional):** Short 'beep' on keydown to mimic hardware feedback.

### 3.4 Operational Inspector (`DevPanel`)
*   **Description:** A slide-out panel to the right of the terminal.
*   **Content:**
    *   **Live Request/Response:** Real-time JSON payloads sent to the backend.
    *   **Internal State:** Shows current stage (e.g., `AWAITING_EMV_DATA`).
    *   **Latency Simulator:** Toggle to add 2s-5s of artificial delay to API calls.

---

## 4. Updated Functional Requirements

| ID | Feature | Description | Priority |
| :--- | :--- | :--- | :--- |
| **F2.1** | **Multi-Input Simulation** | Support for "Insert" (Chip), "Tap" (NFC), and "Swipe" interaction modes. | P0 |
| **F2.2** | **Simulated Latency** | Artificially slow down transitions to match real-world cellular/dial-up POS speeds. | P1 |
| **F2.3** | **Interactive Receipt** | A post-transaction modal that mimics thermal paper, including a "print" animation. | P2 |
| **F2.4** | **Error State Overlays** | Visual representation of hardware errors (e.g., "Paper Out", "No Comms"). | P1 |
| **F2.5** | **State Persistence** | Terminal remembers its "Registered" state on page refresh via LocalStorage. | P2 |

---

## 5. Operational Transparency & Logging
To address the "Operational Transparency" goal, the following logic must be implemented:

1.  **State Machine Visualization:** The `DevPanel` must highlight the active state in the terminal lifecycle (Idle -> Input -> Processing -> Response -> Receipt).
2.  **API Inspection:** Every button click that triggers a network request must be logged in a readable "Sequence Diagram" format within the UI.
3.  **Trace ID Visibility:** The `LCDScreen` should have a hidden "Diagnostic Mode" (triggered by holding '5') that shows the Transaction Trace ID.

---

## 6. Acceptance Criteria (AC)

### AC 1: Tactile Button Logic
*   **Given** I click the "Enter" button.
*   **When** the button is pressed.
*   **Then** the UI should show a CSS `inset` shadow immediately, and the `LCDScreen` should update only after a 100ms "hardware processing" delay.

### AC 2: NFC "Tap" Simulation
*   **Given** the terminal is in "AWAITING_PAYMENT" state.
*   **When** I drag a virtual card over the LCD screen.
*   **Then** the terminal should trigger a "Beep" and transition to the "PROCESSING" state.

### AC 3: Transparency Log
*   **Given** a transaction is processed.
*   **When** I open the `DevPanel`.
*   **Then** I must see the raw JSON Request and the raw JSON Response side-by-side.

---

## 7. Feature Prioritization (Iteration 2)

1.  **High Priority (P0):**
    *   Semi-skeuomorphic CSS Chassis & Keypad.
    *   Basic LCD State Machine (Idle/Processing/Result).
    *   Integration with Iteration 1 API.
2.  **Medium Priority (P1):**
    *   `DevPanel` Request/Response Viewer.
    *   Artificial Latency Toggle.
    *   "Tap/Swipe/Chip" interaction selectors.
3.  **Low Priority (P2):**
    *   Thermal Receipt Animation.
    *   Keypad Sound Effects.
    *   Diagnostic Mode (Trace ID display).

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 2 - 2025-12-28T18:44:23.941Z*
