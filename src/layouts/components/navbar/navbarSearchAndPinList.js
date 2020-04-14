
let data = [
  { title: 'Ana sayfa', url: '/home', icon: 'HomeIcon', is_bookmarked: false },
  { title: 'Okul İşlemleri', url: '/okulislemleri', icon: 'BookIcon', is_bookmarked: false },
  { title: 'Öğretmen İşlemleri', url: '/ogretmenislemleri', icon: 'UserIcon', is_bookmarked: false },
  { title: 'Branş İşlemleri', url: '/bransislemleri', icon: 'PenToolIcon', is_bookmarked: false },
  { title: 'Bölüm İşlemleri', url: '/bolumislemleri', icon: 'GitPullRequestIcon', is_bookmarked: false },
];
let pinList = localStorage.getItem(btoa("pinList"));
if (!pinList) {
  localStorage.setItem(btoa("pinList"), encodeURIComponent(JSON.stringify(data)))
  pinList = encodeURIComponent(JSON.stringify(data))
}
export default {
  Sayfalar: {
    key: "title",
    data: JSON.parse(decodeURIComponent(pinList))
  }
}
