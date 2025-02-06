import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  HomePage,
  RecordsPage,
  MomCommunityPage,
  FeedingPage,
  FormulaPage,
  SleepPage,
  DiaperPage,
  PumpPage,
  StatisticsPage,
  GrowthPage,
  VaccinePage,
  VaccineDetailsPage,
  BabyManagementPage,
  AddBabyPage,
  EditBabyPage,
  BabyWeeklyPage,
  AddVaccinePage,
  ReminderRecordsPage,
  MomRecordsPage,
  PostpartumRecoveryPage,
  DietTipsPage,
  ModePage,
  PostpartumDetailsPage,
  MarketplacePage,
  MarketplaceItemPage,
  MarketplaceSellPage,
  ShopPage,
  ShopProductPage,
  ShopCartPage,
  CreatePostPage,
  MothersMilkPage,
  ActivityPage,
  MedsPage,
  SolidFoodPage,
  SolidFoodDetailsPage,
  ReminderPage
} from './pages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mom" element={<MomCommunityPage />} />
      <Route path="/mom/records" element={<MomRecordsPage />} />
      <Route path="/mom/recovery" element={<PostpartumRecoveryPage />} />
      <Route path="/mom/diet" element={<DietTipsPage />} />
      <Route path="/mom/mode" element={<ModePage />} />
      <Route path="/records" element={<RecordsPage />} />
      <Route path="/feeding" element={<FeedingPage />} />
      <Route path="/formula" element={<FormulaPage />} />
      <Route path="/mothers-milk" element={<MothersMilkPage />} />
      <Route path="/sleep" element={<SleepPage />} />
      <Route path="/diaper" element={<DiaperPage />} />
      <Route path="/pump" element={<PumpPage />} />
      <Route path="/activity" element={<ActivityPage />} />
      <Route path="/meds" element={<MedsPage />} />
      <Route path="/solid" element={<SolidFoodPage />} />
      <Route path="/solid/details" element={<SolidFoodDetailsPage />} />
      <Route path="/reminder" element={<ReminderPage />} />
      <Route path="/statistics" element={<StatisticsPage />} />
      <Route path="/growth" element={<GrowthPage />} />
      <Route path="/vaccine" element={<VaccinePage />} />
      <Route path="/vaccine/add" element={<AddVaccinePage />} />
      <Route path="/vaccine/:id" element={<VaccineDetailsPage />} />
      <Route path="/baby-management" element={<BabyManagementPage />} />
      <Route path="/baby-management/add" element={<AddBabyPage />} />
      <Route path="/baby-management/edit/:id" element={<EditBabyPage />} />
      <Route path="/baby-weekly" element={<BabyWeeklyPage />} />
      <Route path="/reminder-records" element={<ReminderRecordsPage />} />
      <Route path="/postpartum-details" element={<PostpartumDetailsPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/marketplace/item/:id" element={<MarketplaceItemPage />} />
      <Route path="/marketplace/sell" element={<MarketplaceSellPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/product/:id" element={<ShopProductPage />} />
      <Route path="/shop/cart" element={<ShopCartPage />} />
      <Route path="/create-post" element={<CreatePostPage />} />
    </Routes>
  );
};