import React, { useEffect, useState } from "react";
import type { Post, User } from "../../services/api";
import { getUser, getUserPosts } from "../../services/api";
import {
  listenForUserId,
  requestUserId,
  sendCloseMessage,
} from "../../services/postMessage";
import ErrorWidget from "../error-widget/error-widget";
import LoadingWidget from "../loading-widget/loading-widget";
import ScrollIndicator from "../scroll-indicator/scroll-indicator";
import WidgetContent from "../widget-content/widget-content";
import WidgetHeader from "../widget-header/widget-header";

const UserWidget: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const isInIframe = window !== window.parent;

        if (isInIframe) {
          requestUserId();

          const removeListener = listenForUserId((userId) => {
            loadUserData(userId);
          });

          return removeListener;
        } else {
          loadUserData(1);
        }
      } catch {
        setError("Erro ao carregar dados do usuário");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadUserData = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);

      const [userData, postsData] = await Promise.all([
        getUser(userId),
        getUserPosts(userId),
      ]);

      setUser(userData);
      setPosts(postsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    const isInIframe = window !== window.parent;

    if (isInIframe) {
      sendCloseMessage();
    } else {
      window.location.reload();
    }
  };

  if (loading) {
    return <LoadingWidget />;
  }

  if (error) {
    return (
      <ErrorWidget error={error} onRetry={() => window.location.reload()} />
    );
  }

  console.log("user", user);
  console.log("posts", posts);

  return (
    <div className="w-80 h-[600px] bg-widget-green-dark rounded-lg flex flex-col overflow-hidden">
      <WidgetHeader user={user!} onClose={handleClose} />
      <WidgetContent posts={posts} />
      <ScrollIndicator />
    </div>
  );
};

export default UserWidget;
