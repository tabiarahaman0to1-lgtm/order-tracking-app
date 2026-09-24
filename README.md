# Mobile Order Tracking Screen (React, Vite, Tailwind CSS v4)

A modern, highly responsive e-commerce order tracking screen built with React, Vite, and Tailwind CSS. Designed with a mobile-first approach (360px–430px width optimized) to provide a seamless user experience, clear status visibility, and interactive state management.

---

## 🤖 AI Development & Prompting History
This application was designed and developed through an iterative AI-assisted workflow, simulating a real-world frontend development lifecycle:

1. **Design & Component Architecture Phase:**
   - **AI Prompt:** *“I need to build a mobile order tracking screen in React/Tailwind. It needs a visual progress timeline, order summary, support contact button, and 3 special states: (1) Delayed Order, (2) Delivered but Not Received, (3) Tracking Not Available Yet. Give me a component structure and layout plan.”*
   - **Outcome:** Established a clean component hierarchy and responsive layout plan.

2. **Core Implementation & Styling Phase:**
   - **Tech Stack Setup:** Configured React with Vite and integrated Tailwind CSS v4 (`@import "tailwindcss";`).
   - **UI/UX Design:** Implemented modern cards, interactive status badges, visual steppers/timelines using `lucide-react` / `react-icons`, and a support modal.

3. **Edge Cases & Special States Handling:**
   - Built a dynamic state-switching mechanism to test and demonstrate:
     - **Normal / In-Progress:** Standard live delivery tracking with estimated times and rider details.
     - **Delayed Order:** Clear visual warnings and messaging for delayed shipments.
     - **Delivered but Not Received (Dispute):** Interactive reporting action for missing items.
     - **Tracking Not Available Yet:** Graceful fallback state for newly placed orders.

---

## 🚀 Setup & Run Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/tabiarahaman0to1-lgtm/order-tracking-app.git](https://github.com/tabiarahaman0to1-lgtm/order-tracking-app.git)
   cd order-tracking-app