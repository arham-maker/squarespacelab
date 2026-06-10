import { SITE } from "@/lib/data/site";

export const TERMS_HERO = {
  titleBold: "Terms and",
  titleLight: "Conditions",
} as const;

export const TERMS_PAGE_TITLE = "Terms And Conditions";

export const TERMS_REFUND_INTRO =
  "squarespace dev's refund policy will be nil if;";

export const TERMS_REFUND_NOTE =
  "Note: squarespace dev holds all rights to reject any project or cancel the contract whenever it deems necessary. After the refund, you will not have any rights to use the designs for any purpose; they will be the sole property of squarespace dev. The company will be the rightful owner of the designs.";

export const TERMS_CLAIM_INTRO =
  "To claim your refund in accordance with our refund policy, follow the following steps: You can claim your refund by:";

export const TERMS_CLAIM_PHONE = SITE.phone;
export const TERMS_CLAIM_PHONE_HREF = SITE.phoneHref;

export const TERMS_CLAIM_FOLLOW_UP = [
  "As soon as we receive your refund request, we will respond to it at our earliest, once the required analysis is completed, we will initiate the process.",
  "After you have received your refund, you will not have any rights to any designs submitted by squarespace dev, the information will be submitted the Copyright Acquisition of the Government Copyright Agencies to maintain legality.",
] as const;

export const TERMS_CLAIM_ITEMS = [
  {
    id: "phone",
    type: "phone" as const,
    prefix: "Dialing our Toll Free Number # ",
  },
  {
    id: "email",
    type: "link" as const,
    prefix: "Sending us an ",
    label: "Email",
    href: "mailto:info@squarespacedev.com",
  },
] as const;

export type TermsContentSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  note?: string;
};

export const TERMS_SECTIONS: readonly TermsContentSection[] = [
  {
    id: "legal-contract",
    title: "LEGAL CONTRACT BINDING",
    paragraphs: [
      "When a client purchases a service from squarespace dev, they agree to the Legal Contract Binding, which includes handling responses to legal notices related to Trademark Services, Patents, and Lawsuits. If a customer decides to close their business, they are responsible for submitting the required cancellation documents to remove their legal name from the business records. This safeguards the business owner from any legal liabilities tied to the infringing business name. If the customer fails to provide the cancellation documentation, squarespace dev will not be held liable and assumes no responsibility for any legal damages incurred by the business owner due to the infringement issue.",
    ],
  },
  {
    id: "revision",
    title: "REVISION POLICY",
    paragraphs: [
      "The allotted number of revisions is based on your selected package and you can demand as much revisions as stated in your package details. We focus on providing the best services to our customers and will continue revising until your needs is met. You are not liable to pay additional price if the design concepts are not changed. You will have your revised design in 48 hours.",
      "Any changes/revisions requested after the logo designs are finalized will be treated as a new order and charged separately.",
    ],
  },
  {
    id: "refund",
    title: "REFUND POLICY",
    paragraphs: [TERMS_REFUND_INTRO],
    list: [
      "You have chosen a special package.",
      "The primary design concept has been approved.",
      "You have demanded revisions.",
      "The cancellation has been made due to reasons non-related to the company.",
      "The company has not been contacted for more than 2 weeks of project.",
      "Company's policies, or policy, have been violated.",
      "Other company or designer has been approached for the same project.",
      "The creative brief is lacking in required information.",
      "A complete design change has been demanded.",
      "The claim has crossed the given 'request for refund' time span.",
      "The business is closing or changing name or business.",
      "Reasons such as 'change of mind', 'disagreement with partner' or other reasons that do not pertain to the service will not be subject to refund under any circumstances.",
      "If a client subscribes for a service bundle and happens to be dissatisfied with a particular service, refund will only be applicable on that particular service and 'not' the entire bundle.",
      "The client will not be entitled to any refunds after 7 days, from the date of purchase.",
      "Services including but not limited to Social Media Marketing/Management, Search Engine Optimization (SEO), Domain Registration, Logo Copyrights & Trademarks, Web Hosting & Paid Plugins (SSL/DDoS) are not entitled to refunds under any circumstances.",
      "In case of websites, refunds will not be entertained once the client has approved the design and the website is sent for development.",
      "Refund requests will not be entertained once the logo/website designs are approved.",
      "A partial refund (not exceeding 25%) could be availed, if client fails to provide the initial brief for the logo/web design within 10 days of placing the order.",
      "Refunds will not be processed after final delivery of files following client approval.",
    ],
    note: TERMS_REFUND_NOTE,
  },
  {
    id: "quality",
    title: "QUALITY ASSURANCE POLICY",
    paragraphs: [
      "We do our best to meet your requirements and our designers do their best to fulfill your expectations.",
      "We believe in providing best designs and each of our designs is well researched and well crafted.",
    ],
  },
  {
    id: "satisfaction",
    title: "WE OFFER SATISFACTION GUARANTEE",
    list: [
      "Our unlimited revisions policy is to make sure that you are satisfied.",
      "We aim at exceeding your expectations and strive to accomplish it.",
      "We do not stop our revisions until you are completely satisfied with your design (number of revisions will be according to your package).",
    ],
  },
  {
    id: "delivery",
    title: "DELIVERY POLICY",
    list: [
      "The complete order will be sent to the mentioned account on the date stated on Order Confirmation as well as a confirmation email will also be sent.",
      "The turnaround time will be according to the package, the minimum time required is 2 business days.",
      "In case of urgent order, contact our customer support team.",
    ],
  },
  {
    id: "records",
    title: "RECORD MAINTENANCE",
    paragraphs: [
      "squarespace dev keeps the records of finalized designs so that in case of any misplaced order, you will be provided the exact file. However, files extraction will be charged additionally.",
    ],
  },
  {
    id: "support",
    title: "CUSTOMER SUPPORT",
    paragraphs: [
      "Our customer support is present 24/7 to answer all of your concerns and queries, our team will answer your concerns anytime and every time.",
    ],
  },
  {
    id: "communication",
    title: "COMMUNICATION POLICY",
    list: [
      'YOU agree that squarespace dev is not liable for any correspondence from email address (es) other than the ones followed by our own domain i.e. "..@squarespacedev.com " or/and any toll free number that is not mentioned on our website. squarespace dev should not be held responsible for any damage(s) caused by such correspondence. We only take responsibility of any communication through email address (es) under our own domain name or/and via toll free number i.e. already mentioned on squarespace dev\'s website.',
      "We are not responsible for any damages caused due to other contact details not provided by us.",
      "Project activation charges will apply if client fails to respond over a period of 45 days.",
      "We take full responsibility of all the information provided through our official domains.",
    ],
  },
] as const;
