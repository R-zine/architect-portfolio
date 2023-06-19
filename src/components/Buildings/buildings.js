class building {
	constructor(img, path, desc) {
		this.img = img;
		this.path = path;
		this.desc = desc;
	}
}

const buildings = [
	new building('./img/buildings/1.jpg', 'sozopol', [
		'Еднофамилна къща в Созопол',
		'Seaside House in Sozopol',
	]),
	new building('./img/buildings/2.jpg', 'outlet', [
		'Аутлет Център (проект)',
		'Shopping Center',
	]),
	new building('./img/buildings/3.jpg', 'wienerNeustadt3', [
		'Комплекс във Винер Нойщат, Австрия',
		'Building in Wiener Neustadt, Austria',
	]),
	new building('./img/buildings/4.jpg', 'balchik', [
		'Хотел в Балчик (проект)',
		'Hotel in Balchik',
	]),
	new building('./img/buildings/5.jpg', 'eaglesLodge', [
		"Комплекс Knights' Lodge, Банско",
		"Knights' Lodge Apartments in Bansko",
	]),
	new building('./img/buildings/6.png', 'duni', [
		'Жилищен комплекс в Дюни (проект)',
		'Seaside Building Complex in Diuni',
	]),
	new building('./img/buildings/7.jpg', 'cherniVrah', [
		"Жилищна сграда бул. 'Черни връх' 26",
		'Apartment Building on Cherni Vrah, Sofia',
	]),
	new building('./img/buildings/8.jpg', 'studentskiGrad', [
		'Жилищна сграда Студентски град (проект)',
		'Apartment Building in Sofia',
	]),
	new building('./img/buildings/9.jpg', 'house1', [
		'Еднофамилна къща във Винер Нойщат, Австрия',
		'Family House in Wiener Neustadt, Austria',
	]),
	new building('./img/buildings/10.jpg', 'house2', [
		'Еднофамилна къща св. Влас',
		'Seaside Family House sv. Vlas',
	]),
	new building('./img/buildings/11.jpg', 'vlas', [
		'Жилищна сграда св. Влас',
		'Apartment Complex Sv. Vlas',
	]),
	new building('./img/buildings/12.jpg', 'chervenaStena', [
		"Жилищна сграда ул. 'Червена стена'",
		'Residential Building in Sofia',
	]),
	new building('./img/buildings/13.jpg', 'grandRoyale', [
		'Хотел Гранд Роял, Банско',
		'The Grand Royale Hotel, Bansko',
	]),
	new building('./img/buildings/14.jpg', 'wienerNeustadt1', [
		'Жилищен комплекс във Винер Нойщат, Австрия',
		'Residential Complex in Wiener Neustadt, Austria',
	]),
	new building('./img/buildings/15.jpg', 'wienerNeustadt', [
		'Жилищен комплекс във Винер Нойщат, Австрия',
		'Residential Complex in Wiener Neustadt, Austria',
	]),
	new building('./img/buildings/16.jpg', 'wienerNeustadt2', [
		'Жилищен комплекс във Винер Нойщат, Австрия',
		'Residential Complex in Wiener Neustadt, Austria',
	]),
	new building('./img/buildings/17.jpg', 'iskar', [
		'Еднофамилна къща в София',
		'Family House in Sofia',
	]),
];

const grandRoyale = [
	new building('./img/grandRoyale/1.jpg', 'none'),
	new building('./img/grandRoyale/2.jpg', 'none'),
	new building('./img/grandRoyale/3.jpg', 'none'),
	new building('./img/grandRoyale/4.jpg', 'none'),
	new building('./img/grandRoyale/5.jpg', 'none'),
	new building('./img/grandRoyale/6.jpg', 'none'),
	new building('./img/grandRoyale/7.jpg', 'none'),
	new building('./img/grandRoyale/8.jpg', 'none'),
	new building('./img/grandRoyale/9.jpg', 'none'),
];

const sozopol = [
	new building('./img/sozopol/1.jpg', 'none'),
	new building('./img/sozopol/2.jpg', 'none'),
	new building('./img/sozopol/3.jpg', 'none'),
	new building('./img/sozopol/4.jpg', 'none'),
	new building('./img/sozopol/5.jpg', 'none'),
	new building('./img/sozopol/6.jpg', 'none'),
	new building('./img/sozopol/7.jpg', 'none'),
	new building('./img/sozopol/8.jpg', 'none'),
];

