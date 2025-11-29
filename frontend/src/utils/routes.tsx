import { createBrowserRouter } from "react-router";
import Splash from "../components/Splash";
import OnboardingCarousel from "../components/OnboardingCarousel";
import PhoneLogin from "../components/PhoneLogin";
import OTPScreen from "../components/OTPScreen";
import Permissions from "../components/Permissions";
import ProfilingIncome from "../components/ProfilingIncome";
import ProfilingJobType from "../components/ProfilingJobType";
import ProfilingAge from "../components/ProfilingAge";
import ProfilingLoans from "../components/ProfilingLoans";
import ProfilingGoal from "../components/ProfilingGoal";
import HomeDashboard from "../components/HomeDashboard";
import SendMoney from "../components/SendMoney";
import EnterUPI from "../components/EnterUPI";
import EnterMobile from "../components/EnterMobile";
import EnterAccount from "../components/EnterAccount";
import SendAmount from "../components/SendAmount";
import ConfirmPayment from "../components/ConfirmPayment";
import PaymentSuccess from "../components/PaymentSuccess";
import MyQR from "../components/MyQR";
import ScanQR from "../components/ScanQR";
import DailyCashflow from "../components/DailyCashflow";
import UnknownTransactions from "../components/UnknownTransactions";
import SpendingBreakdown from "../components/SpendingBreakdown";
import RecurringPayments from "../components/RecurringPayments";
import IncomeCelebration from "../components/IncomeCelebration";
import AutoBucketing from "../components/AutoBucketing";
import SpendResistance from "../components/SpendResistance";
import RoundOffSavings from "../components/RoundOffSavings";
import DailyAutoSave from "../components/DailyAutoSave";
import EmergencyCushion from "../components/EmergencyCushion";
import SaveSurplus from "../components/SaveSurplus";
import WeeklyReport from "../components/WeeklyReport";
import EssentialVsNonEssential from "../components/EssentialVsNonEssential";
import SubscriptionWaste from "../components/SubscriptionWaste";
import EMICalendar from "../components/EMICalendar";
import LoanDashboard from "../components/LoanDashboard";
import DebtPlanner from "../components/DebtPlanner";
import EMIAutoBlock from "../components/EMIAutoBlock";
import CreateGoal from "../components/CreateGoal";
import GoalDetail from "../components/GoalDetail";
import SimpleInvestment from "../components/SimpleInvestment";
import TaxSaver from "../components/TaxSaver";
import TaxTracker from "../components/TaxTracker";
import WeeklyChallenge from "../components/WeeklyChallenge";
import MiniLesson from "../components/MiniLesson";
import AICoach from "../components/AICoach";
import BigPurchaseAdvisor from "../components/BigPurchaseAdvisor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/onboarding",
    Component: OnboardingCarousel,
  },
  {
    path: "/phone-login",
    Component: PhoneLogin,
  },
  {
    path: "/otp",
    Component: OTPScreen,
  },
  {
    path: "/permissions",
    Component: Permissions,
  },
  {
    path: "/profiling/income",
    Component: ProfilingIncome,
  },
  {
    path: "/profiling/job-type",
    Component: ProfilingJobType,
  },
  {
    path: "/profiling/age",
    Component: ProfilingAge,
  },
  {
    path: "/profiling/loans",
    Component: ProfilingLoans,
  },
  {
    path: "/profiling/goal",
    Component: ProfilingGoal,
  },
  {
    path: "/home",
    Component: HomeDashboard,
  },
  {
    path: "/send-money",
    Component: SendMoney,
  },
  {
    path: "/enter-upi",
    Component: EnterUPI,
  },
  {
    path: "/enter-mobile",
    Component: EnterMobile,
  },
  {
    path: "/enter-account",
    Component: EnterAccount,
  },
  {
    path: "/send-amount",
    Component: SendAmount,
  },
  {
    path: "/confirm-payment",
    Component: ConfirmPayment,
  },
  {
    path: "/payment-success",
    Component: PaymentSuccess,
  },
  {
    path: "/my-qr",
    Component: MyQR,
  },
  {
    path: "/scan-qr",
    Component: ScanQR,
  },
  {
    path: "/daily-cashflow",
    Component: DailyCashflow,
  },
  {
    path: "/unknown-transactions",
    Component: UnknownTransactions,
  },
  {
    path: "/spending-breakdown",
    Component: SpendingBreakdown,
  },
  {
    path: "/recurring-payments",
    Component: RecurringPayments,
  },
  {
    path: "/income-celebration",
    Component: IncomeCelebration,
  },
  {
    path: "/auto-bucketing",
    Component: AutoBucketing,
  },
  {
    path: "/spend-resistance",
    Component: SpendResistance,
  },
  {
    path: "/round-off-savings",
    Component: RoundOffSavings,
  },
  {
    path: "/daily-auto-save",
    Component: DailyAutoSave,
  },
  {
    path: "/emergency-cushion",
    Component: EmergencyCushion,
  },
  {
    path: "/save-surplus",
    Component: SaveSurplus,
  },
  {
    path: "/weekly-report",
    Component: WeeklyReport,
  },
  {
    path: "/essential-vs-non-essential",
    Component: EssentialVsNonEssential,
  },
  {
    path: "/subscription-waste",
    Component: SubscriptionWaste,
  },
  {
    path: "/emi-calendar",
    Component: EMICalendar,
  },
  {
    path: "/loan-dashboard",
    Component: LoanDashboard,
  },
  {
    path: "/debt-planner",
    Component: DebtPlanner,
  },
  {
    path: "/emi-auto-block",
    Component: EMIAutoBlock,
  },
  {
    path: "/create-goal",
    Component: CreateGoal,
  },
  {
    path: "/goal-detail",
    Component: GoalDetail,
  },
  {
    path: "/simple-investment",
    Component: SimpleInvestment,
  },
  {
    path: "/tax-saver",
    Component: TaxSaver,
  },
  {
    path: "/tax-tracker",
    Component: TaxTracker,
  },
  {
    path: "/weekly-challenge",
    Component: WeeklyChallenge,
  },
  {
    path: "/mini-lesson",
    Component: MiniLesson,
  },
  {
    path: "/ai-coach",
    Component: AICoach,
  },
  {
    path: "/big-purchase-advisor",
    Component: BigPurchaseAdvisor,
  },
]);
