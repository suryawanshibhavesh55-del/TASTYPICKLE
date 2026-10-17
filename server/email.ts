import { Resend } from 'resend';
import { connectDB } from './db';
import { IOrder, OrderModel } from './models/Order';

export const DEFAULT_OWNER_EMAIL = 'mohammedshariq2013@gmail.com';

function getResendClient(): { client: Resend | null; ownerEmail: string; fromEmail: string } {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const ownerEmail = (process.env.OWNER_EMAIL || DEFAULT_OWNER_EMAIL).trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || 'TastyPickle Orders <onboarding@resend.dev>').trim();

  if (!apiKey) {
    return { client: null, ownerEmail, fromEmail };
  }

  return {
    client: new Resend(apiKey),
    ownerEmail,
    fromEmail,
  };
}

export function buildOrderEmailHtml(order: IOrder): string {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const itemsRows = (order.items || [])
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b;">
          <strong>${escapeHtml(item.name)}</strong>
          <div style="font-size: 12px; color: #64748b;">Variant / Size: ${escapeHtml(item.size || '250g')}</div>
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: right;">
          ₹${item.price}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; font-weight: bold; color: #991b1b; text-align: right;">
          ₹${item.price * item.quantity}
        </td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order #${escapeHtml(order.orderId)}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <!-- Header Banner -->
        <tr>
          <td style="background: linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #7f1d1d 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; margin-bottom: 4px;">
              🌶️ TastyPickle
            </div>
            <div style="font-size: 15px; font-weight: 600; color: #fee2e2; letter-spacing: 0.5px;">
              New Order Received
            </div>
            <div style="display: inline-block; background-color: #ffffff; color: #991b1b; font-weight: 800; font-size: 16px; padding: 6px 16px; border-radius: 9999px; margin-top: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              Order #${escapeHtml(order.orderId)}
            </div>
          </td>
        </tr>

        <!-- Order Timestamp & Quick Alert -->
        <tr>
          <td style="padding: 20px 24px 10px 24px; background-color: #fef2f2; border-bottom: 1px solid #fee2e2;">
            <table width="100%">
              <tr>
                <td style="font-size: 13px; color: #991b1b; font-weight: 700;">
                  ⏰ Date & Time:
                </td>
                <td style="font-size: 13px; color: #7f1d1d; font-weight: 600; text-align: right;">
                  ${orderDate}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Customer & Delivery Address -->
        <tr>
          <td style="padding: 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" width="50%" style="padding-right: 12px;">
                  <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                    👤 Customer Details
                  </div>
                  <div style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">
                    ${escapeHtml(order.customer.fullName)}
                  </div>
                  <div style="font-size: 13px; color: #334155; margin-bottom: 3px;">
                    📞 <a href="tel:${escapeHtml(order.customer.phone)}" style="color: #991b1b; text-decoration: none; font-weight: 600;">${escapeHtml(order.customer.phone)}</a>
                  </div>
                  ${order.customer.altPhone ? `<div style="font-size: 12px; color: #64748b; margin-bottom: 3px;">Alt Phone: ${escapeHtml(order.customer.altPhone)}</div>` : ''}
                  <div style="font-size: 13px; color: #334155;">
                    ✉️ ${order.customer.email ? `<a href="mailto:${escapeHtml(order.customer.email)}" style="color: #0369a1; text-decoration: none;">${escapeHtml(order.customer.email)}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
                  </div>
                </td>
                <td valign="top" width="50%" style="padding-left: 12px; border-left: 1px solid #e2e8f0;">
                  <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                    📍 Delivery Address
                  </div>
                  <div style="font-size: 13px; color: #334155; line-height: 1.5;">
                    ${escapeHtml(order.customer.address)}<br>
                    ${order.customer.landmark ? `Landmark: ${escapeHtml(order.customer.landmark)}<br>` : ''}
                    ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.state || 'Andhra Pradesh')}<br>
                    <strong>PIN: ${escapeHtml(order.customer.pincode)}</strong>
                  </div>
                  ${order.customer.notes ? `<div style="margin-top: 8px; font-size: 12px; background: #fffbeb; padding: 6px 10px; border-radius: 6px; color: #92400e; border: 1px solid #fef3c7;"><strong>Note:</strong> ${escapeHtml(order.customer.notes)}</div>` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Ordered Items Table -->
        <tr>
          <td style="padding: 0 24px 24px 24px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              🛍️ Order Items
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1;">
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: left; color: #475569; text-transform: uppercase;">Product</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: center; color: #475569; text-transform: uppercase;">Qty</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Price</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Payment & Financial Summary -->
        <tr>
          <td style="padding: 0 24px 28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" width="55%" style="padding-right: 12px;">
                  <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 8px;">
                    💳 Payment Details
                  </div>
                  <div style="font-size: 13px; color: #1e293b; margin-bottom: 4px;">
                    <strong>Method:</strong> ${escapeHtml(order.paymentMethod || 'Online Payment')}
                  </div>
                  <div style="font-size: 13px; color: #1e293b; margin-bottom: 4px;">
                    <strong>Status:</strong>
                    <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 11px; ${
                      order.paymentStatus === 'Paid'
                        ? 'background-color: #dcfce7; color: #15803d;'
                        : 'background-color: #fef3c7; color: #b45309;'
                    }">
                      ${escapeHtml(order.paymentStatus || 'Pending')}
                    </span>
                  </div>
                  ${order.razorpayOrderId ? `<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Razorpay Order ID: <code style="background: #f1f5f9; padding: 2px 4px; border-radius: 4px;">${escapeHtml(order.razorpayOrderId)}</code></div>` : ''}
                  ${order.razorpayPaymentId ? `<div style="font-size: 12px; color: #64748b; margin-top: 2px;">Razorpay Payment ID: <code style="background: #f1f5f9; padding: 2px 4px; border-radius: 4px;">${escapeHtml(order.razorpayPaymentId)}</code></div>` : ''}
                </td>

                <td valign="top" width="45%" style="background-color: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
                  <table width="100%" style="font-size: 13px;">
                    <tr>
                      <td style="color: #64748b; padding-bottom: 6px;">Subtotal:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 6px;">₹${order.subtotal}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b; padding-bottom: 6px;">Delivery Charge:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 6px;">₹${order.deliveryCharge}</td>
                    </tr>
                    ${
                      order.discount && order.discount > 0
                        ? `<tr>
                            <td style="color: #15803d; padding-bottom: 6px;">Discount:</td>
                            <td style="text-align: right; font-weight: 600; color: #15803d; padding-bottom: 6px;">-₹${order.discount}</td>
                          </tr>`
                        : ''
                    }
                    <tr style="border-top: 2px solid #cbd5e1;">
                      <td style="padding-top: 8px; font-weight: 800; font-size: 15px; color: #0f172a;">Final Total:</td>
                      <td style="padding-top: 8px; text-align: right; font-weight: 900; font-size: 17px; color: #991b1b;">₹${order.grandTotal}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748b;">
            TastyPickle Notification System • Automatic Order Dispatcher<br>
            <span style="font-size: 11px; color: #94a3b8;">This is an automated operational notification sent to the store owner.</span>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function escapeHtml(text: string | undefined | null): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends order notification email to owner via Resend.
 * Enforces strict duplicate protection:
 * 1. Checks if ownerNotificationSent is already true
 * 2. Uses atomic update or pre-check
 * 3. Does not fail the order if Resend fails
 */
export async function sendOrderNotificationEmail(orderId: string): Promise<{
  success: boolean;
  skipped?: boolean;
  error?: string;
  messageId?: string;
}> {
  try {
    await connectDB();
    const order = await OrderModel.findOne({ orderId });

    if (!order) {
      console.warn(`[Resend] Order #${orderId} not found for notification email.`);
      return { success: false, error: 'Order not found' };
    }

    // DUPLICATE PROTECTION: Do not send if already sent
    if (order.ownerNotificationSent) {
      console.log(`[Resend] Duplicate prevented: Notification for Order #${orderId} was already sent.`);
      return { success: true, skipped: true };
    }

    const { client, ownerEmail, fromEmail } = getResendClient();

    if (!client) {
      console.warn(
        `[Resend] RESEND_API_KEY is not configured in environment variables. Email notification for Order #${orderId} skipped.`
      );
      return { success: false, error: 'RESEND_API_KEY is not configured' };
    }

    const subject = `🔔 New Tastypickle Order — #${order.orderId}`;
    const html = buildOrderEmailHtml(order);

    console.log(`[Resend] Sending order notification email for Order #${order.orderId} to ${ownerEmail}...`);

    const result = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject,
      html,
    });

    if (result.error) {
      console.error(`[Resend] Failed to send email for Order #${order.orderId}:`, result.error);
      return { success: false, error: result.error.message };
    }

    // Only update ownerNotificationSent to true after Resend confirms success
    await OrderModel.updateOne(
      { orderId },
      {
        $set: {
          ownerNotificationSent: true,
          ownerNotificationSentAt: new Date(),
        },
      }
    );

    console.log(
      `[Resend] Order notification email successfully sent for Order #${order.orderId} (Message ID: ${result.data?.id})`
    );

    return { success: true, messageId: result.data?.id };
  } catch (err: any) {
    // Log server-side error without breaking the caller or deleting the order
    console.error(`[Resend] Unexpected error sending email for Order #${orderId}:`, err);
    return { success: false, error: err?.message || 'Unexpected email error' };
  }
}

