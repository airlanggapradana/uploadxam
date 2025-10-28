"use client";

import { useEffect, useState } from "react";

const DONATION_KEY = "donation_popup_last_seen";
const ONE_DAY = 24 * 60 * 60 * 1000;

export const useDonationDialog = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem(DONATION_KEY);

    if (!lastSeen) {
      setShouldShow(true);
      return;
    }

    const lastSeenDate = new Date(lastSeen);
    const now = new Date();

    if (now.getTime() - lastSeenDate.getTime() > ONE_DAY) {
      setShouldShow(true);
    }
  }, []);

  const closePopup = () => {
    localStorage.setItem(DONATION_KEY, new Date().toISOString());
    setShouldShow(false);
  };

  return { shouldShow, closePopup };
};
