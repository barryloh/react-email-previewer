export function getStripeWelcomeTemplate() {
  return `
  <Html>
    <Head />
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={{
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif',
}}>
      <Container style={{
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
}}>
        <Section style={{
  padding: "0 48px",
}}>
          <Img
            src="https://demo.react.email/static/stripe-logo.png"
            width="49"
            height="21"
            alt="Stripe"
          />
          <Hr style={{
  borderColor: "#e6ebf1",
  margin: "20px 0",
}} />
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>
            Thanks for submitting your account information. You're now ready to
            make live transactions with Stripe!
          </Text>
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>
            You can view your payments and a variety of other information about
            your account right from your dashboard.
          </Text>
          <Button style={{
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  padding: "10px",
}} href="https://dashboard.stripe.com/login">
            View your Stripe Dashboard
          </Button>
          <Hr style={{
  borderColor: "#e6ebf1",
  margin: "20px 0",
}} />
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>
            If you haven't finished your integration, you might find our
            <Link style={{
  color: "#556cd6",
}} href="https://stripe.com/docs">
              docs
            </Link>
            handy.
          </Text>
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>
            Once you're ready to start accepting payments, you'll just need to
            use your live
            <Link
              style={{
  color: "#556cd6",
}}
              href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
            >
              API keys
            </Link>
            instead of your test API keys. Your account can simultaneously be
            used for both test and live requests, so you can continue testing
            while accepting live payments. Check out our
            <Link style={{
  color: "#556cd6",
}} href="https://stripe.com/docs/dashboard">
              tutorial about account basics
            </Link>
            .
          </Text>
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>
            Finally, we've put together a
            <Link
              style={{
  color: "#556cd6",
}}
              href="https://stripe.com/docs/checklist/website"
            >
              quick checklist
            </Link>
            to ensure your website conforms to card network standards.
          </Text>
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>
            We'll be here to help you with any step along the way. You can find
            answers to most questions and get in touch with us on our
            <Link style={{
  color: "#556cd6",
}} href="https://support.stripe.com/">
              support site
            </Link>
            .
          </Text>
          <Text style={{
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left"
}}>— The Stripe team</Text>
          <Hr style={{
  borderColor: "#e6ebf1",
  margin: "20px 0",
}} />
                <Text style={{
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
}}>
            Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
  `;
}
