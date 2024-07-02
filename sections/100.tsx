import { useSection } from "deco/hooks/useSection.ts";

export interface Props {
  /**
   * @format rich-text
   */
  title?: string;
}

export default function ItemList({ title = "Add Items" }: Props) {
  const section = useSection();

  return (
    <div class="container mx-auto py-10">
      <h1 class="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      <div class="flex gap-4">
        <input
          hx-post={section["f-partial"]}
          hx-target="#item-list"
          hx-swap="outerHTML"
          class="input input-bordered w-full"
          placeholder="Type an item and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.value = "";
            }
          }}
        />
        <button
          hx-post={section["f-partial"]}
          hx-target="#item-list"
          hx-swap="outerHTML"
          class="btn btn-primary"
        >
          Add
        </button>
      </div>
      <ul id="item-list" class="mt-4 list-disc pl-4"></ul>
    </div>
  );
}

export const handler = section.handler({
  onPost: (state, request) => {
    const newItem = request.formData.get("_input");
    if (newItem) {
      state.items = [...(state.items || []), newItem];
    }
    return { items: state.items };
  },
  render: (state) => (
    <ul class="mt-4 list-disc pl-4">
      {state.items?.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  ),
});