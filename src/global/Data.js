export const filterData = [
  {
    name: "Sve",
    id: "0",
  },
  {
    name: "Infrastruktura",
    image: require("../../assets/InfrastrukturaIUrbanizacija.png"),
    id: "1",
  },
  {
    name: "Cistoca",
    image: require("../../assets/ČistoćaIOtpad.png"),
    id: "2",
  },
  {
    name: "Bezbednost",
    image: require("../../assets/BezbednostIKriminal.png"),
    id: "3",
  },
  {
    name: "Transport",
    image: require("../../assets/TransportISaobraćaj.png"),
    id: "4",
  },
  {
    name: "Zagađenje",
    image: require("../../assets/ZagađenjeIEkologija.png"),
    id: "5",
  },
  {
    name: "Socijalni problemi",
    image: require("../../assets/SocijalniProblemi.png"),
    id: "6",
  },
  {
    name: "Komunalije",
    image: require("../../assets/KomunalneUsluge.png"),
    id: "7",
  },
  {
    name: "Ostalo",
    image: require("../../assets/Ostalo.png"),
    id: "8",
  },
];
// Infrastruktura i urbanizacija:

// Loše održavanje puteva i trotoara
// Nedostatak ili loše planiranje parkova i zelenih površina
// Problemi sa vodosnabdevanjem i kanalizacijom
// Nedostatak parkinga

// Čistoća i otpad:

// Neadekvatna sakupljanja smeća
// Divlje deponije
// Nedostatak reciklažnih programa

// Bezbednost i kriminal:

// Kriminal i vandalizam
// Nedostatak policijske prisutnosti
// Loše osvetljenje javnih prostora

// Transport i saobraćaj:

// Saobraćajne gužve
// Loša organizacija javnog prevoza
// Nedostatak biciklističkih i pešačkih staza

// Zagađenje i ekologija:

// Zagađenje vazduha, vode i zemljišta
// Nedostatak mera za zaštitu životne sredine
// Problemi sa bukom

// Socijalni problemi:

// Nedostatak pristupa zdravstvenoj zaštiti
// Problemi sa obrazovanjem
// Nedostatak socijalnih programa za ugrožene grupe

// Komunalne usluge:

// Loša kvaliteta usluga kao što su javna rasveta, internet i telefonija
// Problemi sa snabdevanjem električnom energijom

