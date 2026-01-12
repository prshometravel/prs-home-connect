import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY in .env.local / Vercel env vars");
}

const stripe = new Stripe(secretKey, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const origin = req.headers.origin || "http://localhost:3000";
    const { jobId } = req.body || {};

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Lead Unlock (1 job)",
              description: jobId ? `Unlock lead for job: ${jobId}` : "Unlock 1 lead",
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/stripe/success`,
      cancel_url: `${origin}/stripe/cancel`,
      metadata: {
        jobId: jobId ? String(jobId) : "",
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Stripe error" });
  }
}
	
