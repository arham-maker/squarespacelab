type CrispCommand = [string, ...unknown[]];

declare global {
  interface Window {
    $crisp?: CrispCommand[];
    CRISP_WEBSITE_ID?: string;
  }
}

export {};