const outlet = [
	new building('./img/outlet/1.jpg', 'none'),
	new building('./img/outlet/2.jpg', 'none'),
	new building('./img/outlet/3.jpg', 'none'),
	new building('./img/outlet/4.jpg', 'none'),
	new building('./img/outlet/5.jpg', 'none'),
	new building('./img/outlet/6.jpg', 'none'),
];

const wienerNeustadt3 = [
	new building('./img/wienerNeustadt3/1.jpg', 'none'),
	new building('./img/wienerNeustadt3/2.jpg', 'none'),
	new building('./img/wienerNeustadt3/3.jpg', 'none'),
	new building('./img/wienerNeustadt3/4.jpg', 'none'),
	new building('./img/wienerNeustadt3/5.jpg', 'none'),
	new building('./img/wienerNeustadt3/6.jpg', 'none'),
];

const wienerNeustadt1 = [
	new building('./img/wienerNeustadt1/1.jpg', 'none'),
	new building('./img/wienerNeustadt1/2.jpg', 'none'),
];

const wienerNeustadt2 = [
	new building('./img/wienerNeustadt2/1.jpg', 'none'),
	new building('./img/wienerNeustadt2/2.jpg', 'none'),
	new building('./img/wienerNeustadt2/3.jpg', 'none'),
];

const wienerNeustadt = [
	new building('./img/wienerNeustadt/1.jpg', 'none'),
	new building('./img/wienerNeustadt/2.jpg', 'none'),
	new building('./img/wienerNeustadt/3.jpg', 'none'),
	new building('./img/wienerNeustadt/4.jpg', 'none'),
	new building('./img/wienerNeustadt/5.jpg', 'none'),
	new building('./img/wienerNeustadt/6.jpg', 'none'),
	new building('./img/wienerNeustadt/7.jpg', 'none'),
	new building('./img/wienerNeustadt/8.jpg', 'none'),
	new building('./img/wienerNeustadt/9.jpg', 'none'),
	new building('./img/wienerNeustadt/10.jpg', 'none'),
];

const duni = [new building('./img/diuni/1.png', 'none')];

const eaglesLodge = [
	new building('./img/eaglesLodge/1.png', 'none'),
	new building('./img/eaglesLodge/2.jpg', 'none'),
	new building('./img/eaglesLodge/3.jpg', 'none'),
	new building('./img/eaglesLodge/4.jpg', 'none'),
	new building('./img/eaglesLodge/5.jpg', 'none'),
	new building('./img/eaglesLodge/6.jpg', 'none'),
];

const balchik = [
	new building('./img/balchik/1.jpg', 'none'),
	new building('./img/balchik/2.jpg', 'none'),
	new building('./img/balchik/3.jpg', 'none'),
	new building('./img/balchik/4.jpg', 'none'),
	new building('./img/balchik/5.jpg', 'none'),
	new building('./img/balchik/6.jpg', 'none'),
	new building('./img/balchik/7.jpg', 'none'),
	new building('./img/balchik/8.jpg', 'none'),
	new building('./img/balchik/9.jpg', 'none'),
	new building('./img/balchik/10.jpg', 'none'),
	new building('./img/balchik/11.jpg', 'none'),
	new building('./img/balchik/12.png', 'none'),
	new building('./img/balchik/13.png', 'none'),
	new building('./img/balchik/14.png', 'none'),
];

const cherniVrah = [
	new building('./img/cherniVrah/1.jpg', 'none'),
	new building('./img/cherniVrah/2.jpg', 'none'),
	new building('./img/cherniVrah/3.jpg', 'none'),
	new building('./img/cherniVrah/4.jpg', 'none'),
	new building('./img/cherniVrah/5.jpg', 'none'),
	new building('./img/cherniVrah/6.jpg', 'none'),
	new building('./img/cherniVrah/7.jpg', 'none'),
];

const studentskiGrad = [
	new building('./img/studentskiGrad/1.jpg', 'none'),
	new building('./img/studentskiGrad/2.jpg', 'none'),
	new building('./img/studentskiGrad/3.jpg', 'none'),
	new building('./img/studentskiGrad/4.jpg', 'none'),
	new building('./img/studentskiGrad/5.jpg', 'none'),
];

const house1 = [
	new building('./img/house1/1.jpg', 'none'),
	new building('./img/house1/2.jpg', 'none'),
	new building('./img/house1/3.jpg', 'none'),
	new building('./img/house1/4.jpg', 'none'),
	new building('./img/house1/5.jpg', 'none'),
	new building('./img/house1/6.jpg', 'none'),
	new building('./img/house1/7.jpg', 'none'),
];

