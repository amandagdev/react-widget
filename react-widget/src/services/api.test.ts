import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getUser, getUserPosts } from "./api";

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("API Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getUser", () => {
    it("deve buscar dados do usuário com sucesso", async () => {
      const mockUser = {
        id: 1,
        name: "Leanne Graham",
        email: "Sincere@april.biz",
        username: "Bret",
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      });

      const result = await getUser(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      expect(result).toEqual(mockUser);
    });

    it("deve lançar erro quando a requisição falha", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(getUser(999)).rejects.toThrow("Erro ao buscar usuário: 404");
    });
  });

  describe("getUserPosts", () => {
    it("deve buscar posts do usuário com sucesso", async () => {
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

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPosts,
      });

      const result = await getUserPosts(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts?userId=1"
      );
      expect(result).toEqual(mockPosts);
    });

    it("deve lançar erro quando a requisição falha", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(getUserPosts(1)).rejects.toThrow(
        "Erro ao buscar posts: 500"
      );
    });
  });
});
