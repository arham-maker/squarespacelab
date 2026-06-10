export const PRIVACY_HERO = {
  titleBold: "Privacy",
  titleLight: "Policy",
} as const;

export const PRIVACY_PAGE_TITLE = "Privacy Policy Statement";

export type PrivacyContentSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  contactLink?: boolean;
};

export const PRIVACY_SECTIONS: readonly PrivacyContentSection[] = [
  {
    id: "statement",
    title: "Privacy Policy Statement",
    paragraphs: [
      "squarespace dev is highly committed to keeping client's personal information safe and secure and we collect only essential and inevitable information to process your order. We never share any of your information with any individual outside our company in any way until you agree to permit us for doing so.",
    ],
  },
  {
    id: "information-collection",
    title: "Information Collection",
    paragraphs: [
      "We collect clients' information via Email, Phone and Contact Us and Order Form and it is protected as per privacy policy set by squarespace dev. Clients' information is never disclosed, shared or sold to any third-party services. Initially, the personal information we require is about clients' name, company's name, billing address, email address, secondary email, phone and fax numbers, order details and place of residence and some of which is optional. Along with this, we need information in creative brief in order to start working on your order. Additionally, collection of information includes opinions pertaining to complaints, appreciation and comments about the product. Technical information which is collected and recorded includes your IP address, browser version, operating system and the date and time when you visit. Google Analytics or some similar tool or service is also used for collecting this data. Our client brief collects necessary information about your project, so we deliver just what you require. We use Google Analytics and similar tools to collect your information, including your IP address, operating system, browser information, and the date & time of visiting our website. The data collected helps us in providing a customized user experience to you.",
    ],
  },
  {
    id: "usage",
    title: "Usage Of Collected Information",
    paragraphs: [
      "First of all, the information we collect helps us to understand exactly what product you need and what special things would you require in it and secondly the billing information is inevitable for payment process. The email addresses are used for communication about order status, comments and opinions and delivery of the finalized product. Moreover, we may send emails of update on the website, promotional offers, launch of a new product/service and the latest news in the industry. This information also helps us to improve our marketing strategies and compile the record of the most selling products. Your payment details are used to process payments, while your email address helps us share new offers, industry insights, and other interesting information with you. Please note that we do not sell your information to third-party marketers or agencies.",
    ],
  },
  {
    id: "payments",
    title: "Privacy Of Payments",
    paragraphs: [
      "To make sure the practice of the best privacy for payments, we offer acceptance from multiple payment options. The payment processor where the clients put their billing information uses Secure Sockets Layer (SSL) which is indicated in the domain as \"https://\". Therefore, we assure that there is no issue at all with the privacy of payment process and billing information.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paragraphs: [
      "Confidentiality is surely a serious concern and we are fully aware of the fact and this is why we never compromise over the confidentiality of our clients' information. We use your personal information in order to keep in touch with you so that we can have smooth communication about the order process. Therefore, your entire information like name, billing address, e-mail address, telephone number, fax, etc. is treated as confidential and saved at a secure location which is accessible by the designated members only ensuring that it stays safe and there is no threat of its being stolen or hacked. We reassure that your personal information will never be released to any third party in any circumstances until you allow or we are forced by law.",
    ],
  },
  {
    id: "amendments",
    title: "Amendments",
    paragraphs: [
      "squarespace dev may amend its privacy policy for more strict security concerns if needed. However, the entire amendments about personal information security concerns will be declared with a prior notice of the effective date of amended or updated privacy policies.",
    ],
  },
  {
    id: "disclosure",
    title: "Conditions Of Information Disclosure",
    paragraphs: [
      "In the first place, it is our top priority to avoid the information disclosure. However, the information disclosure can only take place if we are to abide by the country law for judicial proceeding, court order, or any other legal procedure.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [],
    contactLink: true,
  },
] as const;
