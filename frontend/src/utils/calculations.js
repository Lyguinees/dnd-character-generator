function getModifier(score) {
  return Math.floor((score - 10) / 2);
}

function getProficiencyBonus(level) {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

function getDefaultCharacter() {
  return {
    id: '',
    name: '',
    playerName: '',
    race: '',
    className: '',
    background: '',
    alignment: '',
    level: 1,
    experience: 0,
    hitPoints: 1,
    armorClass: 10,
    speed: 30,
    initiative: 0,
    proficiencyBonus: 2,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    skills: [],
    savingThrows: [],
    attacks: [],
    inventory: { cp: 0, pp: 0, ep: 0, gp: 0, sp: 0, items: [] },
    features: { raceTraits: '', classTraits: '', otherTraits: '' },
    bio: '',
    spells: [],
    isCaster: false,
    imageUrl: '',
  };
}

const skillsList = [
  { id: 'acrobatics', name: 'Acrobacia', attribute: 'dexterity' },
  { id: 'animalHandling', name: 'Adestrar Animais', attribute: 'wisdom' },
  { id: 'arcana', name: 'Arcanismo', attribute: 'intelligence' },
  { id: 'athletics', name: 'Atletismo', attribute: 'strength' },
  { id: 'deception', name: 'Enganação', attribute: 'charisma' },
  { id: 'history', name: 'História', attribute: 'intelligence' },
  { id: 'insight', name: 'Intuição', attribute: 'wisdom' },
  { id: 'intimidation', name: 'Intimidação', attribute: 'charisma' },
  { id: 'investigation', name: 'Investigação', attribute: 'intelligence' },
  { id: 'medicine', name: 'Medicina', attribute: 'wisdom' },
  { id: 'nature', name: 'Natureza', attribute: 'intelligence' },
  { id: 'perception', name: 'Percepção', attribute: 'wisdom' },
  { id: 'performance', name: 'Atuação', attribute: 'charisma' },
  { id: 'persuasion', name: 'Persuasão', attribute: 'charisma' },
  { id: 'religion', name: 'Religião', attribute: 'intelligence' },
  { id: 'sleightOfHand', name: 'Prestidigitação', attribute: 'dexterity' },
  { id: 'stealth', name: 'Furtividade', attribute: 'dexterity' },
  { id: 'survival', name: 'Sobrevivência', attribute: 'wisdom' },
];

function getSkillBonus(skill, attributes, proficiencyBonus) {
  const modifier = getModifier(attributes[skill.attribute]);
  return modifier + (skill.proficient ? proficiencyBonus : 0);
}

function getSavingThrowBonus(attributeName, attributes, proficiencyBonus, proficient) {
  const modifier = getModifier(attributes[attributeName]);
  return modifier + (proficient ? proficiencyBonus : 0);
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollAttribute() {
  const rolls = Array.from({ length: 4 }, () => randomInteger(1, 6));
  rolls.sort((a, b) => a - b);
  return rolls.slice(1).reduce((sum, value) => sum + value, 0);
}

function chooseRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateRandomCharacter() {
  const attributes = {
    strength: rollAttribute(),
    dexterity: rollAttribute(),
    constitution: rollAttribute(),
    intelligence: rollAttribute(),
    wisdom: rollAttribute(),
    charisma: rollAttribute(),
  };

  const classes = ['Guerreiro', 'Mago', 'Clérigo', 'Ladino', 'Bardo', 'Patrulheiro', 'Druida', 'Monge'];
  const races = ['Humano', 'Elfo', 'Anão', 'Halfling', 'Gnomo', 'Tiefling', 'Meio-Elfo'];
  const backgrounds = ['Sábio', 'Soldado', 'Nobre', 'Criminoso', 'Forasteiro', 'Acólito', 'Artesão'];
  const alignments = ['Leal e Bom', 'Neutro e Bom', 'Caótico e Bom', 'Neutro', 'Leal e Mau', 'Neutro e Mau', 'Caótico e Mau'];

  const level = randomInteger(1, 10);
  const constitutionModifier = getModifier(attributes.constitution);

  return {
    ...getDefaultCharacter(),
    name: `Personagem ${randomInteger(1, 999)}`,
    playerName: `Jogador ${randomInteger(1, 999)}`,
    race: chooseRandom(races),
    className: chooseRandom(classes),
    background: chooseRandom(backgrounds),
    alignment: chooseRandom(alignments),
    level,
    experience: randomInteger(0, level * 300),
    hitPoints: Math.max(1, 8 + constitutionModifier),
    armorClass: 10 + getModifier(attributes.dexterity),
    speed: chooseRandom([25, 30, 35]),
    initiative: getModifier(attributes.dexterity),
    isCaster: Math.random() < 0.4,
    attributes,
    skills: [],
    savingThrows: [],
    attacks: [],
    inventory: { cp: randomInteger(0, 100), pp: randomInteger(0, 20), ep: randomInteger(0, 50), gp: randomInteger(0, 200), sp: randomInteger(0, 100), items: [] },
    features: { raceTraits: '', classTraits: '', otherTraits: '' },
    spells: [],
    imageUrl: '',
  };
}

export { getModifier, getProficiencyBonus, getDefaultCharacter, skillsList, getSkillBonus, getSavingThrowBonus, generateRandomCharacter };
