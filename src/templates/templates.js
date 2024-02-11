import { getStripeWelcomeTemplate } from './stripe-welcome';
import { getCodepenChallengersTemplate } from './codepen-challengers';

export function getTemplates() {
  return [
    {
      value: 'codepen-challengers',
      label: 'Codepen Challengers',
      template: getCodepenChallengersTemplate(),
    },
    {
      value: 'stripe-welcome',
      label: 'Stripe Welcome',
      template: getStripeWelcomeTemplate(),
    },
  ];
}
