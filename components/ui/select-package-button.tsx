"use client";

import { useLeadForm } from "@/components/providers/lead-form-provider";
import type { SelectedPackage } from "@/lib/forms/selected-package";

type SelectPackageButtonProps = {
  selectedPackage: SelectedPackage;
  className?: string;
  children?: React.ReactNode;
};

export function SelectPackageButton({
  selectedPackage,
  className = "pricing-card__btn",
  children = "Select Package",
}: SelectPackageButtonProps) {
  const { openLeadForm } = useLeadForm();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openLeadForm(selectedPackage)}
    >
      {children}
    </button>
  );
}
