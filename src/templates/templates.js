import { getStripeWelcomeTemplate } from './stripe-welcome';

export function getTemplates() {
  return [
    {
      value: 'stripe-welcome',
      label: 'Stripe Welcome',
      template: getStripeWelcomeTemplate(),
    },
  ];
}
