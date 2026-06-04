"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { LpLeadModal } from "@/components/lp/lp-lead-modal";
import { GetStartedModal } from "@/components/ui/get-started-modal";
import type { SelectedPackage } from "@/lib/forms/selected-package";

type LeadFormContextValue = {
  isOpen: boolean;
  selectedPackage: SelectedPackage | null;
  openLeadForm: (selectedPackage?: SelectedPackage | null) => void;
  closeLeadForm: () => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLp = pathname === "/lp";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<SelectedPackage | null>(null);

  const openLeadForm = useCallback((pkg?: SelectedPackage | null) => {
    setSelectedPackage(pkg ?? null);
    setIsOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => {
    setIsOpen(false);
    setSelectedPackage(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, selectedPackage, openLeadForm, closeLeadForm }),
    [isOpen, selectedPackage, openLeadForm, closeLeadForm]
  );

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      {isLp ? (
        <LpLeadModal
          isOpen={isOpen}
          selectedPackage={selectedPackage}
          onClose={closeLeadForm}
        />
      ) : (
        <GetStartedModal
          isOpen={isOpen}
          selectedPackage={selectedPackage}
          onClose={closeLeadForm}
        />
      )}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm must be used within LeadFormProvider");
  }
  return context;
}
