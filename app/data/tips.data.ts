export const pregnancyTips = [
    "Stay hydrated! Drink plenty of water throughout the day.",
    "Take your prenatal vitamins regularly.",
    "Get plenty of rest and maintain a regular sleep schedule.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Stay active with pregnancy-safe exercises.",
    "Track your baby's movements daily.",
    "Practice relaxation techniques.",
    "Keep up with your prenatal appointments."
];

export function getRandomTip(): string {
    return pregnancyTips[Math.floor(Math.random() * pregnancyTips.length)];
}