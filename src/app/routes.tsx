import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import AnalysisPage from "./pages/AnalysisPage";
import IngestPage from "./pages/IngestPage";
import TripPage from "./pages/TripPage";
import CollectionsPage from "./pages/CollectionsPage";
import SettingsPage from "./pages/SettingsPage";
import SavePage from "./pages/SavePage";
import BookingPage from "./pages/BookingPage";
import FlightsPage from "./pages/FlightsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import TripPersonalizePage from "./pages/TripPersonalizePage";
import HotelsPage from "./pages/HotelsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/ingest",
    Component: IngestPage,
  },
  {
    path: "/save",
    Component: SavePage,
  },
  {
    path: "/analysis",
    Component: AnalysisPage,
  },
  {
    path: "/trip",
    Component: TripPage,
  },
  {
    path: "/flights",
    Component: FlightsPage,
  },
  {
    path: "/flight-details",
    Component: FlightDetailsPage,
  },
  {
    path: "/seat-selection",
    Component: SeatSelectionPage,
  },
  {
    path: "/trip-personalize",
    Component: TripPersonalizePage,
  },
  {
    path: "/hotels",
    Component: HotelsPage,
  },
  {
    path: "/hotel-details",
    Component: HotelDetailsPage,
  },
  {
    path: "/booking",
    Component: BookingPage,
  },
  {
    path: "/collections",
    Component: CollectionsPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
]);