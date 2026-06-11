type LiveChatWidgetApi = {
  on: (event: string, callback: () => void) => void;
  once: (event: string, callback: () => void) => void;
  off: (event: string, callback: () => void) => void;
  call: (method: string, ...args: unknown[]) => void;
  get: (property: string) => unknown;
};

declare global {
  interface Window {
    LiveChatWidget?: LiveChatWidgetApi;
    __lc?: {
      license: number;
      integration_name?: string;
      product_name?: string;
    };
    _lc?: Record<string, unknown>;
  }
}

export {};
