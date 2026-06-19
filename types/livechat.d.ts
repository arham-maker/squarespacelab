type ZendeskWidgetApi = (channel: "messenger", action: "open") => void;

declare global {
  interface Window {
    zE?: ZendeskWidgetApi;
  }
}

export {};
