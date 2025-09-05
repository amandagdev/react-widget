export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUser(userId: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar usuário: ${response.status}`);
  }
  return response.json();
}

export async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar posts: ${response.status}`);
  }
  return response.json();
}
