export type Member = {
  id: string;
  name: string;
  position?: string;
  profile?: string;
  image?:
    | {
        url: string;
        width?: number;
        height?: number;
      }
    | string;
};

export const members: Member[] = [
  {
    id: "ren-okita",
    name: "Ren Okita",
    position: "Web Developer",
    profile:
      "フロントエンドを中心に、ユーザーに寄り添うUI設計と実装を得意としています。React / Next.js を用いた制作経験があり、パフォーマンスとアクセシビリティを重視したコーディングを心がけています。",
    image: "/profile.png",
  },
];
