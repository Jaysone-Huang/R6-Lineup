// ============================================================
//  LINEUPS — the only part you normally edit.
//
//  Format:  map-id: { site-id: { operator-id: [plan1, plan2, ...] } }
//  Each plan = number of screenshots in that plan.
//  Files are loaded from:
//    images/<map-id>/<site-id>/<operator-id>-<plan>.<shot>.webp
//
//  Example:  denari: [2, 3]
//    Plan 1 -> denari-1.1.webp, denari-1.2.webp
//    Plan 2 -> denari-2.1.webp, denari-2.2.webp, denari-2.3.webp
//
//  Custom filenames instead of numbers:
//    denari: [['stairs.webp', 'office.webp'], ['hall.jpg']]
// ============================================================
window.LINEUPS = {
  chalet: {
    '2f-master-bedroom': { denari: [2, 3], kaid: [2], melusi: [4] },
    'b-wine-cellar': { azami: [6] },
  },
  border: {
    '2f-armory-lockers': { mute: [4], denari: [5] },
    '1f-bathroom': { denari: [3] },
  },
  clubhouse: {
    '2f-gym': { denari: [3] },
    '2f-cctv': { thorn: [4] },
  },
  kanal: {
    '2f-server-room': { denari: [4] },
    'b-kayaks': { denari: [3] },
  },
};

// ============================================================
//  MAPS — "Floor|Site name". Edit names to match the current game.
// ============================================================
window.MAP_DATA = {
  'Bank': ['2F|Executive Lounge / CEO Office', '1F|Staff Room / Open Area', "1F|Teller's Office / Archives", 'B|Lockers / CCTV Room'],
  'Border': ['2F|Armory Lockers / Archives', '1F|Ventilation Room / Workshop', '1F|Customs Inspection / Supply Room', '1F|Bathroom / Tellers'],
  'Chalet': ['2F|Master Bedroom / Office', '1F|Bar / Gaming Room', '1F|Dining Room / Kitchen', 'B|Wine Cellar / Snowmobile Garage'],
  'Clubhouse': ['2F|Gym / Bedroom', '2F|CCTV / Cash Room', '1F|Bar / Stock Room', 'B|Church / Arsenal Room'],
  'Coastline': ['2F|Hookah Lounge / Billiards Room', '2F|Penthouse / Theater', '1F|Kitchen / Service Entrance', '1F|Blue Bar / Sunrise Bar'],
  'Consulate': ['2F|Consul Office / Meeting Room', '1F|Lobby / Press Room', '1F|Piano Room / Exhibition Room', 'B|Garage / Cafeteria'],
  'Emerald Plains': ['2F|Administration / CEO Office', '2F|Private Gallery / Meeting Room', '1F|Bar / Lounge', '1F|Dining Room / Kitchen'],
  'Favela': ['3F|Packaging Room / Footballer Room', '2F|Footballer Bedroom / Office', '1F|Biker Apartment / Kitchen', '1F|Aunt Apartment / Bedroom'],
  'Fortress': ["2F|Commander's Office / Bedroom", '2F|Dormitory / Briefing Room', '1F|Kitchen / Cafeteria', '1F|Hammam / Sitting Room'],
  'Hereford Base': ['3F|Ammo Storage / Tractor Storage', '2F|Master Bedroom / Kids Room', '1F|Kitchen / Dining Room', 'B|Fermentation Chamber / Brewery'],
  'House': ['2F|Kids Bedroom / Workshop', '1F|Living Room / Training Room', '1F|Kitchen / Dining Room', 'B|Garage / Laundry Room'],
  'Kafe Dostoyevsky': ['3F|Bar / Cocktail Lounge', '2F|Mining Room / Fireplace Hall', '2F|Reading Room / Fireplace Hall', '1F|Kitchen Service / Kitchen Cooking'],
  'Kanal': ['2F|Server Room / Radar Room', '1F|Security Room / Map Room', '1F|Coast Guard Meeting / Lounge', 'B|Kayaks / Supply Room'],
  'Lair': ['2F|Master Office / Meeting Room', '1F|Lab / Armory', '1F|Bunks / Weapon Storage', 'B|Server Room / Garage'],
  'Nighthaven Labs': ['2F|Command Center / Servers', '2F|Kitchen / Cafeteria', '1F|Animal Lab / Storage', 'B|Hangar / Generator'],
  'Oregon': ['2F|Kids Dorms / Dorms Main Hall', '1F|Kitchen / Dining Hall', '1F|Meeting Hall / Kitchen', 'B|Laundry Room / Supply Room'],
  'Outback': ['2F|Laundry / Games Room', '2F|Party Room / Office', '1F|Nature Room / Bushranger Room', '1F|Compressor Room / Gear Store'],
  'Presidential Plane': ['2F|Executive Office / Meeting Room', '2F|Staff Section / Executive Bedroom', '1F|Cargo Hold / Luggage Hold'],
  'Skyscraper': ['2F|Karaoke / Tea Room', '2F|Exhibition / Office', '1F|Kitchen / BBQ', '1F|Bedroom / Bathroom'],
  'Stadium Bravo': ['2F|Site A', '2F|Site B', '1F|Site C', '1F|Site D'],
  'Theme Park': ['2F|Initiation Room / Office', '2F|Bunk / Day Care', '1F|Armory / Throne Room', '1F|Lab / Storage'],
  'Tower': ['2F|Tea Room / Bar', '2F|Restaurant / Bird Room', '1F|Gift Shop / Lantern Room', '1F|Exhibit Room / Media Center'],
  'Villa': ['2F|Aviator Room / Games Room', '2F|Trophy Room / Statuary Room', '1F|Living Room / Library', '1F|Dining Room / Kitchen'],
  'Yacht': ['4F|Maps Room / Cockpit', '2F|Kitchen / Engine Storage', '1F|Server Room / Engine Control', 'B|Cafeteria / Staff Dormitory'],
};

window.ATTACKERS = ['Ace','Amaru','Ash','Blackbeard','Blitz','Brava','Buck','Capitão','Deimos','Dokkaebi','Finka','Flores','Fuze','Glaz','Gridlock','Grim','Hibana','Iana','IQ','Jackal','Kali','Lion','Maverick','Montagne','Nøkk','Nomad','Osa','Ram','Sens','Sledge','Striker','Thatcher','Thermite','Twitch','Ying','Zero','Zofia'];
window.DEFENDERS = ['Alibi','Aruni','Azami','Bandit','Castle','Caveira','Clash','Denari','Doc','Echo','Ela','Fenrir','Frost','Goyo','Jäger','Kaid','Kapkan','Lesion','Maestro','Melusi','Mira','Mozzie','Mute','Oryx','Pulse','Rook','Sentry','Skopós','Smoke','Solis','Tachanka','Thorn','Thunderbird','Tubarão','Valkyrie','Vigil','Wamai','Warden'];
