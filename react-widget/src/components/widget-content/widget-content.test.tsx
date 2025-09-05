import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WidgetContent from "./widget-content";

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

describe("WidgetContent", () => {
  it("deve renderizar todos os posts", () => {
    render(<WidgetContent posts={mockPosts} />);

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(
        screen.getByText((_, element) => {
          return element?.textContent === post.body;
        })
      ).toBeInTheDocument();
    });
  });

  it("deve renderizar o número correto de posts", () => {
    render(<WidgetContent posts={mockPosts} />);

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("deve renderizar corretamente com lista vazia", () => {
    const { container } = render(<WidgetContent posts={[]} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
