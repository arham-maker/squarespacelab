import { lpImage } from "@/components/lp/lp-assets";

type LpPictureProps = {
  base: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/** Mirror ships 1x webp only; avoid 404s from missing 2x/3x assets. */
export function LpPicture({
  base,
  alt = "",
  className,
  loading = "lazy",
}: LpPictureProps) {
  const src = lpImage(`${base}_1x.webp`);

  return (
    <picture>
      <img loading={loading} alt={alt} className={className} src={src} />
    </picture>
  );
}

export function LpImg({
  path,
  alt = "",
  className,
  loading = "lazy",
}: {
  path: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <img
      loading={loading}
      alt={alt}
      className={className}
      src={lpImage(path)}
    />
  );
}
