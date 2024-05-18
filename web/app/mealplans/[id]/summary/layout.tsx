import SingleColumnCentered from "@/components/layouts/single-column-centered";

export default function SummaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SingleColumnCentered>{children}</SingleColumnCentered>;
}
