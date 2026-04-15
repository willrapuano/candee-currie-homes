// REAL LISTINGS — sourced from Zillow on 2026-03-12
// These are actual active/coming-soon properties. No mock data.
// Refresh periodically to keep current.
//
// NOTE: No listing photos — we link out to Zillow for full details.

import type { Listing } from '@/types'

export const REAL_LISTINGS: Listing[] = [
  {
    "id": "r1",
    "status": "Active",
    "price": 1049000,
    "address": {
      "street": "504 N Thomas St",
      "city": "Arlington",
      "state": "VA",
      "zip": "22203",
      "neighborhood": "Ballston"
    },
    "beds": 3,
    "baths": 4,
    "sqft": 1985,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/504-n-thomas-st-arlington-va-22203/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r2",
    "status": "Active",
    "price": 335000,
    "address": {
      "street": "231 N Thomas St Unit 105",
      "city": "Arlington",
      "state": "VA",
      "zip": "22203",
      "neighborhood": "Ballston"
    },
    "beds": 2,
    "baths": 2,
    "sqft": 834,
    "propertyType": "Condo",
    "sourceUrl": "https://www.zillow.com/homedetails/231-n-thomas-st-unit-105-arlington-va-22203/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r3",
    "status": "Active",
    "price": 1150000,
    "address": {
      "street": "308 N George Mason Dr",
      "city": "Arlington",
      "state": "VA",
      "zip": "22203",
      "neighborhood": "Ballston"
    },
    "beds": 3,
    "baths": 4,
    "sqft": 1686,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/308-n-george-mason-dr-arlington-va-22203/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r4",
    "status": "Active",
    "price": 700000,
    "address": {
      "street": "3800 Fairfax Dr APT 213",
      "city": "Arlington",
      "state": "VA",
      "zip": "22203",
      "neighborhood": "Ballston"
    },
    "beds": 2,
    "baths": 2,
    "sqft": 1500,
    "propertyType": "Condo",
    "sourceUrl": "https://www.zillow.com/homedetails/3800-fairfax-dr-apt-213-arlington-va-22203/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r5",
    "status": "Coming Soon",
    "price": 945000,
    "address": {
      "street": "1122 N Stafford St",
      "city": "Arlington",
      "state": "VA",
      "zip": "22201",
      "neighborhood": "Clarendon"
    },
    "beds": 3,
    "baths": 3,
    "sqft": 1662,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/1122-n-stafford-st-arlington-va-22201/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r6",
    "status": "Active",
    "price": 1149000,
    "address": {
      "street": "2629 Washington Blvd",
      "city": "Arlington",
      "state": "VA",
      "zip": "22201",
      "neighborhood": "Clarendon"
    },
    "beds": 5,
    "baths": 3,
    "sqft": 2627,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/2629-washington-blvd-arlington-va-22201/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r7",
    "status": "Coming Soon",
    "price": 1025000,
    "address": {
      "street": "2520 Fairfax Dr #4DIII",
      "city": "Arlington",
      "state": "VA",
      "zip": "22201",
      "neighborhood": "Clarendon"
    },
    "beds": 3,
    "baths": 4,
    "sqft": 1593,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/2520-fairfax-dr-4diii-arlington-va-22201/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r8",
    "status": "Active",
    "price": 569900,
    "address": {
      "street": "1045 N Utah St #2701",
      "city": "Arlington",
      "state": "VA",
      "zip": "22201",
      "neighborhood": "Clarendon"
    },
    "beds": 2,
    "baths": 2,
    "sqft": 940,
    "propertyType": "Condo",
    "sourceUrl": "https://www.zillow.com/homedetails/1045-n-utah-st-2701-arlington-va-22201/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r9",
    "status": "Active",
    "price": 2050000,
    "address": {
      "street": "1417 N Nash St",
      "city": "Arlington",
      "state": "VA",
      "zip": "22209",
      "neighborhood": "Rosslyn"
    },
    "beds": 3,
    "baths": 5,
    "sqft": 3556,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/1417-n-nash-st-arlington-va-22209/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r10",
    "status": "Active",
    "price": 450000,
    "address": {
      "street": "1530 Key Blvd APT 1017",
      "city": "Arlington",
      "state": "VA",
      "zip": "22209",
      "neighborhood": "Rosslyn"
    },
    "beds": 1,
    "baths": 1,
    "sqft": 765,
    "propertyType": "Condo",
    "sourceUrl": "https://www.zillow.com/homedetails/1530-key-blvd-apt-1017-arlington-va-22209/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r11",
    "status": "Active",
    "price": 370000,
    "address": {
      "street": "1404 12th St N #S-g6",
      "city": "Arlington",
      "state": "VA",
      "zip": "22209",
      "neighborhood": "Rosslyn"
    },
    "beds": 2,
    "baths": 1,
    "sqft": 840,
    "propertyType": "Condo",
    "sourceUrl": "https://www.zillow.com/homedetails/1404-12th-st-n-s-g6-arlington-va-22209/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r12",
    "status": "Active",
    "price": 1195000,
    "address": {
      "street": "1411 Key Blvd #609",
      "city": "Arlington",
      "state": "VA",
      "zip": "22209",
      "neighborhood": "Rosslyn"
    },
    "beds": 3,
    "baths": 2,
    "sqft": 1525,
    "propertyType": "Condo",
    "sourceUrl": "https://www.zillow.com/homedetails/1411-key-blvd-609-arlington-va-22209/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r13",
    "status": "Coming Soon",
    "price": 890000,
    "address": {
      "street": "564 N West St",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22314",
      "neighborhood": "Old Town Alexandria"
    },
    "beds": 2,
    "baths": 3,
    "sqft": 1722,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/564-n-west-st-alexandria-va-22314/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r14",
    "status": "Active",
    "price": 785000,
    "address": {
      "street": "515 Tobacco Quay",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22314",
      "neighborhood": "Old Town Alexandria"
    },
    "beds": 1,
    "baths": 2,
    "sqft": 1064,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/515-tobacco-quay-alexandria-va-22314/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r15",
    "status": "Coming Soon",
    "price": 699000,
    "address": {
      "street": "625 Slaters Ln #304",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22314",
      "neighborhood": "Old Town Alexandria"
    },
    "beds": 2,
    "baths": 2,
    "sqft": 1080,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/625-slaters-ln-304-alexandria-va-22314/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r16",
    "status": "Active",
    "price": 999900,
    "address": {
      "street": "319 1/2 N Fayette St",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22314",
      "neighborhood": "Old Town Alexandria"
    },
    "beds": 3,
    "baths": 2,
    "sqft": 1232,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/319-1-2-n-fayette-st-alexandria-va-22314/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r17",
    "status": "Active",
    "price": 2225000,
    "address": {
      "street": "5637 34th St N",
      "city": "Arlington",
      "state": "VA",
      "zip": "22207",
      "neighborhood": "Arlington"
    },
    "beds": 6,
    "baths": 6,
    "sqft": 6044,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/5637-34th-st-n-arlington-va-22207/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r18",
    "status": "Active",
    "price": 1299900,
    "address": {
      "street": "2106 S Kenmore St",
      "city": "Arlington",
      "state": "VA",
      "zip": "22204",
      "neighborhood": "Arlington"
    },
    "beds": 5,
    "baths": 4,
    "sqft": 2846,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/2106-s-kenmore-st-arlington-va-22204/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r19",
    "status": "Active",
    "price": 619900,
    "address": {
      "street": "1604 10th St S",
      "city": "Arlington",
      "state": "VA",
      "zip": "22204",
      "neighborhood": "Arlington"
    },
    "beds": 3,
    "baths": 2,
    "sqft": 1330,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/1604-10th-st-s-arlington-va-22204/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r20",
    "status": "Coming Soon",
    "price": 2799900,
    "address": {
      "street": "6032 28th St N",
      "city": "Arlington",
      "state": "VA",
      "zip": "22207",
      "neighborhood": "Arlington"
    },
    "beds": 5,
    "baths": 4,
    "sqft": 4700,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/6032-28th-st-n-arlington-va-22207/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r21",
    "status": "Coming Soon",
    "price": 1847000,
    "address": {
      "street": "8416 Weller Ave",
      "city": "McLean",
      "state": "VA",
      "zip": "22102",
      "neighborhood": "McLean"
    },
    "beds": 5,
    "baths": 4,
    "sqft": 4190,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/8416-weller-ave-mclean-va-22102/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r22",
    "status": "Active",
    "price": 1695000,
    "address": {
      "street": "1560 Forest Villa Ln",
      "city": "McLean",
      "state": "VA",
      "zip": "22101",
      "neighborhood": "McLean"
    },
    "beds": 5,
    "baths": 4,
    "sqft": 4252,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/1560-forest-villa-ln-mclean-va-22101/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r23",
    "status": "Active",
    "price": 2650000,
    "address": {
      "street": "6607 Tina Ln",
      "city": "McLean",
      "state": "VA",
      "zip": "22101",
      "neighborhood": "McLean"
    },
    "beds": 5,
    "baths": 5,
    "sqft": 5555,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/6607-tina-ln-mclean-va-22101/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r24",
    "status": "Active",
    "price": 1869000,
    "address": {
      "street": "6156 Tompkins Dr",
      "city": "McLean",
      "state": "VA",
      "zip": "22101",
      "neighborhood": "McLean"
    },
    "beds": 4,
    "baths": 3,
    "sqft": 4451,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/6156-tompkins-dr-mclean-va-22101/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r25",
    "status": "Active",
    "price": 1150000,
    "address": {
      "street": "3402 Walnut Hill Ct",
      "city": "Falls Church",
      "state": "VA",
      "zip": "22042",
      "neighborhood": "Falls Church"
    },
    "beds": 3,
    "baths": 5,
    "sqft": 4710,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/3402-walnut-hill-ct-falls-church-va-22042/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r26",
    "status": "Active",
    "price": 875000,
    "address": {
      "street": "7309 Woodley Pl",
      "city": "Falls Church",
      "state": "VA",
      "zip": "22046",
      "neighborhood": "Falls Church"
    },
    "beds": 4,
    "baths": 2,
    "sqft": 1680,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/7309-woodley-pl-falls-church-va-22046/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r27",
    "status": "Active",
    "price": 924900,
    "address": {
      "street": "6235 Kilmer Ct",
      "city": "Falls Church",
      "state": "VA",
      "zip": "22044",
      "neighborhood": "Falls Church"
    },
    "beds": 3,
    "baths": 3,
    "sqft": 2688,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/6235-kilmer-ct-falls-church-va-22044/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r28",
    "status": "Active",
    "price": 615000,
    "address": {
      "street": "8045 Gatehouse Rd #17",
      "city": "Falls Church",
      "state": "VA",
      "zip": "22042",
      "neighborhood": "Falls Church"
    },
    "beds": 3,
    "baths": 3,
    "sqft": 2160,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/8045-gatehouse-rd-17-falls-church-va-22042/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r29",
    "status": "Coming Soon",
    "price": 997000,
    "address": {
      "street": "6145 Olivet Dr",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22315",
      "neighborhood": "Alexandria"
    },
    "beds": 4,
    "baths": 5,
    "sqft": 3700,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/6145-olivet-dr-alexandria-va-22315/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r30",
    "status": "Coming Soon",
    "price": 625000,
    "address": {
      "street": "6019 Rose Hill Dr",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22310",
      "neighborhood": "Alexandria"
    },
    "beds": 3,
    "baths": 2,
    "sqft": 1092,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/6019-rose-hill-dr-alexandria-va-22310/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r31",
    "status": "Active",
    "price": 650000,
    "address": {
      "street": "3802 Vermont Ct",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22304",
      "neighborhood": "Alexandria"
    },
    "beds": 2,
    "baths": 3,
    "sqft": 1807,
    "propertyType": "Townhouse",
    "sourceUrl": "https://www.zillow.com/homedetails/3802-vermont-ct-alexandria-va-22304/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r32",
    "status": "Active",
    "price": 749000,
    "address": {
      "street": "5812 Piedmont Dr",
      "city": "Alexandria",
      "state": "VA",
      "zip": "22310",
      "neighborhood": "Alexandria"
    },
    "beds": 3,
    "baths": 3,
    "sqft": 1633,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/5812-piedmont-dr-alexandria-va-22310/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r33",
    "status": "Active",
    "price": 950000,
    "address": {
      "street": "8413 Hollis Ln",
      "city": "Vienna",
      "state": "VA",
      "zip": "22182",
      "neighborhood": "Vienna"
    },
    "beds": 4,
    "baths": 4,
    "sqft": 2018,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/8413-hollis-ln-vienna-va-22182/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r34",
    "status": "Active",
    "price": 999900,
    "address": {
      "street": "721 Upham Pl NW",
      "city": "Vienna",
      "state": "VA",
      "zip": "22180",
      "neighborhood": "Vienna"
    },
    "beds": 4,
    "baths": 5,
    "sqft": 2792,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/721-upham-pl-nw-vienna-va-22180/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r35",
    "status": "Coming Soon",
    "price": 1220000,
    "address": {
      "street": "9359 Robnel Pl",
      "city": "Vienna",
      "state": "VA",
      "zip": "22182",
      "neighborhood": "Vienna"
    },
    "beds": 5,
    "baths": 4,
    "sqft": 2877,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/9359-robnel-pl-vienna-va-22182/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r36",
    "status": "Active",
    "price": 1250000,
    "address": {
      "street": "2126 Docket Ln",
      "city": "Vienna",
      "state": "VA",
      "zip": "22181",
      "neighborhood": "Vienna"
    },
    "beds": 4,
    "baths": 3,
    "sqft": 3352,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/2126-docket-ln-vienna-va-22181/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r37",
    "status": "Coming Soon",
    "price": 1747000,
    "address": {
      "street": "10225 Forest Lake Dr",
      "city": "Great Falls",
      "state": "VA",
      "zip": "10225",
      "neighborhood": "Great Falls"
    },
    "beds": 5,
    "baths": 4,
    "sqft": 4480,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/10225-forest-lake-dr-great-falls-va-10225/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r38",
    "status": "Active",
    "price": 2275000,
    "address": {
      "street": "908 Walker Rd",
      "city": "Great Falls",
      "state": "VA",
      "zip": "22066",
      "neighborhood": "Great Falls"
    },
    "beds": 5,
    "baths": 6,
    "sqft": 5743,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/908-walker-rd-great-falls-va-22066/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r39",
    "status": "Coming Soon",
    "price": 1325000,
    "address": {
      "street": "956 Walker Rd",
      "city": "Great Falls",
      "state": "VA",
      "zip": "22066",
      "neighborhood": "Great Falls"
    },
    "beds": 4,
    "baths": 4,
    "sqft": 3122,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/956-walker-rd-great-falls-va-22066/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  },
  {
    "id": "r40",
    "status": "Coming Soon",
    "price": 1050000,
    "address": {
      "street": "10172 Yorktown Way",
      "city": "Great Falls",
      "state": "VA",
      "zip": "10172",
      "neighborhood": "Great Falls"
    },
    "beds": 5,
    "baths": 5,
    "sqft": 3195,
    "propertyType": "Single Family",
    "sourceUrl": "https://www.zillow.com/homedetails/10172-yorktown-way-great-falls-va-10172/",
    "source": "Zillow",
    "scrapedDate": "2026-03-12"
  }
]

// Convenience exports
export const ACTIVE_LISTINGS = REAL_LISTINGS.filter(l => l.status === 'Active')
export const LUXURY_LISTINGS = REAL_LISTINGS.filter(l => l.price >= 1500000 && l.status === 'Active')
export const ARLINGTON_LISTINGS = REAL_LISTINGS.filter(l => l.address.city === 'Arlington')
