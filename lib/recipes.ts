export type Recipe = {
  id: string
  name: string
  image: string
  description: string
  cookingTime: number
  servings: number
  type: 'zupa' | 'danie główne' | 'deser' | 'napoj' | 'sniadania'
  meat: 'drob' | 'wolowina' | 'wieprzowina' | 'owoce-morza' | 'none'
  diet: 'wegańskie' | 'wegetarianskie' | 'keto' | 'none'
  likes: number
  dateAdded: string
  allergens: string[]
  ingredients: { name: string; amount: string }[]
  steps: string[]
  comments: Comment[]
  isRecentlyViewed?: boolean;
}

export type Comment = {
  id: string;
  user: string;
  content: string;
  date: string;
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Kremowa zupa pomidorowa',
    image: '/images/kremowa_zupa_pomidorowa.jpg',
    description: 'Klasyczna zupa pomidorowa z dodatkiem śmietany.',
    cookingTime: 30,
    servings: 4,
    type: 'zupa',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 120,
    dateAdded: '2023-11-15',
    allergens: ['laktoza'],
    ingredients: [
      { name: 'Pomidory', amount: '1 kg' },
      { name: 'Cebula', amount: '1 sztuka' },
      { name: 'Śmietana', amount: '200 ml' },
      { name: 'Bulion warzywny', amount: '1 l' },
      { name: 'Masło', amount: '2 łyżki' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Pokrój cebulę i podsmaż na maśle.',
      'Dodaj pokrojone pomidory i gotuj przez 10 minut.',
      'Wlej bulion i gotuj przez kolejne 15 minut.',
      'Zmiksuj zupę na gładko.',
      'Dodaj śmietanę i przyprawy, wymieszaj.',
      'Podawaj z grzankami lub makaronem.'
    ],
    comments: []
  },
  {
    id: '2',
    name: 'Spaghetti Bolognese',
    image: '/images/spaghetiti_bolognese.jpg',
    description: 'Klasyczne włoskie danie z mięsnym sosem i makaronem.',
    cookingTime: 45,
    servings: 6,
    type: 'danie główne',
    meat: 'wolowina',
    diet: 'none',
    likes: 85,
    dateAdded: '2023-11-10',
    allergens: ['gluten', 'laktoza'],
    ingredients: [
      { name: 'Makaron spaghetti', amount: '500g' },
      { name: 'Mielona wolowina', amount: '500g' },
      { name: 'Cebula', amount: '1 sztuka' },
      { name: 'Czosnek', amount: '2 ząbki' },
      { name: 'Pomidory krojone', amount: '400g' },
      { name: 'Koncentrat pomidorowy', amount: '2 łyżki' },
      { name: 'Czerwone wino', amount: '100ml' },
      { name: 'Oliwa z oliwek', amount: '2 łyżki' },
      { name: 'Parmezan', amount: 'do posypania' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Na patelni rozgrzej oliwę i zeszkl posiekaną cebulę z czosnkiem.',
      'Dodaj mięso i smaż, aż się zrumieni.',
      'Wlej wino i gotuj przez 2-3 minuty.',
      'Dodaj pomidory, koncentrat, sól i pieprz. Gotuj na małym ogniu przez 30 minut.',
      'W międzyczasie ugotuj makaron al dente.',
      'Podawaj sos na makaronie, posypany parmezanem.'
    ],
    comments: []
  },
  {
    id: '3',
    name: 'Sałatka Cezar z kurczakiem',
    image: '/images/salatka_cezar.jpg',
    description: 'Klasyczna sałatka z grillowanym kurczakiem, grzankami i sosem Cezar.',
    cookingTime: 20,
    servings: 2,
    type: 'danie główne',
    meat: 'drob',
    diet: 'none',
    likes: 95,
    dateAdded: '2023-11-05',
    allergens: ['gluten', 'jaja'],
    ingredients: [
      { name: 'Sałata rzymska', amount: '1 główka' },
      { name: 'Pierś z kurczaka', amount: '1 sztuka' },
      { name: 'Grzanki', amount: '100g' },
      { name: 'Parmezan', amount: '50g' },
      { name: 'Sos Cezar', amount: '100ml' },
      { name: 'Oliwa z oliwek', amount: '2 łyżki' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Pokrój kurczaka w kostkę i usmaż na oliwie.',
      'Umyj i pokrój sałatę.',
      'Zetrzyj parmezan.',
      'W misce wymieszaj sałatę, kurczaka i grzanki.',
      'Polej sosem Cezar i posyp parmezanem.',
      'Dopraw solą i pieprzem do smaku.'
    ],
    comments: []
  },
  {
    id: '4',
    name: 'Smoothie owocowe',
    image: '/images/smoothie_owoc.jpg',
    description: 'Orzeźwiający napój z mieszanki świeżych owoców.',
    cookingTime: 5,
    servings: 1,
    type: 'napoj',
    meat: 'none',
    diet: 'wegańskie',
    likes: 150,
    dateAdded: '2023-11-01',
    allergens: [],
    ingredients: [
      { name: 'Banan', amount: '1 sztuka' },
      { name: 'Truskawki', amount: '100g' },
      { name: 'Maliny', amount: '50g' },
      { name: 'Jogurt naturalny', amount: '150ml' },
      { name: 'Miód', amount: '1 łyżka' },
      { name: 'Lód', amount: 'kilka kostek' }
    ],
    steps: [
      'Obierz banana i pokrój na kawałki.',
      'Umyj truskawki i maliny.',
      'Włóż wszystkie składniki do blendera.',
      'Miksuj do uzyskania gładkiej konsystencji.',
      'Przelej do szklanki i podawaj od razu.'
    ],
    comments: []
  },
  {
    id: '5',
    name: 'Pieczone warzywa',
    image: '/images/pieczone_warzywa.jpg',
    description: 'Kolorowa mieszanka pieczonych warzyw z ziołami.',
    cookingTime: 35,
    servings: 4,
    type: 'danie główne',
    meat: 'none',
    diet: 'wegańskie',
    likes: 75,
    dateAdded: '2023-10-28',
    allergens: [],
    ingredients: [
      { name: 'Bakłażan', amount: '1 sztuka' },
      { name: 'Cukinia', amount: '1 sztuka' },
      { name: 'Papryka czerwona', amount: '1 sztuka' },
      { name: 'Cebula czerwona', amount: '1 sztuka' },
      { name: 'Oliwa z oliwek', amount: '3 łyżki' },
      { name: 'Rozmaryn', amount: '2 gałązki' },
      { name: 'Tymianek', amount: '2 gałązki' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Rozgrzej piekarnik do 200°C.',
      'Pokrój wszystkie warzywa na podobnej wielkości kawałki.',
      'Ułóż warzywa na blasze do pieczenia.',
      'Skrop oliwą i posyp ziołami oraz przyprawami.',
      'Piecz przez 25-30 minut, mieszając w połowie czasu.',
      'Podawaj jako samodzielne danie lub dodatek.'
    ],
    comments: []
  },
  {
    id: '6',
    name: 'Tiramisu',
    image: '/images/tiramisu.jpg',
    description: 'Klasyczny włoski deser z kawą i mascarpone.',
    cookingTime: 30,
    servings: 8,
    type: 'deser',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 200,
    dateAdded: '2023-10-25',
    allergens: ['jaja', 'laktoza'],
    ingredients: [
      { name: 'Mascarpone', amount: '500g' },
      { name: 'Jajka', amount: '4 sztuki' },
      { name: 'Cukier', amount: '100g' },
      { name: 'Kawa espresso', amount: '200ml' },
      { name: 'Biszkopty', amount: '200g' },
      { name: 'Kakao', amount: 'do posypania' }
    ],
    steps: [
      'Oddziel żółtka od białek.',
      'Ubij żółtka z cukrem na puszystą masę.',
      'Dodaj mascarpone do masy jajecznej i delikatnie wymieszaj.',
      'Ubij białka na sztywno i delikatnie wmieszaj do masy serowej.',
      'Nasącz biszkopty kawą i ułóż warstwę na dnie naczynia.',
      'Nałóż połowę kremu, powtórz warstwę biszkoptów i kremu.',
      'Wstaw do lodówki na minimum 4 godziny.',
      'Przed podaniem posyp kakao.'
    ],
    comments: []
  },
  {
    id: '7',
    name: 'Jajecznica z awokado',
    image: '/images/jajecznica_z_awokado.jpg',
    description: 'Pożywne śniadanie bogate w zdrowe tłuszcze.',
    cookingTime: 15,
    servings: 2,
    type: 'sniadania',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 110,
    dateAdded: '2023-11-20',
    allergens: ['jaja'],
    ingredients: [
      { name: 'Jajka', amount: '4 sztuki' },
      { name: 'Awokado', amount: '1 sztuka' },
      { name: 'Cebula', amount: '1/2 sztuki' },
      { name: 'Pomidor', amount: '1 sztuka' },
      { name: 'Masło', amount: '1 łyżka' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Pokrój cebulę w kostkę i zeszklij na maśle.',
      'Rozbij jajka do miski i lekko roztrzep.',
      'Wlej jajka na patelnię i mieszaj, aż się zetną.',
      'Pokrój awokado i pomidor w kostkę.',
      'Dodaj awokado i pomidor do jajecznicy, delikatnie wymieszaj.',
      'Dopraw solą i pieprzem do smaku.',
      'Podawaj z pieczywem.'
    ],
    comments: []
  },
  {
    id: '8',
    name: 'Sałatka grecka',
    image: '/images/salatka_grecka.jpeg',
    description: 'Klasyczna sałatka z pomidorów, ogórków, oliwek i fety.',
    cookingTime: 15,
    servings: 4,
    type: 'danie główne',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 85,
    dateAdded: '2023-11-22',
    allergens: ['laktoza'],
    ingredients: [
      { name: 'Pomidory', amount: '4 sztuki' },
      { name: 'Ogórek', amount: '1 sztuka' },
      { name: 'Czerwona cebula', amount: '1 sztuka' },
      { name: 'Ser feta', amount: '200g' },
      { name: 'Oliwki czarne', amount: '100g' },
      { name: 'Oliwa z oliwek', amount: '4 łyżki' },
      { name: 'Oregano', amount: '1 łyżeczka' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Pokrój pomidory i ogórka w grubą kostkę.',
      'Pokrój cebulę w cienkie półksiężyce.',
      'Pokrój fetę w kostkę.',
      'W dużej misce połącz warzywa, fetę i oliwki.',
      'Skrop oliwą z oliwek, posyp oregano.',
      'Dopraw solą i pieprzem do smaku.',
      'Delikatnie wymieszaj i podawaj.'
    ],
    comments: []
  },
  {
    id: '9',
    name: 'Naleśniki z dżemem',
    image: '/images/nalesniki.webp',
    description: 'Puszyste naleśniki podawane z domowym dżemem truskawkowym.',
    cookingTime: 30,
    servings: 4,
    type: 'sniadania',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 130,
    dateAdded: '2023-11-25',
    allergens: ['gluten', 'laktoza', 'jaja'],
    ingredients: [
      { name: 'Mąka pszenna', amount: '250g' },
      { name: 'Mleko', amount: '500ml' },
      { name: 'Jajka', amount: '2 sztuki' },
      { name: 'Cukier', amount: '2 łyżki' },
      { name: 'Sól', amount: 'szczypta' },
      { name: 'Masło', amount: 'do smażenia' },
      { name: 'Dżem truskawkowy', amount: '200g' }
    ],
    steps: [
      'W misce wymieszaj mąkę, mleko, jajka, cukier i sól na gładkie ciasto.',
      'Rozgrzej patelnię i posmaruj ją masłem.',
      'Wlej porcję ciasta na patelnię i rozprowadź równomiernie.',
      'Smaż naleśnik z obu stron na złoty kolor.',
      'Powtórz proces z resztą ciasta.',
      'Podawaj naleśniki z dżemem truskawkowym.'
    ],
    comments: []
  },
  {
    id: '10',
    name: 'Wegańskie curry z batatami',
    image: '/images/weganskie_curry.jpg',
    description: 'Aromatyczne curry z batatami, ciecierzycą i szpinakiem.',
    cookingTime: 40,
    servings: 4,
    type: 'danie główne',
    meat: 'none',
    diet: 'wegańskie',
    likes: 88,
    dateAdded: '2023-11-28',
    allergens: [],
    ingredients: [
      { name: 'Bataty', amount: '2 duże' },
      { name: 'Ciecierzyca', amount: '1 puszka' },
      { name: 'Szpinak', amount: '200g' },
      { name: 'Mleko kokosowe', amount: '400ml' },
      { name: 'Pasta curry', amount: '2 łyżki' },
      { name: 'Cebula', amount: '1 sztuka' },
      { name: 'Czosnek', amount: '2 ząbki' },
      { name: 'Olej kokosowy', amount: '2 łyżki' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Pokrój bataty w kostkę i ugotuj do miękkości.',
      'Na oleju kokosowym zeszklij posiekaną cebulę i czosnek.',
      'Dodaj pastę curry i smaż przez minutę.',
      'Wlej mleko kokosowe i dodaj ugotowane bataty oraz ciecierzycę.',
      'Gotuj na małym ogniu przez 15 minut.',
      'Na końcu dodaj szpinak i gotuj jeszcze 5 minut.',
      'Dopraw solą i pieprzem do smaku.'
    ],
    comments: []
  },
  {
    id: '11',
    name: 'Sałatka z grillowanym łososiem',
    image: '/images/salatka_losos.jpg',
    description: 'Lekka sałatka z grillowanym łososiem, awokado i sosem cytrynowym.',
    cookingTime: 25,
    servings: 2,
    type: 'danie główne',
    meat: 'owoce-morza',
    diet: 'none',
    likes: 120,
    dateAdded: '2023-12-01',
    allergens: ['ryby'],
    ingredients: [
      { name: 'Filet z łososia', amount: '300g' },
      { name: 'Mieszanka sałat', amount: '200g' },
      { name: 'Awokado', amount: '1 sztuka' },
      { name: 'Pomidorki koktajlowe', amount: '100g' },
      { name: 'Ogórek', amount: '1 sztuka' },
      { name: 'Czerwona cebula', amount: '1/2 sztuki' },
      { name: 'Sok z cytryny', amount: '2 łyżki' },
      { name: 'Oliwa z oliwek', amount: '3 łyżki' },
      { name: 'Miód', amount: '1 łyżeczka' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Zamarynuj łososia w soku z cytryny, oliwie, soli i pieprzu.',
      'Grilluj łososia przez 4-5 minut z każdej strony.',
      'Pokrój awokado, pomidorki i ogórka.',
      'Przygotuj sos mieszając sok z cytryny, oliwę i miód.',
      'W misce połącz sałatę, pokrojone warzywa i cebulę.',
      'Dodaj grillowanego łososia i polej sosem.',
      'Delikatnie wymieszaj i podawaj.'
    ],
    comments: []
  },
  {
    id: '12',
    name: 'Keto burger z awokado',
    image: '/images/keto_burger.jpeg',
    description: 'Niskowęglowodanowy burger z kotletem wołowym i guacamole.',
    cookingTime: 30,
    servings: 2,
    type: 'danie główne',
    meat: 'wolowina',
    diet: 'keto',
    likes: 95,
    dateAdded: '2023-12-03',
    allergens: ['jaja'],
    ingredients: [
      { name: 'Mielona wolowina', amount: '400g' },
      { name: 'Awokado', amount: '1 sztuka' },
      { name: 'Pomidor', amount: '1 sztuka' },
      { name: 'Ser cheddar', amount: '2 plastry' },
      { name: 'Jajko', amount: '1 sztuka' },
      { name: 'Sałata', amount: '2 liście' },
      { name: 'Cebula czerwona', amount: '1/4 sztuki' },
      { name: 'Oliwa z oliwek', amount: '1 łyżka' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Uformuj 2 kotlety z mielonej wołowiny, dopraw solą i pieprzem.',
      'Usmaż kotlety na patelni, pod koniec smażenia połóż na nich ser.',
      'Przygotuj guacamole z awokado, cebuli i pomidora.',
      'Usmaż jajko sadzone.',
      'Ułóż burgera zaczynając od liścia sałaty, następnie kotlet z serem, guacamole i jajko.',
      'Podawaj bez bułki, aby zachować niską zawartość węglowodanów.'
    ],
    comments: []
  },
  {
    id: '13',
    name: 'Koktajl proteinowy z borówkami',
    image: '/images/koktajl_borowki.jpg',
    description: 'Pożywny koktajl proteinowy idealny po treningu.',
    cookingTime: 5,
    servings: 1,
    type: 'napoj',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 78,
    dateAdded: '2023-12-05',
    allergens: ['laktoza'],
    ingredients: [
      { name: 'Borówki', amount: '100g' },
      { name: 'Banan', amount: '1 sztuka' },
      { name: 'Jogurt grecki', amount: '150g' },
      { name: 'Mleko migdałowe', amount: '200ml' },
      { name: 'Proszek proteinowy', amount: '1 miarka' },
      { name: 'Miód', amount: '1 łyżeczka' },
      { name: 'Lód', amount: 'kilka kostek' }
    ],
    steps: [
      'Włóż wszystkie składniki do blendera.',
      'Miksuj do uzyskania gładkiej konsystencji.',
      'Przelej do szklanki i podawaj natychmiast.'
    ],
    comments: []
  },
  {
    id: '14',
    name: 'Omlet z pieczarkami i szpinakiem',
    image: '/images/omlet_pieczarki.jpg',
    description: 'Puszysty omlet z pieczarkami, szpinakiem i serem feta.',
    cookingTime: 15,
    servings: 2,
    type: 'sniadania',
    meat: 'none',
    diet: 'wegetarianskie',
    likes: 65,
    dateAdded: '2023-12-07',
    allergens: ['jaja', 'laktoza'],
    ingredients: [
      { name: 'Jajka', amount: '4 sztuki' },
      { name: 'Pieczarki', amount: '100g' },
      { name: 'Szpinak', amount: '50g' },
      { name: 'Ser feta', amount: '50g' },
      { name: 'Mleko', amount: '2 łyżki' },
      { name: 'Masło', amount: '1 łyżka' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Pokrój pieczarki i podsmaż je na maśle.',
      'Dodaj szpinak i smaż do zwiędnięcia.',
      'Roztrzep jajka z mlekiem, solą i pieprzem.',
      'Wylej masę jajeczną na patelnię z grzybami i szpinakiem.',
      'Posyp pokruszoną fetą.',
      'Smaż na małym ogniu pod przykryciem do ścięcia.',
      'Złóż omlet na pół i podawaj.'
    ],
    comments: []
  },
  {
    id: '15',
    name: 'Zupa krem z dyni',
    image: '/images/krem_dynia.jpg',
    description: 'Kremowa zupa z dyni z nutą cynamonu i imbiru.',
    cookingTime: 35,
    servings: 4,
    type: 'zupa',
    meat: 'none',
    diet: 'wegańskie',
    likes: 110,
    dateAdded: '2023-12-09',
    allergens: [],
    ingredients: [
      { name: 'Dynia', amount: '1 kg' },
      { name: 'Cebula', amount: '1 sztuka' },
      { name: 'Czosnek', amount: '2 ząbki' },
      { name: 'Imbir', amount: '1 łyżeczka' },
      { name: 'Cynamon', amount: '1/2 łyżeczki' },
      { name: 'Bulion warzywny', amount: '1 l' },
      { name: 'Mleko kokosowe', amount: '200 ml' },
      { name: 'Oliwa z oliwek', amount: '2 łyżki' },
      { name: 'Sól i pieprz', amount: 'do smaku' },
      { name: 'Pestki dyni', amount: 'do posypania' }
    ],
    steps: [
      'Pokrój dynię, cebulę i czosnek.',
      'Podsmaż cebulę i czosnek na oliwie.',
      'Dodaj pokrojoną dynię, imbir i cynamon.',
      'Zalej bulionem i gotuj do miękkości dyni.',
      'Zmiksuj zupę na gładki krem.',
      'Dodaj mleko kokosowe i dopraw do smaku.',
      'Podawaj posypane prażonymi pestkami dyni.'
    ],
    comments: []
  },
  {
    id: '16',
    name: 'Zapiekanka makaronowa z serem',
    image: '/images/zapiekanka_makaronowa.jpg',
    description: 'Pyszna zapiekanka z makaronu, sera i sosu beszamelowego.',
    cookingTime: 40,
    servings: 4,
    type: 'danie główne',
    meat: 'none',
    diet: 'wegańskie',
    likes: 95,
    dateAdded: '2023-12-01',
    allergens: ['laktoza', 'gluten'],
    ingredients: [
      { name: 'Makaron penne', amount: '250g' },
      { name: 'Ser żółty', amount: '200g' },
      { name: 'Mleko', amount: '500ml' },
      { name: 'Masło', amount: '2 łyżki' },
      { name: 'Mąka pszenna', amount: '2 łyżki' },
      { name: 'Gałka muszkatołowa', amount: 'szczypta' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Ugotuj makaron al dente i odcedź.',
      'Przygotuj sos beszamelowy: roztop masło, dodaj mąkę i mleko, mieszaj do uzyskania gładkiej konsystencji.',
      'Dopraw sos solą, pieprzem i gałką muszkatołową.',
      'Wymieszaj makaron z sosem i połową startego sera.',
      'Przełóż do naczynia żaroodpornego, posyp resztą sera.',
      'Piecz w 180°C przez 20 minut do zarumienienia.'
    ],
    comments: []
  },
  {
    id: '17',
    name: 'Placki ziemniaczane',
    image: '/images/placki_ziemniaczane.webp',
    description: 'Chrupiące placki z ziemniaków, doskonałe z kwaśną śmietaną.',
    cookingTime: 30,
    servings: 4,
    type: 'danie główne',
    meat: 'none',
    diet: 'wegańskie',
    likes: 120,
    dateAdded: '2023-12-03',
    allergens: ['jaja'],
    ingredients: [
      { name: 'Ziemniaki', amount: '1 kg' },
      { name: 'Cebula', amount: '1 sztuka' },
      { name: 'Jajka', amount: '2 sztuki' },
      { name: 'Mąka pszenna', amount: '3 łyżki' },
      { name: 'Sól i pieprz', amount: 'do smaku' },
      { name: 'Olej do smażenia', amount: 'do smażenia' }
    ],
    steps: [
      'Obierz i zetrzyj ziemniaki oraz cebulę na tarce.',
      'Odciśnij nadmiar wody z ziemniaków.',
      'Dodaj jajka, mąkę, sól i pieprz, wymieszaj.',
      'Na rozgrzanym oleju smaż placki na złoty kolor z obu stron.',
      'Podawaj z kwaśną śmietaną lub cukrem.'
    ],
    comments: []
  },
  {
    id: '18',
    name: 'Pizza Margherita',
    image: '/images/pizza_margherita.jpg',
    description: 'Klasyczna pizza z sosem pomidorowym, mozzarellą i bazylią.',
    cookingTime: 60,
    servings: 2,
    type: 'danie główne',
    meat: 'none',
    diet: 'wegańskie',
    likes: 200,
    dateAdded: '2023-12-05',
    allergens: ['gluten', 'laktoza'],
    ingredients: [
      { name: 'Ciasto na pizzę', amount: '1 porcja' },
      { name: 'Sos pomidorowy', amount: '200g' },
      { name: 'Mozzarella', amount: '200g' },
      { name: 'Bazylia świeża', amount: 'kilka listków' },
      { name: 'Oliwa z oliwek', amount: '1 łyżka' }
    ],
    steps: [
      'Rozwałkuj ciasto i ułóż na blasze.',
      'Posmaruj sosem pomidorowym.',
      'Rozłóż kawałki mozzarelli na pizzy.',
      'Piecz w piekarniku nagrzanym do 250°C przez 10-12 minut.',
      'Po upieczeniu posyp świeżą bazylią i skrop oliwą.'
    ],
    comments: []
  },
  {
    id: '19',
    name: 'Koktajl bananowo-szpinakowy',
    image: '/images/koktajl_banan_szpinak.webp',
    description: 'Zdrowy i sycący koktajl z bananem, szpinakiem i mlekiem roślinnym.',
    cookingTime: 5,
    servings: 1,
    type: 'napoj',
    meat: 'none',
    diet: 'wegańskie',
    likes: 75,
    dateAdded: '2023-12-06',
    allergens: [],
    ingredients: [
      { name: 'Banan', amount: '1 sztuka' },
      { name: 'Szpinak', amount: '1 garść' },
      { name: 'Mleko roślinne', amount: '200 ml' },
      { name: 'Miód', amount: '1 łyżeczka' }
    ],
    steps: [
      'Włóż wszystkie składniki do blendera.',
      'Miksuj do uzyskania gładkiej konsystencji.',
      'Przelej do szklanki i podawaj od razu.'
    ],
    comments: []
  },
  {
    id: '20',
    name: 'Chili con carne',
    image: '/images/chili_con_carne.jpg',
    description: 'Aromatyczne danie meksykańskie z mięsem mielonym i fasolą.',
    cookingTime: 50,
    servings: 4,
    type: 'danie główne',
    meat: 'wolowina',
    diet: 'none',
    likes: 180,
    dateAdded: '2023-12-07',
    allergens: [],
    ingredients: [
      { name: 'Mielona wolowina', amount: '500g' },
      { name: 'Czerwona fasola', amount: '400g' },
      { name: 'Pomidory krojone', amount: '400g' },
      { name: 'Cebula', amount: '1 sztuka' },
      { name: 'Czosnek', amount: '2 ząbki' },
      { name: 'Papryka chili', amount: '1 sztuka' },
      { name: 'Przyprawa chili', amount: '1 łyżka' },
      { name: 'Oliwa', amount: '2 łyżki' },
      { name: 'Sól i pieprz', amount: 'do smaku' }
    ],
    steps: [
      'Na patelni rozgrzej oliwę i zeszklij posiekaną cebulę z czosnkiem.',
      'Dodaj mięso mielone i smaż, aż się zrumieni.',
      'Dodaj przyprawy, pomidory i fasolę, wymieszaj.',
      'Gotuj na małym ogniu przez 30 minut.',
      'Podawaj z ryżem lub pieczywem.'
    ],
    comments: []
  },
  {
    id: '21',
    name: 'Pancakes z syropem klonowym',
    image: '/images/pancakes.jpg',
    description: 'Puszyste amerykańskie naleśniki podawane z syropem klonowym.',
    cookingTime: 20,
    servings: 4,
    type: 'sniadania',
    meat: 'none',
    diet: 'none',
    likes: 145,
    dateAdded: '2023-12-08',
    allergens: ['gluten', 'laktoza', 'jaja'],
    ingredients: [
      { name: 'Mąka pszenna', amount: '200g' },
      { name: 'Mleko', amount: '250ml' },
      { name: 'Jajka', amount: '2 sztuki' },
      { name: 'Cukier', amount: '2 łyżki' },
      { name: 'Proszek do pieczenia', amount: '1 łyżeczka' },
      { name: 'Masło', amount: 'do smażenia' },
      { name: 'Syrop klonowy', amount: 'do podania' }
    ],
    steps: [
      'W misce wymieszaj mąkę, proszek do pieczenia i cukier.',
      'Dodaj jajka i mleko, mieszając do uzyskania gładkiej masy.',
      'Na patelni roztop masło i smaż pancakes na złoty kolor.',
      'Podawaj z syropem klonowym.'
    ],
    comments: []
  }
]

export function addRecipe(recipe: Recipe) {
  mockRecipes.push({...recipe, comments: []});
}

type FilterParams = {
  searchTerm?: string;
  meatFilter?: string;
  dietFilter?: string;
  typeFilter?: string;
  timeFilter?: string;
};

export function getRandomRecipe(filters: FilterParams = {}): Recipe | undefined {
  const { searchTerm, meatFilter, dietFilter, typeFilter, timeFilter } = filters;

  const filteredRecipes = mockRecipes.filter(recipe => {
    const matchesSearch = !searchTerm ||
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    const matchesMeat = meatFilter === 'all' || recipe.meat === meatFilter;
    const matchesDiet = dietFilter === 'all' || recipe.diet === dietFilter;
    const matchesType = typeFilter === 'all' || recipe.type === typeFilter;
    const matchesTime = timeFilter === 'all' ||
        (timeFilter === '15' && recipe.cookingTime <= 15) ||
        (timeFilter === '30' && recipe.cookingTime <= 30) ||
        (timeFilter === '60' && recipe.cookingTime <= 60) ||
        (timeFilter === '60+' && recipe.cookingTime > 60);

    return matchesSearch && matchesMeat && matchesDiet && matchesType && matchesTime;
  });

  if (filteredRecipes.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  return filteredRecipes[randomIndex];
}

export function getAllRecipes(): Recipe[] {
  return mockRecipes
}

export function getRecipeById(id: string): Recipe | undefined {
  return mockRecipes.find(recipe => recipe.id === id)
}

export function addCommentToRecipe(recipeId: string, comment: Comment) {
  const recipe = mockRecipes.find(r => r.id === recipeId);
  if (recipe) {
    recipe.comments = [...recipe.comments, comment];
  }
}

export function updateRecipeInGlobalState(updatedRecipe: Recipe) {
  const index = mockRecipes.findIndex(recipe => recipe.id === updatedRecipe.id);
  if (index !== -1) {
    mockRecipes[index] = updatedRecipe;
  }
}

