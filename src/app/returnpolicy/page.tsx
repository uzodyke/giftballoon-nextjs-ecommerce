import { Metadata } from 'next'
import { CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy | GiftBalloon',
  description: 'Our returns, refunds and cancellation policy for handmade and personalised balloon arrangements.',
  robots: { index: false, follow: false }
}

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            Returns &amp; Refunds Policy
          </h1>
          <p className="text-xl text-center text-gray-600">
            Handmade to order, and fully backed by us
          </p>
        </div>
      </div>

      {/* Policy */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Every arrangement we make is created by hand, to order, and many are personalised or
          filled with helium. Because of this, our products cannot be resold once made, and we are
          unable to accept returns for change of mind. We do, however, stand fully behind the
          quality of our work. If something arrives faulty, we will put it right.
        </p>

        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
          <CheckCircle className="w-6 h-6 text-pink-600 shrink-0" />
          1. What we cover
        </h2>
        <p className="text-gray-600 mb-4">
          We will replace or refund an order where the product is defective on delivery, meaning:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
          <li>Balloons that arrive burst, deflated, or significantly under-inflated</li>
          <li>
            An error on our part &ndash; wrong design, wrong colour scheme, or a personalisation
            that does not match what you entered at checkout
          </li>
          <li>An order that does not arrive at all through our fault</li>
        </ul>

        <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
          <XCircle className="w-6 h-6 text-pink-600 shrink-0" />
          2. What we do not cover
        </h2>
        <p className="text-gray-600 mb-4">
          The following are not defects and are not eligible for a refund or replacement:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
          <li>Change of mind, or ordering the wrong item, size, colour, or date</li>
          <li>
            Personalisation errors in the details you provided (spelling, names, dates). Please
            check your order carefully before confirming &ndash; we produce exactly what is entered.
          </li>
          <li>
            Natural deflation. Helium and air-filled balloons deflate over time. Foil balloons
            typically last several days; latex balloons last considerably less. Gradual deflation
            after delivery is normal and not a fault.
          </li>
          <li>
            Damage to the arrangement, stuffed balloon contents, or gift items caused before or
            during delivery
          </li>
          <li>
            Damage after delivery &ndash; including heat, sunlight, cold, wind, sharp objects, pets,
            children, transport in a vehicle, or being left outside
          </li>
          <li>
            Failed or delayed delivery due to customer error &ndash; an incorrect or incomplete
            address, nobody available to receive the order, or a recipient who refuses it
          </li>
          <li>
            Colour variation. Screen colours and photographs may differ slightly from the finished
            product. Minor variation in shade, finish, or arrangement is part of a handmade product
            and is not a defect.
          </li>
          <li>
            Delays outside our control, such as severe weather or courier disruption, where the
            product itself arrives in good condition
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
          3. How to report a problem
        </h2>
        <p className="text-gray-600 mb-4">
          Balloons are perishable, so we need to hear from you quickly to assess the issue fairly.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
          <li>
            Contact us within 24 hours of delivery by email at{' '}
            <a href="mailto:tigrexmove@gmail.com" className="text-pink-600 hover:underline">
              tigrexmove@gmail.com
            </a>{' '}
            or by phone on{' '}
            <a href="tel:07459665002" className="text-pink-600 hover:underline">
              07459 665002
            </a>
            .
          </li>
          <li>
            Include your order number and clear photographs of the problem, taken on the day of
            delivery, showing the full arrangement and any damage.
          </li>
          <li>
            Please keep the product until we have reviewed your claim. We may ask for further
            photographs or, occasionally, for the item to be collected.
          </li>
        </ul>
        <p className="text-gray-600 mb-4">
          Reports made without photographs, or made after the arrangement has been used, displayed,
          or disposed of, may not be accepted as we will be unable to verify the fault.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
          4. How we put it right
        </h2>
        <p className="text-gray-600 mb-4">
          Once we have confirmed a genuine defect, we will offer one of the following, at our
          discretion:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
          <li>
            A replacement, delivered as soon as practical &ndash; this is our first option wherever
            possible
          </li>
          <li>A partial refund where only part of an arrangement is affected</li>
          <li>
            A full refund to your original payment method where a replacement is not possible or
            appropriate
          </li>
        </ul>
        <p className="text-gray-600 mb-4">
          Refunds are processed within 14 days of our decision and may take a further 3&ndash;5
          working days to appear in your account.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
          5. Cancellations and changes
        </h2>
        <p className="text-gray-600 mb-4">Because we make everything to order:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
          <li>
            Orders can be cancelled or amended free of charge if we have not yet started work on
            them. Contact us as soon as possible.
          </li>
          <li>
            Once production has started, or personalised items have been made, we are unable to
            cancel or refund the order.
          </li>
          <li>
            Event and decoration services are subject to the deposit and cancellation terms agreed
            at booking.
          </li>
        </ul>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">6. Delivery</h2>
        <p className="text-gray-600 mb-4">
          Please make sure someone is available at the delivery address on the chosen date. If a
          delivery cannot be completed because of an incorrect address or because no one is
          available, we may charge a redelivery fee, and we cannot guarantee the condition of helium
          balloons on redelivery.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4">
          7. Your statutory rights
        </h2>
        <p className="text-gray-600 mb-4">
          Nothing in this policy affects your legal rights as a consumer under the Consumer Rights
          Act 2015. Because our products are personalised and/or liable to deteriorate rapidly, the
          14-day cancellation right under the Consumer Contracts Regulations 2013 does not apply to
          them.
        </p>

        <div className="bg-pink-50 rounded-lg p-6 mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Questions?</h3>
          <p className="text-gray-600">
            Contact us at{' '}
            <a href="mailto:tigrexmove@gmail.com" className="text-pink-600 hover:underline">
              tigrexmove@gmail.com
            </a>{' '}
            or on{' '}
            <a href="tel:07459665002" className="text-pink-600 hover:underline">
              07459 665002
            </a>
            . Mon&ndash;Sat 9am&ndash;6pm, Sun 10am&ndash;4pm.
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-12">Last updated: September 2026</p>
      </article>
    </div>
  )
}
