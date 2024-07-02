import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  /**
   * @format rich-text
   */
  title?: string;

  /**
   * @format textarea
   */
  description?: string;

  /**
   * @format color-input
   */
  backgroundColor?: string;
}

export default function DemoComponent({
  title = "Welcome to the Demo",
  description = "This is a demo component powered by HTMX. Click the buttons to see the magic!",
  backgroundColor = "#ffffff",
}: Props) {
  const toggleLink = usePartialSection({
    props: { backgroundColor: backgroundColor === "#ffffff" ? "#000000" : "#ffffff" },
  });

  return (
    <div
      id="demo-component"
      class="container py-10 flex flex-col items-center justify-center gap-4"
      style={{ backgroundColor }}
    >
      <h1 class="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: title }} />
      <p class="text-lg" dangerouslySetInnerHTML={{ __html: description }} />
      <button
        hx-target="#demo-component"
        hx-swap="outerHTML"
        hx-get={toggleLink["f-partial"]}
        class="btn btn-primary no-animation"
      >
        <span class="inline [.htmx-request_&]:hidden">Toggle Background</span>
        <span class="loading loading-spinner hidden [.htmx-request_&]:inline" />
      </button>
    </div>
  );
}