export const listData = [
  {
    problemName: "Oštećeni putevi",
    category: "Infrastruktura",
    address: "Ulica 123, Gradsville",
    images: "https://www.zenasamja.me/images/0100/monalisa-v.jpg",
    numberOfReviews: 15,
    coordinates: { lat: 123.456, lng: 789.012 },
    description:
      "Na ovoj ulici postoje brojna oštećenja na površini puta, što predstavlja opasnost za vozače i pešake.",
    author: "Građanin123",
    id: 0,
  },
  {
    problemName: "Divlje deponije",
    category: "Čistoća",
    address: "Ulica 456, Gradstown",
    images:
      "https://umetnickeslike.org/wp-content/uploads/2023/01/Umetnicka-slika-Naziv-slike-Suncokreti-1-tehnika-ulje-na-platnu-Format-slike-50%C3%9770-cm-akademski-slikar-Milovan-Penkov-Penkaso-sertifikat-Cena-slike-29500-dinara-izgled-slike-bez-rama-300x300.jpg",
    numberOfReviews: 10,
    coordinates: { lat: 987.654, lng: 321.098 },
    description:
      "Na ovom mestu se neprestano stvaraju divlje deponije smeća, što predstavlja ekološki problem i narušava estetiku okoline.",
    author: "EkoAktivista99",
    id: 1,
  },
  {
    problemName: "Nedostatak osvetljenja",
    category: "Bezbednost",
    address: "Trg Slobode, Gradsvillia",
    images:
      "https://www.slikenaplatnubg.rs/wp-content/uploads/2018/12/slike-na-platnu-umetnicka-dela-31.jpg",
    numberOfReviews: 8,
    coordinates: { lat: 555.555, lng: 111.111 },
    description:
      "Nedostatak osvetljenja na ovom trgu stvara osećaj nesigurnosti noću i potencijalno povećava rizik od kriminala.",
    author: "SigurnostGradsvillia",
    id: 2,
  },
  {
    problemName: "Saobraćajne gužve",
    category: "Transport",
    address: "Glavna ulica, Gradopolis",
    images: "https://www.10naj.com/wp-content/uploads/2016/08/zvezdananoc_.jpg",
    numberOfReviews: 12,
    coordinates: { lat: 111.111, lng: 222.222 },
    description:
      "Svakodnevno se javljaju velike saobraćajne gužve na glavnoj ulici, što usporava kretanje vozila i uzrokuje nepotrebne zastoje.",
    author: "Vozac123",
    id: 3,
  },
  {
    problemName: "Zagađenje vode",
    category: "Zagađenje",
    address: "Reka Rekica, Ekoselo",
    images: "https://www.10naj.com/wp-content/uploads/2016/08/krik_.jpg",
    numberOfReviews: 7,
    coordinates: { lat: 333.333, lng: 444.444 },
    description:
      "Reka Rekica je ozbiljno zagađena industrijskim otpadom, što ima negativan uticaj na lokalni ekosistem i vodovodnu sigurnost.",
    author: "EkoBorac456",
    id: 4,
  },
  {
    problemName: "Nedostatak pristupa zdravstvenoj zaštiti",
    category: "Socijalni problemi",
    address: "Zdravstvena stanica, Naselje Susedi",
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgvSqWRc883qnIf3iKRTC5LfIOMocbgIUyrE44h4DMmU7YKcPV6awQRv-XJczDX2_6M1I&usqp=CAU",
    numberOfReviews: 5,
    coordinates: { lat: 666.666, lng: 777.777 },
    description:
      "Mnogi građani u naselju Susedi nemaju pristup osnovnoj zdravstvenoj zaštiti zbog nedostatka dostupnih zdravstvenih usluga u blizini.",
    author: "ZdravljePrvo",
    id: 5,
  },
  {
    problemName: "Nepouzdana javna rasveta",
    category: "Komunalne usluge",
    address: "Glavni trg, Gradsko jezgro",
    images: "https://bah.edu.rs/wp-content/uploads/2020/01/munk-slika-krik.jpg",
    numberOfReviews: 9,
    coordinates: { lat: 123.456, lng: 789.012 },
    description:
      "Javna rasveta na glavnom trgu često nije pouzdana i često se gasi, što smanjuje bezbednost i udobnost građana.",
    author: "GradskoUpravljanje789",
    id: 6,
  },
  {
    problemName: "Neobična umetnička instalacija",
    category: "Ostalo",
    address: "Trg Neobičnosti, Gradsko jezgro",
    images: "https://www.slikomania.rs/fotky6509/fotos/CFAZH6215E1.jpg",
    numberOfReviews: 3,
    coordinates: { lat: 444.444, lng: 555.555 },
    description:
      "Na trgu se pojavila neobična umetnička instalacija koja izaziva različite reakcije među građanima i postala je tema lokalnih razgovora.",
    author: "UmetničkiEntuzijasta",
    id: 7,
  },
  {
    problemName: "Kure umetnička instalacija",
    category: "Ostalo",
    address: "Trg Neobičnosti, Gradsko jezgro",
    images: "https://www.slikomania.rs/fotky6509/fotos/YOBATFL003E1.jpg",
    numberOfReviews: 3,
    coordinates: { lat: 444.444, lng: 555.555 },
    description:
      "Na trgu se pojavila neobična umetnička instalacija koja izaziva različite reakcije među građanima i postala je tema lokalnih razgovora.",
    author: "UmetničkiEntuzijasta",
    id: 8,
  },
];
