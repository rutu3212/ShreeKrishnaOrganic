import React, { useEffect, useMemo, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Tag,
  Calendar,
  Percent,
  IndianRupee,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  X,
  RefreshCw,
} from "lucide-react";

import OfferForm from "../../admin/OfferFrom"

export default function Offers() {
  // Your Offers page code goes here

  return (
    <div>
      <h1>Offers Management</h1>

      {/* Your offer management UI */}

      <OfferForm />
    </div>
  );
}