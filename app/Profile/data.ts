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
      "年齢:19歳\n出身地:北海道\n京都デザイン&テクノロジー専門学校のホワイトハッカー専攻で勉強しながらアルバイトに明け暮れてる人間です。高校一年からアルバイトをしているから人よりは社会に慣れてるはず…？\n好きなものは猫と甘いものです！",
    image: "/profile.png",
  },
];