const house2 = [
	new building('./img/house2/1.jpg', 'none'),
	new building('./img/house2/2.jpg', 'none'),
	new building('./img/house2/3.jpg', 'none'),
	new building('./img/house2/4.jpg', 'none'),
	new building('./img/house2/5.jpg', 'none'),
	new building('./img/house2/6.jpg', 'none'),
	new building('./img/house2/7.jpg', 'none'),
	new building('./img/house2/8.jpg', 'none'),
	new building('./img/house2/9.jpg', 'none'),
	new building('./img/house2/10.jpg', 'none'),
	new building('./img/house2/11.jpg', 'none'),
	new building('./img/house2/12.jpg', 'none'),
	new building('./img/house2/13.jpg', 'none'),
	new building('./img/house2/14.jpg', 'none'),
];

const vlas = [
	new building('./img/vlas/1.jpg', 'none'),
	new building('./img/vlas/2.jpg', 'none'),
	new building('./img/vlas/3.jpg', 'none'),
	new building('./img/vlas/4.jpg', 'none'),
];

const iskar = [
	new building('./img/iskar/1.jpg', 'none'),
	new building('./img/iskar/2.jpg', 'none'),
	new building('./img/iskar/3.jpg', 'none'),
	new building('./img/iskar/4.jpg', 'none'),
	new building('./img/iskar/5.jpg', 'none'),
];

