import React from "react";
import type { Post } from "../../data/mock-data";

interface WidgetContentProps {
  posts: Post[];
}

const WidgetContent: React.FC<WidgetContentProps> = ({ posts }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-widget-green-light rounded-lg p-3 text-white hover:bg-widget-green transition-colors cursor-pointer"
        >
          <h3 className="font-bold text-sm mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-xs opacity-90 line-clamp-3">{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WidgetContent;
