/**
 * Automation services content and published pricing guidance.
 * Keep pricing and deliverable descriptions centralized rather than duplicating
 * commitments across the page. Actual scopes are confirmed in writing.
 */
export const automationExamples = [
  {
    number: "01",
    category: "Lead response",
    title: "Speed-to-lead and follow-up",
    description:
      "Route new inquiries to the right person, acknowledge requests promptly, and schedule follow-ups so promising leads do not disappear between systems.",
    detail: "Forms, lead routing, reminders, and CRM updates.",
  },
  {
    number: "02",
    category: "Customer calls",
    title: "After-hours call handling",
    description:
      "Set up call intake and handoff workflows so callers can leave useful details or request next steps when your team is unavailable.",
    detail: "Call intake, notifications, and human escalation rules.",
  },
  {
    number: "03",
    category: "Operations",
    title: "Permit workflow assistance",
    description:
      "Organize project details, prepare application information, and reduce repetitive data entry for EV charger and construction permitting workflows.",
    detail: "Human review and jurisdiction-specific submission remain essential.",
  },
  {
    number: "04",
    category: "Cash flow",
    title: "Invoice and receivables follow-up",
    description:
      "Connect invoice status to clear reminders and internal tasks so outstanding balances receive consistent, professional attention.",
    detail: "Accounting events, reminder sequences, and exception flags.",
  },
] as const;

export const automationPricing = [
  {
    name: "Focused workflow",
    price: 995,
    suffix: "one-time build from",
    description:
      "A well-defined automation for one recurring task, with a limited set of inputs and outputs.",
    features: ["Workflow scoping", "Build and testing", "Defined handoff and documentation"],
    label: "Good first project",
  },
  {
    name: "Connected workflow",
    price: 2500,
    suffix: "one-time build from",
    description:
      "A custom process that moves work between multiple tools or requires approval rules and exception handling.",
    features: ["Process mapping", "Multi-step integration", "Testing and launch handoff"],
    label: "For more involved operations",
  },
  {
    name: "Managed support",
    price: 199,
    suffix: "per month from",
    description:
      "Optional post-launch oversight for an agreed workflow, with monitoring and defined maintenance coverage.",
    features: [
      "Monitoring and issue triage",
      "Maintenance within agreed scope",
      "Clear change-request process",
    ],
    label: "Optional ongoing service",
  },
] as const;

export const automationSteps = [
  {
    title: "Show us where work gets stuck",
    description:
      "Tell us what your team repeats, where information lives, and what a successful outcome should look like.",
  },
  {
    title: "Get a defined recommendation",
    description:
      "We evaluate the systems and dependencies, identify where human approval belongs, and provide a written scope and price.",
  },
  {
    title: "Build, test, and hand off",
    description:
      "We implement the approved workflow, test normal and failure cases, then document how it operates and who owns each step.",
  },
] as const;

export const automationFaqs = [
  {
    question: "Do you only build automations for contractors?",
    answer:
      "No. Our existing examples come primarily from trades and local service businesses, but we scope workflows for other service operations when the systems and requirements are a good fit.",
  },
  {
    question: "Are these off-the-shelf products?",
    answer:
      "No. These examples demonstrate types of work we have built. Each new automation is scoped against your software, permissions, process, and desired outcome.",
  },
  {
    question: "What determines the final project price?",
    answer:
      "The number of systems, data quality, approvals, exception cases, security requirements, and testing all affect scope. You receive a written fixed-scope quote before implementation. Third-party subscriptions, telephony, messaging, and AI usage are quoted separately when applicable.",
  },
  {
    question: "Do I need an ongoing retainer?",
    answer:
      "Not automatically. A defined build can be handed off. Ongoing support is optional and quoted separately when you want us to monitor or maintain a live system.",
  },
  {
    question: "Can an automation submit permits or handle every call on its own?",
    answer:
      "That depends on the workflow and the systems involved. Permit automations can prepare much of the application information, but jurisdiction rules and human review still apply. Call handling needs tested escalation, coverage, and usage limits. We define boundaries before launch.",
  },
  {
    question: "Can you work with tools we already use?",
    answer:
      "Often, yes. We first assess the software you use and its supported integration methods. We do not promise an integration until access, permissions, and technical feasibility are confirmed.",
  },
] as const;
