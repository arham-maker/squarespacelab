type CrispCommand = ["do", "chat:open"];

declare global {
  interface Window {
    $crisp?: CrispCommand[];
    CRISP_WEBSITE_ID?: string;
  }
}

export {};
