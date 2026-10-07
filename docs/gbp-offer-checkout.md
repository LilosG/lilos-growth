# GBP intro offer checkout

The offer page defaults to a Formspree inquiry. It collects four required fields,
then shows an inquiry confirmation. No payment is taken by this form.

## Enable hosted checkout

1. Create a hosted payment link for **$199 USD, one-time** in the payment account
   that will receive this offer's payments. It must not start a subscription.
2. Set `PUBLIC_GBP_INTRO_CHECKOUT_URL` to that public HTTPS link in the Vercel
   environment for this project. Set it on Preview first and rebuild the branch.
   The variable is compiled into the static page. It is not a secret.
3. Review the preview. All offer CTAs should go to the same hosted checkout, the
   inquiry form should be absent, and the process and FAQ should describe direct
   payment. Check the actual provider's price, currency, and payment mode.
4. When launching, set the same variable for Production and redeploy. Leave it
   unset or blank to retain the inquiry flow. Malformed, non-HTTPS, or credential-
   bearing URLs fail the build rather than rendering an unsafe payment link.

Payment is confirmed manually in the provider dashboard before sending profile
manager-access instructions. The site does not infer payment from a return URL,
show a paid confirmation page, or send a purchase event. Automated confirmation
and onboarding would need trusted server-side payment verification.

## Tracking

- Inquiry mode: `gbp_offer_cta_click`, then `gbp_offer_inquiry_submitted` only after
  the form service accepts the request.
- Checkout mode: `gbp_offer_checkout_started` on an outbound checkout click. This
  means the visitor opened checkout; it is not evidence of payment.
- These events require accepted analytics consent and contain no submitted fields.

## Inquiry delivery

The form uses the existing endpoint `https://formspree.io/f/movlbqdk`. Confirm the
destination inbox and delivery in Formspree or the inbox before sending ad traffic.
The prior branch's live QA submission was accepted by Formspree; inbox delivery
has not been verified. Browser tests with stubbed responses verify UI behavior,
not real delivery or payment.
