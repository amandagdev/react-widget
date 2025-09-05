import React, { useEffect, useState } from "react";
import type { Post, User } from "../../data/mock-data";
import { mockPosts, mockUser } from "../../data/mock-data";
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

        // Verificar se estamos em um iframe
        const isInIframe = window !== window.parent;

        if (isInIframe) {
          // Solicitar o ID do usuário via postMessage
          window.parent.postMessage({ type: "REQUEST_USER_ID" }, "*");

          // Escutar a resposta
          const handleMessage = (event: MessageEvent) => {
            if (event.data.type === "USER_ID_RESPONSE" && event.data.userId) {
              loadUserData(event.data.userId);
            }
          };

          window.addEventListener("message", handleMessage);

          // Cleanup
          return () => {
            window.removeEventListener("message", handleMessage);
          };
        } else {
          // Se não estiver em iframe, usar usuário padrão para teste
          loadUserData(1);
        }
      } catch {
        setError("Erro ao carregar dados do usuário");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadUserData = async (_userId: number) => {
    try {
      // Simular delay de carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Usar dados mock
      setUser(mockUser);
      setPosts(mockPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Verificar se estamos em um iframe
    const isInIframe = window !== window.parent;

    if (isInIframe) {
      window.parent.postMessage({ type: "CLOSE_WIDGET" }, "*");
    } else {
      // Se não estiver em iframe, apenas recarregar a página
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

  return (
    <div className="w-80 h-[600px] bg-widget-green-dark rounded-lg flex flex-col overflow-hidden">
      <WidgetHeader user={user!} onClose={handleClose} />
      <WidgetContent posts={posts} />
      <ScrollIndicator />
    </div>
  );
};

export default UserWidget;
