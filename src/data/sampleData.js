
// sampleData.js - Demo data for MINIPOWER Investment Platform

export const USER_PROFILE = {
  name: 'Alex Morgan',
  username: 'alex_investor',
  phone: '+234 801 234 5678',
  accountBalance: 45200,
  totalEarnings: 18450,
  todayEarnings: 1250,
  rechargeBalance: 32000,
  referralCode: 'X7T5H8',
  referralLink: 'https://minipower.invest/register?ref=NOVA-88294',
  memberTier: 'VIP 1',
}

// Sample ticker activities (Demo activity)
export const DEMO_ACTIVITIES = [
  { id: 1, text: 'A user successfully completed a withdrawal of ₦15,000' },
  { id: 2, text: 'A member successfully recharged their account with ₦20,000' },
  { id: 3, text: 'A user redeemed a coupon code successfully (+₦1,500 bonus)' },
  { id: 4, text: 'A member successfully completed a withdrawal of ₦32,500' },
  { id: 5, text: 'A new user joined the platform via referral invitation' },
  { id: 6, text: 'A member successfully recharged their account with ₦50,000' },
  { id: 7, text: 'A user completed a withdrawal of ₦8,000 via direct bank transfer' },
  { id: 8, text: 'A user redeemed a seasonal promotional coupon code' },
]

// MINIPOWER Investment Products (Illustrative Demo Data)
export const SAMPLE_PRODUCTS = [
  {
    id: 'power-tank-1',
    name: 'Power Tank',
    price: 10000,
    dailyIncome: 200,
    cycleDays: 60,
    totalRevenue: 12000,
    capacity: 'Portable power storage',
    icon: 'Sun',
    progress: 78,
  },
  {
    id: 'power-bank-2',
    name: 'Power Bank',
    price: 20000,
    dailyIncome: 400,
    cycleDays: 60,
    totalRevenue: 24000,
    capacity: 'High-capacity rechargeable battery',
    icon: 'Sun',
    progress: 65,
  },
  {
    id: 'solar-panel-3',
    name: 'Solar Panel',
    price: 50000,
    dailyIncome: 1000,
    cycleDays: 60,
    totalRevenue: 60000,
    capacity: 'Solar energy equipment',
    icon: 'Sun',
    progress: 52,
  },
  {
    id: 'rechargeable-light-4',
    name: 'Rechargeable Light',

    price: 80000,
    dailyIncome: 1600,
    cycleDays: 60,
    totalRevenue: 96000,
    capacity: 'Rechargeable lighting system',
    icon: 'Sun',
    progress: 40,
  },
  {
    id: 'power-accessories-5',
    name: 'Power Accessories',

    price: 100000,
    dailyIncome: 2000,
    cycleDays: 60,
    totalRevenue: 120000,
    capacity: 'Power and charging accessories',
    icon: 'Sun',
    progress: 30,
  },
]

// Team structure sample
export const TEAM_DATA = {
  totalMembers: 14,
  level1Count: 8,
  level2Count: 4,
  level3Count: 2,
  level4Count: 0,
  level5Count: 0,
  totalCommission: 12600,
  todayCommission: 850,
}

export const TEAM_MEMBERS = [
  // Level 1: Direct referrals
  { id: 1, username: 'john_smith', level: 1 },
  { id: 2, username: 'mary_jones', level: 1 },
  { id: 3, username: 'alex_david', level: 1 },
  { id: 4, username: 'grace_lee', level: 1 },
  { id: 5, username: 'peter_007', level: 1 },
  { id: 6, username: 'sarah_k', level: 1 },
  { id: 7, username: 'daniel_22', level: 1 },
  { id: 8, username: 'ruth_ade', level: 1 },

  // Level 2: Referred by Level 1
  { id: 9, username: 'michael_01', level: 2 },
  { id: 10, username: 'blessing_90', level: 2 },
  { id: 11, username: 'victor_lee', level: 2 },
  { id: 12, username: 'esther_12', level: 2 },

  // Level 3: Referred by Level 2
  { id: 13, username: 'samuel_55', level: 3 },
  { id: 14, username: 'faith_ade', level: 3 },
]
