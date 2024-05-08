export const CardType = Object.freeze({
  CAR: 'CAR',
  AUCTION: 'AUCTION',
  VERIFICATION_REQUEST: 'VERIFICATION_REQUEST',
});

export const Status = Object.freeze({
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
});

export const AuctionStatus = Object.freeze({
  PENDING: 'PENDING',
  INCOMING: 'INCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
});

export const AuctionFilter = Object.freeze({
  ALL: 'ALL',
  REGISTERED: 'REGISTERED',
  UNREGISTERED: 'UNREGISTERED',
});

export const VerificationRequestFilter = Object.freeze({
  ALL: 'ALL',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
});

export const brandOptions = [
  'Chevrolet',
  'Volkswagen',
  'Honda',
  'Hyundai',
  'Mercedes-Benz',
  'Nissan',
  'Ford',
  'BMW',
  'Kia',
  'Toyota',
];
export const modelOptions = [
  'BMW 3 Series-6282',
  'BMW 3 Series-7361',
  'BMW Altima-8853',
  'BMW Civic-3524',
  'BMW Corolla-4255',
  'BMW Corolla-9796',
  'BMW E-Class-7527',
  'BMW F-150-4852',
  'BMW F-150-9186',
  'BMW F-150-9436',
  'BMW Jetta-9669',
  'BMW Silverado-7714',
  'BMW Sportage-1560',
  'BMW Sportage-2939',
  'BMW Sportage-3251',
  'BMW Sportage-5385',
  'BMW Sportage-8133',
  'Chevrolet 3 Series-3633',
  'Chevrolet 3 Series-6063',
  'Chevrolet 3 Series-8896',
  'Chevrolet Altima-9923',
  'Chevrolet Civic-3027',
  'Chevrolet Corolla-1187',
  'Chevrolet Corolla-6162',
  'Chevrolet Corolla-7329',
  'Chevrolet E-Class-1366',
  'Chevrolet E-Class-3129',
  'Chevrolet E-Class-5871',
  'Chevrolet E-Class-5976',
  'Chevrolet Elantra-3422',
  'Chevrolet Elantra-9275',
  'Chevrolet F-150-1752',
  'Chevrolet F-150-6798',
  'Chevrolet F-150-7520',
  'Chevrolet F-150-8963',
  'Chevrolet Jetta-7592',
  'Chevrolet Jetta-9359',
  'Chevrolet Silverado-1316',
  'Chevrolet Silverado-2333',
  'Chevrolet Silverado-5544',
  'Chevrolet Silverado-8466',
  'Chevrolet Silverado-8512',
  'Chevrolet Silverado-9234',
  'Chevrolet Sportage-3866',
  'Chevrolet Sportage-6599',
  'Chevrolet Sportage-8599',
  'Ford Altima-4363',
  'Ford Civic-7757',
  'Ford Corolla-4339',
  'Ford Corolla-5571',
  'Ford Corolla-8534',
  'Ford Corolla-8702',
  'Ford E-Class-2072',
  'Ford E-Class-3746',
  'Ford E-Class-7011',
  'Ford Elantra-1286',
  'Ford Elantra-5959',
  'Ford F-150-1879',
  'Ford F-150-2191',
  'Ford F-150-3856',
  'Ford F-150-7048',
  'Ford F-150-8327',
  'Ford Jetta-1795',
  'Ford Jetta-1893',
  'Ford Jetta-3302',
  'Ford Sportage-5395',
  'Ford Sportage-9304',
  'Honda Civic-3391',
  'Honda Civic-4229',
  'Honda Corolla-1441',
  'Honda Corolla-4433',
  'Honda E-Class-8842',
  'Honda Elantra-9405',
  'Honda F-150-1081',
  'Honda F-150-4301',
  'Honda F-150-4562',
  'Honda Jetta-2575',
  'Honda Jetta-5985',
  'Honda Jetta-6155',
  'Honda Silverado-7794',
  'Honda Silverado-9199',
  'Honda Sportage-4584',
  'Honda Sportage-5715',
  'Hyundai 3 Series-4010',
  'Hyundai 3 Series-4514',
  'Hyundai 3 Series-7161',
  'Hyundai 3 Series-8855',
  'Hyundai Altima-1416',
  'Hyundai Altima-2285',
  'Hyundai Altima-8432',
  'Hyundai Civic-2625',
  'Hyundai Corolla-4118',
  'Hyundai E-Class-3462',
  'Hyundai Elantra-1315',
  'Hyundai Elantra-3929',
  'Hyundai Elantra-5188',
  'Hyundai Elantra-7813',
  'Hyundai Elantra-9830',
  'Hyundai F-150-2293',
  'Hyundai F-150-2310',
  'Hyundai Jetta-2220',
  'Hyundai Jetta-5723',
  'Hyundai Jetta-6139',
  'Hyundai Jetta-7251',
  'Hyundai Silverado-1696',
  'Hyundai Silverado-4216',
  'Hyundai Sportage-2159',
  'Hyundai Sportage-2793',
  'Kia 3 Series-9936',
  'Kia Altima-7373',
  'Kia Altima-8013',
  'Kia Civic-4086',
  'Kia Civic-4630',
  'Kia Civic-8945',
  'Kia Corolla-2298',
  'Kia Corolla-4963',
  'Kia Corolla-8014',
  'Kia E-Class-9804',
  'Kia E-Class-9906',
  'Kia Elantra-2466',
  'Kia Elantra-2878',
  'Kia Elantra-6048',
  'Kia F-150-2773',
  'Kia F-150-2946',
  'Kia F-150-7474',
  'Kia F-150-9036',
  'Kia Silverado-8697',
  'Kia Sportage-4097',
  'Mercedes-Benz 3 Series-1161',
  'Mercedes-Benz 3 Series-8755',
  'Mercedes-Benz Altima-7651',
  'Mercedes-Benz Civic-4798',
  'Mercedes-Benz Civic-7505',
  'Mercedes-Benz Corolla-3461',
  'Mercedes-Benz Corolla-4146',
  'Mercedes-Benz E-Class-1257',
  'Mercedes-Benz E-Class-1283',
  'Mercedes-Benz E-Class-9149',
  'Mercedes-Benz Elantra-2796',
  'Mercedes-Benz F-150-1292',
  'Mercedes-Benz F-150-3872',
  'Mercedes-Benz F-150-3879',
  'Mercedes-Benz F-150-9077',
  'Mercedes-Benz F-150-9503',
  'Mercedes-Benz Jetta-7466',
  'Mercedes-Benz Jetta-7615',
  'Mercedes-Benz Jetta-7743',
  'Mercedes-Benz Silverado-3835',
  'Mercedes-Benz Sportage-2904',
  'Mercedes-Benz Sportage-6512',
  'Nissan 3 Series-7885',
  'Nissan Altima-4427',
  'Nissan Civic-2200',
  'Nissan Civic-8656',
  'Nissan Corolla-8956',
  'Nissan E-Class-1493',
  'Nissan E-Class-5963',
  'Nissan Elantra-1826',
  'Nissan Elantra-3040',
  'Nissan Elantra-7784',
  'Nissan F-150-2900',
  'Nissan F-150-4998',
  'Nissan Jetta-6042',
  'Nissan Jetta-6713',
  'Nissan Silverado-5375',
  'Nissan Sportage-5254',
  'Nissan Sportage-5945',
  'Nissan Sportage-6644',
  'Toyota 3 Series-1031',
  'Toyota Altima-8108',
  'Toyota Civic-8445',
  'Toyota E-Class-7053',
  'Toyota Elantra-1872',
  'Toyota Elantra-5243',
  'Toyota Elantra-5601',
  'Toyota F-150-4620',
  'Toyota Jetta-7836',
  'Toyota Jetta-8865',
  'Toyota Silverado-2765',
  'Toyota Silverado-5990',
  'Toyota Sportage-8508',
  'Volkswagen 3 Series-2197',
  'Volkswagen 3 Series-6890',
  'Volkswagen Altima-5375',
  'Volkswagen Altima-9007',
  'Volkswagen Alt',
  'Chevrolet E-Class-5871',
  'Volkswagen Corolla-6064',
  'Honda Jetta-2575',
  'Hyundai 3 Series-4010',
  'Mercedes-Benz Corolla-3461',
  'Chevrolet Corolla-6162',
  'Nissan Corolla-8956',
  'Chevrolet Silverado-2333',
  'Volkswagen Elantra-6376',
  'Hyundai Altima-2285',
  'Honda Silverado-9199',
  'Nissan E-Class-5963',
  'Hyundai 3 Series-7161',
  'Ford Corolla-5571',
  'Mercedes-Benz F-150-3872',
  'Chevrolet E-Class-3129',
  'Chevrolet Corolla-1187',
  'Ford F-150-7048',
  'BMW F-150-4852',
  'Hyundai F-150-2310',
  'Nissan Civic-2200',
  'Ford Elantra-1286',
  'Nissan 3 Series-7885',
  'Nissan F-150-4998',
  'Nissan Elantra-1826',
  'Volkswagen Corolla-6868',
  'BMW E-Class-7527',
  'Chevrolet Sportage-6599',
  'Kia Civic-4630',
  'Chevrolet F-150-8963',
  'Ford F-150-2191',
  'Chevrolet Elantra-9275',
  'Toyota Elantra-5243',
  'Ford Jetta-1893',
  'Hyundai 3 Series-8855',
  'Honda Civic-4229',
  'Volkswagen Altima-9389',
  'Hyundai Elantra-9830',
  'Honda Jetta-5985',
  'BMW Jetta-9669',
  'Mercedes-Benz Civic-4798',
  'Mercedes-Benz F-150-9503',
  'Toyota Sportage-8508',
  'Kia Corolla-4963',
  'Hyundai Silverado-1696',
  'Hyundai Corolla-4118',
  'Honda Sportage-4584',
  'Mercedes-Benz Jetta-7466',
  'Chevrolet Jetta-7592',
  'Ford F-150-1879',
  'Mercedes-Benz E-Class-1283',
  'BMW F-150-9186',
  'Toyota Elantra-1872',
  'Chevrolet E-Class-1366',
  'Ford Elantra-5959',
  'Nissan Sportage-5945',
  'Chevrolet 3 Series-3633',
  'BMW Corolla-9796',
  'Toyota Jetta-8865',
  'Toyota 3 Series-1031',
  'BMW Sportage-5385',
  'Volkswagen F-150-3314',
  'Chevrolet E-Class-5976',
  'Nissan Sportage-6644',
  'Chevrolet 3 Series-8896',
  'Toyota E-Class-7053',
  'Honda F-150-4301',
  'Kia Altima-7373',
  'Chevrolet F-150-6798',
  'Mercedes-Benz Corolla-4146',
  'Mercedes-Benz 3 Series-1161',
  'Toyota Altima-8108',
  'Volkswagen Elantra-7504',
  'Volkswagen E-Class-5821',
  'Nissan Elantra-3040',
  'Chevrolet Sportage-3866',
  'Chevrolet Silverado-9234',
  'Mercedes-Benz Jetta-7743',
  'Toyota Jetta-7836',
  'Ford E-Class-3746',
  'Hyundai Jetta-6139',
  'Kia F-150-2773',
  'Honda Jetta-6155',
  'Chevrolet Corolla-7329',
  'Chevrolet Silverado-1316',
  'Volkswagen Sportage-4127',
  'Chevrolet F-150-1752',
  'Hyundai Elantra-3929',
  'Honda F-150-1081',
  'Mercedes-Benz Silverado-3835',
  'Chevrolet Silverado-8466',
  'Chevrolet Altima-9923',
  'Ford Altima-4363',
  'Volkswagen E-Class-5746',
  'Nissan E-Class-1493',
  'Mercedes-Benz F-150-3879',
  'Toyota Civic-8445',
  'Honda Corolla-4433',
  'BMW 3 Series-7361',
  'Nissan Civic-8656',
  'Ford Civic-7757',
  'Honda Sportage-5715',
  'Ford Corolla-8702',
  'Kia F-150-7474',
  'Hyundai Elantra-5188',
  'Mercedes-Benz E-Class-9149',
  'BMW Silverado-7714',
  'Chevrolet F-150-7520',
  'Ford E-Class-2072',
  'Ford F-150-3856',
  'BMW Sportage-3251',
  'Hyundai Jetta-7251',
  'Toyota Silverado-5990',
  'Honda Corolla-1441',
  'Ford Jetta-1795',
  'Toyota Silverado-2765',
  'Kia E-Class-9906',
  'Kia Altima-8013',
  'Mercedes-Benz E-Class-1257',
  'BMW Sportage-8133',
  'Kia F-150-9036',
  'Hyundai Elantra-7813',
  'Kia Elantra-2878',
  'Kia E-Class-9804',
  'Honda F-150-4562',
  'BMW 3 Series-6282',
  'Nissan Altima-4427',
  'Hyundai Jetta-2220',
  'Mercedes-Benz Sportage-2904',
  'Kia Corolla-8014',
  'BMW Sportage-1560',
  'Mercedes-Benz Jetta-7615',
  'BMW Civic-3524',
  'Hyundai 3 Series-4514',
  'Kia 3 Series-9936',
  'Ford E-Class-7011',
  'Nissan Silverado-5375',
  'Chevrolet Silverado-5544',
  'Kia Civic-4086',
  'Nissan Elantra-7784',
  'Chevrolet Sportage-8599',
  'Kia Sportage-4097',
  'Ford Corolla-8534',
  'Ford Corolla-4339',
  'Kia Silverado-8697',
  'Mercedes-Benz 3 Series-8755',
  'Mercedes-Benz Civic-7505',
  'Ford Sportage-5395',
  'Ford Jetta-3302',
  'Chevrolet Elantra-3422',
  'Ford Sportage-9304',
  'Hyundai Civic-2625',
  'Nissan Jetta-6713',
  'Nissan F-150-2900',
  'Honda Silverado-7794',
  'Honda E-Class-8842',
  'Honda Civic-3391',
  'Mercedes-Benz Sportage-6512',
  'BMW Altima-8853',
  'Toyota F-150-4620',
  'Volkswagen Altima-5375',
  'Volkswagen F-150-8914',
  'Hyundai Elantra-3666',
];
export const colorOptions = [
  'SlateBlue',
  'CornflowerBlue',
  'LemonChiffon',
  'AntiqueWhite',
  'LawnGreen',
  'LightBlue',
  'OliveDrab',
  'PaleGreen',
  'OldLace',
  'MediumBlue',
  'DodgerBlue',
  'Fuchsia',
  'DarkCyan',
  'DarkViolet',
  'Crimson',
  'Tomato',
  'DarkGoldenRod',
  'Beige',
  'Peru',
  'PaleVioletRed',
  'SteelBlue',
  'LightYellow',
  'MediumAquaMarine',
  'LightGoldenRodYellow',
  'MediumTurquoise',
  'PeachPuff',
  'LightGray',
  'FireBrick',
  'Purple',
  'PowderBlue',
  'Khaki',
  'DeepPink',
  'Turquoise',
  'HoneyDew',
  'ForestGreen',
  'Aquamarine',
  'Brown',
  'Salmon',
  'Magenta',
  'DarkSeaGreen',
  'PaleGoldenRod',
  'NavajoWhite',
  'Violet',
  'Ivory',
  'MintCream',
  'SeaGreen',
  'DarkSalmon',
  'Cornsilk',
  'PapayaWhip',
  'LightCyan',
  'Lavender',
  'Teal',
  'LimeGreen',
  'PaleTurquoise',
  'Azure',
  'DarkGray',
  'Bisque',
  'Blue',
  'OrangeRed',
  'LightSalmon',
  'Aqua',
  'LightSkyBlue',
  'Red',
  'Linen',
  'Chocolate',
  'DarkOrange',
  'DarkGreen',
  'Maroon',
  'LightPink',
  'LightSeaGreen',
  'Cyan',
  'LightCoral',
  'Gray',
  'DarkTurquoise',
  'Olive',
  'DimGray',
  'DarkBlue',
  'HotPink',
  'Plum',
  'AliceBlue',
  'BurlyWood',
  'RosyBrown',
  'White',
  'Sienna',
  'YellowGreen',
  'CadetBlue',
  'SaddleBrown',
  'Tan',
  'Yellow',
  'Gainsboro',
  'MidnightBlue',
  'SkyBlue',
  'GoldenRod',
  'Black',
  'Green',
  'MediumPurple',
  'Indigo',
  'FloralWhite',
  'DarkMagenta',
  'RoyalBlue',
  'Chartreuse',
  'LightSlateGray',
  'SandyBrown',
  'Gold',
  'SeaShell',
  'DarkKhaki',
  'MediumSlateBlue',
  'DarkRed',
];
export const doorOptions = [
  2,
  3,
  4,
  5,
];
export const seatOptions = [
  2,
  4,
  5,
  7,
  8,
];
export const cylinderOptions = [
  4,
  6,
  8,
  10,
];
export const classOptions = [
  'Hypercar',
  'Supercar',
];
export const fuelOptions = [
  'Diesel',
  'Gasoline',
  'Hybrid',
];
export const transmissionOptions = [
  'Automatic',
  'Manual',
];
export const layoutOptions = [
  'Right-hand Drive',
  'Left-hand Drive',
];
export const locationOptions = [
  'Aaronside', 'Alexanderhaven', 'Alexanderside', 'Alisonfurt', 'Angelaview', 'Austinchester', 'Billymouth', 'Birdstad',
  'Bowmanshire', 'Brandyport', 'Brianamouth', 'Brooketown', 'Brownhaven', 'Brownview', 'Butlerport', 'Carmentown',
  'Castrohaven', 'Chapmanmouth', 'Charlotteville', 'Christinastad', 'Christopherland', 'Christophermouth', 'Cindyland',
  'Cooperview', 'Dorseyfurt', 'East Annettetown', 'East Brian', 'East Christina', 'East Christymouth', 'East Heatherstad',
  'East Karenborough', 'East Kimberlyberg', 'East Mariaburgh', 'East Michaeltown', 'East Philipburgh', 'East Robertchester',
  'East Sarah', 'East Stephaniemouth', 'Emilyton', 'Feliciatown', 'Foxstad', 'Franklinstad', 'Frederickville', 'Garcialand',
  'Garrettville', 'Gracefort', 'Hendersonmouth', 'Hernandeztown', 'Hoffmanmouth', 'Hughesshire', 'Hursttown', 'Jameshaven',
  'Jillianchester', 'Johnchester', 'Jonathanhaven', 'Jonesland', 'Josephstad', 'Josephton', 'Katherinestad', 'Kaylaville',
  'Kennedytown', 'Kevinborough', 'Kevinton', 'Kimberlyshire', 'Kimmouth', 'Kyleberg', 'Lake Austin', 'Lake Benjamin',
  'Lake Bradside', 'Lake Chelseaburgh', 'Lake Cody', 'Lake Derekburgh', 'Lake Evan', 'Lake Jenniferberg', 'Lake Jose',
  'Lake Kristafurt', 'Lake Marie', 'Lake Michele', 'Lake Rachel', 'Lake Ralphmouth', 'Lake Sandra', 'Lake Tiffany',
  'Larryland', 'Lewischester', 'Lopezshire', 'Mannmouth', 'Maryland', 'Matthewmouth', 'Meganport', 'Meganside',
  'Melissaport', 'Michaelchester', 'Michaelstad', 'Michellefort', 'Mitchellburgh', 'Mitchellbury', 'Mitchellmouth',
  'Montoyamouth', 'Morganmouth', 'Mossfurt', 'New Andrehaven', 'New Ashley', 'New Christian', 'New Christopher',
  'New Curtis', 'New Edwardhaven', 'New Erica', 'New Jacqueline', 'New Justin', 'New Karenmouth', 'New Katherine',
  'New Lindseyside', 'New Michael', 'New Samuelberg', 'New Shanebury', 'New Stephanieborough', 'New Thomas', 'New Williamtown',
  'Normanmouth', 'North Benjamin', 'North Biancaburgh', 'North Bruce', 'North Gabriel', 'North Justinshire', 'North Leslieshire',
  'North Mary', 'North Nicoleborough', 'North Sarah', 'North Thomasport', 'North Xavier', 'Petertown', 'Phillipburgh',
  'Poolefurt', 'Port Alejandro', 'Port Anna', 'Port Anthonystad', 'Port Daniel', 'Port Jason', 'Port Jill', 'Port Jonathanside',
  'Port Katrina', 'Port Lindastad', 'Port Martin', 'Port Stacy', 'Port Stephanieview', 'Reyesstad', 'Russellstad', 'Ryanmouth',
  'Sandymouth', 'Sarastad', 'Seanstad', 'Shaneborough', 'Shannonberg', 'Sherriville', 'Smithville', 'South Alexanderside',
  'South Allen', 'South Catherine', 'South Christopher', 'South George', 'South Jason', 'South Josephmouth', 'South Manuelburgh',
  'South Maryfurt', 'South Meganmouth', 'South Mitchell', 'South Nicholasmouth', 'South Sandramouth', 'South Sean', 'Spearsland',
  'Stewartmouth', 'Tatefurt', 'Taylorport', 'Torresfurt', 'Tuckerport', 'Turnerchester', 'Vaughanfurt', 'Waltonmouth',
  'West Alexander', 'West Alison', 'West Christine', 'West Deborahland', 'West Elizabeth', 'West Jennifer', 'West Jesus',
  'West Joannaton', 'West Kellyhaven', 'West Kyle', 'West Maria', 'West Martin', 'West Morgan', 'West Richardborough',
  'West Richardside', 'West Robinfurt', 'West Samanthashire', 'West Sandrashire', 'Whitechester', 'Wrightfurt', 'Wrightshire',
];