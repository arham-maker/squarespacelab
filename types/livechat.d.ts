type ZendeskWidgetApi = (
  channel: "messenger" | "webWidget",
  action: "open"
) => void;

declare global {
  interface Window {
    zE?: ZendeskWidgetApi;
  }
}

export {};
