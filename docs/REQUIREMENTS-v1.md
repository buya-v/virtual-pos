# virtual POS - Requirements Document

## Iteration 1

## Project Description
Virtual POS simulating payment POS terminals

## User Feedback Incorporated
Initial iteration - no previous feedback

## Refined Requirements
# Technical Specification: Virtual POS Simulator (vPOS)

## 1. Project Vision
The **vPOS Simulator** is a high-fidelity web/mobile interface that mimics the physical presence and operational logic of a hardware payment terminal (e.g., Verifone or Ingenico). It serves as a bridge for developers testing payment gateways and merchants processing "Card Not Present" transactions through a familiar "Card Present" workflow.

---

## 2. Design Tokens
Design tokens ensure visual consistency across the terminal simulation and the administrative dashboard.

### 2.1 Color Palette
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--color-surface-terminal` | `#1A1A1B` | The physical "plastic" body of the POS. |
| `--color-screen-bg` | `#2D5A27` | Classic monochrome LCD background. |
| `--color-screen-text` | `#A0D995` | Classic monochrome LCD text. |
| `--color-action-confirm` | `#22C55E` | The "OK/Enter" green button. |
| `--color-action-cancel` | `#EF4444` | The "Cancel/Stop" red button. |
| `--color-action-clear` | `#F59E0B` | The "Clear" yellow button. |
| `--color-led-active` | `#3B82F6` | Blue blinking light for NFC/Contactless. |

### 2.2 Typography
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--font-display` | `'JetBrains Mono', monospace` | Simulated LCD screen text. |
| `--font-ui` | `'Inter', sans-serif` | Admin settings and labels. |
| `--size-lcd-lg` | `1.5rem / 24px` | Main transaction amount. |
| `--size-lcd-sm` | `0.875rem / 14px` | Status messages (Processing...). |

### 2.3 Elevation & Shapes
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--radius-button` | `4px` | Tactile key appearance. |
| `--shadow-key` | `0px 4px 0px #000000` | Neumorphic "depressible" button effect. |

---

## 3. Component Breakdown

### 3.1 Atoms (Smallest Units)
*   **KeypadButton**: A tactile button with a primary label (number) and secondary label (letters).
*   **StatusLED**: A small circular glow indicator for connectivity and NFC status.
*   **LCDLine**: A single line of text limited by character count (simulating hardware constraints).
*   **BrandLogo**: A placeholder for the bank or merchant logo on the idle screen.

### 3.2 Molecules (Groups of Atoms)
*   **Numpad Grid**: A 4x3 layout containing 0-9, Clear, and Cancel.
*   **PaymentScreen**: The digital container that switches between "Idle," "Enter Amount," "Processing," and "Approved/Declined."
*   **ActionTray**: The horizontal bar containing the "Enter" (Confirm) button.

### 3.3 Organisms (Functional Blocks)
*   **TerminalShell**: The main wrapper mimicking physical hardware dimensions, including the card slot (visual) and the NFC tap zone.
*   **VirtualCardReader**: A drag-and-drop or click-to-trigger zone that simulates inserting a chip card or tapping a phone.
*   **ReceiptGenerator**: A scrollable component that renders a thermal-print style receipt using a monospace font.

### 3.4 Templates (Page Layouts)
*   **SimulatorView**: Centered terminal with a sidebar for "Developer Controls" (e.g., Triggering "Insufficient Funds" or "Network Timeout").
*   **TransactionHistory**: A data table showing successful and failed simulations.

---

## 4. Functional Requirements

### 4.1 Payment States
The terminal must transition through the following Finite State Machine (FSM):
1.  **IDLE**: Displays "Welcome" and current time.
2.  **AMOUNT_ENTRY**: Users type numbers; decimals are handled automatically (e.g., typing `100` displays `$1.00`).
3.  **WAITING_FOR_CARD**: NFC/Chip/Swipe animation plays.
4.  **AUTHORIZING**: Simulated API latency (1-3 seconds) with a spinner.
5.  **RESULT**: Display "APPROVED" or "DECLINED" based on simulated logic.

### 4.2 Simulation Controls (DevTools)
Users should be able to force specific responses:
*   **Response Code Toggle**: 00 (Success), 05 (Declined), 51 (Insufficient Funds).
*   **Network Latency Slider**: Simulate 2G, 3G, or high-speed connectivity.
*   **Card Type Selector**: Visa, Mastercard, Amex, or "Invalid Card."

---

## 5. Technical Stack (Recommended)
*   **Framework**: React or Vue.js (for state-driven UI).
*   **State Management**: XState (Ideal for managing the complex transitions of a POS terminal).
*   **Styling**: Tailwind CSS (with custom design tokens mapped in `tailwind.config.js`).
*   **Animations**: Framer Motion (for "button press" depth and "card slide" transitions).
*   **Iconography**: Lucide React for UI icons; custom SVG for payment methods (Visa/MC).

---

## 6. API Interface (Mock)
The simulator communicates with a mock backend using the following structure:

```json
{
  "terminalId": "V-POS-882",
  "transaction": {
    "amount": 1250,
    "currency": "USD",
    "entryMethod": "NFC_TAP",
    "status": "PENDING"
  },
  "simulationParameters": {
    "forceResponse": "00",
    "delayMs": 2000
  }
}
```

---

## 7. UX Interaction Model
1.  **Tactile Feedback**: Every button click triggers a subtle audio "beep" and a CSS transform `translate-y-[2px]` to mimic physical movement.
2.  **Input Masking**: The amount entry must follow a right-to-left currency mask.
3.  **Visual Cues**: The "Screen" should have a faint scanline overlay and a slight inner shadow to simulate an embedded LCD panel.

## Acceptance Criteria
- All features must be fully implemented (no placeholders)
- UI must be responsive and accessible
- Error handling must be comprehensive
- Code must pass TypeScript compilation

---
*Generated by ASLA Product Agent - Iteration 1 - 2025-12-28T18:06:44.837Z*
