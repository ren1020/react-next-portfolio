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
    name: "沖田 蓮",
    profile:
      "京都デザイン専門学校ホワイトハッカー専攻で勉強しながらアルバイトに明け暮れてる人間です。高校一年からアルバイトをしているから人よりは社会に慣れてるはず…？",
    image: "/profile.png",
  },
];
