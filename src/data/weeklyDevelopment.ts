import { WeeklyDevelopment } from '../types/baby';

export const weeklyDevelopmentData: WeeklyDevelopment[] = [
  {
    week: 24,
    title: "6 Months Development",
    description: "Your baby's emotions are becoming more complex, and they're starting to express a wider range of feelings. They're also becoming more physically active and may begin to show signs of crawling.",
    heightRange: "62.9–72.4cm",
    weightRange: "6.6–10.2kg",
    milestones: [
      "Improved hand-eye coordination",
      "Can react to loud noises",
      "May begin to sit without support",
      "Shows curiosity about objects",
      "Responds to own name"
    ],
    activities: [
      {
        title: "Tummy Time",
        description: "Place toys slightly out of reach to encourage movement"
      },
      {
        title: "Object Play",
        description: "Let baby explore different textures and shapes safely"
      },
      {
        title: "Social Interaction",
        description: "Play peek-a-boo and other interactive games"
      }
    ],
    developmentQuestion: {
      question: "Can your baby sit without support?",
      options: ["Yes, consistently", "Sometimes", "Not yet"]
    }
  },
  // Add more weeks as needed
];

export const getWeekData = (week: number): WeeklyDevelopment | undefined => {
  return weeklyDevelopmentData.find(data => data.week === week);
};