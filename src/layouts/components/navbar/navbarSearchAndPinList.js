import { globalEvents } from "../../../globalEvents";

globalEvents.authControl();
let authUser=globalEvents.getAuthUser();
let data = [
  { title: 'Ana sayfa', rule:3, url: '/home', icon: 'HomeIcon', is_bookmarked: false },
  { title: 'Okul İşlemleri', rule:0, url: '/okulislemleri', icon: 'BookIcon', is_bookmarked: false },
  { title: 'Öğretmen İşlemleri', rule:1, url: '/ogretmenislemleri', icon: 'UserIcon', is_bookmarked: false },
  { title: 'Branş İşlemleri', rule:1, url: '/bransislemleri', icon: 'PenToolIcon', is_bookmarked: false },
  { title: 'Bölüm İşlemleri', rule:1, url: '/bolumislemleri', icon: 'GitPullRequestIcon', is_bookmarked: false },
];
debugger
if(authUser)
data=data.filter(item=>authUser.userLevel<=item.rule)
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
