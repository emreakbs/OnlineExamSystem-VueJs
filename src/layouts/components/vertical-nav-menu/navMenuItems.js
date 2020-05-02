export default [
  {
    header: "Okul",
    i18n: "Okul",
    items: [
      {
        url: "/home",
        name: "Ana Sayfa",
        slug: "home",
        rule:3,
        icon: "HomeIcon",
      },
      {
        url: "/okulislemleri",
        rule:0,
        name: "Okul İşlemleri",
        slug: "okulislemleri",
        icon: "BookIcon"
      },
      {
        url: "/ogretmenislemleri",
        rule:1,
        name: "Öğretmen İşlemleri",
        slug: "ogretmenislemleri",
        icon: "UserIcon",
      },
      {
        url: "/bransislemleri",
        rule:1,
        name: "Branş İşlemleri",
        slug: "bransislemleri",
        icon: "PenToolIcon",
      },{
        url: "/bolumislemleri",
        rule:1,
        name: "Bölüm İşlemleri",
        slug: "bolumislemleri",
        icon: "GitPullRequestIcon",
      },
    ]
  }
]