/**
 * Diagnostic / Test function to verify Resend credentials and delivery
 */
export async function sendTestEmail(): Promise<{
  success: boolean;
  recipient: string;
  messageId?: string;
  error?: string;
}> {
  const { client, ownerEmail, fromEmail } = getResendClient();

  if (!client) {
    return {
      success: false,
      recipient: ownerEmail,
      error: 'RESEND_API_KEY is not configured in environment variables.',
    };
  }

  try {
    const result = await client.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: '🧪 Tastypickle Resend Integration Test',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2 style="color: #991b1b;">🌶️ TastyPickle Email Integration Active</h2>
          <p>This is a test notification confirming that Resend is properly configured for TastyPickle.</p>
          <p><strong>Configured Owner Email:</strong> ${ownerEmail}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('[Resend Test Error]:', result.error);
      return { success: false, recipient: ownerEmail, error: result.error.message };
    }

    return { success: true, recipient: ownerEmail, messageId: result.data?.id };
  } catch (err: any) {
    console.error('[Resend Test Exception]:', err);
    return { success: false, recipient: ownerEmail, error: err?.message || 'Failed to send test email' };
  }
}

/**
 * Builds customer-friendly order confirmation and payment receipt HTML
 */
export function buildCustomerOrderEmailHtml(order: IOrder): string {
  const orderDate = new Date(order.createdAt || Date.now()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const firstName = escapeHtml((order.customer.fullName || 'Valued Customer').split(' ')[0]);

  const itemsRows = (order.items || [])
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b;">
          <strong>${escapeHtml(item.name)}</strong>
          <div style="font-size: 12px; color: #64748b;">Weight / Bottle: ${escapeHtml(item.size || '250g')}</div>
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; color: #1e293b; text-align: right;">
          ₹${item.price}
        </td>
        <td style="padding: 12px 8px; font-size: 14px; font-weight: bold; color: #991b1b; text-align: right;">
          ₹${item.price * item.quantity}
        </td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation #${escapeHtml(order.orderId)}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
        
        <!-- Header Banner -->
        <tr>
          <td style="background: linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #7f1d1d 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
            <div style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; margin-bottom: 4px;">
              🌶️ TastyPickle
            </div>
            <div style="font-size: 15px; font-weight: 600; color: #fee2e2; letter-spacing: 0.5px;">
              Order Confirmed & Payment Received!
            </div>
            <div style="display: inline-block; background-color: #ffffff; color: #991b1b; font-weight: 800; font-size: 16px; padding: 6px 16px; border-radius: 9999px; margin-top: 14px;">
              Order Reference: #${escapeHtml(order.orderId)}
            </div>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding: 24px 24px 12px 24px;">
            <h2 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0;">
              Hello ${firstName},
            </h2>
            <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0;">
              Thank you for choosing <strong>TastyPickle</strong>! Your online payment of <strong>₹${order.grandTotal}</strong> has been successfully verified via Razorpay. Our kitchen team is now slow-cooking and hand-packing your pickles to ensure maximum taste and freshness.
            </p>
          </td>
        </tr>

        <!-- Order Summary & Delivery Address -->
        <tr>
          <td style="padding: 12px 24px 24px 24px;">
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top" width="50%" style="padding-right: 12px;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">
                      📍 Shipping Address
                    </div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.5;">
                      <strong>${escapeHtml(order.customer.fullName)}</strong><br>
                      ${escapeHtml(order.customer.address)}<br>
                      ${order.customer.landmark ? `Landmark: ${escapeHtml(order.customer.landmark)}<br>` : ''}
                      ${escapeHtml(order.customer.city)}, ${escapeHtml(order.customer.state || 'Andhra Pradesh')} - ${escapeHtml(order.customer.pincode)}<br>
                      Phone: ${escapeHtml(order.customer.phone)}
                    </div>
                  </td>
                  <td valign="top" width="50%" style="padding-left: 12px; border-left: 1px solid #e2e8f0;">
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #64748b; margin-bottom: 6px;">
                      💳 Payment Receipt
                    </div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.6;">
                      Status: <span style="background-color: #dcfce7; color: #15803d; font-weight: 700; padding: 2px 6px; border-radius: 4px; font-size: 11px;">PAID &amp; VERIFIED</span><br>
                      Method: Online Payment (Razorpay)<br>
                      ${order.razorpayPaymentId ? `Payment ID: <code style="font-size: 11px; background: #e2e8f0; padding: 2px 4px; border-radius: 4px;">${escapeHtml(order.razorpayPaymentId)}</code><br>` : ''}
                      Date: ${orderDate}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- Ordered Items Table -->
        <tr>
          <td style="padding: 0 24px 20px 24px;">
            <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
              🛍️ Your Ordered Pickles
            </div>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8fafc; border-bottom: 1px solid #cbd5e1;">
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: left; color: #475569; text-transform: uppercase;">Pickle</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: center; color: #475569; text-transform: uppercase;">Qty</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Price</th>
                  <th style="padding: 8px; font-size: 11px; font-weight: 800; text-align: right; color: #475569; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsRows}
              </tbody>
            </table>
          </td>
        </tr>

        <!-- Price Breakdown -->
        <tr>
          <td style="padding: 0 24px 28px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%"></td>
                <td width="50%" style="background-color: #f8fafc; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
                  <table width="100%" style="font-size: 13px;">
                    <tr>
                      <td style="color: #64748b; padding-bottom: 4px;">Subtotal:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 4px;">₹${order.subtotal}</td>
                    </tr>
                    <tr>
                      <td style="color: #64748b; padding-bottom: 4px;">Standard Delivery:</td>
                      <td style="text-align: right; font-weight: 600; color: #1e293b; padding-bottom: 4px;">₹${order.deliveryCharge}</td>
                    </tr>
                    <tr style="border-top: 2px solid #cbd5e1;">
                      <td style="padding-top: 8px; font-weight: 800; font-size: 14px; color: #0f172a;">Total Paid:</td>
                      <td style="padding-top: 8px; text-align: right; font-weight: 900; font-size: 16px; color: #991b1b;">₹${order.grandTotal}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Track Order Live CTA -->
        <tr>
          <td style="padding: 0 24px 28px 24px; text-align: center;">
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 12px; padding: 20px;">
              <h3 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 800; color: #991b1b;">
                🚚 Track Your Order Live
              </h3>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #7f1d1d;">
                You can monitor live preparation and courier tracking status anytime with your Order ID:
              </p>
              <div style="display: inline-block; background-color: #991b1b; color: #ffffff; font-weight: 800; font-size: 14px; padding: 10px 24px; border-radius: 10px; text-decoration: none;">
                Order ID: #${escapeHtml(order.orderId)}
              </div>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b;">
            <strong>TastyPickle — Authentic Homemade Andhra Pickles</strong><br>
            Freshly prepared with love & authentic spices • No artificial preservatives<br>
            Need assistance? Reach our dispatch team on WhatsApp or reply to this email.
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

/**
 * Sends customer order confirmation email via Resend
 */
export async function sendCustomerOrderConfirmationEmail(orderId: string): Promise<{
  success: boolean;
  skipped?: boolean;
  error?: string;
  messageId?: string;
}> {
  try {
    await connectDB();
    const order = await OrderModel.findOne({ orderId });

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    const customerEmail = order.customer?.email?.trim();
    if (!customerEmail) {
      console.log(`[Customer Email] No email address for Order #${orderId}. Skipping customer confirmation email.`);
      return { success: true, skipped: true };
    }

    // DUPLICATE PROTECTION: Do not send if already sent
    if (order.customerNotificationSent) {
      console.log(`[Customer Email] Duplicate prevented: Customer notification for Order #${orderId} was already sent.`);
      return { success: true, skipped: true };
    }

    const { client, fromEmail } = getResendClient();

    if (!client) {
      console.warn(`[Customer Email] RESEND_API_KEY is not configured.`);
      return { success: false, error: 'RESEND_API_KEY is not configured' };
    }

    const subject = `✨ Order Confirmed: #${order.orderId} — TastyPickle`;
    const html = buildCustomerOrderEmailHtml(order);

    console.log(`[Customer Email] Sending order confirmation email for Order #${order.orderId} to customer ${customerEmail}...`);

    const result = await client.emails.send({
      from: fromEmail,
      to: [customerEmail],
      subject,
      html,
    });

    if (result.error) {
      console.error(`[Customer Email] Failed to send to ${customerEmail} for Order #${order.orderId}:`, result.error);
      return { success: false, error: result.error.message };
    }

    await OrderModel.updateOne(
      { orderId },
      {
        $set: {
          customerNotificationSent: true,
          customerNotificationSentAt: new Date(),
        },
      }
    );

    console.log(
      `[Customer Email] Successfully sent confirmation email to ${customerEmail} for Order #${order.orderId} (Message ID: ${result.data?.id})`
    );

    return { success: true, messageId: result.data?.id };
  } catch (err: any) {
    console.error(`[Customer Email] Unexpected error sending customer email for Order #${orderId}:`, err);
    return { success: false, error: err?.message || 'Unexpected email error' };
  }
}

