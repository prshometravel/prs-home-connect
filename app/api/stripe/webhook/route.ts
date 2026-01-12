import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Required for Stripe webhooks on Vercel / Next.js App Router
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!whSecret) {
      return NextResponse.json(
        { error: "Missing STRIPE_WEBHOOK_SECRET env var" },
        { status: 500 }
      );
    }

    // Stripe requires the RAW request body to verify signature
    const rawBody = await req.text();

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, whSecret);
    } catch (err: any) {
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err?.message || "unknown"}` },
        { status: 400 }
      );
    }

    // Handle events you care about
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        // OPTIONAL: Store something in Supabase (safe if table exists)
        // If you don't have this table yet, it will just error and we still return 200 to Stripe.
        try {
          await supabaseAdmin.from("stripe_events").insert({
            event_id: event.id,
            type: event.type,
            created: new Date(event.created * 1000).toISOString(),
            session_id: session.id,
            amount_total: session.amount_total ?? null,
            currency: session.currency ?? null,
            customer_email: session.customer_details?.email ?? null,
            payment_status: session.payment_status ?? null,
            raw: event,
          });
        } catch (e) {
          // Do NOT fail the webhook just because DB insert failed
          console.log("Supabase insert skipped/failed:", e);
        }

        break;
      }

      // You can add more if needed later:
      // case "payment_intent.succeeded":
      // case "checkout.session.expired":

      default:
        // Unhandled events are OK
        break;
    }

    // MUST return 200 quickly so Stripe marks it delivered
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (e: any) {
    console.log("Webhook fatal error:", e);
    return NextResponse.json(
      { error: e?.message || "Webhook handler error" },
      { status: 500 }
    );
  }
}

// Optional: make it obvious this endpoint is POST-only (prevents confusion)
export function GET() {
  return NextResponse.json({ ok: true, message: "Use POST for Stripe webhooks." }, { status: 405 });
}
