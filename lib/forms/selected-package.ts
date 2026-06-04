export type SelectedPackage = {
  name: string;
  price: string;
  category?: string;
  details?: string;
};

export function selectedPackageToFields(
  pkg: SelectedPackage
): Record<string, string> {
  return {
    packageName: pkg.name,
    packagePrice: pkg.price,
    ...(pkg.category ? { packageCategory: pkg.category } : {}),
    ...(pkg.details ? { packageDetails: pkg.details } : {}),
  };
}
