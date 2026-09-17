type ZeAction = "open" | "close" | "show" | "hide";

type ZeApi = {
  (channel: "messenger" | "webWidget", action: ZeAction): void;
  (
    channel: "messenger:on" | "webWidget:on",
    event: string,
    callback: (...args: unknown[]) => void
  ): (() => void) | void;
};

declare global {
  interface Window {
    zE?: ZeApi;
    zESettings?: {
      webWidget?: {
        zIndex?: number;
        offset?: {
          horizontal?: string;
          vertical?: string;
        };
      };
    };
    openLiveChat?: () => void;
    setButtonURL?: () => void;
    __squarespacelabOpenLiveChat?: () => void;
  }
}

export {};
