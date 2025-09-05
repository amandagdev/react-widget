import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { mockPosts } from "../../data/mock-data";
import WidgetContent from "./widget-content";

describe("WidgetContent", () => {
  it("deve renderizar todos os posts", () => {
    render(<WidgetContent posts={mockPosts} />);

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.description)).toBeInTheDocument();
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