const interior = [
	new building('./img/interior/1.jpg', 'rentap1', [
		'Четиристаен апартамент',
		'3-bedroom Apartment',
	]),
	new building('./img/interior/2.jpg', 'rentap2', [
		'Четиристаен апартамент',
		'3-bedroom Apartment',
	]),
	new building('./img/interior/3.jpg', 'rentap3', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/4.jpg', 'rentap4', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/5.jpg', 'rentap5', [
		'Четиристаен апартамент',
		'3-bedroom Apartment',
	]),
	new building('./img/interior/6.jpg', 'rentap6', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/7.jpg', 'ednostaen', ['Студио', 'Studio']),
	new building('./img/interior/8.jpg', 'bankera', [
		'Еднофамилна къща',
		'family house',
	]),
	new building('./img/interior/9.jpg', 'krisi', [
		'Двустаен апартамент',
		'1-bedroom Apartment',
	]),
	new building('./img/interior/10.jpg', 'Zlatovryh1', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/11.jpg', 'Zlatovryh2', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/12.jpg', 'white', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/13.jpg', 'studentski', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/14.jpg', 'olga', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/15.jpg', 'ivo', ['Мезонет', 'Penthouse']),
	new building('./img/interior/16.jpg', 'Vladimir', [
		'Тристаен апартамент',
		'2-bedroom Apartment',
	]),
	new building('./img/interior/17.jpg', 'mezonet', ['Мезонет', 'Penthouse']),
	new building('./img/interior/18.jpg', 'hotels', [
		'Хотели и ресторанти',
		'Hotel and Restaurant',
	]),
];

const rentap1 = [
	new building('./img/rentap1/1.jpg', 'none'),
	new building('./img/rentap1/2.jpg', 'none'),
	new building('./img/rentap1/3.jpg', 'none'),
	new building('./img/rentap1/4.jpg', 'none'),
	new building('./img/rentap1/5.jpg', 'none'),
	new building('./img/rentap1/6.jpg', 'none'),
	new building('./img/rentap1/7.jpg', 'none'),
	new building('./img/rentap1/8.jpg', 'none'),
	new building('./img/rentap1/9.jpg', 'none'),
	new building('./img/rentap1/10.jpg', 'none'),
];

const rentap2 = [
	new building('./img/rentap2/1.jpg', 'none'),
	new building('./img/rentap2/2.jpg', 'none'),
	new building('./img/rentap2/3.jpg', 'none'),
	new building('./img/rentap2/4.jpg', 'none'),
	new building('./img/rentap2/5.jpg', 'none'),
	new building('./img/rentap2/6.jpg', 'none'),
	new building('./img/rentap2/7.jpg', 'none'),
	new building('./img/rentap2/8.jpg', 'none'),
	new building('./img/rentap2/9.jpg', 'none'),
];

const rentap3 = [
	new building('./img/rentap3/1.jpg', 'none'),
	new building('./img/rentap3/2.jpg', 'none'),
	new building('./img/rentap3/3.jpg', 'none'),
	new building('./img/rentap3/4.jpg', 'none'),
];

const rentap4 = [
	new building('./img/rentap4/1.jpg', 'none'),
	new building('./img/rentap4/2.jpg', 'none'),
	new building('./img/rentap4/3.jpg', 'none'),
	new building('./img/rentap4/4.jpg', 'none'),
	new building('./img/rentap4/5.jpg', 'none'),
	new building('./img/rentap4/6.jpg', 'none'),
	new building('./img/rentap4/7.jpg', 'none'),
	new building('./img/rentap4/8.jpg', 'none'),
];

const rentap5 = [
	new building('./img/rentap5/1.jpg', 'none'),
	new building('./img/rentap5/2.jpg', 'none'),
	new building('./img/rentap5/3.jpg', 'none'),
];

const rentap6 = [
	new building('./img/rentap6/1.jpg', 'none'),
	new building('./img/rentap6/2.jpg', 'none'),

	new building('./img/rentap6/4.jpg', 'none'),
	new building('./img/rentap6/5.jpg', 'none'),
	new building('./img/rentap6/6.jpg', 'none'),
];

const ednostaen = [
	new building('./img/ednostaen/1.png', 'none'),
	new building('./img/ednostaen/2.png', 'none'),
	new building('./img/ednostaen/3.png', 'none'),
	new building('./img/ednostaen/4.png', 'none'),
	new building('./img/ednostaen/5.jpg', 'none'),
	new building('./img/ednostaen/6.jpg', 'none'),
	new building('./img/ednostaen/7.jpg', 'none'),
];

const bankera = [
	new building('./img/bankera/1.jpg', 'none'),
	new building('./img/bankera/2.jpg', 'none'),
	new building('./img/bankera/3.jpg', 'none'),
	new building('./img/bankera/4.jpg', 'none'),
	new building('./img/bankera/5.jpg', 'none'),
	new building('./img/bankera/6.jpg', 'none'),
	new building('./img/bankera/7.jpg', 'none'),
	new building('./img/bankera/8.jpg', 'none'),
	new building('./img/bankera/9.jpg', 'none'),
	new building('./img/bankera/10.jpg', 'none'),
	new building('./img/bankera/11.jpg', 'none'),
	new building('./img/bankera/12.jpg', 'none'),
	new building('./img/bankera/13.jpg', 'none'),
	new building('./img/bankera/14.jpg', 'none'),
	new building('./img/bankera/15.jpg', 'none'),
	new building('./img/bankera/16.jpg', 'none'),
	new building('./img/bankera/17.jpg', 'none'),
	new building('./img/bankera/18.jpg', 'none'),
	new building('./img/bankera/19.jpg', 'none'),
	new building('./img/bankera/20.jpg', 'none'),
	new building('./img/bankera/21.jpg', 'none'),
	new building('./img/bankera/22.jpg', 'none'),
	new building('./img/bankera/23.jpg', 'none'),
];

const krisi = [
	new building('./img/krisi/1.jpg', 'none'),
	new building('./img/krisi/2.jpg', 'none'),
	new building('./img/krisi/3.jpg', 'none'),
	new building('./img/krisi/4.jpg', 'none'),
	new building('./img/krisi/5.jpg', 'none'),
	new building('./img/krisi/6.jpg', 'none'),
	new building('./img/krisi/7.jpg', 'none'),
];

const Zlatovryh1 = [
	new building('./img/Zlatovryh1/1.jpg', 'none'),
	new building('./img/Zlatovryh1/2.jpg', 'none'),
	new building('./img/Zlatovryh1/3.jpg', 'none'),
	new building('./img/Zlatovryh1/4.jpg', 'none'),
	new building('./img/Zlatovryh1/5.jpg', 'none'),
	new building('./img/Zlatovryh1/6.jpg', 'none'),
	new building('./img/Zlatovryh1/7.jpg', 'none'),
];

const Zlatovryh2 = [
	new building('./img/Zlatovryh2/1.jpg', 'none'),
	new building('./img/Zlatovryh2/2.jpg', 'none'),
	new building('./img/Zlatovryh2/3.jpg', 'none'),
	new building('./img/Zlatovryh2/4.jpg', 'none'),
	new building('./img/Zlatovryh2/5.jpg', 'none'),
	new building('./img/Zlatovryh2/6.jpg', 'none'),
	new building('./img/Zlatovryh2/7.jpg', 'none'),
	new building('./img/Zlatovryh2/8.jpg', 'none'),
	new building('./img/Zlatovryh2/9.jpg', 'none'),
	new building('./img/Zlatovryh2/10.jpg', 'none'),
];

const white = [
	new building('./img/white/1.jpg', 'none'),
	new building('./img/white/2.jpg', 'none'),
	new building('./img/white/3.jpg', 'none'),
	new building('./img/white/4.jpg', 'none'),
	new building('./img/white/5.jpg', 'none'),
	new building('./img/white/6.jpg', 'none'),
	new building('./img/white/7.jpg', 'none'),
	new building('./img/white/8.jpg', 'none'),
	new building('./img/white/9.jpg', 'none'),
	new building('./img/white/10.jpg', 'none'),
	new building('./img/white/11.jpg', 'none'),
	new building('./img/white/12.jpg', 'none'),
	new building('./img/white/13.jpg', 'none'),
];

const studentski = [
	new building('./img/studentski/1.jpg', 'none'),
	new building('./img/studentski/2.jpg', 'none'),
	new building('./img/studentski/3.jpg', 'none'),
	new building('./img/studentski/4.jpg', 'none'),
	new building('./img/studentski/5.jpg', 'none'),
	new building('./img/studentski/6.jpg', 'none'),
];

const olga = [
	new building('./img/olga/1.jpg', 'none'),
	new building('./img/olga/2.jpg', 'none'),
	new building('./img/olga/3.jpg', 'none'),
	new building('./img/olga/4.jpg', 'none'),
	new building('./img/olga/5.jpg', 'none'),
	new building('./img/olga/6.jpg', 'none'),
];

const ivo = [
	new building('./img/ivo/1.jpg', 'none'),
	new building('./img/ivo/2.jpg', 'none'),
	new building('./img/ivo/3.jpg', 'none'),
	new building('./img/ivo/4.jpg', 'none'),
	new building('./img/ivo/5.jpg', 'none'),
	new building('./img/ivo/6.jpg', 'none'),
	new building('./img/ivo/7.jpg', 'none'),
	new building('./img/ivo/8.jpg', 'none'),
	new building('./img/ivo/9.jpg', 'none'),
	new building('./img/ivo/10.jpg', 'none'),
	new building('./img/ivo/11.jpg', 'none'),
	new building('./img/ivo/12.jpg', 'none'),
	new building('./img/ivo/13.jpg', 'none'),
	new building('./img/ivo/14.jpg', 'none'),
	new building('./img/ivo/15.jpg', 'none'),
	new building('./img/ivo/16.jpg', 'none'),
	new building('./img/ivo/17.jpg', 'none'),
	new building('./img/ivo/18.jpg', 'none'),
	new building('./img/ivo/19.jpg', 'none'),
	new building('./img/ivo/20.jpg', 'none'),
	new building('./img/ivo/21.jpg', 'none'),
	new building('./img/ivo/22.jpg', 'none'),
];

const Vladimir = [
	new building('./img/Vladimir/1.jpg', 'none'),
	new building('./img/Vladimir/2.jpg', 'none'),
	new building('./img/Vladimir/3.jpg', 'none'),
	new building('./img/Vladimir/4.jpg', 'none'),
	new building('./img/Vladimir/5.jpg', 'none'),
	new building('./img/Vladimir/6.jpg', 'none'),
	new building('./img/Vladimir/7.jpg', 'none'),
	new building('./img/Vladimir/8.jpg', 'none'),
];

const mezonet = [
	new building('./img/mezonet/1.jpg', 'none'),
	new building('./img/mezonet/2.jpg', 'none'),
	new building('./img/mezonet/3.jpg', 'none'),
	new building('./img/mezonet/4.jpg', 'none'),
	new building('./img/mezonet/5.jpg', 'none'),
	new building('./img/mezonet/6.jpg', 'none'),
	new building('./img/mezonet/7.jpg', 'none'),
	new building('./img/mezonet/8.jpg', 'none'),
];

const hotels = [
	new building('./img/zavedenia/1.jpg', 'none'),
	new building('./img/zavedenia/2.jpg', 'none'),
	new building('./img/zavedenia/3.jpg', 'none'),
	new building('./img/zavedenia/4.jpg', 'none'),
	new building('./img/zavedenia/5.jpg', 'none'),
	new building('./img/zavedenia/6.jpg', 'none'),
	new building('./img/zavedenia/7.jpg', 'none'),
	new building('./img/zavedenia/8.jpg', 'none'),
	new building('./img/zavedenia/9.jpg', 'none'),
	new building('./img/zavedenia/10.jpg', 'none'),
	new building('./img/zavedenia/11.jpg', 'none'),
	new building('./img/zavedenia/12.jpg', 'none'),
	new building('./img/zavedenia/13.jpg', 'none'),
];

const furniture = [
	new building('./img/furniture/1.jpg', 'kitchen', ['Кухни', 'Kitchens']),
	new building('./img/furniture/2.jpg', 'bedrooms', ['Спални', 'Bedrooms']),
	new building('./img/furniture/3.jpg', 'bedrooms2', [
		'Детско-юношески спални',
		'Children and adolescent bedrooms',
	]),
	new building('./img/furniture/4.jpg', 'closet', [
		'Дрешници',
		'Walk-in Closets',
	]),
	new building('./img/furniture/5.jpg', 'office', ['Офиси', 'Office']),
	new building('./img/furniture/6.png', 'entryways', ['Антрета', 'Entryways']),
	new building('./img/furniture/7.jpg', 'bathrooms', ['Бани', 'Bathrooms']),
	new building('./img/furniture/8.jpg', 'tv', ['ТВ шкафове', 'TV sets']),
];

const kitchen = [
	new building('./img/kuhni/1.jpg', 'none'),
	new building('./img/kuhni/2.jpg', 'none'),
	new building('./img/kuhni/3.jpg', 'none'),
	new building('./img/kuhni/4.jpg', 'none'),
	new building('./img/kuhni/5.jpg', 'none'),
	new building('./img/kuhni/6.jpg', 'none'),
	new building('./img/kuhni/7.jpg', 'none'),
	new building('./img/kuhni/8.jpg', 'none'),
	new building('./img/kuhni/9.jpg', 'none'),
	new building('./img/kuhni/10.jpg', 'none'),
	new building('./img/kuhni/11.jpg', 'none'),
	new building('./img/kuhni/12.jpg', 'none'),
	new building('./img/kuhni/13.jpg', 'none'),
	new building('./img/kuhni/14.jpg', 'none'),
	new building('./img/kuhni/15.png', 'none'),
	new building('./img/kuhni/16.jpg', 'none'),
	new building('./img/kuhni/17.jpg', 'none'),
	new building('./img/kuhni/18.jpg', 'none'),
	new building('./img/kuhni/19.jpg', 'none'),
	new building('./img/kuhni/20.jpg', 'none'),
	new building('./img/kuhni/21.jpg', 'none'),
	new building('./img/kuhni/22.jpg', 'none'),
	new building('./img/kuhni/23.jpg', 'none'),
	new building('./img/kuhni/24.jpg', 'none'),
	new building('./img/kuhni/25.jpg', 'none'),
	new building('./img/kuhni/26.jpg', 'none'),
	new building('./img/kuhni/27.jpg', 'none'),
];

const bedrooms = [
	new building('./img/bedrooms/1.jpg', 'none'),
	new building('./img/bedrooms/2.jpg', 'none'),
	new building('./img/bedrooms/3.jpg', 'none'),
	new building('./img/bedrooms/4.jpg', 'none'),
	new building('./img/bedrooms/5.jpg', 'none'),
	new building('./img/bedrooms/6.jpg', 'none'),
	new building('./img/bedrooms/7.png', 'none'),
	new building('./img/bedrooms/8.jpg', 'none'),
	new building('./img/bedrooms/9.jpg', 'none'),
	new building('./img/bedrooms/10.jpg', 'none'),
	new building('./img/bedrooms/11.jpg', 'none'),
	new building('./img/bedrooms/12.jpg', 'none'),
	new building('./img/bedrooms/13.jpg', 'none'),
	new building('./img/bedrooms/14.jpg', 'none'),
	new building('./img/bedrooms/15.jpg', 'none'),
	new building('./img/bedrooms/16.jpg', 'none'),
	new building('./img/bedrooms/17.jpg', 'none'),
	new building('./img/bedrooms/18.jpg', 'none'),
	new building('./img/bedrooms/19.jpg', 'none'),
	new building('./img/bedrooms/20.jpg', 'none'),
	new building('./img/bedrooms/21.jpg', 'none'),
	new building('./img/bedrooms/22.jpg', 'none'),
	new building('./img/bedrooms/23.jpg', 'none'),
	new building('./img/bedrooms/24.jpg', 'none'),
	new building('./img/bedrooms/25.jpg', 'none'),
	new building('./img/bedrooms/26.jpg', 'none'),
	new building('./img/bedrooms/28.jpg', 'none'),
	new building('./img/bedrooms/29.jpg', 'none'),
	new building('./img/bedrooms/30.jpg', 'none'),
	new building('./img/bedrooms/31.jpg', 'none'),
	new building('./img/bedrooms/32.jpg', 'none'),
	new building('./img/bedrooms/33.jpg', 'none'),
	new building('./img/bedrooms/34.jpg', 'none'),
	new building('./img/bedrooms/35.jpg', 'none'),
	new building('./img/bedrooms/36.jpg', 'none'),
	new building('./img/bedrooms/37.jpg', 'none'),
	new building('./img/bedrooms/38.jpg', 'none'),
	new building('./img/bedrooms/39.jpg', 'none'),
	new building('./img/bedrooms/40.jpg', 'none'),
	new building('./img/bedrooms/41.jpg', 'none'),
	new building('./img/bedrooms/42.jpg', 'none'),
	new building('./img/bedrooms/43.jpg', 'none'),
	new building('./img/bedrooms/44.jpg', 'none'),
	new building('./img/bedrooms/45.png', 'none'),
	new building('./img/bedrooms/46.png', 'none'),
];

const bedrooms2 = [
	new building('./img/bedrooms2/1.jpg', 'none'),
	new building('./img/bedrooms2/2.png', 'none'),
	new building('./img/bedrooms2/3.jpg', 'none'),
	new building('./img/bedrooms2/4.jpg', 'none'),
	new building('./img/bedrooms2/5.jpg', 'none'),
	new building('./img/bedrooms2/6.jpg', 'none'),
	new building('./img/bedrooms2/7.jpg', 'none'),
	new building('./img/bedrooms2/8.jpg', 'none'),
	new building('./img/bedrooms2/9.jpg', 'none'),
	new building('./img/bedrooms2/10.jpg', 'none'),
	new building('./img/bedrooms2/11.jpg', 'none'),
	new building('./img/bedrooms2/12.jpg', 'none'),
	new building('./img/bedrooms2/13.jpg', 'none'),
	new building('./img/bedrooms2/14.jpg', 'none'),
	new building('./img/bedrooms2/15.png', 'none'),
	new building('./img/bedrooms2/16.jpg', 'none'),
	new building('./img/bedrooms2/17.jpg', 'none'),
	new building('./img/bedrooms2/18.jpg', 'none'),
	new building('./img/bedrooms2/19.jpg', 'none'),
	new building('./img/bedrooms2/20.jpg', 'none'),
	new building('./img/bedrooms2/21.jpg', 'none'),
	new building('./img/bedrooms2/22.jpg', 'none'),
	new building('./img/bedrooms2/23.jpg', 'none'),
	new building('./img/bedrooms2/24.jpg', 'none'),
	new building('./img/bedrooms2/25.jpg', 'none'),
	new building('./img/bedrooms2/26.png', 'none'),
	new building('./img/bedrooms2/27.png', 'none'),
];

const closet = [
	new building('./img/dreshnik/1.png', 'none'),
	new building('./img/dreshnik/2.png', 'none'),
	new building('./img/dreshnik/3.png', 'none'),
	new building('./img/dreshnik/4.jpg', 'none'),
	new building('./img/dreshnik/5.jpg', 'none'),
	new building('./img/dreshnik/6.jpg', 'none'),
	new building('./img/dreshnik/7.jpg', 'none'),
];

const office = [
	new building('./img/ofis/1.png', 'none'),
	new building('./img/ofis/2.png', 'none'),
	new building('./img/ofis/3.jpg', 'none'),
	new building('./img/ofis/4.jpg', 'none'),
	new building('./img/ofis/5.jpg', 'none'),
	new building('./img/ofis/6.jpg', 'none'),
	new building('./img/ofis/7.jpg', 'none'),
	new building('./img/ofis/8.jpg', 'none'),
	new building('./img/ofis/9.jpg', 'none'),
	new building('./img/ofis/10.jpg', 'none'),
	new building('./img/ofis/11.jpg', 'none'),
	new building('./img/ofis/12.jpg', 'none'),
	new building('./img/ofis/13.jpg', 'none'),
	new building('./img/ofis/14.jpg', 'none'),
	new building('./img/ofis/15.jpg', 'none'),
	new building('./img/ofis/16.jpg', 'none'),
	new building('./img/ofis/17.jpg', 'none'),
	new building('./img/ofis/18.jpg', 'none'),
	new building('./img/ofis/19.jpg', 'none'),
	new building('./img/ofis/20.jpg', 'none'),
	new building('./img/ofis/21.jpg', 'none'),
	new building('./img/ofis/22.jpg', 'none'),
];

const entryways = [
	new building('./img/antre/1.png', 'none'),
	new building('./img/antre/2.png', 'none'),

	new building('./img/antre/4.png', 'none'),
	new building('./img/antre/5.jpg', 'none'),
	new building('./img/antre/6.jpg', 'none'),
	new building('./img/antre/7.jpg', 'none'),
	new building('./img/antre/8.png', 'none'),
	new building('./img/antre/9.png', 'none'),
	new building('./img/antre/10.jpg', 'none'),
	new building('./img/antre/11.jpg', 'none'),
];

const bathrooms = [
	new building('./img/bathrooms/1.jpg', 'none'),
	new building('./img/bathrooms/2.jpg', 'none'),
	new building('./img/bathrooms/3.jpg', 'none'),
	new building('./img/bathrooms/4.jpg', 'none'),
	new building('./img/bathrooms/5.jpg', 'none'),
	new building('./img/bathrooms/6.jpg', 'none'),
	new building('./img/bathrooms/7.jpg', 'none'),
	new building('./img/bathrooms/8.jpg', 'none'),
	new building('./img/bathrooms/9.jpg', 'none'),
	new building('./img/bathrooms/10.jpg', 'none'),
	new building('./img/bathrooms/11.jpg', 'none'),
	new building('./img/bathrooms/12.jpg', 'none'),
	new building('./img/bathrooms/13.jpg', 'none'),
	new building('./img/bathrooms/14.jpg', 'none'),
	new building('./img/bathrooms/15.jpg', 'none'),
	new building('./img/bathrooms/16.jpg', 'none'),
];

const tv = [
	new building('./img/tv/1.jpg', 'none'),
	new building('./img/tv/2.jpg', 'none'),
	new building('./img/tv/3.jpg', 'none'),
	new building('./img/tv/4.png', 'none'),
	new building('./img/tv/5.jpg', 'none'),
	new building('./img/tv/6.jpg', 'none'),
	new building('./img/tv/7.jpg', 'none'),
	new building('./img/tv/8.jpg', 'none'),
	new building('./img/tv/9.jpg', 'none'),
	new building('./img/tv/10.png', 'none'),
	new building('./img/tv/11.jpg', 'none'),
	new building('./img/tv/12.jpg', 'none'),
	new building('./img/tv/13.jpg', 'none'),
];

const pictureData = {
	buildings: buildings,
	grandRoyale: grandRoyale,
	sozopol: sozopol,
	outlet: outlet,
	wienerNeustadt: wienerNeustadt,
	wienerNeustadt3: wienerNeustadt3,
	wienerNeustadt1: wienerNeustadt1,
	wienerNeustadt2: wienerNeustadt2,
	duni: duni,
	eaglesLodge: eaglesLodge,
	balchik: balchik,
	cherniVrah: cherniVrah,
	studentskiGrad: studentskiGrad,
	house1: house1,
	house2: house2,
	vlas: vlas,
	iskar: iskar,
	interior: interior,
	rentap1: rentap1,
	rentap2: rentap2,
	rentap3: rentap3,
	rentap4: rentap4,
	rentap5: rentap5,
	rentap6: rentap6,
	ednostaen: ednostaen,
	bankera: bankera,
	krisi: krisi,
	Zlatovryh1: Zlatovryh1,
	Zlatovryh2: Zlatovryh2,
	white: white,
	studentski: studentski,
	olga: olga,
	ivo: ivo,
	Vladimir: Vladimir,
	mezonet: mezonet,
	hotels: hotels,
	furniture: furniture,
	kitchen: kitchen,
	bedrooms: bedrooms,
	bedrooms2: bedrooms2,
	closet: closet,
	office: office,
	entryways: entryways,
	bathrooms: bathrooms,
	tv: tv,
};

export default pictureData;
